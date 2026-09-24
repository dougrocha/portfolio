#!/usr/bin/env bash
# Builds Scuttle DB for the browser and copies the output into the site.
# Usage: bun run build:scuttle            (uses ../scuttle-db)
#        SCUTTLE_DB_DIR=../other bun run build:scuttle
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
scuttle="$(cd "$root/${SCUTTLE_DB_DIR:-../scuttle-db}" && pwd)"

wasm-pack build "$scuttle/scuttle-wasm" --target web --release

pkg="$scuttle/scuttle-wasm/pkg"
mkdir -p "$root/lib/scuttle"
cp "$pkg/scuttle_wasm.js" "$pkg/scuttle_wasm.d.ts" "$pkg/scuttle_wasm_bg.wasm" "$root/lib/scuttle/"

commit="$(git -C "$scuttle" rev-parse --short HEAD)"
bytes="$(wc -c < "$root/lib/scuttle/scuttle_wasm_bg.wasm" | tr -d ' ')"
printf '{ "commit": "%s", "bytes": %s }\n' "$commit" "$bytes" > "$root/lib/scuttle/build.json"

echo "Scuttle DB $commit copied into the site."
