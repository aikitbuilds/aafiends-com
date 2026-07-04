const fs = require("fs");
const now = new Date();
const stamp = now.toLocaleString("en-US", {
  timeZone: "America/Chicago",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "numeric", minute: "2-digit", hour12: true,
}).replace(",", "") + " CT";
// Next auto-loads .env.production.local for `next build`.
fs.writeFileSync(".env.production.local", `NEXT_PUBLIC_BUILD_TIME="${stamp}"\n`);
// Also write .env.local so `npm run dev` shows a fresh stamp locally.
if (fs.existsSync(".env.local")) {
  let content = fs.readFileSync(".env.local", "utf8");
  // Remove any existing NEXT_PUBLIC_BUILD_TIME line
  content = content.replace(/^NEXT_PUBLIC_BUILD_TIME=.*$/m, "").trim();
  content += `\nNEXT_PUBLIC_BUILD_TIME="${stamp}"\n`;
  fs.writeFileSync(".env.local", content);
} else {
  fs.writeFileSync(".env.local", `NEXT_PUBLIC_BUILD_TIME="${stamp}"\n`);
}
console.log("Build time set to", stamp);
