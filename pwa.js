(function registerPwa() {
  "use strict";

  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;

  window.addEventListener("load", () => {
    const toast = document.querySelector("#update-toast");
    const toastText = document.querySelector("#update-toast-text");
    let refreshing = false;

    const showUpdateToast = (text) => {
      if (!toast || !toastText) return;
      toastText.textContent = text;
      toast.hidden = false;
    };

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      showUpdateToast("新版已缓存，正在刷新...");
      window.setTimeout(() => window.location.reload(), 600);
    });

    navigator.serviceWorker
      .register("sw.js", { updateViaCache: "none" })
      .then((registration) => {
        const checkForUpdates = () => registration.update().catch(() => {});

        if (registration.waiting && navigator.serviceWorker.controller) {
          showUpdateToast("新版已准备好，正在更新...");
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;
          if (navigator.serviceWorker.controller) showUpdateToast("发现新版，正在更新离线缓存...");

          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });

        checkForUpdates();
        window.setInterval(checkForUpdates, 60 * 60 * 1000);
      })
      .catch(() => {});
  });
})();
