
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '../frontend');
const backendDir = __dirname;
const publicDir = path.join(backendDir, 'public');

console.log('🚀 Starting Deployment Build...');

try {
    // 1. Install Frontend Dependencies
    console.log('📦 Installing frontend dependencies...');
    execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });

    // 2. Build Frontend
    console.log('🛠️  Building frontend...');
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

    // 3. Prepare Public Directory
    if (fs.existsSync(publicDir)) {
        console.log('🧹 Cleaning old public directory...');
        fs.rmSync(publicDir, { recursive: true, force: true });
    }
    fs.mkdirSync(publicDir);

    // 4. Copy Build Files
    console.log('Cp Copying build files to backend...');
    const distDir = path.join(frontendDir, 'dist');

    // Recursive copy function
    function copyRecursiveSync(src, dest) {
        const exists = fs.existsSync(src);
        const stats = exists && fs.statSync(src);
        const isDirectory = exists && stats.isDirectory();

        if (isDirectory) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach((childItemName) => {
                copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }

    copyRecursiveSync(distDir, publicDir);

    console.log('✅ Build & Copy Complete! Ready for deployment.');
    console.log('👉 Run "npm start" to serve the production app.');

} catch (error) {
    console.error('❌ Build Failed:', error.message);
    process.exit(1);
}
