/**
 * Image Optimizer - Compresses hero images for web
 * Uses sharp to resize and compress images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'general');

// Target sizes and quality
const CONFIG = {
  // Main hero images - optimized for web
  hero: {
    width: 1920,
    height: 1080,
    quality: 80
  },
  // Mobile version
  mobile: {
    width: 768,
    height: 432,
    quality: 75
  }
};

async function optimizeImage(inputPath, outputPath, config) {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  await sharp(inputPath)
    .resize(config.width, config.height, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: config.quality })
    .toFile(outputPath);

  const newStats = fs.statSync(outputPath);
  const newSize = newStats.size;
  const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

  console.log(`  ${path.basename(outputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
}

async function main() {
  console.log('='.repeat(60));
  console.log('Image Optimizer');
  console.log('='.repeat(60));

  const heroImages = ['hero-banner.webp', 'hero-jobsite.webp', 'hero-event.webp'];

  for (const imageName of heroImages) {
    const inputPath = path.join(IMAGES_DIR, imageName);

    if (!fs.existsSync(inputPath)) {
      console.log(`\nSkipping ${imageName} (not found)`);
      continue;
    }

    console.log(`\nOptimizing: ${imageName}`);

    // Create optimized version (replace original)
    const tempPath = path.join(IMAGES_DIR, `temp-${imageName}`);
    await optimizeImage(inputPath, tempPath, CONFIG.hero);

    // Replace original with optimized
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    // Create mobile version
    const mobileName = imageName.replace('.webp', '-mobile.webp');
    const mobilePath = path.join(IMAGES_DIR, mobileName);
    await optimizeImage(inputPath, mobilePath, CONFIG.mobile);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Optimization complete!');
  console.log('='.repeat(60));

  // Show final sizes
  console.log('\nFinal image sizes:');
  for (const imageName of heroImages) {
    const filePath = path.join(IMAGES_DIR, imageName);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`  ${imageName}: ${(stats.size / 1024).toFixed(0)}KB`);
    }

    const mobileName = imageName.replace('.webp', '-mobile.webp');
    const mobilePath = path.join(IMAGES_DIR, mobileName);
    if (fs.existsSync(mobilePath)) {
      const stats = fs.statSync(mobilePath);
      console.log(`  ${mobileName}: ${(stats.size / 1024).toFixed(0)}KB`);
    }
  }
}

main().catch(console.error);
