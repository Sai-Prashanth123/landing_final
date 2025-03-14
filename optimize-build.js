const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Output directory
const outDir = path.join(__dirname, 'out');

// Function to remove files recursively by pattern
function removeFiles(directory, pattern) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      removeFiles(filePath, pattern);
    } else if (pattern.test(file)) {
      console.log(`Removing: ${filePath}`);
      fs.unlinkSync(filePath);
    }
  }
}

// Function to minify JS files more aggressively
function minifyJsFiles(directory) {
  try {
    // Check if terser is installed
    execSync('npx terser --version', { stdio: 'ignore' });
    
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        minifyJsFiles(filePath);
      } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
        try {
          console.log(`Minifying: ${filePath}`);
          execSync(`npx terser "${filePath}" --compress --mangle --output "${filePath}"`);
        } catch (error) {
          console.error(`Error minifying ${filePath}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.log('Terser not found, skipping additional JS minification');
  }
}

console.log('Starting build optimization...');

// 1. Remove source maps
console.log('Removing source maps...');
removeFiles(outDir, /\.map$/);

// 2. Remove any backup or temporary files
console.log('Removing temporary files...');
removeFiles(outDir, /\.(bak|tmp)$/);

// 3. Try to minify JS files more aggressively
console.log('Minifying JS files...');
minifyJsFiles(outDir);

// 4. Print the final size
try {
  const output = execSync(`du -sh ${outDir}`).toString();
  console.log('Final build size:', output);
} catch (error) {
  console.log('Could not determine final build size');
}

console.log('Build optimization complete!'); 