# Project Guidelines

## Auto-commit

Use the `auto-commit` skill (`.claude/skills/auto-commit/SKILL.md`) for all commit work.
After each coherent unit of work — a verified fix, a finished feature increment, a
dependency or config change, or a completed subtask — commit the changes immediately;
do not wait until the end of the task.

- Stage explicitly (`git add <path>`) or `git add -A`, then commit with a Conventional
  Commits message (`feat:`, `fix:`, `refactor:`, `chore:`, …) in imperative mood, ≤ 72 chars.
- Never commit a broken build or a mid-refactor state.
- Refuse to commit secrets, `.env` files, or large binaries; stop and ask first.
- Never force-push or amend pushed commits.
