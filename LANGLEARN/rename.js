import fs from 'fs';
import path from 'path';

const searchRegex = /BharatLingo/gi;
const targetDir = './';
const excludeDirs = ['node_modules', '.git', 'dist'];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        processDirectory(fullPath);
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.sql') || file.endsWith('.md')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content.replace(searchRegex, (match) => {
          if (match === 'BharatLingo') return 'LanguageUp';
          if (match === 'bharatlingo') return 'languageup';
          if (match === 'bharatLingo') return 'languageUp';
          if (match === 'BHARATLINGO') return 'LANGUAGEUP';
          return 'LanguageUp';
        });
        
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated: ${fullPath}`);
        }
      }
    }
  }
}

processDirectory(targetDir);
console.log('Rename complete.');
