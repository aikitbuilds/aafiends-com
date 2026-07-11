const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<img ')) return;

  // Add import if not present
  if (!content.includes('import Image from "next/image"')) {
    content = content.replace(/(import .*?;?\n)/, '$1import Image from "next/image";\n');
  }

  content = content.replace(/<img\s+src=(["'{`].*?["'`}])\s+alt=(["'{`].*?["'`}])(.*?)\/?>/g, (match, src, alt, rest) => {
    let w = 800;
    let h = 600;
    if (rest.includes('w-10')) w = 40;
    if (rest.includes('h-10')) h = 40;
    if (rest.includes('w-12')) w = 48;
    if (rest.includes('h-12')) h = 48;
    if (rest.includes('w-8')) w = 32;
    if (rest.includes('h-8')) h = 32;
    if (rest.includes('w-16')) w = 64;
    if (rest.includes('h-16')) h = 64;
    
    // Some lines have closing tags inside the rest, let's fix that
    rest = rest.replace(/\/>$/, '').trim();
    if (rest.endsWith('/')) rest = rest.slice(0, -1).trim();
    
    return `<Image src=${src} alt=${alt} width={${w}} height={${h}} ${rest} />`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + filePath);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.tsx')) processFile(full);
  }
}

walk(path.join(__dirname, 'src', 'app'));
