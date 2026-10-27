#!/bin/zsh
set -eu
cd "${0:A:h}"
if [[ -x "$PWD/.local/node/bin/node" ]]; then
  export PATH="$PWD/.local/node/bin:/opt/homebrew/bin:/usr/bin:/bin"
fi
if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  PUPPETEER_SKIP_DOWNLOAD=1 npm ci
fi
# Do not automatically reuse the desktop application's sign-in for voice.
export CODEX_AUTH_JSON="$PWD/.local/no-voice-auth.json"
export HOST=127.0.0.1
export PORT=4173
printf "\nGod's Eye View: http://127.0.0.1:4173\nKeep this window open; press Control-C to stop.\n\n"
open http://127.0.0.1:4173
exec npm run dev -- --strictPort
