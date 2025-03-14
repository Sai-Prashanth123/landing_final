/**
 * Debug script for testing the Next.js build and export process
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting test build process...');

// Display Node and npm versions
try {
  console.log('Node version:', execSync('node --version').toString().trim());
  console.log('npm version:', execSync('npm --version').toString().trim());
} catch (error) {
  console.error('Error checking versions:', error.message);
}

// Check for required files and directories
console.log('\nChecking for required files:');
const requiredFiles = [
  'next.config.js', 
  'package.json', 
  'tsconfig.json'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.error(`✗ ${file} is missing!`);
  }
});

// Clean any existing build directories
console.log('\nCleaning existing build directories...');
try {
  if (fs.existsSync('.next')) {
    console.log('Removing .next directory');
    execSync('rm -rf .next');
  }
  
  if (fs.existsSync('out')) {
    console.log('Removing out directory');
    execSync('rm -rf out');
  }
} catch (error) {
  console.error('Error cleaning directories:', error.message);
}

// Run the build step
console.log('\nRunning Next.js build...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('✓ Build completed successfully');
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}

// Run the export step
console.log('\nRunning Next.js export...');
try {
  execSync('next export', { stdio: 'inherit' });
  console.log('✓ Export completed successfully');
} catch (error) {
  console.error('✗ Export failed:', error.message);
  process.exit(1);
}

// Check if the output directory exists and list its contents
console.log('\nChecking export output:');
if (fs.existsSync('out')) {
  console.log('Output directory exists!');
  console.log('Contents:');
  const files = fs.readdirSync('out');
  files.forEach(file => console.log(`- ${file}`));
  
  // Check the size of the output directory
  try {
    const size = execSync('du -sh out').toString().trim();
    console.log(`\nTotal size: ${size}`);
  } catch (error) {
    console.log('Could not determine directory size');
  }
} else {
  console.error('Output directory does not exist!');
  process.exit(1);
}

console.log('\nTest build process completed successfully!'); 