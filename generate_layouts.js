const fs = require('fs');
const path = require('path');

const routes = {
  '12-and-12': { title: '12 Steps & 12 Traditions', desc: 'The 12 Steps and 12 Traditions of AA, adapted for the modern era of data over denial.' },
  '90-r-and-r': { title: '90 Days Recovery & Restructure', desc: 'A biology-first cohort for the first 90 days. Daily telemetry that proves your baseline is healing.' },
  'ai4aa': { title: 'ai4aa Foundation Course', desc: 'A 6-week tech crash course exclusively for the recovery community. Zero technical background required.' },
  'blog': { title: 'The Science of Recovery', desc: 'The research behind the AA Fiends app, in plain English.' },
  'data': { title: 'Data Dashboard', desc: 'Your telemetry dashboard. Track sleep, meetings, and cravings.' },
  'gad': { title: 'Grand Architect Divine (G.A.D.)', desc: 'The spiritual framing of AA Fiends.' },
  'protocol': { title: 'The BIO 12 Protocol', desc: 'The 12 biological imperatives to protect your baseline.' },
  'stories': { title: 'Community Stories', desc: 'Real recovery stories from the AA Fiends community.' },
  'dashboard': { title: 'Member Dashboard', desc: 'Your AA Fiends member dashboard.' },
  'onboarding': { title: 'Onboarding', desc: 'Join AA Fiends and start tracking your baseline.' },
  'profile': { title: 'Profile', desc: 'Manage your AA Fiends profile and settings.' }
};

for (const [route, meta] of Object.entries(routes)) {
  const dir = path.join('src', 'app', route);
  if (fs.existsSync(dir)) {
    const layoutPath = path.join(dir, 'layout.tsx');
    const content = `import type { Metadata } from "next";\n\nexport const metadata: Metadata = {\n  title: "${meta.title}",\n  description: "${meta.desc}",\n  alternates: { canonical: "https://aafiends.com/${route}" }\n};\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}\n`;
    fs.writeFileSync(layoutPath, content, 'utf8');
    console.log('Created ' + layoutPath);
  }
}
