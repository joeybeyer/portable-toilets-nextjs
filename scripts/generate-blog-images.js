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

// Blog images to generate with prompts and optimized alt tags
const blogImages = [
  // Event Rentals Cluster (10 posts)
  {
    filename: "outdoor-wedding-portable-toilets",
    prompt: "Elegant outdoor wedding venue with white decorative tent and luxury portable restroom trailer, string lights, beautiful garden setting, professional event photography",
    alt: "Elegant portable restroom setup at outdoor wedding venue - premium sanitation for your special day"
  },
  {
    filename: "festival-portable-toilets",
    prompt: "Row of portable toilets at large outdoor music festival, crowds in background, sunny day, colorful festival atmosphere, professional event photo",
    alt: "Festival portable toilet setup at outdoor music event - reliable sanitation for large crowds"
  },
  {
    filename: "corporate-event-portable-toilets",
    prompt: "Professional portable restroom trailer at upscale corporate outdoor event, company tents, business casual attendees, modern setup",
    alt: "Corporate event portable restroom facilities - professional sanitation for business gatherings"
  },
  {
    filename: "graduation-party-portable-toilets",
    prompt: "Decorated backyard graduation party with portable toilet tastefully placed, balloons, outdoor celebration, family gathering",
    alt: "Graduation party portable toilet rental - convenient backyard event sanitation"
  },
  {
    filename: "block-party-portable-toilets",
    prompt: "Neighborhood block party on residential street with portable restroom station, families socializing, community event atmosphere",
    alt: "Block party portable restroom setup - community event sanitation solutions"
  },
  {
    filename: "outdoor-concert-portable-toilets",
    prompt: "Portable restroom station at outdoor concert venue with stage lights in background, evening event, crowd gathering",
    alt: "Outdoor concert portable toilet facilities - event sanitation for live music venues"
  },
  {
    filename: "sporting-event-portable-toilets",
    prompt: "Portable toilets lined up at marathon race start line with runners gathering, athletic event, morning light",
    alt: "Sporting event portable toilets - sanitation for races and athletic competitions"
  },
  {
    filename: "church-event-portable-toilets",
    prompt: "Clean portable restroom unit at church outdoor event with families in background, community gathering, friendly atmosphere",
    alt: "Church event portable toilet rental - family-friendly sanitation for faith communities"
  },
  {
    filename: "food-festival-sanitation",
    prompt: "Food festival vendor area with portable handwashing station and restroom signage, outdoor food event, health compliant setup",
    alt: "Food festival sanitation facilities - health code compliant restroom and handwashing stations"
  },
  {
    filename: "emergency-portable-toilet-rental",
    prompt: "Portable toilet being delivered quickly by truck to outdoor event venue, urgent delivery scene, professional service",
    alt: "Emergency portable toilet rental with fast delivery - same-day sanitation solutions"
  },

  // Construction Site Cluster (10 posts)
  {
    filename: "construction-site-osha",
    prompt: "Construction site with portable toilets and workers in hard hats, OSHA compliant setup, active job site, industrial setting",
    alt: "OSHA compliant construction site portable toilets - regulatory sanitation requirements"
  },
  {
    filename: "construction-winter-sanitation",
    prompt: "Portable toilets on construction site in winter snow, cold weather job site, winterized sanitation units",
    alt: "Winter construction site portable toilets - cold weather sanitation solutions"
  },
  {
    filename: "construction-cost-analysis",
    prompt: "Construction manager reviewing documents on job site near portable toilets, cost planning, professional construction setting",
    alt: "Construction portable toilet rental costs - budget planning for job site sanitation"
  },
  {
    filename: "construction-handwashing",
    prompt: "Portable handwashing station on construction site with workers, hygiene station, industrial setting, safety compliance",
    alt: "Construction site handwashing station - hygiene compliance for job sites"
  },
  {
    filename: "road-construction-toilets",
    prompt: "Portable toilets along road construction zone, highway work crew, traffic cones, infrastructure project",
    alt: "Road construction portable toilets - highway project sanitation solutions"
  },
  {
    filename: "remote-construction-sanitation",
    prompt: "Portable toilet at remote construction site, rural or wilderness setting, off-grid job site sanitation",
    alt: "Remote construction site portable toilets - sanitation for off-grid locations"
  },
  {
    filename: "high-rise-construction",
    prompt: "Construction crane and high-rise building under construction with portable toilets at ground level, urban construction site",
    alt: "High-rise construction site portable toilets - multi-floor project sanitation"
  },
  {
    filename: "construction-servicing",
    prompt: "Sanitation service truck servicing portable toilet on construction site, maintenance in progress, professional service",
    alt: "Construction portable toilet servicing - regular maintenance for job sites"
  },
  {
    filename: "multi-contractor-site",
    prompt: "Large construction site with multiple crews and portable toilet bank, busy job site, multiple contractors working",
    alt: "Multi-contractor construction site sanitation - coordinated portable toilet setup"
  },
  {
    filename: "green-construction-sanitation",
    prompt: "Eco-friendly construction site with sustainable portable toilet, green building project, environmental focus",
    alt: "Sustainable construction site sanitation - eco-friendly portable toilet options"
  },

  // Luxury/Premium Cluster (10 posts)
  {
    filename: "luxury-restroom-trailer-guide",
    prompt: "Luxury restroom trailer exterior at upscale outdoor event, elegant white trailer, beautiful venue setting",
    alt: "Luxury restroom trailer rental guide - premium mobile bathroom for upscale events"
  },
  {
    filename: "wedding-restroom-trailer",
    prompt: "Luxury restroom trailer at elegant outdoor wedding, flowers, romantic setting, bride and groom in distance",
    alt: "Wedding restroom trailer rental - elegant portable bathroom for your special day"
  },
  {
    filename: "vip-event-restrooms",
    prompt: "VIP event area with luxury portable restrooms, red carpet, exclusive gathering, premium facilities",
    alt: "VIP event restroom facilities - exclusive portable bathroom for premium guests"
  },
  {
    filename: "luxury-trailer-interior",
    prompt: "Interior of luxury restroom trailer with marble counters, mirrors, elegant lighting, upscale finishes",
    alt: "Luxury restroom trailer interior - premium amenities and elegant design"
  },
  {
    filename: "outdoor-gala-restrooms",
    prompt: "Outdoor gala event with luxury restroom trailers, evening lighting, elegant tent, formal attire guests",
    alt: "Outdoor gala restroom facilities - sophisticated sanitation for formal events"
  },
  {
    filename: "film-set-restrooms",
    prompt: "Film production set with luxury restroom trailer for talent, movie equipment, professional production environment",
    alt: "Film and TV production restroom trailers - premium facilities for talent and crew"
  },
  {
    filename: "vineyard-wedding-restrooms",
    prompt: "Luxury restroom trailer at vineyard wedding venue, wine country setting, elegant outdoor celebration",
    alt: "Vineyard wedding restroom trailer - elegant sanitation for wine country events"
  },
  {
    filename: "luxury-trailer-features",
    prompt: "Close-up of luxury restroom trailer features, running water sink, climate control, premium fixtures",
    alt: "Luxury restroom trailer features - air conditioning, running water, and premium amenities"
  },
  {
    filename: "corporate-retreat-restrooms",
    prompt: "Corporate retreat venue with luxury restroom trailer, executive outdoor event, professional setting",
    alt: "Corporate retreat restroom facilities - executive-level portable sanitation"
  },
  {
    filename: "seasonal-luxury-rentals",
    prompt: "Luxury restroom trailer decorated for holiday event, seasonal decor, festive outdoor celebration",
    alt: "Seasonal luxury restroom trailer rentals - premium facilities for holiday events"
  },

  // ADA Accessibility Cluster (10 posts)
  {
    filename: "ada-portable-toilet-guide",
    prompt: "ADA accessible portable toilet with wheelchair ramp, person in wheelchair approaching, accessible design",
    alt: "ADA accessible portable toilet rental guide - wheelchair accessible sanitation solutions"
  },
  {
    filename: "ada-requirements-events",
    prompt: "Outdoor event with ADA accessible portable toilet and accessible pathway, inclusive event setup",
    alt: "ADA portable toilet requirements for events - accessible sanitation compliance"
  },
  {
    filename: "ada-construction-site",
    prompt: "ADA accessible portable toilet on construction site with accessible pathway, inclusive job site",
    alt: "ADA portable toilets for construction sites - accessible sanitation for all workers"
  },
  {
    filename: "family-accessible-restrooms",
    prompt: "Family with young children and stroller near spacious portable restroom, family-friendly accessible unit",
    alt: "Family accessible portable restroom - spacious sanitation for parents with children"
  },
  {
    filename: "senior-accessible-toilets",
    prompt: "Senior citizen using accessible portable toilet with grab bars, safe accessible design, elderly friendly",
    alt: "Senior accessible portable toilets - safe sanitation for elderly guests"
  },
  {
    filename: "accessible-event-planning",
    prompt: "Event planner reviewing accessible restroom layout, clipboard and site map, inclusive planning",
    alt: "Accessible event restroom planning - ensuring ADA compliance at outdoor events"
  },
  {
    filename: "ada-restroom-placement",
    prompt: "ADA portable toilet positioned on level ground with clear accessible path, proper placement example",
    alt: "ADA portable toilet placement guide - accessible positioning best practices"
  },
  {
    filename: "wheelchair-accessible-features",
    prompt: "Interior of wheelchair accessible portable toilet showing grab bars, turning radius, accessible features",
    alt: "Wheelchair accessible portable toilet features - grab bars and spacious interior"
  },
  {
    filename: "inclusive-outdoor-events",
    prompt: "Inclusive outdoor event with various accessible facilities, diverse attendees, welcoming environment",
    alt: "Inclusive outdoor event sanitation - accessible facilities for all guests"
  },
  {
    filename: "ada-compliance-checklist",
    prompt: "ADA compliance inspector checking portable toilet features, accessibility verification, professional inspection",
    alt: "ADA portable toilet compliance - meeting accessibility requirements"
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
    return { ...imageConfig, path: `/images/blog/${imageConfig.filename}.webp`, skipped: true };
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
      return { ...imageConfig, path: `/images/blog/${imageConfig.filename}.webp`, success: true };
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
  console.log("=== Blog Image Generator ===\n");

  const results = [];

  console.log(`Generating ${blogImages.length} blog images...\n`);

  for (const img of blogImages) {
    const result = await generateImage(img);
    results.push(result);
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }

  // Output summary
  console.log("\n=== Generation Complete ===\n");

  const successCount = results.filter(r => r.success || r.skipped).length;
  const errorCount = results.filter(r => r.error).length;

  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  // Update image mapping file
  const mappingPath = path.join(__dirname, "..", "data", "image-mapping.json");
  let mapping = { services: [], general: [], blog: [] };

  if (fs.existsSync(mappingPath)) {
    mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
  }

  mapping.blog = results.filter(r => r.success || r.skipped).map(r => ({
    filename: r.filename,
    path: r.path,
    alt: r.alt
  }));

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log("\nImage mapping updated in data/image-mapping.json");
}

main().catch(console.error);
