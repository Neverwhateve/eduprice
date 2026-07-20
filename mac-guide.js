(() => {
  const { apps, majors, appById } = window.MacGuideData;
  const storyPath = (id) => `assets/mac-guide/major-stories/${id}.jpg`;
  const appIcon = (app) => `<img class="app-icon" src="${app.iconPath.replace("/app-icons/", "assets/mac-guide/app-icons/")}" alt="${app.name}" />`;
  const majorGrid = document.querySelector("#major-grid");
  const detail = document.querySelector("#major-detail");
  const results = document.querySelector("#app-results");
  const count = document.querySelector("#app-count");
  const drawer = document.querySelector("#app-drawer");

  function updateHash(majorId, appId) {
    const hash = new URLSearchParams();
    if (majorId) hash.set("major", majorId);
    if (appId) hash.set("app", appId);
    history.pushState(null, "", hash.toString() ? `#${hash}` : location.pathname);
  }

  function readHash() {
    const hash = new URLSearchParams(location.hash.slice(1));
    return { majorId: hash.get("major"), appId: hash.get("app") };
  }

  function renderMajorGrid() {
    majorGrid.innerHTML = majors.map((major, index) => `
      <button class="major-card major-card-${index + 1}" type="button" data-major="${major.id}">
        <img src="${storyPath(major.id)}" alt="${major.name}学生学习场景" />
        <span class="major-card-shade"></span><span class="major-card-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="major-card-copy"><strong>${major.name}</strong><small>${major.shortDescription}</small><span class="major-card-icons">${major.appIds.map((id) => appIcon(appById[id])).join("")}</span></span>
      </button>`).join("");
    majorGrid.querySelectorAll("[data-major]").forEach((button) => button.addEventListener("click", () => selectMajor(button.dataset.major, true)));
  }

  function renderMajorDetail(major) {
    detail.hidden = false;
    detail.innerHTML = `<div class="guide-shell">
      <button class="detail-back" type="button">← 回到全部专业</button>
      <div class="detail-spotlight">
        <div class="detail-image"><img src="${storyPath(major.id)}" alt="${major.name}学生学习场景" /></div>
        <div class="detail-copy"><p class="guide-eyebrow">${major.name}</p><h2>${major.officialStory}</h2></div>
      </div>
      <p class="detail-app-label">${major.appCaption}</p>
      <div class="detail-app-grid">${major.appIds.map((id) => appCard(appById[id], major.id)).join("")}</div>
    </div>`;
    detail.querySelector(".detail-back").addEventListener("click", () => { updateHash(); detail.hidden = true; });
    bindAppButtons(detail);
  }

  function appCard(app, majorId) {
    return `<button class="guide-app-card" type="button" data-app="${app.id}" data-major-context="${majorId || ""}">${appIcon(app)}<span><strong>${app.name}</strong><small>${app.summary}</small></span><i aria-hidden="true">↗</i></button>`;
  }

  function selectMajor(id, shouldScroll) {
    const major = majors.find((item) => item.id === id);
    if (!major) return;
    updateHash(id);
    renderMajorDetail(major);
    if (shouldScroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderResults(query = "") {
    const needle = query.trim().toLocaleLowerCase();
    const filtered = apps.filter((app) => {
      const related = majors.filter((major) => major.appIds.includes(app.id)).map((major) => major.name);
      return [app.name, app.englishName || "", app.summary, ...app.keywords, ...related].join(" ").toLocaleLowerCase().includes(needle);
    });
    count.textContent = `找到 ${filtered.length} 个 App`;
    results.innerHTML = filtered.map((app) => appCard(app)).join("");
    bindAppButtons(results);
  }

  function bindAppButtons(scope) {
    scope.querySelectorAll("[data-app]").forEach((button) => button.addEventListener("click", () => openApp(button.dataset.app, button.dataset.majorContext)));
  }

  function openApp(id, majorId) {
    const app = appById[id];
    if (!app) return;
    updateHash(majorId || readHash().majorId, id);
    drawer.hidden = false;
    drawer.innerHTML = `<div class="app-drawer-backdrop" data-close></div><aside class="app-drawer" role="dialog" aria-modal="true" aria-label="${app.name} 详情">
      <button class="drawer-close" type="button" data-close aria-label="关闭">×</button>${appIcon(app)}<p class="guide-eyebrow">${app.category.join(" · ")}</p><h2>${app.name}</h2><p class="drawer-lead">${app.summary}</p>
      <section><h3>它主要能做什么</h3><ul>${app.mainUses.map((item) => `<li>${item}</li>`).join("")}</ul></section>
      <section><h3>学生会怎样使用</h3><ol>${app.studentScenarios.map((item) => `<li>${item}</li>`).join("")}</ol></section>
      <section><h3>为什么 Mac 很合适</h3><ul>${app.whyMacFits.map((item) => `<li>${item}</li>`).join("")}</ul></section>
      <section><h3>面对顾客可以这样说</h3><blockquote>${app.customerTalkingPoint}</blockquote></section>
      <a class="drawer-link" href="${app.officialUrl}" target="_blank" rel="noreferrer">访问官方来源 ↗</a>
    </aside>`;
    drawer.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeDrawer));
  }

  function closeDrawer() {
    const { majorId } = readHash();
    drawer.hidden = true;
    drawer.innerHTML = "";
    updateHash(majorId);
  }

  document.querySelector("#app-search").addEventListener("input", (event) => renderResults(event.target.value));
  window.addEventListener("hashchange", () => {
    const { majorId, appId } = readHash();
    if (majorId) renderMajorDetail(majors.find((item) => item.id === majorId));
    else detail.hidden = true;
    if (appId) openApp(appId, majorId);
    else { drawer.hidden = true; drawer.innerHTML = ""; }
  });

  renderMajorGrid();
  renderResults();
  const { majorId, appId } = readHash();
  if (majorId) renderMajorDetail(majors.find((item) => item.id === majorId));
  if (appId) openApp(appId, majorId);
})();
