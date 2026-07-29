import { readFile } from "node:fs/promises";

const sourceFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "tax-utils.js",
  "pwa.js",
  "sw.js",
  "manifest.webmanifest",
];

const failures = [];
const contents = new Map();

for (const file of sourceFiles) {
  try {
    const content = await readFile(file, "utf8");
    contents.set(file, content);
    content.split("\n").forEach((line, index) => {
      if (/[ \t]+$/.test(line)) failures.push(`${file}:${index + 1} 存在行尾空白`);
      if (/\t/.test(line)) failures.push(`${file}:${index + 1} 使用了 Tab 缩进`);
    });
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

const html = contents.get("index.html") || "";
const app = contents.get("app.js") || "";
const css = contents.get("styles.css") || "";
const pwa = contents.get("pwa.js") || "";

for (const requiredAsset of ["styles.css", "tax-utils.js", "app.js", "pwa.js", "manifest.webmanifest"]) {
  if (!html.includes(requiredAsset)) failures.push(`index.html 未引用 ${requiredAsset}`);
}

if (!html.includes("EDU Quote")) failures.push("应用标题未更新为 EDU Quote");
if (!html.includes('id="app"')) failures.push("缺少应用根节点");
if (!app.includes("localStorage")) failures.push("缺少本地报价和历史持久化");
if (!app.includes("Business Purchase")) failures.push("缺少 Business Purchase 报价模式");
if (!app.includes("Present Quote") && !app.includes("展示报价")) failures.push("缺少报价展示模式");
if (!app.includes("saved")) failures.push("缺少已存报价实现");
if (!app.includes("event.key.toLowerCase() === \"k\"")) failures.push("缺少全局搜索快捷键");
if (!app.includes("不构成税务、财务或法律建议")) failures.push("缺少 Business Purchase 免责声明");
if (!css.includes("prefers-reduced-motion")) failures.push("缺少减少动态支持");
if (!css.includes("data-theme=\"dark\"")) failures.push("缺少深色模式支持");
if (!css.includes("safe-area-inset-bottom")) failures.push("缺少 iPhone 安全区支持");
if (pwa.includes("window.location.reload")) failures.push("PWA 更新不应自动打断报价");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`静态检查通过：${sourceFiles.length} 个移动端报价源文件。`);
