import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

const imagesToOptimize = [
  '1.png',
  '2.png',
  '3.png',
  'Teacher.png',
  'Rank 2 Holder.png',
  'Group Photo.jpeg',
  'Girls Group.jpeg'
];

async function optimizeImages() {
  for (const file of imagesToOptimize) {
    const inputPath = path.join(publicDir, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file}, does not exist.`);
      continue;
    }

    const parsed = path.parse(file);
    const outputPath = path.join(publicDir, `${parsed.name}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Successfully converted ${file} to ${parsed.name}.webp`);
      
      // Delete the old file
      fs.unlinkSync(inputPath);
      console.log(`Deleted original ${file}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

optimizeImages();
