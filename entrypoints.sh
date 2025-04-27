#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting Entrypoint Script..."

# Install Node.js dependencies
echo "Installing Node.js packages..."
npm install

# Install Python dependencies
if [ -f "requirements.txt" ]; then
  echo "Installing Python packages..."
  pip install -r requirements.txt
fi

# (Optional) Build the project (if you have a build step)
echo "Building project..."
npm run build

# (Optional) Run migrations
# echo "Running migrations..."
# npm run migrate

# Start the server
echo "Starting server..."
npm run start
