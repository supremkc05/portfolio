const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
}

// Copy index.html to public directory
if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', path.join('public', 'index.html'));
    console.log('Copied index.html to public/');
}

// Copy assets directory
if (fs.existsSync('assets')) {
    const copyDir = (src, dest) => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    };
    
    copyDir('assets', 'public/assets');
    console.log('Copied assets directory to public/');
}

console.log('Build completed successfully!');
