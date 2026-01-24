const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Configure Fal AI
fal.config({
  credentials: "2130b6a1-0ff8-410b-8f49-1fb25681074e:471acaa93651b1d066317f1167e30a78"
});

// Image output directory
const OUTPUT_DIR = path.join(__dirname, "..", "public", "images");

// Service images to generate with prompts and optimized alt tags
const serviceImages = [
  {
    filename: "standard-portable-toilet",
    prompt: "Professional blue portable toilet unit on a construction job site, clean and well-maintained, sunny day, commercial photography style, realistic",
    alt: "Clean standard portable toilet rental unit on construction job site - reliable sanitation solution"
  },
  {
    filename: "deluxe-portable-toilet",
    prompt: "Upscale white portable toilet unit at an outdoor wedding venue, elegant setting with string lights, premium portable restroom, commercial photography",
    alt: "Deluxe portable toilet rental at elegant outdoor wedding venue - upgraded restroom experience"
  },
  {
    filename: "handicap-accessible-toilet",
    prompt: "Large ADA accessible portable toilet with wheelchair ramp at outdoor event, spacious accessible restroom unit, bright daylight, professional photo",
    alt: "ADA compliant handicap accessible portable toilet with wheelchair ramp - inclusive restroom solution"
  },
  {
    filename: "luxury-restroom-trailer",
    prompt: "Luxury restroom trailer exterior at upscale outdoor event, white elegant portable bathroom trailer, modern design, professional commercial photography",
    alt: "Luxury portable restroom trailer for weddings and VIP events - premium mobile bathroom rental"
  },
  {
    filename: "portable-restroom-trailer",
    prompt: "Multi-stall portable restroom trailer at large outdoor festival, professional mobile bathroom facility, daytime outdoor event setting",
    alt: "Multi-stall portable restroom trailer for large events and festivals - high capacity mobile restrooms"
  },
  {
    filename: "vip-portable-toilet",
    prompt: "Premium VIP portable toilet unit at corporate outdoor event, upscale single-unit restroom, clean modern design, professional photography",
    alt: "VIP portable toilet rental with premium features - upscale restroom for corporate events"
  },
  {
    filename: "event-portable-toilet",
    prompt: "Row of portable toilets at outdoor music festival with crowds in background, professional event restroom setup, bright sunny day",
    alt: "Event portable toilet rental setup at outdoor festival - professional event sanitation services"
  },
  {
    filename: "construction-site-toilet",
    prompt: "Durable portable toilet on active construction site with workers and equipment in background, industrial setting, realistic commercial photo",
    alt: "Construction site portable toilet rental - OSHA compliant sanitation for job sites"
  },
  {
    filename: "emergency-portable-toilet",
    prompt: "Portable toilet being delivered by truck, urgent delivery scene, professional service vehicle, emergency sanitation response",
    alt: "Emergency portable toilet rental with same-day delivery - fast response sanitation service"
  },
  {
    filename: "longterm-portable-toilet",
    prompt: "Portable toilet on remote work site, long-term rental setup, well-maintained unit in rural or industrial setting, professional photo",
    alt: "Long-term portable toilet rental for extended projects - cost-effective monthly sanitation"
  },
  {
    filename: "shortterm-portable-toilet",
    prompt: "Portable toilet at backyard party event, weekend rental setup, residential outdoor celebration, friendly atmosphere",
    alt: "Short-term portable toilet rental for parties and weekend events - flexible rental periods"
  },
  {
    filename: "family-size-toilet",
    prompt: "Spacious family-size portable toilet, larger unit with extra room inside, family-friendly design, clean modern portable restroom",
    alt: "Family size portable toilet with extra space - comfortable restroom for families with children"
  },
  {
    filename: "portable-sink-station",
    prompt: "Portable hand washing sink station next to portable toilets, two-station hand wash unit, outdoor event hygiene, professional setup",
    alt: "Portable sink station rental for hand washing - essential hygiene solution for events"
  },
  {
    filename: "hand-sanitizer-station",
    prompt: "Freestanding hand sanitizer dispenser station at outdoor event entrance, touchless sanitizer stand, professional event hygiene",
    alt: "Portable hand sanitizer station rental - touchless hygiene for events and workplaces"
  },
  {
    filename: "portable-urinal-station",
    prompt: "Multi-position portable urinal station at large outdoor event, high-capacity men's restroom solution, festival setting",
    alt: "Portable urinal station for high-traffic events - efficient restroom solution for large crowds"
  },
  {
    filename: "delivery-service",
    prompt: "Portable toilet delivery truck unloading units at event site, professional delivery crew, service vehicle with portable restrooms",
    alt: "Portable toilet delivery service - professional setup and placement at your location"
  },
  {
    filename: "pickup-service",
    prompt: "Service truck loading portable toilet for pickup after event, professional removal service, clean efficient operation",
    alt: "Portable toilet pickup service - hassle-free removal after your event or project"
  },
  {
    filename: "placement-service",
    prompt: "Worker positioning portable toilet at optimal location, professional placement service, strategic restroom positioning",
    alt: "Portable toilet placement service - expert positioning for optimal accessibility"
  },
  {
    filename: "relocation-service",
    prompt: "Forklift moving portable toilet to new location on construction site, relocation service in action, professional equipment",
    alt: "Portable toilet relocation service - move units as your project progresses"
  },
  {
    filename: "reservation-service",
    prompt: "Calendar and phone showing portable toilet reservation, advance booking concept, professional service scheduling",
    alt: "Portable toilet reservation service - book in advance to secure your units"
  },
  {
    filename: "waste-disposal-service",
    prompt: "Sanitation service truck pumping portable toilet, waste disposal in progress, professional sanitation service, clean operation",
    alt: "Portable toilet waste disposal service - professional sanitation and cleaning"
  }
];

