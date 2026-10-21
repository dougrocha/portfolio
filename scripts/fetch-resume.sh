#!/usr/bin/env bash
# Downloads main.pdf from https://github.com/dougrocha/resume (branch main)
# into public/resume.pdf before `dev` and `build`. The PDF is not committed.
#
# That repository is private. GitHub responds to anonymous requests with 404,
# including the raw file URL, so the browser cannot load it directly.
# RESUME_GITHUB_TOKEN is a fine-grained personal access token scoped to
# dougrocha/resume with Contents: Read-only.
#
#   Local:  put RESUME_GITHUB_TOKEN in .env or .env.local, or log in with
#           `gh auth login` and the script borrows the GitHub CLI's token
#   Vercel: Project → Settings → Environment Variables
#           Name: RESUME_GITHUB_TOKEN
#           Environments: Production, Preview, and Development
#           It must be available to the build, not runtime only.
#
# When main.pdf changes on main, the resume repo should POST the portfolio
# Vercel deploy hook (Actions secret PORTFOLIO_DEPLOY_HOOK) so this script
# runs again. This script does not create either secret. On Vercel, a failed
# download fails the build. Locally, it prints a warning and continues.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
dest="$root/public/resume.pdf"
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

fail() {
  echo "fetch-resume: $1" >&2
  exit 1
}

read_token_file() {
  local file="$1"
  local line value
  [ -f "$file" ] || return 0
  line="$(grep -E '^[[:space:]]*RESUME_GITHUB_TOKEN=' "$file" | tail -n 1 || true)"
  [ -n "$line" ] || return 0
  value="${line#*=}"
  value="${value%$'\r'}"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  if [ "${value#\"}" != "$value" ] && [ "${value%\"}" != "$value" ]; then
    value="${value#\"}"
    value="${value%\"}"
  elif [ "${value#\'}" != "$value" ] && [ "${value%\'}" != "$value" ]; then
    value="${value#\'}"
    value="${value%\'}"
  fi
  RESUME_GITHUB_TOKEN="$value"
}

if [ -z "${RESUME_GITHUB_TOKEN:-}" ]; then
  read_token_file "$root/.env"
fi
if [ -z "${RESUME_GITHUB_TOKEN:-}" ]; then
  read_token_file "$root/.env.local"
fi
# Locally, a logged-in GitHub CLI can read the private repo without a token in .env.
if [ -z "${RESUME_GITHUB_TOKEN:-}" ] && [ -z "${VERCEL:-}" ] && command -v gh >/dev/null 2>&1; then
  RESUME_GITHUB_TOKEN="$(gh auth token 2>/dev/null || true)"
fi

worker="$root/node_modules/pdfjs-dist/build/pdf.worker.min.mjs"
[ -f "$worker" ] || fail "missing $worker. Run bun install."
mkdir -p "$root/public"
cp "$worker" "$root/public/pdf.worker.min.mjs"

download_public() {
  curl -sS -L -o "$tmp" -w '%{http_code}' \
    "https://raw.githubusercontent.com/dougrocha/resume/main/main.pdf"
}

download_private() {
  curl -sS -L -o "$tmp" -w '%{http_code}' \
    -H "Authorization: Bearer ${RESUME_GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github.raw" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/dougrocha/resume/contents/main.pdf?ref=main"
}

is_pdf() {
  [ -s "$tmp" ] && head -c 5 "$tmp" | grep -q '%PDF-'
}

status="000"
if [ -n "${RESUME_GITHUB_TOKEN:-}" ]; then
  status="$(download_private)"
else
  status="$(download_public)"
fi

if [ "$status" = "200" ] && is_pdf; then
  mv "$tmp" "$dest"
  trap - EXIT
  echo "fetch-resume: wrote public/resume.pdf"
  exit 0
fi

rm -f "$tmp"
trap - EXIT

message="could not download main.pdf (HTTP ${status})."
if [ -z "${RESUME_GITHUB_TOKEN:-}" ]; then
  message="${message} dougrocha/resume is private. Set RESUME_GITHUB_TOKEN (Contents: Read-only on that repo) in .env locally and as a build-time Vercel environment variable."
elif [ "$status" = "401" ]; then
  message="${message} RESUME_GITHUB_TOKEN was rejected."
elif [ "$status" = "403" ] || [ "$status" = "404" ]; then
  message="${message} The token could not read dougrocha/resume main.pdf. It needs Contents: Read-only on that repository."
else
  message="${message} The download was not a PDF."
fi

if [ -n "${VERCEL:-}" ]; then
  fail "$message"
fi

echo "fetch-resume: warning: $message" >&2
echo "fetch-resume: continuing without public/resume.pdf." >&2
exit 0
