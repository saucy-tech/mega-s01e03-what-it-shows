import { readFile, mkdir, writeFile } from 'node:fs/promises';

const root = new URL('../support-kb/', import.meta.url);
const name = 'kb/incidents/4471-split';
let html = await readFile(new URL(`build/${name}.html`, root), 'utf8');
const stylesheetLinks = [...html.matchAll(/<link\b[^>]*href="([^"?]+\.css)"[^>]*>/g)];
for (const match of stylesheetLinks) {
  const url = new URL(match[1], `https://kb.invalid/${name}`);
  const css = await readFile(new URL(`build/${url.pathname.slice(1)}`,root),'utf8');
  html = html.replace(match[0], `<style>${css}</style>`);
}
html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
// Keep the rendered snapshot readable when opened directly from disk or GitHub download.
html = html.replaceAll('href="/kb"', 'href="https://github.com/saucy-tech/mega-s01e03-what-it-shows/tree/main/support-kb/src/routes/kb"');
html = html.replace(/href="(\/kb\/[^"#]*)"/g, (_,path) => `href="https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/support-kb/src/routes${path}/%2Bpage.svx"`);
if (!html.includes('DR-WCJ1-V3RB')) throw new Error('Signature did not render');
if (html.includes('no desk ref:')) throw new Error('Unsigned page');
if (/<script\b/.test(html) || /<link\b[^>]*href="[^"?]+\.css"/.test(html)) throw new Error('Snapshot depends on external assets');
await mkdir(new URL('rendered/',root),{recursive:true});
await writeFile(new URL('rendered/4471-split.html',root),html.split(/\r?\n/).map(line => line.trimEnd()).join('\n').trimEnd()+'\n');
console.log('Saved standalone desk page: support-kb/rendered/4471-split.html');
