#!/bin/bash

set -e

echo "Starting Entrypoint Script..."

echo "Installing Node.js packages..."
npm install

# (Optional) Install Python packages (skip if on Vercel)

# (No npm run build here!!!)

echo "Starting server..."
npm run start