// Homepage and general images
const generalImages = [
  {
    filename: "hero-banner",
    prompt: "Professional portable toilet rental setup at large outdoor event, multiple clean blue portable toilets in a row, beautiful sunny day, green grass, people in background, commercial photography, wide shot",
    alt: "Professional portable toilet rental services for events nationwide - clean reliable sanitation"
  },
  {
    filename: "about-team",
    prompt: "Professional sanitation service team standing in front of service trucks, diverse group of workers in company uniforms, friendly professional team photo",
    alt: "Portable Toilets Champ team - dedicated professionals serving all 50 states"
  },
  {
    filename: "contact-support",
    prompt: "Friendly customer service representative on phone helping customer, professional office setting, helpful service concept",
    alt: "Contact Portable Toilets Champ - friendly customer support ready to help"
  },
  {
    filename: "trust-nationwide",
    prompt: "Map of United States with portable toilet icons across all states, nationwide service coverage concept, professional infographic style",
    alt: "Nationwide portable toilet rental service - serving all 50 states"
  },
  {
    filename: "testimonials-bg",
    prompt: "Happy event organizer shaking hands with service professional near portable toilet setup, successful event completion, professional outdoor event",
    alt: "Satisfied customers trust Portable Toilets Champ for reliable service"
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
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Generate a single image
async function generateImage(imageConfig, subfolder = "services") {
  const outputSubdir = path.join(OUTPUT_DIR, subfolder);

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputSubdir)) {
    fs.mkdirSync(outputSubdir, { recursive: true });
  }

  const outputPath = path.join(outputSubdir, `${imageConfig.filename}.webp`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${imageConfig.filename} - already exists`);
    return { ...imageConfig, path: `/images/${subfolder}/${imageConfig.filename}.webp`, skipped: true };
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
      return { ...imageConfig, path: `/images/${subfolder}/${imageConfig.filename}.webp`, success: true };
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
  console.log("=== Portable Toilets Champ Image Generator ===\n");

  // Ensure base directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = {
    services: [],
    general: []
  };

  // Generate service images
  console.log("Generating service images...\n");
  for (const img of serviceImages) {
    const result = await generateImage(img, "services");
    results.services.push(result);
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }

  // Generate general images
  console.log("\nGenerating general images...\n");
  for (const img of generalImages) {
    const result = await generateImage(img, "general");
    results.general.push(result);
    await new Promise(r => setTimeout(r, 1000));
  }

  // Output summary
  console.log("\n=== Generation Complete ===\n");

  const successCount = [...results.services, ...results.general].filter(r => r.success || r.skipped).length;
  const errorCount = [...results.services, ...results.general].filter(r => r.error).length;

  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  // Write image mapping file for use in the app
  const imageMapping = {
    services: results.services.filter(r => r.success || r.skipped).map(r => ({
      slug: r.filename,
      path: r.path,
      alt: r.alt
    })),
    general: results.general.filter(r => r.success || r.skipped).map(r => ({
      name: r.filename,
      path: r.path,
      alt: r.alt
    }))
  };

  fs.writeFileSync(
    path.join(__dirname, "..", "data", "image-mapping.json"),
    JSON.stringify(imageMapping, null, 2)
  );
  console.log("\nImage mapping saved to data/image-mapping.json");
}

main().catch(console.error);
