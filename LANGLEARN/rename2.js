import fs from 'fs';
import path from 'path';

const searchRegex = /LanguageUp/gi;
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
      if (
        fullPath.endsWith('.js') || 
        fullPath.endsWith('.jsx') || 
        fullPath.endsWith('.html') || 
        fullPath.endsWith('.json') ||
        fullPath.endsWith('.md')
      ) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (searchRegex.test(content)) {
          const newContent = content.replace(searchRegex, 'LangLearn');
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated: ${fullPath}`);
        }
      }
    }
  }
}

processDirectory(targetDir);
console.log('Renaming to LangLearn complete!');
