#!/bin/bash -e

USER="$(whoami)"
SOCK_PATH="/home/as3495/EULA/text_extraction/web.sock"
[ -e "$SOCK_PATH" ] && rm "$SOCK_PATH"

umask 0

. ~/.nvm/nvm.sh
NODE_ENV=production PORT="$SOCK_PATH" \
    exec node /home/as3495/EULA/text_extraction/index.js