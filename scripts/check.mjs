import { readFile } from "node:fs/promises";

const sourceFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "tax-utils.js",
  "tax-calculator.js",
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
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicates.length) failures.push(`index.html 存在重复 id: ${[...new Set(duplicates)].join(", ")}`);

for (const requiredAsset of ["styles.css", "tax-utils.js", "app.js", "tax-calculator.js", "pwa.js", "manifest.webmanifest"]) {
  if (!html.includes(requiredAsset)) failures.push(`index.html 未引用 ${requiredAsset}`);
}

const calculator = contents.get("tax-calculator.js") || "";
for (const selector of calculator.matchAll(/querySelector\("#([^"]+)"\)/g)) {
  if (!ids.includes(selector[1])) failures.push(`tax-calculator.js 引用了不存在的 #${selector[1]}`);
}

if (!html.includes("不构成税务、财务或法律建议")) failures.push("缺少税务免责声明");
if (!html.includes("价格资格、发票类型及购买渠道")) failures.push("缺少价格资格说明");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`静态检查通过：${sourceFiles.length} 个源文件，${ids.length} 个唯一界面标识。`);
