#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting build process...');

try {
  // Run vite build directly
  const vitePath = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
  execSync(`node "${vitePath}" build`, { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
