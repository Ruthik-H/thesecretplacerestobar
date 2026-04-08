import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import heicConvert from 'heic-convert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folders = [
  path.join(__dirname, 'public', 'assets', 'images', 'gallery'),
  path.join(__dirname, 'public', 'assets', 'images', 'food')
];

async function convertHeicToJpg(inputBuffer) {
  return await heicConvert({
    buffer: inputBuffer, 
    format: 'JPEG', 
    quality: 0.8
  });
}

async function processFolders() {
  for (const folder of folders) {
    if (!fs.existsSync(folder)) continue;
    
    console.log(`Checking folder: ${folder}`);
    const files = fs.readdirSync(folder);
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.heic')) {
        const filePath = path.join(folder, file);
        const outName = file.replace(/\.[hH][eE][iI][cC]$/, '.jpg');
        const outPath = path.join(folder, outName);
        
        console.log(`Converting ${file} -> ${outName}...`);
        try {
          const inputBuffer = fs.readFileSync(filePath);
          const outputBuffer = await convertHeicToJpg(inputBuffer);
          fs.writeFileSync(outPath, outputBuffer);
          console.log(`Success: ${outPath}`);
        } catch (err) {
          console.error(`Failed to convert ${file}:`, err);
        }
      }
    }
  }
}

processFolders().then(() => console.log('Done converting.')).catch(console.error);
