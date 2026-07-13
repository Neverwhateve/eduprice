#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -f "${REPO_DIR}/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "${REPO_DIR}/.env"
  set +a
fi

APP_ROOT="${APP_ROOT:-/var/www/edu-price}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-main}"
RELEASE_KEEP="${RELEASE_KEEP:-5}"
DOMAIN="${DOMAIN:-}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-}"

if [[ -z "${DOMAIN}" || "${DOMAIN}" == "<DOMAIN>" ]]; then
  echo "错误：请在 .env 中配置真实 DOMAIN。" >&2
  exit 1
fi
if [[ -z "${HEALTHCHECK_URL}" || "${HEALTHCHECK_URL}" == *"<DOMAIN>"* ]]; then
  HEALTHCHECK_URL="https://${DOMAIN}/"
fi
if ! [[ "${RELEASE_KEEP}" =~ ^[1-9][0-9]*$ ]]; then
  echo "错误：RELEASE_KEEP 必须是正整数。" >&2
  exit 1
fi

for command in git npm curl sudo; do
  command -v "${command}" >/dev/null 2>&1 || { echo "错误：缺少命令 ${command}" >&2; exit 1; }
done

cd "${REPO_DIR}"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "错误：当前目录不是 Git 仓库。" >&2; exit 1; }

if [[ -n "$(git status --porcelain)" ]]; then
  echo "错误：工作区存在未提交修改，已停止部署。" >&2
  git status --short >&2
  exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "${CURRENT_BRANCH}" != "${PRODUCTION_BRANCH}" ]]; then
  echo "错误：当前分支为 ${CURRENT_BRANCH}，生产分支应为 ${PRODUCTION_BRANCH}。" >&2
  exit 1
fi

git fetch --prune origin
git pull --ff-only origin "${PRODUCTION_BRANCH}"
npm ci --ignore-scripts --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build

[[ -f "${REPO_DIR}/dist/index.html" ]] || { echo "错误：生产构建缺少 dist/index.html。" >&2; exit 1; }

RELEASE_ID="$(date -u +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
RELEASES_DIR="${APP_ROOT}/releases"
RELEASE_DIR="${RELEASES_DIR}/${RELEASE_ID}"
CURRENT_LINK="${APP_ROOT}/current"
PREVIOUS_TARGET="$(readlink -f "${CURRENT_LINK}" 2>/dev/null || true)"

mkdir -p "${RELEASE_DIR}"
cp -a "${REPO_DIR}/dist/." "${RELEASE_DIR}/"
[[ -s "${RELEASE_DIR}/index.html" ]] || { echo "错误：新 release 验证失败。" >&2; exit 1; }

sudo nginx -t
ln -sfn "releases/${RELEASE_ID}" "${APP_ROOT}/current.next"
mv -Tf "${APP_ROOT}/current.next" "${CURRENT_LINK}"
sudo systemctl reload nginx

if ! curl --fail --silent --show-error --location --max-time 20 "${HEALTHCHECK_URL}" >/dev/null; then
  echo "错误：健康检查失败，正在恢复上一版本。" >&2
  if [[ -n "${PREVIOUS_TARGET}" && -d "${PREVIOUS_TARGET}" ]]; then
    ln -sfn "${PREVIOUS_TARGET}" "${APP_ROOT}/current.next"
    mv -Tf "${APP_ROOT}/current.next" "${CURRENT_LINK}"
    sudo systemctl reload nginx
  fi
  exit 1
fi

mapfile -t OLD_RELEASES < <(find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -r | tail -n "+$((RELEASE_KEEP + 1))")
for old_release in "${OLD_RELEASES[@]}"; do
  rm -rf "${RELEASES_DIR:?}/${old_release}"
done

echo "部署成功：${RELEASE_ID}"
echo "当前版本：$(readlink -f "${CURRENT_LINK}")"
