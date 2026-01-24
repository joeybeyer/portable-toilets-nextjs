/**
 * Hero Image Generator using KIE.ai Nano Banana Pro
 *
 * This script generates authentic-looking hero images for the portable toilet website.
 *
 * Usage:
 *   1. Set your API key: set KIE_API_KEY=your_api_key_here
 *   2. Run: node scripts/generate-hero-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const API_KEY = '3cbb7dc76e54f33c65874f647813acc5';
const API_BASE = 'https://api.kie.ai';
const MODEL = 'nano-banana-pro';

// Image prompts - designed for authentic, trust-building visuals
// Brand: Portable Toilets Champ (green and white logo with shield)
const PROMPTS = {
  // Main hero image - WINNING IMAGE per CRO feedback
  // Blue portable toilet on flatbed truck being delivered - action oriented, product visible
  'hero-banner': {
    prompt: 'A photorealistic, wide-angle shot of a bright blue portable toilet unit secured on the back of a flatbed delivery truck. Action: A construction worker wearing a bright yellow high-visibility safety vest and hard hat is standing next to the truck bed, securing a yellow ratchet strap. Composition: The truck, the toilet, and the worker are positioned on the right side of the frame. The left side is open negative space (blurred background of a sunny construction site) to allow for website text overlay. Lighting: Bright, natural daylight. High contrast. The blue of the toilet and yellow of the vest should pop against a neutral background. Technical: 8k resolution, highly detailed, realistic texture on the plastic toilet, 16:9 aspect ratio. No text, no words, no letters, no watermarks.',
    filename: 'hero-banner.webp'
  }
};

// City-specific prompts for location pages
const CITY_PROMPTS = {
  'los-angeles': 'Realistic iPhone photo of portable toilet delivery truck driving on street with Los Angeles downtown skyline and palm trees visible in background, morning golden hour light, candid street photography style, 16:9 landscape',
  'new-york': 'Authentic smartphone photo of blue portable toilets at construction site with New York City buildings visible in background, urban setting, natural daylight, documentary style not polished',
  'chicago': 'Real photograph of portable toilet delivery in Chicago with city skyline visible, overcast day, authentic job site feel, iPhone photo quality',
  'houston': 'Candid photo of portable toilets at Texas construction site, flat landscape, bright sunny day, realistic not CGI, worker visible',
  'phoenix': 'Realistic photo of portable toilet units in Arizona desert construction site, bright sun, mountains in distance, authentic smartphone quality'
};

/**
 * Create a task to generate an image
 */
async function createTask(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: MODEL,
      input: {
        prompt: prompt
      }
    });

    const options = {
      hostname: 'api.kie.ai',
      port: 443,
      path: '/api/v1/jobs/createTask',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.code === 200) {
            resolve(result.data.taskId);
          } else {
            reject(new Error(`API Error: ${result.message || 'Unknown error'}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Poll for task completion and get result
 */
async function waitForTask(taskId, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await queryTask(taskId);

    if (result.state === 'success') {
      // Parse the resultJson to get image URLs
      const resultData = JSON.parse(result.resultJson);
      return resultData.resultUrls;
    } else if (result.state === 'failed') {
      throw new Error(`Task failed: ${result.failMsg}`);
    }

    // Wait 2 seconds before next poll
    console.log(`  Waiting... (attempt ${i + 1}/${maxAttempts})`);
    await new Promise(r => setTimeout(r, 2000));
  }

  throw new Error('Task timed out');
}

/**
 * Query task status
 */
async function queryTask(taskId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.kie.ai',
      port: 443,
      path: `/api/v1/jobs/recordInfo?taskId=${taskId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.code === 200) {
            resolve(result.data);
          } else {
            reject(new Error(`Query Error: ${result.message}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Download image from URL and save to file
 */
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

/**
 * Generate a single hero image
 */
async function generateImage(name, config) {
  console.log(`\nGenerating: ${name}`);
  console.log(`  Prompt: ${config.prompt.substring(0, 80)}...`);

  try {
    // Create the task
    const taskId = await createTask(config.prompt);
    console.log(`  Task created: ${taskId}`);

    // Wait for completion
    const imageUrls = await waitForTask(taskId);
    console.log(`  Generation complete!`);

    // Download the first image
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'general');

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, config.filename);

    if (imageUrls && imageUrls.length > 0) {
      await downloadImage(imageUrls[0], outputPath);
      console.log(`  Saved to: ${outputPath}`);
      return outputPath;
    } else {
      throw new Error('No image URLs returned');
    }
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Hero Image Generator - KIE.ai Nano Banana Pro');
  console.log('='.repeat(60));

  // Check for API key
  if (!API_KEY) {
    console.error('\nError: KIE_API_KEY environment variable not set');
    console.log('\nUsage:');
    console.log('  Windows: set KIE_API_KEY=your_api_key_here');
    console.log('  Mac/Linux: export KIE_API_KEY=your_api_key_here');
    console.log('\nThen run: node scripts/generate-hero-images.js');
    process.exit(1);
  }

  console.log(`\nAPI Key: ${API_KEY.substring(0, 8)}...`);
  console.log(`Model: ${MODEL}`);
  console.log(`\nGenerating ${Object.keys(PROMPTS).length} images...\n`);

  const results = [];

  // Generate each image
  for (const [name, config] of Object.entries(PROMPTS)) {
    const result = await generateImage(name, config);
    results.push({ name, success: !!result, path: result });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Generation Summary');
  console.log('='.repeat(60));

  for (const r of results) {
    const status = r.success ? '✓' : '✗';
    console.log(`  ${status} ${r.name}: ${r.success ? r.path : 'FAILED'}`);
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`\nCompleted: ${successCount}/${results.length} images generated`);

  if (successCount > 0) {
    console.log('\nNext steps:');
    console.log('  1. Review the generated images in public/images/general/');
    console.log('  2. Run: npm run build');
    console.log('  3. Deploy the updated site');
  }
}

// Run
main().catch(console.error);
