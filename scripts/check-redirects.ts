import { readFile } from "node:fs/promises";
import { redirects } from "../vercel.json" with { type: "json" };

export async function checkRedirects([...newSitePaths]: string[]) {
  newSitePaths = newSitePaths.map(normalizePath);
  const oldSitePaths = (await readFile("scripts/old-site-routes.txt", "utf8"))
    .split("\n")
    .map(normalizePath);

  // Check Vercel.json and ensure it has an entry for each old site path
  // and that the target exists in newSitePaths
  for (const redirect of redirects) {
    const oldPath = normalizePath(redirect.source);
    const newPath = normalizePath(redirect.destination);

    if (!newSitePaths.includes(newPath)) {
      throw new Error(
        `Target redirect ${newPath} does not exist for old URL ${oldPath}`,
      );
    }

    if (!oldSitePaths.includes(oldPath)) {
      throw new Error(`Missing redirect for ${oldPath}`);
    }
  }
}

function normalizePath(path: string) {
  return path.replace(/\/$/, "");
}
