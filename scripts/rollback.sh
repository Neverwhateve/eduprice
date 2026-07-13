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
DOMAIN="${DOMAIN:-}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-}"
RELEASES_DIR="${APP_ROOT}/releases"
CURRENT_LINK="${APP_ROOT}/current"
REQUESTED_RELEASE="${1:-}"

if [[ -z "${DOMAIN}" || "${DOMAIN}" == "<DOMAIN>" ]]; then
  echo "错误：请在 .env 中配置真实 DOMAIN。" >&2
  exit 1
fi
if [[ -z "${HEALTHCHECK_URL}" || "${HEALTHCHECK_URL}" == *"<DOMAIN>"* ]]; then
  HEALTHCHECK_URL="https://${DOMAIN}/"
fi

CURRENT_TARGET="$(readlink -f "${CURRENT_LINK}" 2>/dev/null || true)"
CURRENT_RELEASE="$(basename "${CURRENT_TARGET:-none}")"
mapfile -t RELEASES < <(find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -r)

if [[ ${#RELEASES[@]} -eq 0 ]]; then
  echo "错误：没有可用 release。" >&2
  exit 1
fi

echo "当前版本：${CURRENT_RELEASE}"
printf '可用版本：\n'
printf '  %s\n' "${RELEASES[@]}"

if [[ -n "${REQUESTED_RELEASE}" ]]; then
  TARGET_RELEASE="${REQUESTED_RELEASE}"
else
  TARGET_RELEASE=""
  for release in "${RELEASES[@]}"; do
    if [[ "${release}" != "${CURRENT_RELEASE}" ]]; then
      TARGET_RELEASE="${release}"
      break
    fi
  done
fi

TARGET_DIR="${RELEASES_DIR}/${TARGET_RELEASE}"
if [[ -z "${TARGET_RELEASE}" || ! -s "${TARGET_DIR}/index.html" ]]; then
  echo "错误：未找到有效的回滚版本 ${TARGET_RELEASE:-<无>}。" >&2
  exit 1
fi

sudo nginx -t
ln -sfn "releases/${TARGET_RELEASE}" "${APP_ROOT}/current.next"
mv -Tf "${APP_ROOT}/current.next" "${CURRENT_LINK}"
sudo systemctl reload nginx

if ! curl --fail --silent --show-error --location --max-time 20 "${HEALTHCHECK_URL}" >/dev/null; then
  echo "错误：回滚后的健康检查失败，正在恢复原版本。" >&2
  if [[ -n "${CURRENT_TARGET}" && -d "${CURRENT_TARGET}" ]]; then
    ln -sfn "${CURRENT_TARGET}" "${APP_ROOT}/current.next"
    mv -Tf "${APP_ROOT}/current.next" "${CURRENT_LINK}"
    sudo systemctl reload nginx
  fi
  exit 1
fi

echo "回滚成功：${TARGET_RELEASE}"
