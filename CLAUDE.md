# Project Instructions

## Auto-commit on git changes

Whenever you make changes that result in tracked git changes, commit them automatically
without waiting to be asked. Follow these rules:

- Use Conventional Commits format: `<type>(<scope>): <description>` where type is one of
  `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `build`, `chore`, `style`.
- Commit at every coherent checkpoint: a fix that typechecks, a finished feature
  increment, a config/dependency change, or before a risky refactor.
- Read the diff before committing (`git diff` / `git status --porcelain`).
- Stage with `git add -A` (respects `.gitignore`).
- One logical change per commit — split unrelated changes into separate commits.
- Never commit a broken state (failing tests or builds).
- Refuse to commit likely secrets: `.env`, `.env.*`, `*.pem`, `*.key`, `id_rsa*`,
  `credentials*`, `secrets*`, `*.p12`, `.npmrc`, `.netrc`, or any API keys/tokens/private
  key blocks.
- Do not force-push, do not amend already-pushed commits, do not use `--no-verify` to
  bypass failing hooks.
- Push only if the user explicitly asked to push.
