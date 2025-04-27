#!/bin/bash

set -e

echo "Starting Entrypoint Script..."

echo "Installing Node.js packages..."
npm install

echo "Building project..."
npm run build

echo "Starting server..."
npm run start
