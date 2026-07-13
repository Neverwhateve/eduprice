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
if (!html.includes("不与教育优惠叠加")) failures.push("缺少企业抵税与教育优惠互斥说明");
if (!html.includes("增票抵扣后预计成本")) failures.push("缺少增票抵扣后的预计成本标题");
if (html.includes("教育优惠价抵税后预计成本")) failures.push("企业抵税结果不应使用教育优惠文案");
if (!html.includes('id="calculate-cart-tax"')) failures.push("设备组合缺少企业抵税入口");
if (!calculator.includes("eduprice:carttaxrequest")) failures.push("企业抵税计算器缺少组合金额接入逻辑");
if (html.includes('data-price-source="edu"')) failures.push("企业抵税金额来源不应包含教育优惠价");
if (html.includes("custom-vat-rate") || html.includes("vat-rate-options")) failures.push("企业抵税不应提供增值税税率切换");
if (!html.includes('aria-label="固定增值税税率 13%"')) failures.push("企业抵税缺少固定 13% 增值税税率说明");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`静态检查通过：${sourceFiles.length} 个源文件，${ids.length} 个唯一界面标识。`);
