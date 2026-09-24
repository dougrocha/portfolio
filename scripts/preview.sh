#!/usr/bin/env bash
# Deploys a Vercel preview of the current folder and points the stable preview
# names at it. Never deploys to production.
#
# Usage: bun run preview
#        PREVIEW_ALIASES="a.example.com b.vercel.app" bun run preview
set -euo pipefail

aliases="${PREVIEW_ALIASES:-next.dougrocha.com dougrocha-next.vercel.app}"
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if [ -n "$(git status --porcelain)" ]; then
  echo "preview: note, deploying uncommitted changes too." >&2
fi

output="$(bunx vercel deploy --yes 2>&1)" || {
  echo "$output" >&2
  exit 1
}
url="$(grep -oE 'https://[a-z0-9-]+\.vercel\.app' <<< "$output" | head -1)"
[ -n "$url" ] || {
  echo "$output" >&2
  echo "preview: could not find the deployment URL." >&2
  exit 1
}

for alias in $aliases; do
  bunx vercel alias set "$url" "$alias" > /dev/null
done

echo "Preview ready: $url"
for alias in $aliases; do
  echo "  https://$alias"
done
