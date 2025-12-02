import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vercelJSON from "../../vercel.json" with { type: "json" };
import { normalizePath } from "./check-redirects";
import oldRedirects from "./old-redirects.json" with { type: "json" };
import redirects from "./redirects.json" with { type: "json" };
import superOldRedirects from "./super-old-redirects.json" with {
  type: "json",
};
import { tagMap, tagSets, taggedRedirects } from "./tagged-redirects";

type VercelRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));

const vercelRedirects: VercelRedirect[] = [];

const newRedirectLookup = new Map<string, string>();

// Add newest redirects from redirects.json
for (const redirect of redirects) {
  vercelRedirects.push({
    ...redirect,
    source: normalizePath(redirect.source),
    permanent: true,
  });
  newRedirectLookup.set(redirect.source, redirect.destination);
}

for (const redirect of oldRedirects) {
  const target =
    newRedirectLookup.get(redirect.destination) ?? redirect.destination;

  vercelRedirects.push({
    ...redirect,
    source: normalizePath(redirect.source),
    destination: target,
    permanent: true,
  });

  newRedirectLookup.set(redirect.source, target);
}

for (const redirect of superOldRedirects) {
  const sourceURLs =
    typeof redirect.from === "string" ? [redirect.from] : redirect.from;

  for (const source of sourceURLs) {
    const newDestination = newRedirectLookup.get(redirect.to);
    if (!newDestination) {
      throw new Error(`Couldn't find redirect for ${redirect.to}`);
    }

    vercelRedirects.push({
      source: normalizePath(source),
      destination: newDestination,
      permanent: true,
    });
  }
}

for (const redirect of taggedRedirects) {
  const sourceURLs =
    typeof redirect.from === "string" ? [redirect.from] : redirect.from;

  for (const source of sourceURLs) {
    const newDestination = newRedirectLookup.get(redirect.to);
    if (!newDestination) {
      throw new Error(`Couldn't find redirect for ${redirect.to}`);
    }

    if (source in tagMap) {
      const tagType = tagMap[source as keyof typeof tagMap];
      const tagSet = tagSets[tagType];
      for (const tag of tagSet) {
        vercelRedirects.push({
          source: `${normalizePath(source)}/v${tag}`,
          destination: newDestination,
          permanent: true,
        });
      }
    }
    vercelRedirects.push({
      source: normalizePath(source),
      destination: newDestination,
      permanent: true,
    });
  }
}

writeFileSync(
  `${scriptDir}/../../vercel.json`,
  JSON.stringify({ ...vercelJSON, redirects: vercelRedirects }, null, 2),
);
