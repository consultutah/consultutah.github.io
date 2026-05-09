import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);

let failures = 0;
const existsRoute = (href) => {
  if (!href.startsWith('/')) return true;
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '/') return fs.existsSync(path.join(root, 'index.html'));
  const target = path.join(root, clean);
  if (path.extname(target)) return fs.existsSync(target);
  return fs.existsSync(path.join(target, 'index.html'));
};

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const href of hrefs) {
    if (href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#')) continue;
    if (!existsRoute(href)) {
      console.error(`Broken link in ${path.relative(root, file)} -> ${href}`);
      failures++;
    }
  }
  if (!html.includes('<meta name="description"')) {
    console.error(`Missing meta description: ${path.relative(root, file)}`);
    failures++;
  }
}

if (failures) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files. All internal links and descriptions look good.`);
