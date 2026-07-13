# EDU Price 阿里云 ECS 生产部署

## 1. 部署架构

EDU Price 是无后端的原生静态 PWA。生产链路为：

```text
Git 仓库 → npm 检查与测试 → dist/ → /var/www/edu-price/releases/<版本>
                                      ↓
                              current 原子软链接
                                      ↓
                          Nginx 静态服务 + HTTPS
```

不需要 PM2、systemd Node 服务或数据库。Nginx 根目录固定为 `/var/www/edu-price/current`；服务器重启后由 Nginx 自动恢复服务。

生产站点按独立域名根路径部署，例如 `https://<DOMAIN>/`。当前资源路径、Manifest 和 Service Worker 均支持这一方式；如果未来部署到子目录，需要同时调整 `start_url`、Service Worker scope、资源路径和 Nginx fallback。

## 2. 服务器与软件要求

- 阿里云 ECS，推荐 Ubuntu Server 24.04 LTS；
- 1 vCPU / 1 GB 内存即可满足轻量静态站点；
- Node.js 24 LTS（本地验证版本为 24.13.1）；
- Git、Nginx、curl；
- 一个已解析到 `<ALIYUN_SERVER_IP>` 的域名 `<DOMAIN>`；
- SSH 用户 `<SSH_USER>`，建议使用密钥登录并限制来源 IP。

安装基础软件：

```bash
sudo apt update
sudo apt install -y git nginx curl certbot
sudo systemctl enable --now nginx
```

Node.js 建议通过 NodeSource、nvm 或企业现有的软件源安装。确认：

```bash
node --version
npm --version
nginx -v
git --version
```

## 3. 阿里云 DNS 与安全组

1. 在 DNS 控制台为 `<DOMAIN>` 创建 A 记录，指向 `<ALIYUN_SERVER_IP>`。
2. ECS 安全组公网入方向仅开放：
   - TCP 80：所有需要访问站点的来源；
   - TCP 443：所有需要访问站点的来源；
   - SSH 端口：仅允许管理员固定公网 IP，不建议向 `0.0.0.0/0` 开放。
3. 本项目没有 Node 监听端口，不需要开放 3000、4173 等开发端口。

## 4. 首次部署

### 4.1 准备 Git 仓库

当前交付目录本身没有 `.git` 元数据。首次上云前请将项目提交并推送到你的私有或公开 Git 仓库，生产分支默认使用 `main`。部署脚本会拒绝脏工作区、错误分支和非 Git 目录。

### 4.2 克隆代码并创建目录

```bash
ssh <SSH_USER>@<ALIYUN_SERVER_IP>
sudo mkdir -p /opt/edu-price-src /var/www/edu-price/releases /var/www/letsencrypt
sudo chown -R <SSH_USER>:<SSH_USER> /opt/edu-price-src /var/www/edu-price
git clone <YOUR_GIT_REPOSITORY_URL> /opt/edu-price-src
cd /opt/edu-price-src
cp .env.example .env
```

编辑 `.env`，至少替换：

```dotenv
DOMAIN=<DOMAIN>
HEALTHCHECK_URL=https://<DOMAIN>/
PRODUCTION_BRANCH=main
RELEASE_KEEP=5
```

`.env` 已被忽略，不应提交。这个静态前端不需要秘密环境变量；任何进入浏览器构建产物的值都能被访问，密码、Token、SSH 私钥和 API Secret 绝不能放入前端或仓库。

### 4.3 首次构建

```bash
cd /opt/edu-price-src
npm ci --ignore-scripts --no-audit --no-fund
npm run check
```

构建产物目录是 `/opt/edu-price-src/dist`。首次创建 release：

```bash
RELEASE_ID="$(date -u +%Y%m%d-%H%M%S)-initial"
mkdir -p "/var/www/edu-price/releases/${RELEASE_ID}"
cp -a dist/. "/var/www/edu-price/releases/${RELEASE_ID}/"
ln -sfn "releases/${RELEASE_ID}" /var/www/edu-price/current
```

### 4.4 申请 HTTPS 证书

先用一个仅包含 80 端口和 ACME challenge 的临时 Nginx server，确保 `/.well-known/acme-challenge/` 指向 `/var/www/letsencrypt`。然后申请 Let’s Encrypt 证书：

```bash
sudo certbot certonly --webroot -w /var/www/letsencrypt -d <DOMAIN>
```

证书会位于：

```text
/etc/letsencrypt/live/<DOMAIN>/fullchain.pem
/etc/letsencrypt/live/<DOMAIN>/privkey.pem
```

也可以在阿里云申请 SSL 证书，将证书安全地放在服务器并修改 Nginx 中的 `ssl_certificate` 与 `ssl_certificate_key` 路径。证书私钥不得进入 Git 仓库。

验证自动续期：

```bash
sudo certbot renew --dry-run
systemctl status certbot.timer
```

### 4.5 安装正式 Nginx 配置

项目模板位置：

```text
deploy/nginx/edu-price.conf
```

复制并替换 `<DOMAIN>`：

