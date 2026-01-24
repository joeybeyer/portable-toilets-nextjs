const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Configure Fal AI
fal.config({
  credentials: "2130b6a1-0ff8-410b-8f49-1fb25681074e:471acaa93651b1d066317f1167e30a78"
});

// Image output directory
const OUTPUT_DIR = path.join(__dirname, "..", "public", "images", "blog");

// Missing blog images to generate
const missingImages = [
  {
    filename: "winter-event-portable-toilets",
    prompt: "Portable restroom trailer at winter outdoor event with snow on the ground, cold weather outdoor celebration, winterized facilities, cozy event atmosphere",
    alt: "Portable restroom trailer at winter outdoor event with snow visible"
  },
  {
    filename: "summer-event-portable-toilets",
    prompt: "Portable toilets at sunny summer outdoor event with shade covering overhead, hot weather event setup, comfortable outdoor facilities, blue sky",
    alt: "Portable toilets at sunny summer outdoor event with shade covering"
  },
  {
    filename: "holiday-party-portable-toilets",
    prompt: "Festive portable restroom trailer setup for holiday event, decorated outdoor celebration, seasonal party atmosphere, Christmas or New Year theme",
    alt: "Festive portable restroom trailer setup for holiday event"
  }
];

// Download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(filepath);
      });
    }).on("error", (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Generate a single image
async function generateImage(imageConfig) {
  // Create directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, `${imageConfig.filename}.webp`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${imageConfig.filename} - already exists`);
    return { ...imageConfig, skipped: true };
  }

  console.log(`Generating: ${imageConfig.filename}...`);

  try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: imageConfig.prompt,
        image_size: "landscape_16_9",
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true
      },
      logs: false
    });

    if (result.data && result.data.images && result.data.images.length > 0) {
      const imageUrl = result.data.images[0].url;
      await downloadImage(imageUrl, outputPath);
      console.log(`  Saved: ${outputPath}`);
      return { ...imageConfig, success: true };
    } else {
      console.error(`  No image generated for ${imageConfig.filename}`);
      return { ...imageConfig, error: "No image in response" };
    }
  } catch (error) {
    console.error(`  Error generating ${imageConfig.filename}:`, error.message);
    return { ...imageConfig, error: error.message };
  }
}

// Main function
async function main() {
  console.log("=== Generating Missing Blog Images ===\n");

  for (const img of missingImages) {
    await generateImage(img);
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log("\n=== Done ===");
}

main().catch(console.error);
