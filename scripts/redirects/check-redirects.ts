import { redirects } from "../../vercel.json" with { type: "json" };
import oldSiteRoutes from "./old-site-routes.json" with { type: "json" };
import superOldSiteRoutes from "./super-old-site-routes.json" with {
  type: "json",
};

export function checkRedirects([...newSitePaths]: string[]) {
  newSitePaths = newSitePaths.map(normalizePath);

  const vercelRedirects = Object.fromEntries(
    redirects.map((redirect) => [
      normalizePath(redirect.source),
      normalizePath(redirect.destination),
    ]),
  );

  // Check Vercel.json and ensure it has an entry for each old site path
  // and that the target exists in newSitePaths
  for (const oldRoute of oldSiteRoutes.map(normalizePath)) {
    const dest = vercelRedirects[oldRoute] ?? oldRoute;

    if (!newSitePaths.includes(dest)) {
      if (dest.startsWith("https://")) {
        continue;
      }

      throw new Error(
        `Target redirect ${vercelRedirects[oldRoute]} does not exist for old URL ${oldRoute}`,
      );
    }
  }

  // Check the same as above for the super old routes
  for (const superOldRoute of superOldSiteRoutes.map(normalizePath)) {
    if (!vercelRedirects[superOldRoute]) {
      throw new Error(`Missing redirect for ${superOldRoute}`);
    }

    if (vercelRedirects[superOldRoute].startsWith("https://")) {
      continue;
    }

    if (!newSitePaths.includes(vercelRedirects[superOldRoute])) {
      throw new Error(
        `Target redirect ${vercelRedirects[superOldRoute]} does not exist for old URL ${superOldRoute}`,
      );
    }
  }
}

export function normalizePath(path: string) {
  if (path === "/") return path;
  return path.replace(/\/$/, "").replace(/#.*$/, "");
}
