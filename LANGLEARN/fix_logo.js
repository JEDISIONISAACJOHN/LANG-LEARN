const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\edisi\\.gemini\\antigravity-ide\\brain\\705be327-7650-46c7-95b0-4b8375dd0ea0\\langlearn_3d_logo_1788752620933.jpg';
const dest = path.join(__dirname, 'public', 'logo.jpg');

try {
  fs.copyFileSync(source, dest);
  console.log('Successfully copied the 3D logo to the public folder!');
} catch (err) {
  console.error('Error copying the logo:', err);
}
