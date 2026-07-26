import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Simple env loader without external dependencies
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const idx = trimmed.indexOf("=");
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || !apiKey.startsWith("AIza")) {
  console.log("GEMINI_API_KEY missing or invalid (must start with AIza). Skipping image generation as specified in PART C.");
  process.exit(0);
}

const jobs = [
  [
    "dd-hero-stack.png",
    "Photorealistic overhead flat-lay on a matte charcoal-black surface, cinematic moody lighting with a subtle emerald-green rim glow: a scoop of white creatine powder, a small pile of tan lion's mane powder, amber capsules, a chunk of pink Himalayan salt, a halved lemon, a knob of fresh ginger root, an open tin of sardines, a scatter of pumpkin seeds, a small glass of kefir, rolled oats in a wooden scoop. Arranged in a clean grid like a field kit laid out for inspection. Editorial, high contrast, shallow depth of field, no text, no labels, no packaging. 16:9.",
  ],
  [
    "dd-morning-tonic.png",
    "Photorealistic close-up of a tall glass of water on a dark counter at 5am, lemon slice and grated ginger suspended in it, condensation on the glass, a small spoon of powder mid-pour dissolving into the water, cold blue pre-dawn window light from the left with a faint emerald tint in the shadows, tech-noir color grade, no text. 16:9.",
  ],
];

async function generateImage(filename, prompt) {
  const outPath = path.join(projectRoot, "public", "90rr", "img", filename);
  console.log(`Generating ${filename}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "image/png",
            aspectRatio: "16:9",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`API call failed for ${filename} (${response.status}): ${errText}`);
      return;
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const part = candidate?.content?.parts?.[0];

    if (part?.inlineData?.data) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(outPath, buffer);
      console.log(`Saved ${filename} (${buffer.length} bytes).`);
    } else {
      console.warn(`No image data returned for ${filename}`);
    }
  } catch (err) {
    console.warn(`Error generating ${filename}:`, err.message);
  }
}

async function main() {
  for (const [filename, prompt] of jobs) {
    await generateImage(filename, prompt);
  }
}

main();
