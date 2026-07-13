# Apple 教育优惠价格查询

这是一个用于查询 Apple 教育优惠价格与估算企业采购税务影响的静态 PWA。数据来自 `EDU Price.xlsx`，当前网页数据已整理到 `app.js` 中。

项目不依赖前端框架或运行时后端：

- `app.js`：产品目录、选型、价格结果和设备组合；
- `tax-utils.js`：金额校验、统一格式化与税务纯函数；
- `tax-calculator.js`：企业抵税计算器交互；
- `sw.js`：离线缓存与版本更新；
- `scripts/`：检查、测试、生产构建、部署与回滚。

## 本地打开

直接用浏览器打开 `index.html` 即可使用。

也可以启动本地服务：

```bash
npm run dev
```

## 检查与生产构建

```bash
npm run check
```

该命令依次执行静态检查、JavaScript 语法检查、税务单元测试和生产构建。生产文件输出到 `dist/`；CSS 与 JavaScript 文件名带内容哈希，适合长期缓存。

## 企业抵税估算

默认增值税税率为 13%，企业所得税估算税率为 5%。出于审慎考虑，发票类型和企业身份默认均为“不确定”；只有明确选择“增值税专用发票 + 一般纳税人”时，才会把增值税税额计入预计抵扣。

所有金额先转换为“分”，核心乘除使用 BigInt 和统一四舍五入，避免明显的浮点误差。结果仅供估算，不构成税务、财务或法律建议。

## 阿里云 ECS 部署

生产环境采用“静态构建产物 + Nginx + HTTPS + 原子 release 软链接”架构。首次部署、日常更新、证书、安全组与回滚步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 可选：部署到 Netlify

1. 把本文件夹上传到 GitHub 仓库。
2. 在 Netlify 中选择 **Add new site**，导入该 GitHub 仓库。
3. Build command 使用 `npm run build`。
4. Publish directory 填写 `dist`。
5. 点击 Deploy。

本项目已包含 `netlify.toml`，Netlify 会自动按静态站点发布当前目录。

## 缓存

页面会在部署后的 HTTPS 地址上注册 `sw.js`，首次打开后缓存 `index.html`、`styles.css` 和 `app.js`。之后再次打开会优先使用本地缓存，并在后台更新新版本。

本地直接打开 `file://` 时浏览器不会启用 Service Worker，这是浏览器限制；部署到 Netlify 后会生效。

## 更新价格

如果 Excel 表格有新价格，需要同步更新 `app.js` 顶部的 `products` 数据。
