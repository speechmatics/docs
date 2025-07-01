# Redirects

The scripts and JSON files in this folder are here to prevent broken links, initially set up when migrating from the old Docusaurus site.

## Data files

- `old-redirects.json` Maps live URLs from the old site at time of migration to this site
- `super-old-redirects.json` Handles the redirects that the previous site was itself handling
- `tagged-redirects.ts` Is an extension of `super-old-redirects.json` handling redirects from tagged version pages (i.e. super old release notes)
- `old-site-routes.json` Full list of live routes on the old site at time of migration
- `super-old-site-routes` Full list of old links the old site was preserving (since the structure was changed many times)

Note: In the future the structure of this site may change too, in which case we'll need to add another set of redirects.

## Scripts

- `sync-redirects.ts` Reads the above data files and generates a `redirects` entry in `vercel.json` so that every redirected route has a valid up-to-date destination.
  Note: it flattens redirects, so if `/introduction` -> `/`, and `/en/welcome` -> `/introduction`, then `/en/welcome` -> `/`.
- `check-redirects.ts` is called in the `postBuild` step in Docusaurus, ensuring every redirect destination does get built as a valid page.

