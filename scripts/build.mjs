import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const outputDirectory = "dist";
const fingerprintedFiles = ["styles.css", "tax-utils.js", "app.js", "tax-calculator.js", "pwa.js", "mac-guide.css", "mac-guide-data.js", "mac-guide.js"];
const copiedFiles = ["manifest.webmanifest"];
const pageFiles = ["index.html", "mac-guide.html"];

function fingerprint(content) {
  return createHash("sha256").update(content).digest("hex").slice(0, 8);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(join(outputDirectory, "assets"), { recursive: true });
await cp("assets", join(outputDirectory, "assets"), { recursive: true });

const pages = Object.fromEntries(await Promise.all(pageFiles.map(async (pagePath) => [pagePath, await readFile(pagePath, "utf8")] )));
let serviceWorker = await readFile("sw.js", "utf8");
const manifest = {};

for (const sourcePath of fingerprintedFiles) {
  const content = await readFile(sourcePath);
  const extensionIndex = sourcePath.lastIndexOf(".");
  const base = sourcePath.slice(0, extensionIndex);
  const extension = sourcePath.slice(extensionIndex);
  const outputPath = `assets/${base}.${fingerprint(content)}${extension}`;
  await mkdir(join(outputDirectory, dirname(outputPath)), { recursive: true });
  await writeFile(join(outputDirectory, outputPath), content);
  manifest[sourcePath] = outputPath;
  for (const [pagePath, html] of Object.entries(pages)) {
    pages[pagePath] = html.replaceAll(sourcePath, outputPath);
  }
  serviceWorker = serviceWorker.replaceAll(`./${sourcePath}`, `./${outputPath}`);
}

for (const sourcePath of copiedFiles) {
  await cp(sourcePath, join(outputDirectory, sourcePath));
}

const buildId = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
serviceWorker = serviceWorker.replace(/edu-price-v\d+/, `edu-price-${buildId}`);
for (const [pagePath, html] of Object.entries(pages)) {
  await writeFile(join(outputDirectory, pagePath), html);
}
await writeFile(join(outputDirectory, "sw.js"), serviceWorker);
await writeFile(join(outputDirectory, "asset-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

for (const [pagePath, html] of Object.entries(pages)) {
  for (const [sourcePath, outputPath] of Object.entries(manifest)) {
    if (html.includes(sourcePath)) throw new Error(`构建后的 ${pagePath} 仍引用 ${sourcePath}`);
    if (pagePath === "index.html" && ["styles.css", "tax-utils.js", "app.js", "tax-calculator.js", "pwa.js"].includes(sourcePath) && !html.includes(outputPath)) throw new Error(`构建后的 ${pagePath} 未引用 ${outputPath}`);
    if (pagePath === "mac-guide.html" && ["mac-guide.css", "mac-guide-data.js", "mac-guide.js"].includes(sourcePath) && !html.includes(outputPath)) throw new Error(`构建后的 ${pagePath} 未引用 ${outputPath}`);
  }
}

console.log(`生产构建完成：${outputDirectory}/`);
console.log(JSON.stringify(manifest, null, 2));
