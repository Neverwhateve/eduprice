import { spawnSync } from "node:child_process";

const javascriptFiles = [
  "app.js",
  "tax-utils.js",
  "tax-calculator.js",
  "pwa.js",
  "sw.js",
  "scripts/check.mjs",
  "scripts/typecheck.mjs",
  "scripts/build.mjs",
  "tests/tax-utils.test.js",
];

for (const file of javascriptFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`语法检查通过：${javascriptFiles.length} 个 JavaScript 文件。`);
