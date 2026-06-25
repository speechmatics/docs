# How to prompt Claude Code for docs updates

Open Claude Code in the Docs project folder. Then it's just prompting. Here are the recipes.

---

## Ship a docs change

1. **Paste the brief and say what you want.** A ticket, rough draft, or notes — whatever you have.
   > "Here's the brief for DEL-XXXXX. Implement it in the docs repo." *(paste / attach the brief)*

2. **Review the plan, then approve.** Claude proposes structure and flags any terminology/style issues before writing. Read it, then:
   > "Looks good, go ahead." — or — "Change X, then proceed."
   
   In a hurry on something simple? Skip planning: **"just write it."**

3. **Let it finish the loop.** It writes the pages, builds, spellchecks, and opens a **draft PR**. Check the Vercel preview link it gives you.

4. **Iterate by pointing at what's wrong.**
   > "The Melia section should come before the table." / "Tighten the intro." / "This reads as Realtime — it's still Batch."

5. **You merge.** Claude stops at the draft. Approve and merge on GitHub yourself.

---

## Review a teammate's PR

> "Go through PR #263 and propose comments to improve it, but only if necessary. Decide first whether comments are even needed. Show me before you post anything."

Then:
> "Post 1 and 2 as individual inline comments." — or — "None, it's fine."

The two things that make this work: **"only if necessary"** (stops nitpicking) and **"show me before posting"** (you approve every comment).

---

## Plan a bigger feature

When the ticket isn't enough and context is scattered across Jira/Confluence/GitLab:

> "This Epic introduces [feature]. Create a plan for adding it to the docs, including the API reference if needed. Pull the context from Jira and Confluence."

Claude pulls the sources and writes a plan. If some facts aren't confirmed yet:
> "Some context comes from GitLab tomorrow. Sketch the plan now and flag what's still unknown."

It will plan around the gaps instead of guessing.

---

## Prompting tips

- **State the goal, not the steps.** "Implement this brief and open a draft PR" beats listing git commands — Claude runs them.
- **Approve before irreversible actions.** It asks before pushing or posting; it won't merge.
- **Correct in plain language.** Point at the problem ("wrong model order", "too wordy"); no need to specify line numbers.
- **It enforces the style guide automatically.** You don't need to ask — just flag if something slips.
