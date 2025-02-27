#!/bin/bash

# Print Node.js and npm versions for debugging
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed!" 