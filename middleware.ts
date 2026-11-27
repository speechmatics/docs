export default function middleware(request: Request): Response | undefined {
  const accept = request.headers.get("accept") ?? "";

  if (!accept.includes("text/markdown")) return;

  const url = new URL(request.url);
  const { pathname } = url;

  // Skip paths that already have a file extension
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return;

  // Root maps to /docs/index.md; everything else maps to /docs{pathname}.md.
  // Section index pages (e.g. /speech-to-text → /docs/speech-to-text/index.md)
  // are handled by the create-md-aliases build script, which copies each
  // index.md to a flat sibling file so /docs/speech-to-text.md also exists.
  url.pathname = pathname === "/" ? "/llms.txt" : `${pathname}.md`;

  return Response.redirect(url.toString(), 302);
}

export const config = {
  // /retrieve is excluded so agent search requests skip the middleware: it's
  // rewritten to the Kapa Worker in vercel.json and must not be redirected to
  // /retrieve.md.
  matcher: ["/((?!assets/|img/|js/|search/|retrieve$).*)"],
};
