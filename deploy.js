// Simple deployment script for Netlify
const { execSync } = require('child_process');

console.log('🚀 Starting deployment process...');

try {
  // Build the Next.js application
  console.log('📦 Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('🌐 Ready to deploy to Netlify!');
  console.log('\nTo deploy manually, run:');
  console.log('npx netlify-cli deploy --prod');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 