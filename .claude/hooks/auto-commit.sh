#!/usr/bin/env bash
# Auto-commit hook: commits git-tracked changes with a Conventional Commits message.
# Triggered on Claude Code's "Stop" event via .claude/settings.json.
set -euo pipefail

# Read the JSON input from stdin (Claude Code hook contract).
input="$(cat)"

# Only act when the assistant's run is stopping after actual work.
# (SessionStart / SubagentStop etc. still receive this event name "Stop".)
is_stop="$(printf '%s' "$input" | python -c "import sys,json; d=json.load(sys.stdin); print('true' if d.get('hook_event_name')=='Stop' or d.get('stop_hook_active') is not False else 'false')" 2>/dev/null || echo 'true')"

if [ "$is_stop" != "true" ]; then
  exit 0
fi

# Work from the repo root.
cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

# Skip if not a git repo or nothing to commit.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi

if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

# Refuse to commit likely secrets.
if git diff --cached --name-only | grep -Eiq '(\.env$|\.env\.|\.pem$|\.key$|id_rsa|credentials|secrets|\.p12$|\.npmrc$|\.netrc$)'; then
  echo "auto-commit: refusing to commit — possible secrets detected." >&2
  exit 1
fi

# Derive a scope from the first changed path, stripping extension and leading slash.
first_path="$(git status --porcelain | awk '{print $2}' | sed 's/^"//;s/"$//' | head -n1)"
scope=""
if [ -n "$first_path" ] && [ "$first_path" != "/" ]; then
  dir="$(dirname "$first_path")"
  if [ "$dir" != "." ]; then
    scope="(${dir#/})"
  fi
fi

# Infer a minimal Conventional Commits type.
type="chore"
if git status --porcelain | grep -qE '(package\.json|pnpm-lock\.yaml|yarn\.lock|package-lock\.json|tsconfig)'; then
  type="build"
fi

message="${type}${scope}: auto-commit progress checkpoint"

git add -A
git commit -m "$message" >/dev/null 2>&1 || exit 0

sha="$(git rev-parse --short HEAD)"
count="$(git show --stat --oneline HEAD | grep -c '|' )"
echo "auto-commit: ${message} (${sha}, ${count} files changed)" >&2

exit 0
