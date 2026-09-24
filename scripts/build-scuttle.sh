#!/usr/bin/env bash
# Builds Scuttle DB for the browser and copies the output into the site.
# Only builds from a clean `main` that matches origin, so the demo always runs
# code that is published on GitHub.
#
# Usage: bun run build:scuttle            (uses ../scuttle-db)
#        SCUTTLE_DB_DIR=../other bun run build:scuttle
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
scuttle="$(cd "$root/${SCUTTLE_DB_DIR:-../scuttle-db}" && pwd)"

fail() {
  echo "build:scuttle: $1" >&2
  exit 1
}

branch="$(git -C "$scuttle" branch --show-current)"
[ "$branch" = "main" ] || fail "$scuttle is on '$branch'; switch to main first."
[ -z "$(git -C "$scuttle" status --porcelain)" ] || fail "$scuttle has uncommitted changes."
git -C "$scuttle" fetch --quiet origin main
[ "$(git -C "$scuttle" rev-parse HEAD)" = "$(git -C "$scuttle" rev-parse origin/main)" ] \
  || fail "$scuttle main does not match origin/main; push or pull first."

wasm-pack build "$scuttle/scuttle-wasm" --target web --release

pkg="$scuttle/scuttle-wasm/pkg"
mkdir -p "$root/lib/scuttle"
cp "$pkg/scuttle_wasm.js" "$pkg/scuttle_wasm.d.ts" "$pkg/scuttle_wasm_bg.wasm" "$root/lib/scuttle/"

commit="$(git -C "$scuttle" rev-parse --short HEAD)"
bytes="$(wc -c < "$root/lib/scuttle/scuttle_wasm_bg.wasm" | tr -d ' ')"
printf '{ "branch": "main", "commit": "%s", "bytes": %s }\n' "$commit" "$bytes" \
  > "$root/lib/scuttle/build.json"

echo "Scuttle DB main ($commit) copied into the site."
