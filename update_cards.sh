#!/bin/bash

echo "[INFO] Updating cards 🎴"
echo "[INFO] This may require root access 🔐"

sudo -v

while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

CURRENT_DIR=$(pwd)

INSTALL_DIR="/usr/local/lib/node_modules/termicards"

echo "[INFO] Copying cards.json to the global installation directory 🗂️"

sudo cp -r "$CURRENT_DIR/src/assets/cards.json" "$INSTALL_DIR/src/assets/cards.json"

echo "[INFO] Changing the owner of the installation directory 🧑‍🤝‍🧑"

sudo chown -R $(whoami) "$INSTALL_DIR"

echo "[INFO] Cards updated successfully 🎉"