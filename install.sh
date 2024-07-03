#!/bin/bash

echo "[INFO] Installing Termicards 🎴"
echo "[INFO] This may require root access 🔐"

sudo -v

while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

echo "[INFO] Checking for Node.js 📦"

if ! command_exists node; then
  echo "[ERROR] Node.js not installed. Please install Node.js adn try again."
  exit 1
fi

REQUIRED_NODE_VERSION="20.0.0"
INSTALLED_NODE_VERSION=$(node -v | sed 's/v//')

if [ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$INSTALLED_NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE_VERSION" ]; then
  echo "[ERROR] The required Node version is $REQUIRED_NODE_VERSION. Please, update Node.js and try again."
  exit 1
fi

CURRENT_DIR=$(pwd)

INSTALL_DIR="/usr/local/lib/node_modules/termicards"

if [ -d "$INSTALL_DIR" ]; then
  echo "[INFO] Removing old files 🗑️"

  sudo rm -rf "$INSTALL_DIR"
fi

echo "[INFO] Creating the installation directory 📂"

sudo mkdir -p "$INSTALL_DIR"

echo "[INFO] Copying files to the global installation directory 🗂️"
echo "[INFO] Direcotry: $INSTALL_DIR"

sudo cp -Rv "$CURRENT_DIR/"* "$INSTALL_DIR/"

echo "[INFO] Changing the owner of the installation directory 🧑‍🤝‍🧑"

sudo chown -R $(whoami) "$INSTALL_DIR"

echo "[INFO] Changing directory to the installation directory 📂"

cd "$INSTALL_DIR"

echo "[INFO] Making the app executable 🚀"

sudo chmod +x ./src/app.js

echo "[INFO] Installing dependencies 📦"

sudo npm install

echo "[INFO] Creating a symbolic link to the app 🔗"

echo "[INFO] Current directory: $(pwd)"

ls -al

# sudo npm link

if [ -L "/usr/local/bin/termicards" ]; then
  echo "[INFO] Removing old symbolic link 🗑️"

  sudo rm -f "/usr/local/bin/termicards"
fi

sudo ln -s "$INSTALL_DIR/src/app.js" "/usr/local/bin/termicards"

echo "[INFO] Installation complete 🏁"
