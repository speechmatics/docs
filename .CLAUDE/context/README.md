# Claude context files

Drop additional Markdown context files in this folder to give Claude Code more
background when working on the docs.

Each file should cover one topic. After adding a file, reference it from the
root `CLAUDE.md` with a one-line "read this when…" pointer so Claude knows when
to consult it. Files are read on demand, keeping the default context lean.

To instead load a file into context on *every* session, `@`-import it from
`CLAUDE.md` (e.g. `@.claude/context/terminology.md`). Reserve this for short,
universally-applicable rules.
