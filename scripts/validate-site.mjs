import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const productionMode = process.argv.includes('--production');
const errors = [];
const htmlFiles = (await readdir(root)).filter((file) => file.endsWith('.html')).sort();
const htmlByFile = new Map();

for (const file of htmlFiles) {
  htmlByFile.set(file, await readFile(path.join(root, file), 'utf8'));
}

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function hasId(html, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\bid=["']${escaped}["']`).test(html);
}

function localTarget(rawValue, sourceFile) {
  const value = rawValue.trim();
  if (!value || /^(?:https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(value)) return null;

  const [withoutQuery] = value.split('?');
  const [filePart, fragment = ''] = withoutQuery.split('#');
  const decodedPart = decodeURIComponent(filePart || '');
  const targetFile = decodedPart
    ? path.normalize(path.join(path.dirname(sourceFile), decodedPart))
    : sourceFile;

  return { targetFile, fragment: decodeURIComponent(fragment) };
}

for (const [file, html] of htmlByFile) {
  if (!/^<!doctype html>/i.test(html.trimStart())) fail(file, 'missing HTML doctype');
  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(file, 'missing viewport metadata');
  if (!/<meta\s+name=["']description["']/i.test(html)) fail(file, 'missing description metadata');

  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  const robots = robotsMatch?.[1].toLowerCase() ?? '';
  if (productionMode && robots.includes('noindex')) {
    fail(file, 'preview noindex marker must be removed before production deployment');
  }
  if (!productionMode && !robots.includes('noindex') ) {
    fail(file, 'preview page must include a noindex robots marker');
  }

  const references = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi);
  for (const match of references) {
    const target = localTarget(match[1], file);
    if (!target) continue;

    if (target.targetFile.startsWith('..')) {
      fail(file, `local reference escapes the site root: ${match[1]}`);
      continue;
    }

    const absoluteTarget = path.join(root, target.targetFile);
    try {
      await access(absoluteTarget);
    } catch {
      fail(file, `missing local target: ${match[1]}`);
      continue;
    }

    if (target.fragment && target.targetFile.endsWith('.html')) {
      const targetHtml = htmlByFile.get(target.targetFile) ?? await readFile(absoluteTarget, 'utf8');
      if (!hasId(targetHtml, target.fragment)) {
        fail(file, `missing fragment target: ${match[1]}`);
      }
    }
  }
}

const cmsOnlyCommercialValues = ['R795/month', 'R1,595/month', 'R3,950/month'];
for (const [file, html] of htmlByFile) {
  for (const value of cmsOnlyCommercialValues) {
    if (html.includes(value)) fail(file, `CMS-owned commercial value is duplicated in static HTML: ${value}`);
  }
}

const cmsHooks = {
  'index.html': ['packageCards'],
  'forms.html': ['package_interest'],
  'insights.html': ['resourceGuides', 'linkedinResources'],
  'events.html': ['eventsContent'],
  'faq.html': ['faqList']
};

for (const [file, ids] of Object.entries(cmsHooks)) {
  const html = htmlByFile.get(file) ?? '';
  if (!html.includes('assets/js/cms-content.js')) fail(file, 'missing CMS renderer script');
  for (const id of ids) {
    if (!hasId(html, id)) fail(file, `missing CMS mount point #${id}`);
  }
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${htmlFiles.length} HTML files (${productionMode ? 'production' : 'preview'} mode).`);
}
