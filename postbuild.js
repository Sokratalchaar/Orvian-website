import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const privacyPolicyDir = path.join(distDir, 'privacy-policy');

// Create the privacy-policy directory if it doesn't exist
if (!fs.existsSync(privacyPolicyDir)) {
  fs.mkdirSync(privacyPolicyDir, { recursive: true });
}

// Copy dist/index.html to dist/privacy-policy/index.html
const sourceFile = path.join(distDir, 'index.html');
const destFile = path.join(privacyPolicyDir, 'index.html');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log('Successfully copied index.html to privacy-policy/index.html for SPA routing fallback!');
} else {
  console.error('Source index.html not found!');
}
