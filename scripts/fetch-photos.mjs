/**
 * Download the Dawn Ledger photo library from the Creative Claw CDN into
 * /public/photos, then rewrite src/lib/photos.ts to point at the local paths.
 *
 *   node scripts/fetch-photos.mjs
 *
 * Why: the redesign shipped referencing cdn.creativeclaw.co so the pages could
 * be built without the binaries in hand. Production should own its own assets —
 * it removes a third-party runtime dependency, lets Firebase serve them from
 * the CDN edge, and means the site keeps working if that account ever lapses.
 *
 * Idempotent: skips files already present. Safe to re-run.
 */
import { mkdirSync, existsSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "photos");
const MANIFEST = join(process.cwd(), "src", "lib", "photos.ts");

mkdirSync(OUT, { recursive: true });

// Parsed straight out of the manifest so the two can never drift.
const src = readFileSync(MANIFEST, "utf8");
const CDN = src.match(/const CDN = "([^"]+)"/)?.[1];
if (!CDN) {
  console.error("Could not find the CDN constant in src/lib/photos.ts — already localised?");
  process.exit(1);
}

const entries = [...src.matchAll(/src:\s*`\$\{CDN\}\/([^`]+)`,\s*\n\s*file:\s*"([^"]+)"/g)].map(
  ([, remote, file]) => ({ remote, file })
);

if (entries.length === 0) {
  console.error("No photo entries found. Has the manifest already been rewritten?");
  process.exit(1);
}

console.log(`${entries.length} photos → public/photos/\n`);

let downloaded = 0;
for (const { remote, file } of entries) {
  const dest = join(OUT, file);
  if (existsSync(dest)) {
    console.log(`  skip  ${file} (already present)`);
    continue;
  }
  const url = `${CDN}/${remote}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`  FAIL  ${file} — ${res.status} ${res.statusText}`);
    process.exitCode = 1;
    continue;
  }
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  downloaded++;
  console.log(`  ok    ${file}`);
}

if (process.exitCode === 1) {
  console.error("\nSome downloads failed — manifest left pointing at the CDN. Fix and re-run.");
  process.exit(1);
}

// Repoint the manifest at /photos/<file> and drop the CDN constant.
let out = src
  .replace(/const CDN = "[^"]+";\n\n?/, "")
  .replace(/src:\s*`\$\{CDN\}\/[^`]+`,\n(\s*)file: "([^"]+)"/g, (m, indent, file) =>
    `src: "/photos/${file}",\n${indent}file: "${file}"`
  )
  .replace(
    / \* NOTE ON HOSTING:[\s\S]*? \* Filenames below are already the intended local names\.\n/,
    " * Served from /public/photos — the site owns these assets.\n"
  );

writeFileSync(MANIFEST, out);

console.log(
  `\nDownloaded ${downloaded}, manifest repointed at /photos/.\n` +
    `Next: remove the cdn.creativeclaw.co entry from next.config.mjs remotePatterns, then rebuild.`
);