```bash
sudo cp deploy/nginx/edu-price.conf /etc/nginx/sites-available/edu-price.conf
sudo sed -i 's/<DOMAIN>/你的真实域名/g' /etc/nginx/sites-available/edu-price.conf
sudo ln -sfn /etc/nginx/sites-available/edu-price.conf /etc/nginx/sites-enabled/edu-price.conf
sudo nginx -t
sudo systemctl reload nginx
```

生产配置包含 HTTP 自动跳转 HTTPS、TLS 1.2/1.3、SPA fallback、Gzip、基础安全响应头、隐藏文件保护、短缓存 HTML/Service Worker、内容哈希资源长期缓存以及独立访问/错误日志。

> 只有确认所有子域名都启用 HTTPS 后，才应保留 HSTS 的 `includeSubDomains`。不满足时请先从配置中移除该参数。

### 4.6 脚本权限与 sudo

```bash
chmod +x scripts/deploy.sh scripts/rollback.sh
```

脚本需要执行 `nginx -t` 和 `systemctl reload nginx`。可在每次部署时输入 sudo 密码，或由管理员按最小权限原则配置 sudoers；不要授予部署用户不受限制的 root 权限。

## 5. 日常更新

在生产分支提交并推送代码后，登录服务器运行：

```bash
cd /opt/edu-price-src
./scripts/deploy.sh
```

脚本会依次：检查 Git 状态与生产分支、拉取最新代码、安装锁定依赖、执行 lint/typecheck/test/build、创建新 release、验证产物、原子切换 `current`、检查并 reload Nginx、请求站点健康检查，并只保留最近 `RELEASE_KEEP` 个版本。

任何检查或构建失败都会在切换线上版本前停止。切换后健康检查失败时，脚本会恢复此前软链接。

## 6. 回滚

回滚到上一个可用版本：

```bash
cd /opt/edu-price-src
./scripts/rollback.sh
```

回滚到指定版本：

```bash
./scripts/rollback.sh 20260713-120000-abc1234
```

脚本会列出 release、验证目标 `index.html`、原子切换软链接、reload Nginx 并执行健康检查；不会先删除当前版本。

## 7. 缓存、PWA 与版本更新

- `npm run build` 为 CSS/JS 生成 8 位内容哈希文件名，Nginx 对这些文件缓存一年并标记 `immutable`；
- `index.html` 和 `sw.js` 不做长期缓存；
- 每次构建会为 Service Worker 生成新的 cache 名称，并缓存本次实际的哈希文件；
- Service Worker 检测到新版后会激活并刷新页面；
- iPhone 添加到主屏幕依赖 HTTPS、Manifest、Apple Touch Icon 和 Service Worker，生产配置均已覆盖。

发布后建议用浏览器隐私窗口验证一次；旧安装版 PWA 应在联网后自动获取新版本。

## 8. 验证清单

```bash
curl -I http://<DOMAIN>/
curl -I https://<DOMAIN>/
curl -I https://<DOMAIN>/sw.js
curl -I https://<DOMAIN>/assets/styles.<HASH>.css
```

应确认：

- HTTP 返回 301 并跳转 HTTPS；
- HTTPS 证书域名、有效期和证书链正确，无混合内容；
- 首页、产品价格、教育价格、设备组合正常；
- 企业抵税入口、三种金额来源、税率切换和自定义税率正常；
- “一般纳税人 + 增值税专用发票”与其他组合产生不同抵扣状态；
- 桌面端与 iPhone 尺寸可正常滚动，没有安全区遮挡；
- 控制台没有严重错误，静态资源没有 404；
- `curl -I https://<DOMAIN>/任意路径` 可由 SPA fallback 返回页面；
- 服务器重启后 `systemctl status nginx` 为 active，站点自动恢复。

## 9. 日志与故障排查

查看服务和日志：

```bash
sudo systemctl status nginx
sudo journalctl -u nginx -n 100 --no-pager
sudo tail -f /var/log/nginx/edu-price.access.log
sudo tail -f /var/log/nginx/edu-price.error.log
sudo nginx -t
```

常见问题：

- **502**：本项目没有上游服务；通常表示启用了错误的旧反向代理配置，检查 sites-enabled。
- **403**：检查 `/var/www/edu-price/current` 软链接和 release 目录的 Nginx 读取权限。
- **静态资源 404**：确认 `current` 指向完整的 release，且 `asset-manifest.json` 中的文件存在。
- **旧版本未更新**：确认 `index.html`、`sw.js` 响应没有长缓存；在 DevTools Application 中检查 Service Worker 状态。
- **证书失败**：先检查 DNS 是否指向 `<ALIYUN_SERVER_IP>`、80/443 安全组、系统时间和证书路径。
- **部署脚本拒绝执行**：清理并提交生产目录中的本地修改，确认处于 `main`（或 `.env` 指定）分支。
- **Nginx 重启后未恢复**：运行 `sudo systemctl enable nginx`，再检查 `current` 软链接是否有效。

## 10. 本地与服务器职责边界

本项目代码、构建、Nginx 模板、发布脚本和回滚脚本可以在本地完成并验证。真正的 DNS 解析、安全组修改、证书签发、Nginx 安装和线上发布必须在拥有 `<ALIYUN_SERVER_IP>`、`<DOMAIN>` 与 `<SSH_USER>` 权限的环境中执行。
