const macProducts = [
  { model: "13 Macbook Air", chip: "M5", cpu: "8C GPU", memory: "16GB", storage: "512GB", officialPrice: 9999, eduPrice: 9249 },
  { model: "13 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "24GB", storage: "512GB", officialPrice: 11499, eduPrice: 10749 },
  { model: "13 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "16GB", storage: "1TB", officialPrice: 12249, eduPrice: 11499 },
  { model: "13 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "24GB", storage: "1TB", officialPrice: 13749, eduPrice: 12999 },
  { model: "15 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "16GB", storage: "512GB", officialPrice: 11999, eduPrice: 11249 },
  { model: "15 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "24GB", storage: "512GB", officialPrice: 13499, eduPrice: 12749 },
  { model: "15 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "16GB", storage: "1TB", officialPrice: 14249, eduPrice: 13499 },
  { model: "15 Macbook Air", chip: "M5", cpu: "10C GPU", memory: "24GB", storage: "1TB", officialPrice: 15749, eduPrice: 14999 },
  { model: "14 Macbook Pro", chip: "M5", cpu: "10C /10C GPU", memory: "16GB", storage: "1TB", officialPrice: 15999, eduPrice: 15199 },
  { model: "14 Macbook Pro", chip: "M5", cpu: "10C /10C GPU", memory: "16GB", storage: "1TB/NT", officialPrice: 17124, eduPrice: 16212 },
  { model: "14 Macbook Pro", chip: "M5", cpu: "10C /10C GPU", memory: "24GB", storage: "1TB", officialPrice: 17499, eduPrice: 16699 },
  { model: "14 Macbook Pro", chip: "M5", cpu: "10C /10C GPU", memory: "32GB", storage: "1TB", officialPrice: 18999, eduPrice: 18199 },
  { model: "14 Macbook Pro", chip: "M5 Pro", cpu: "15C /16C GPU", memory: "24GB", storage: "1TB", officialPrice: 19999, eduPrice: 18799 },
  { model: "14 Macbook Pro", chip: "M5 Pro", cpu: "15C /16C GPU", memory: "24GB", storage: "2TB", officialPrice: 23749, eduPrice: 22174 },
  { model: "14 Macbook Pro", chip: "M5 Pro", cpu: "18C /20C GPU", memory: "24GB", storage: "2TB", officialPrice: 25999, eduPrice: 24399 },
  { model: "14 Macbook Pro", chip: "M5 Pro", cpu: "18C /20C GPU", memory: "48GB", storage: "2TB/NT", officialPrice: 31624, eduPrice: 29462 },
  { model: "14 Macbook Pro", chip: "M5 Max", cpu: "18C /32C GPU", memory: "36GB", storage: "2TB", officialPrice: 33999, eduPrice: 31499 },
  { model: "16 Macbook Pro", chip: "16 Pro M5 Pro", cpu: "18C /20C GPU", memory: "24GB", storage: "1TB", officialPrice: 24999, eduPrice: 23399 },
  { model: "16 Macbook Pro", chip: "16 Pro M5 Pro", cpu: "18C /20C GPU", memory: "48GB", storage: "1TB", officialPrice: 29499, eduPrice: 27899 },
  { model: "16 Macbook Pro", chip: "M5 Max", cpu: "18C /32C GPU", memory: "36GB", storage: "2TB", officialPrice: 35999, eduPrice: 33499 },
  { model: "16 Macbook Pro", chip: "M5 Max", cpu: "18C /40C GPU", memory: "48GB", storage: "2TB", officialPrice: 40999, eduPrice: 38499 },
];

const ipadProducts = [
  { model: "11 英寸 iPad Air", storage: "128 GB", network: "无线局域网", officialPrice: 5999, eduPrice: 5599 },
  { model: "11 英寸 iPad Air", storage: "256 GB", network: "无线局域网", officialPrice: 6499, eduPrice: 6099 },
  { model: "11 英寸 iPad Air", storage: "512 GB", network: "无线局域网", officialPrice: 8199, eduPrice: 7799 },
  { model: "11 英寸 iPad Air", storage: "1 TB", network: "无线局域网", officialPrice: 10699, eduPrice: 10299 },
  { model: "11 英寸 iPad Air", storage: "128 GB", network: "无线局域网+蜂窝网络", officialPrice: 7299, eduPrice: 6899 },
  { model: "11 英寸 iPad Air", storage: "256 GB", network: "无线局域网+蜂窝网络", officialPrice: 7799, eduPrice: 7399 },
  { model: "11 英寸 iPad Air", storage: "512 GB", network: "无线局域网+蜂窝网络", officialPrice: 9499, eduPrice: 9099 },
  { model: "11 英寸 iPad Air", storage: "1 TB", network: "无线局域网+蜂窝网络", officialPrice: 11999, eduPrice: 11599 },
  { model: "13 英寸 iPad Air", storage: "128 GB", network: "无线局域网", officialPrice: 7699, eduPrice: 7299 },
  { model: "13 英寸 iPad Air", storage: "256 GB", network: "无线局域网", officialPrice: 8199, eduPrice: 7799 },
  { model: "13 英寸 iPad Air", storage: "512 GB", network: "无线局域网", officialPrice: 9899, eduPrice: 9499 },
  { model: "13 英寸 iPad Air", storage: "1 TB", network: "无线局域网", officialPrice: 12399, eduPrice: 11999 },
  { model: "13 英寸 iPad Air", storage: "128 GB", network: "无线局域网+蜂窝网络", officialPrice: 8999, eduPrice: 8599 },
  { model: "13 英寸 iPad Air", storage: "256 GB", network: "无线局域网+蜂窝网络", officialPrice: 9499, eduPrice: 9099 },
  { model: "13 英寸 iPad Air", storage: "512 GB", network: "无线局域网+蜂窝网络", officialPrice: 11199, eduPrice: 10799 },
  { model: "13 英寸 iPad Air", storage: "1 TB", network: "无线局域网+蜂窝网络", officialPrice: 13699, eduPrice: 13299 },
  { model: "11 英寸 iPad Pro", storage: "256 GB", network: "无线局域网", officialPrice: 10799, eduPrice: 9899 },
  { model: "11 英寸 iPad Pro", storage: "512 GB", network: "无线局域网", officialPrice: 12499, eduPrice: 11599 },
  { model: "11 英寸 iPad Pro", storage: "1 TB", network: "无线局域网", officialPrice: 15899, eduPrice: 14999 },
  { model: "11 英寸 iPad Pro", storage: "1 TB NT", network: "无线局域网", officialPrice: 16699, eduPrice: 15799 },
  { model: "11 英寸 iPad Pro", storage: "2 TB", network: "无线局域网", officialPrice: 20099, eduPrice: 19199 },
  { model: "11 英寸 iPad Pro", storage: "2 TB NT", network: "无线局域网", officialPrice: 20899, eduPrice: 19999 },
  { model: "11 英寸 iPad Pro", storage: "256 GB", network: "无线局域网+蜂窝网络", officialPrice: 12499, eduPrice: 11599 },
  { model: "11 英寸 iPad Pro", storage: "512 GB", network: "无线局域网+蜂窝网络", officialPrice: 14199, eduPrice: 13299 },
  { model: "11 英寸 iPad Pro", storage: "1 TB", network: "无线局域网+蜂窝网络", officialPrice: 17599, eduPrice: 16699 },
  { model: "11 英寸 iPad Pro", storage: "1 TB NT", network: "无线局域网+蜂窝网络", officialPrice: 18399, eduPrice: 17499 },
  { model: "11 英寸 iPad Pro", storage: "2 TB", network: "无线局域网+蜂窝网络", officialPrice: 21799, eduPrice: 20899 },
  { model: "11 英寸 iPad Pro", storage: "2 TB NT", network: "无线局域网+蜂窝网络", officialPrice: 22599, eduPrice: 21699 },
  { model: "13 英寸 iPad Pro", storage: "256 GB", network: "无线局域网", officialPrice: 13299, eduPrice: 12399 },
  { model: "13 英寸 iPad Pro", storage: "512 GB", network: "无线局域网", officialPrice: 14999, eduPrice: 14099 },
  { model: "13 英寸 iPad Pro", storage: "1 TB", network: "无线局域网", officialPrice: 18399, eduPrice: 17499 },
  { model: "13 英寸 iPad Pro", storage: "1 TB NT", network: "无线局域网", officialPrice: 19199, eduPrice: 18299 },
  { model: "13 英寸 iPad Pro", storage: "2 TB", network: "无线局域网", officialPrice: 22599, eduPrice: 21699 },
  { model: "13 英寸 iPad Pro", storage: "2 TB NT", network: "无线局域网", officialPrice: 23399, eduPrice: 22499 },
  { model: "13 英寸 iPad Pro", storage: "256 GB", network: "无线局域网+蜂窝网络", officialPrice: 14999, eduPrice: 14099 },
  { model: "13 英寸 iPad Pro", storage: "512 GB", network: "无线局域网+蜂窝网络", officialPrice: 16699, eduPrice: 15799 },
  { model: "13 英寸 iPad Pro", storage: "1 TB", network: "无线局域网+蜂窝网络", officialPrice: 20099, eduPrice: 19199 },
  { model: "13 英寸 iPad Pro", storage: "1 TB NT", network: "无线局域网+蜂窝网络", officialPrice: 20899, eduPrice: 19999 },
  { model: "13 英寸 iPad Pro", storage: "2 TB", network: "无线局域网+蜂窝网络", officialPrice: 24299, eduPrice: 23399 },
  { model: "13 英寸 iPad Pro", storage: "2 TB NT", network: "无线局域网+蜂窝网络", officialPrice: 25099, eduPrice: 24199 },
];

const accessoryProducts = [
  { model: "Apple Pencil （第一代）", officialPrice: 799, eduPrice: 709 },
  { model: "Apple Pencil （第二代）", officialPrice: 999, eduPrice: 899 },
  { model: "Apple Pencil Pro", officialPrice: 999, eduPrice: 899 },
  { model: "Apple Pencil （USB-C）", officialPrice: 649, eduPrice: 569 },
  { model: "妙控键盘（适用于 11 英寸 iPad Air）", officialPrice: 2199, eduPrice: 1999 },
  { model: "妙控键盘（适用于 13 英寸 iPad Air）", officialPrice: 2399, eduPrice: 2199 },
  { model: "妙控键盘（适用于 11 英寸 iPad Pro）", officialPrice: 2399, eduPrice: 2199 },
  { model: "妙控键盘（适用于 13 英寸 iPad Pro）", officialPrice: 2799, eduPrice: 2599 },
  { model: "妙控键盘双面夹（适用于 iPad A16）", officialPrice: 1999, eduPrice: 1819 },
];

const catalog = {
  mac: {
    label: "Mac",
    countLabel: "款 Mac 配置",
    products: macProducts,
    modeLabels: ["直接选择", "分步选择"],
    steps: ["型号尺寸", "CPU / GPU", "内存", "容量"],
    resultLabels: ["芯片", "CPU / GPU", "内存", "硬盘"],
  },
  ipad: {
    label: "iPad",
    countLabel: "款 iPad 配置",
    products: ipadProducts,
    modeLabels: ["直接选择", "分步选择"],
    steps: ["选择机型", "选择容量", "选择网络", "确认配置"],
    resultLabels: ["产品", "容量", "网络", "备注"],
  },
  acc: {
    label: "配件",
    countLabel: "款教育优惠配件",
    products: accessoryProducts,
    modeLabels: ["配件列表", "按类型浏览"],
    steps: ["选择类型", "选择配件", "价格", "确认"],
    resultLabels: ["类型", "适用", "配置", "备注"],
  },
};

Object.values(catalog).forEach((group) => {
  group.products.forEach((item, index) => {
    item.id = `${group.label}-${index + 1}`;
    item.saving = item.officialPrice - item.eduPrice;
  });
});

if (document.querySelector("#model-options")) {
const modelOptions = document.querySelector("#model-options");
const configOptions = document.querySelector("#config-options");
const stepModelOptions = document.querySelector("#step-model-options");
const stepCpuOptions = document.querySelector("#step-cpu-options");
const stepMemoryOptions = document.querySelector("#step-memory-options");
const stepStorageOptions = document.querySelector("#step-storage-options");
const cardPicker = document.querySelector("#card-picker");
const stepPicker = document.querySelector("#step-picker");
const categoryButtons = document.querySelectorAll(".category-button");
const modeSwitch = document.querySelector("#mode-switch");
const cardModeButton = document.querySelector("#card-mode");
const stepModeButton = document.querySelector("#step-mode");
const cardModelHint = document.querySelector("#card-model-hint");
const cardConfigHint = document.querySelector("#card-config-hint");
const stepModelHint = document.querySelector("#step-model-hint");
const stepCpuHint = document.querySelector("#step-cpu-hint");
const stepMemoryHint = document.querySelector("#step-memory-hint");
const stepStorageHint = document.querySelector("#step-storage-hint");
const addToCartButton = document.querySelector("#add-to-cart");
const calculateCartTaxButton = document.querySelector("#calculate-cart-tax");
const clearCartButton = document.querySelector("#clear-cart");
const cartCount = document.querySelector("#cart-count");
const cartEduTotal = document.querySelector("#cart-edu-total");
const cartOfficialTotal = document.querySelector("#cart-official-total");
const cartSavingTotal = document.querySelector("#cart-saving-total");
const cartEmpty = document.querySelector("#cart-empty");
const cartItems = document.querySelector("#cart-items");
const comparisonWrap = document.querySelector("#comparison-wrap");
const comparisonBody = document.querySelector("#comparison-body");
let activeCategory = "mac";
let activeMode = "card";
let selectedModel = macProducts[0].model;
let selectedId = macProducts[0].id;
let selectedCpu = macProducts[0].cpu;
let selectedMemory = macProducts[0].memory;
let selectedStorage = macProducts[0].storage;
let selectedNetwork = ipadProducts[0].network;
let selectedAccessoryType = accessoryType(accessoryProducts[0]);
let cartIds = [];
let focusStepTimer;
const mobileFlowQuery = window.matchMedia("(max-width: 720px)");

function products() {
  return catalog[activeCategory].products;
}

function allProducts() {
  return Object.values(catalog).flatMap((group) => group.products);
}

function productCategory(item) {
  return Object.entries(catalog).find(([, group]) => group.products.includes(item))?.[0] || "mac";
}

function productCategoryLabel(item) {
  return catalog[productCategory(item)].label;
}

function price(value) {
  return window.TaxUtils.formatCurrency(value);
}

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-CN", { numeric: true }),
  );
}

function uniqueModels() {
  return uniqueValues(products(), "model");
}

function selectedProduct() {
  return products().find((item) => item.id === selectedId);
}

function cartProducts() {
  return cartIds.map((id) => allProducts().find((item) => item.id === id)).filter(Boolean);
}

function modelItems(model = selectedModel) {
  return products().filter((item) => item.model === model);
}

function cpuItems(cpu = selectedCpu) {
  return modelItems().filter((item) => item.cpu === cpu);
}

function memoryItems(memory = selectedMemory) {
  return cpuItems().filter((item) => item.memory === memory);
}

function storageItems(storage = selectedStorage) {
  return modelItems().filter((item) => item.storage === storage);
}

function accessoryType(item) {
  return item.model.includes("Pencil") ? "Apple Pencil" : "键盘";
}

function accessoryTypeItems(type = selectedAccessoryType) {
  return products().filter((item) => accessoryType(item) === type);
}

function lowestPriceText(items) {
  return `${price(Math.min(...items.map((item) => item.eduPrice)))} 起`;
}

function modelSummary(model) {
  const items = modelItems(model);
  return `${items.length} 种配置 · ${lowestPriceText(items)}`;
}

function selectProduct(item) {
  selectedModel = item.model;
  selectedCpu = item.cpu || "";
  selectedMemory = item.memory || "";
  selectedStorage = item.storage || "";
  selectedNetwork = item.network || "";
  selectedAccessoryType = activeCategory === "acc" ? accessoryType(item) : selectedAccessoryType;
  selectedId = item.id;
}

function syncMacSelections() {
  const cpus = uniqueValues(modelItems(), "cpu");
  if (!cpus.includes(selectedCpu)) selectedCpu = cpus[0];

  const memories = uniqueValues(cpuItems(), "memory");
  if (!memories.includes(selectedMemory)) selectedMemory = memories[0];

  const storages = uniqueValues(memoryItems(), "storage");
  if (!storages.includes(selectedStorage)) selectedStorage = storages[0];

  const matches = memoryItems().filter((item) => item.storage === selectedStorage);
  const selected = selectedProduct();
  if (
    !selected ||
    selected.model !== selectedModel ||
    selected.cpu !== selectedCpu ||
    selected.memory !== selectedMemory ||
    selected.storage !== selectedStorage
  ) {
    selectedId = matches.sort((a, b) => a.eduPrice - b.eduPrice)[0].id;
  }
}

function syncIpadSelections() {
  const storages = uniqueValues(modelItems(), "storage");
  if (!storages.includes(selectedStorage)) selectedStorage = storages[0];

  const networks = uniqueValues(storageItems(), "network");
  if (!networks.includes(selectedNetwork)) selectedNetwork = networks[0];

  const selected = selectedProduct();
  const match = storageItems().find((item) => item.network === selectedNetwork);
  if (
    !selected ||
    selected.model !== selectedModel ||
    selected.storage !== selectedStorage ||
    selected.network !== selectedNetwork
  ) {
    selectedId = match.id;
  }
}

function syncAccessorySelections() {
  const types = uniqueValues(products().map((item) => ({ type: accessoryType(item) })), "type");
  if (!types.includes(selectedAccessoryType)) selectedAccessoryType = types[0];

  const selected = selectedProduct();
  if (!selected || accessoryType(selected) !== selectedAccessoryType) {
    selectedId = accessoryTypeItems()[0].id;
  }
}

function syncSelections() {
  if (activeCategory === "mac") syncMacSelections();
  if (activeCategory === "ipad") syncIpadSelections();
  if (activeCategory === "acc") syncAccessorySelections();
}

function setMode(mode) {
  activeMode = mode;
  const isCardMode = mode === "card";
  cardPicker.classList.toggle("is-active", isCardMode);
  stepPicker.classList.toggle("is-active", !isCardMode);
  cardModeButton.classList.toggle("is-active", isCardMode);
  stepModeButton.classList.toggle("is-active", !isCardMode);
  cardModeButton.setAttribute("aria-selected", String(isCardMode));
  stepModeButton.setAttribute("aria-selected", String(!isCardMode));
}

function setCategory(category) {
  activeCategory = category;
  activeMode = "card";
  const first = products()[0];
  selectProduct(first);
  syncSelections();
  render();
}

function clearFocusedStep() {
  document.querySelectorAll(".is-next-focus").forEach((step) => {
    step.classList.remove("is-next-focus");
  });
}

function guideToNextChoice(target, offset = 18, alignToSection = true) {
  clearTimeout(focusStepTimer);
  clearFocusedStep();

  requestAnimationFrame(() => {
    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;

    const anchor = alignToSection ? element.closest(".step") || element : element;
    anchor.classList.add("is-next-focus");
    focusStepTimer = window.setTimeout(() => {
      anchor.classList.remove("is-next-focus");
    }, 1600);

    if (mobileFlowQuery.matches) {
      const top = anchor.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  });
}

function makeChoiceCard({ title, subtitle, meta = [], priceText, selected, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice-card";
  if (selected) button.classList.add("is-selected");
  const metaHtml = meta.length
    ? `<div class="card-meta">${meta.map((item) => `<span class="${item.className || ""}">${item.text}</span>`).join("")}</div>`
    : "";
  button.innerHTML = `
    <strong>${title}</strong>
    ${subtitle ? `<span>${subtitle}</span>` : ""}
    ${metaHtml}
    ${priceText ? `<div class="card-price">${priceText}</div>` : ""}
  `;
  button.addEventListener("click", onClick);
  return button;
}

function configTitle(item) {
  const category = productCategory(item);
  if (category === "mac") return `${item.memory} / ${item.storage}`;
  if (category === "ipad") return `${item.storage} · ${item.network}`;
  return item.model;
}

function itemSpecs(item) {
  const category = productCategory(item);
  if (category === "mac") {
    return [item.chip, item.cpu, item.memory, item.storage];
  }
  if (category === "ipad") {
    return ["iPad", item.storage, item.network, item.storage.includes("NT") ? "纳米纹理玻璃" : "标准玻璃"];
  }
  return [accessoryType(item), item.model.includes("适用于") ? item.model.match(/（(.+)）/)?.[1] || "-" : "-", "-", "配件"];
}

function cartItemSubtitle(item) {
  const category = productCategory(item);
  if (category === "mac") return `${item.chip} · ${item.cpu} · ${item.memory} · ${item.storage}`;
  if (category === "ipad") return `${item.storage} · ${item.network}`;
  return accessoryType(item);
}

function addSelectedToCart() {
  const item = selectedProduct();
  if (!item || cartIds.includes(item.id)) return;
  cartIds = [...cartIds, item.id];
  renderCart();
  renderResult();
  guideToNextChoice(".cart-panel", 18);
}

function removeFromCart(id) {
  cartIds = cartIds.filter((itemId) => itemId !== id);
  renderCart();
  renderResult();
}

function clearCart() {
  cartIds = [];
  renderCart();
  renderResult();
}

function requestCartTaxEstimate() {
  const items = cartProducts();
  if (!items.length) return;
  const officialTotal = items.reduce((sum, item) => sum + item.officialPrice, 0);
  window.dispatchEvent(
    new CustomEvent("eduprice:carttaxrequest", {
      detail: {
        itemCount: items.length,
        officialTotal,
      },
    }),
  );
}

function renderModels() {
  modelOptions.replaceChildren();

  if (activeCategory === "acc") {
    uniqueValues(products().map((item) => ({ type: accessoryType(item) })), "type").forEach((type) => {
      const items = accessoryTypeItems(type);
      modelOptions.append(
        makeChoiceCard({
          title: type,
          subtitle: `${items.length} 款配件 · ${lowestPriceText(items)}`,
          selected: type === selectedAccessoryType,
          onClick: () => {
            selectedAccessoryType = type;
            syncSelections();
            render();
            guideToNextChoice("#config-options", 100);
          },
        }),
      );
    });
    return;
  }

  uniqueModels().forEach((model) => {
    modelOptions.append(
      makeChoiceCard({
        title: model,
        subtitle: modelSummary(model),
        selected: model === selectedModel,
        onClick: () => {
          selectedModel = model;
          syncSelections();
          render();
          guideToNextChoice("#config-options", 100);
        },
      }),
    );
  });
}

function renderConfigs() {
  configOptions.replaceChildren();

  const items = activeCategory === "acc" ? accessoryTypeItems() : modelItems();
  items.forEach((item) => {
    configOptions.append(
      makeChoiceCard({
        title: configTitle(item),
        subtitle:
          activeCategory === "mac"
            ? `${item.chip} · ${item.cpu}`
            : activeCategory === "ipad"
              ? item.model
              : accessoryType(item),
        meta: [
          { text: `官网 ${price(item.officialPrice)}` },
          { text: `省 ${price(item.saving)}`, className: "saving-meta" },
        ],
        priceText: price(item.eduPrice),
        selected: item.id === selectedId,
        onClick: () => {
          selectProduct(item);
          render();
          guideToNextChoice(".result-panel");
        },
      }),
    );
  });
}

function renderStepModels() {
  stepModelOptions.replaceChildren();

  if (activeCategory === "acc") {
    renderAccessoryTypeStep();
    return;
  }

  uniqueModels().forEach((model) => {
    const items = modelItems(model);
    stepModelOptions.append(
      makeChoiceCard({
        title: model,
        subtitle: lowestPriceText(items),
        selected: model === selectedModel,
        onClick: () => {
          selectedModel = model;
          syncSelections();
          render();
          guideToNextChoice("#step-cpu-options");
        },
      }),
    );
  });
}

function renderStepCpus() {
  stepCpuOptions.replaceChildren();

  if (activeCategory === "ipad") {
    uniqueValues(modelItems(), "storage").forEach((storage) => {
      const items = modelItems().filter((item) => item.storage === storage);
      stepCpuOptions.append(
        makeChoiceCard({
          title: storage,
          subtitle: `${items.length} 种网络 · ${lowestPriceText(items)}`,
          selected: storage === selectedStorage,
          onClick: () => {
            selectedStorage = storage;
            syncSelections();
            render();
            guideToNextChoice("#step-memory-options");
          },
        }),
      );
    });
    return;
  }

  if (activeCategory === "acc") {
    accessoryTypeItems().forEach((item) => {
      stepCpuOptions.append(
        makeChoiceCard({
          title: item.model,
          subtitle: `${price(item.eduPrice)} · 省 ${price(item.saving)}`,
          selected: item.id === selectedId,
          onClick: () => {
            selectProduct(item);
            render();
            guideToNextChoice(".result-panel");
          },
        }),
      );
    });
    return;
  }

  uniqueValues(modelItems(), "cpu").forEach((cpu) => {
    const items = modelItems().filter((item) => item.cpu === cpu);
    stepCpuOptions.append(
      makeChoiceCard({
        title: cpu,
        subtitle: `${items.length} 种配置 · ${lowestPriceText(items)}`,
        selected: cpu === selectedCpu,
        onClick: () => {
          selectedCpu = cpu;
          syncSelections();
          render();
          guideToNextChoice("#step-memory-options");
        },
      }),
    );
  });
}

function renderStepMemories() {
  stepMemoryOptions.replaceChildren();

  if (activeCategory === "ipad") {
    uniqueValues(storageItems(), "network").forEach((network) => {
      const item = storageItems().find((entry) => entry.network === network);
      stepMemoryOptions.append(
        makeChoiceCard({
          title: network,
          subtitle: price(item.eduPrice),
          selected: network === selectedNetwork,
          onClick: () => {
            selectedNetwork = network;
            syncSelections();
            render();
            guideToNextChoice("#step-storage-options");
          },
        }),
      );
    });
    return;
  }

  if (activeCategory === "acc") {
    const item = selectedProduct();
    stepMemoryOptions.append(
      makeChoiceCard({
        title: item ? price(item.eduPrice) : "-",
        subtitle: item ? `官网 ${price(item.officialPrice)} · 省 ${price(item.saving)}` : "",
        selected: true,
        onClick: () => guideToNextChoice(".result-panel"),
      }),
    );
    return;
  }

  uniqueValues(cpuItems(), "memory").forEach((memory) => {
    const items = cpuItems().filter((item) => item.memory === memory);
    stepMemoryOptions.append(
      makeChoiceCard({
        title: memory,
        subtitle: `${items.length} 种容量 · ${lowestPriceText(items)}`,
        selected: memory === selectedMemory,
        onClick: () => {
          selectedMemory = memory;
          syncSelections();
          render();
          guideToNextChoice("#step-storage-options");
        },
      }),
    );
  });
}

function renderStepStorages() {
  stepStorageOptions.replaceChildren();

  if (activeCategory === "ipad" || activeCategory === "acc") {
    const item = selectedProduct();
    if (!item) return;
    stepStorageOptions.append(
      makeChoiceCard({
        title: item.model,
        subtitle: activeCategory === "ipad" ? `${item.storage} · ${item.network}` : accessoryType(item),
        priceText: price(item.eduPrice),
        selected: true,
        onClick: () => guideToNextChoice(".result-panel"),
      }),
    );
    return;
  }

  uniqueValues(memoryItems(), "storage").forEach((storage) => {
    const items = memoryItems().filter((item) => item.storage === storage);
    const label = items.length > 1 ? `${items.length} 种芯片 · ${lowestPriceText(items)}` : price(items[0].eduPrice);
    stepStorageOptions.append(
      makeChoiceCard({
        title: storage,
        subtitle: label,
        selected: storage === selectedStorage,
        onClick: () => {
          selectedStorage = storage;
          syncSelections();
          render();
          guideToNextChoice(".result-panel");
        },
      }),
    );
  });
}

function renderAccessoryTypeStep() {
  uniqueValues(products().map((item) => ({ type: accessoryType(item) })), "type").forEach((type) => {
    const items = accessoryTypeItems(type);
    stepModelOptions.append(
      makeChoiceCard({
        title: type,
        subtitle: `${items.length} 款 · ${lowestPriceText(items)}`,
        selected: type === selectedAccessoryType,
        onClick: () => {
          selectedAccessoryType = type;
          syncSelections();
          render();
          guideToNextChoice("#step-cpu-options");
        },
      }),
    );
  });
}

function renderResult() {
  const item = selectedProduct();
  const group = catalog[activeCategory];
  document.querySelector("#catalog-count").textContent = `${products().length} ${group.countLabel}`;

  if (!item) return;

  document.querySelector("#result-model").textContent = item.model;
  document.querySelector("#result-edu").textContent = price(item.eduPrice);
  document.querySelector("#result-official").textContent = price(item.officialPrice);
  document.querySelector("#result-saving").textContent = price(item.saving);

  const specs = itemSpecs(item);

  group.resultLabels.forEach((label, index) => {
    document.querySelector(`#result-spec-${index + 1}-label`).textContent = label;
  });
  document.querySelector("#result-chip").textContent = specs[0] || "-";
  document.querySelector("#result-cpu").textContent = specs[1] || "-";
  document.querySelector("#result-memory").textContent = specs[2] || "-";
  document.querySelector("#result-storage").textContent = specs[3] || "-";

  const isAdded = cartIds.includes(item.id);
  addToCartButton.textContent = isAdded ? "已在组合中" : "加入组合";
  addToCartButton.disabled = isAdded;

  window.dispatchEvent(
    new CustomEvent("eduprice:selectionchange", {
      detail: {
        category: activeCategory,
        product: { ...item },
      },
    }),
  );
}

function renderCart() {
  const items = cartProducts();
  const eduTotal = items.reduce((sum, item) => sum + item.eduPrice, 0);
  const officialTotal = items.reduce((sum, item) => sum + item.officialPrice, 0);
  const savingTotal = items.reduce((sum, item) => sum + item.saving, 0);

  cartCount.textContent = `${items.length} ${items.length === 1 ? "台" : "件"}`;
  cartEduTotal.textContent = price(eduTotal);
  cartOfficialTotal.textContent = price(officialTotal);
  cartSavingTotal.textContent = price(savingTotal);
  calculateCartTaxButton.disabled = items.length === 0;
  clearCartButton.disabled = items.length === 0;
  cartEmpty.hidden = items.length > 0;
  comparisonWrap.hidden = items.length === 0;

  cartItems.replaceChildren();
  comparisonBody.replaceChildren();

  items.forEach((item) => {
    const itemNode = document.createElement("article");
    itemNode.className = "cart-item";
    itemNode.innerHTML = `
      <div>
        <strong>${item.model}</strong>
        <span>${productCategoryLabel(item)} · ${cartItemSubtitle(item)}</span>
      </div>
      <div class="cart-item-price">
        <strong>${price(item.eduPrice)}</strong>
        <span>省 ${price(item.saving)}</span>
      </div>
      <button type="button" aria-label="移除 ${item.model}">移除</button>
    `;
    itemNode.querySelector("button").addEventListener("click", () => removeFromCart(item.id));
    cartItems.append(itemNode);

    const specs = itemSpecs(item);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${item.model}</strong></td>
      <td>${productCategoryLabel(item)}</td>
      <td>${specs[0] || "-"}</td>
      <td>${specs[1] || "-"}</td>
      <td>${specs[2] || "-"}</td>
      <td>${specs[3] || "-"}</td>
      <td><strong>${price(item.eduPrice)}</strong></td>
      <td class="saving-cell">${price(item.saving)}</td>
    `;
    comparisonBody.append(row);
  });
}

function renderHints() {
  const item = selectedProduct();
  const group = catalog[activeCategory];
  const stepTitles = document.querySelectorAll("#step-picker .step-title h2");
  stepTitles.forEach((title, index) => {
    title.textContent = group.steps[index];
  });

  cardModeButton.textContent = group.modeLabels[0];
  stepModeButton.textContent = group.modeLabels[1];

  if (activeCategory === "mac") {
    const modelCount = modelItems().length;
    const cpuCount = uniqueValues(modelItems(), "cpu").length;
    const memoryCount = uniqueValues(cpuItems(), "memory").length;
    const storageCount = uniqueValues(memoryItems(), "storage").length;
    cardModelHint.textContent = selectedModel;
    cardConfigHint.textContent = item ? `${selectedModel} · 当前 ${configTitle(item)} · ${price(item.eduPrice)}` : `${selectedModel} · ${modelCount} 种配置可选`;
    stepModelHint.textContent = selectedModel;
    stepCpuHint.textContent = `${selectedModel} · ${cpuCount} 种 CPU/GPU`;
    stepMemoryHint.textContent = `${selectedCpu} · ${memoryCount} 种内存`;
    stepStorageHint.textContent = item ? `${selectedMemory} · 当前 ${selectedStorage} · ${price(item.eduPrice)}` : `${selectedMemory} · ${storageCount} 种容量`;
    return;
  }

  if (activeCategory === "ipad") {
    cardModelHint.textContent = selectedModel;
    cardConfigHint.textContent = item ? `${selectedModel} · 当前 ${item.storage} · ${item.network}` : `${selectedModel} · ${modelItems().length} 种配置`;
    stepModelHint.textContent = selectedModel;
    stepCpuHint.textContent = `${selectedModel} · ${uniqueValues(modelItems(), "storage").length} 种容量`;
    stepMemoryHint.textContent = `${selectedStorage} · ${uniqueValues(storageItems(), "network").length} 种网络`;
    stepStorageHint.textContent = item ? `${item.network} · ${price(item.eduPrice)}` : "选择后查看价格";
    return;
  }

  cardModelHint.textContent = selectedAccessoryType;
  cardConfigHint.textContent = `${selectedAccessoryType} · ${accessoryTypeItems().length} 款可选`;
  stepModelHint.textContent = selectedAccessoryType;
  stepCpuHint.textContent = `${selectedAccessoryType} · 选择配件`;
  stepMemoryHint.textContent = item ? `${item.model} · ${price(item.eduPrice)}` : "选择后查看价格";
  stepStorageHint.textContent = item ? `省 ${price(item.saving)}` : "确认价格";
}

function renderCategoryButtons() {
  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === activeCategory;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  modeSwitch.classList.toggle("is-compact", activeCategory === "acc");
}

function render() {
  syncSelections();
  renderCategoryButtons();
  setMode(activeMode);
  renderHints();
  renderModels();
  renderConfigs();
  renderStepModels();
  renderStepCpus();
  renderStepMemories();
  renderStepStorages();
  renderResult();
  renderCart();
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
  });
});

cardModeButton.addEventListener("click", () => {
  setMode("card");
});

stepModeButton.addEventListener("click", () => {
  setMode("step");
});

addToCartButton.addEventListener("click", addSelectedToCart);
calculateCartTaxButton.addEventListener("click", requestCartTaxEstimate);
clearCartButton.addEventListener("click", clearCart);

window.eduPriceApp = Object.freeze({
  getSelectedProduct: () => {
    const item = selectedProduct();
    return item ? { ...item } : null;
  },
  getActiveCategory: () => activeCategory,
});

render();
}

(() => {
  "use strict";

  const root = document.querySelector("#app");
  if (!root) return;

  const utils = window.TaxUtils;
  const allProducts = Object.values(catalog).flatMap((group) => group.products);
  const storageKey = "eduquote:v1";
  const settingsKey = "eduquote:settings:v1";
  const familyOrder = ["MacBook Air", "MacBook Pro", "iPad Air", "iPad Pro", "Accessories"];
  const initialProduct = allProducts[0];

  const state = {
    view: "products",
    selectedId: initialProduct.id,
    mode: "education",
    draft: [],
    sheet: null,
    search: "",
    searchOpen: false,
    presenting: false,
    toast: "",
  };

  let saved = load(storageKey, []);
  let history = load(`${storageKey}:history`, []);
  let settings = load(settingsKey, { theme: "system", contrast: false, reduceMotion: false, currency: "CNY" });

  function load(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(saved));
    localStorage.setItem(`${storageKey}:history`, JSON.stringify(history.slice(0, 80)));
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }

  function clone(value) {
    return window.structuredClone ? window.structuredClone(value) : JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);
  }

  function money(value) {
    return utils?.formatCurrency ? utils.formatCurrency(value) : `¥ ${new Intl.NumberFormat("zh-CN").format(value)}`;
  }

  function familyOf(item) {
    if (item.id?.startsWith("配件-")) return "Accessories";
    if (item.model.includes("Macbook Air")) return "MacBook Air";
    if (item.model.includes("Macbook Pro")) return "MacBook Pro";
    if (item.model.includes("iPad Air")) return "iPad Air";
    if (item.model.includes("iPad Pro")) return "iPad Pro";
    return "Accessories";
  }

  function familyClass(family) {
    if (family.includes("MacBook")) return "laptop";
    if (family.includes("iPad")) return "tablet";
    return family === "Accessories" ? "pencil" : "keyboard";
  }

  function currentItem() {
    return allProducts.find((item) => item.id === state.selectedId) || initialProduct;
  }

  function familyProducts(family) {
    return allProducts.filter((item) => familyOf(item) === family);
  }

  function unique(items, key) {
    return [...new Set(items.map((item) => item[key]).filter(Boolean))];
  }

  function selectedConfiguration(item = currentItem()) {
    const values = [item.chip, item.cpu, item.memory, item.storage, item.network].filter(Boolean);
    return values.join(" · ");
  }

  function groupName(item = currentItem()) {
    return familyOf(item);
  }

  function dateLabel(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const short = (value) => value.toDateString();
    if (short(date) === short(today)) return "今天";
    if (short(date) === short(yesterday)) return "昨天";
    return "更早";
  }

  function timeLabel(timestamp) {
    return new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", month: "numeric", day: "numeric" }).format(new Date(timestamp));
  }

  function notify(message) {
    state.toast = message;
    render();
    window.setTimeout(() => {
      if (state.toast === message) {
        state.toast = "";
        render();
      }
    }, 2200);
  }

  function applySettings() {
    const documentRoot = document.documentElement;
    documentRoot.dataset.theme = settings.theme === "system" ? "" : settings.theme;
    documentRoot.dataset.contrast = settings.contrast ? "high" : "";
    documentRoot.classList.toggle("reduce-motion", settings.reduceMotion);
  }

  function addHistory(item = currentItem(), mode = state.mode) {
    const price = mode === "education" ? item.eduPrice : item.officialPrice;
    const latest = history[0];
    if (latest && latest.itemId === item.id && latest.mode === mode && Date.now() - latest.createdAt < 30000) return;
    history.unshift({ id: crypto.randomUUID?.() || `${Date.now()}`, itemId: item.id, mode, price, createdAt: Date.now(), favorite: false, pinned: false });
    persist();
  }

  function addDraft(item = currentItem()) {
    const existing = state.draft.find((entry) => entry.itemId === item.id);
    if (existing) {
      notify("已在当前报价中");
      return;
    }
    state.draft.push({ itemId: item.id, quantity: 1 });
    notify("已加入当前报价");
  }

  function addRecommendedAccessory(id) {
    const accessory = allProducts.find((item) => item.id === id);
    const device = currentItem();
    if (!accessory) return;

    let addedDevice = false;
    if (!state.draft.some((entry) => entry.itemId === device.id)) {
      state.draft.push({ itemId: device.id, quantity: 1 });
      addedDevice = true;
    }
    if (state.draft.some((entry) => entry.itemId === accessory.id)) {
      notify(`${accessory.model} 已在当前报价中`);
      return;
    }
    state.draft.push({ itemId: accessory.id, quantity: 1 });
    notify(addedDevice ? `已将 iPad 和 ${accessory.model} 加入报价` : `${accessory.model} 已加入报价`);
  }

  function draftTotal() {
    return state.draft.reduce((total, entry) => {
      const item = allProducts.find((product) => product.id === entry.itemId);
      return total + (item?.eduPrice || 0) * entry.quantity;
    }, 0);
  }

  function quoteEntries() {
    const source = state.draft.length ? state.draft : [{ itemId: currentItem().id, quantity: 1 }];
    return source.map((entry) => ({ ...entry, item: allProducts.find((product) => product.id === entry.itemId) })).filter((entry) => entry.item);
  }

  function quoteItemCount() {
    return state.draft.reduce((count, entry) => count + entry.quantity, 0);
  }

  function quoteTotal() {
    return quoteEntries().reduce((total, entry) => total + quoteEstimate(entry.item).total * entry.quantity, 0);
  }

  function createSavedQuote(name, note) {
    const items = state.draft.length ? state.draft : [{ itemId: currentItem().id, quantity: 1 }];
    saved.unshift({ id: window.crypto?.randomUUID?.() || `${Date.now()}`, name: name || `${currentItem().model} 报价`, note: note || "", items: clone(items), updatedAt: Date.now() });
    state.draft = [];
    persist();
    state.sheet = null;
    notify("报价已保存");
  }

  function productVisual(family, expanded = false, item = null) {
    const officialImage = family === "MacBook Air"
      ? "assets/products/macbook-air.jpg"
      : family === "MacBook Pro"
        ? "assets/products/macbook-pro.jpg"
      : family === "iPad Air"
        ? "assets/products/ipad-air.png"
        : family === "iPad Pro"
          ? "assets/products/ipad-pro.png"
          : family === "Accessories"
            ? item && accessoryType(item) === "键盘"
              ? "assets/products/ipad-keyboard.png"
              : "assets/products/apple-pencil.png"
            : "";
    const accessoryVisual = family === "Accessories" ? " accessory-visual" : "";
    return `<div class="product-visual ${familyClass(family)}${officialImage ? " has-official-image" : ""}${accessoryVisual}${expanded ? " config-visual" : ""}" aria-hidden="true">${officialImage ? `<img src="${officialImage}" alt="" />` : ""}</div>`;
  }

  function renderTabbar() {
    if (state.view === "config") return "";
    const tabs = [["products", "产品"], ["history", "历史"], ["saved", "已存报价"], ["settings", "设置"]];
    return `<nav class="tabbar" aria-label="主导航"><div class="tabbar-inner">${tabs.map(([id, label]) => `<button class="tab-button ${state.view === id ? "is-active" : ""}" type="button" data-action="view" data-view="${id}" aria-current="${state.view === id ? "page" : "false"}">${label}</button>`).join("")}</div></nav>`;
  }

  function renderProducts() {
    const recent = history.slice(0, 3);
    const cards = familyOrder.filter((family) => familyProducts(family).length);
    return `<section class="screen"><div class="screen-content">
      <header class="app-topbar"><div><p class="eyebrow">EDU Quote</p><h1 class="app-title">产品</h1></div><button class="icon-button" type="button" data-action="search" aria-label="搜索产品与报价">⌕</button></header>
      ${state.searchOpen ? renderInlineSearch() : `<button class="search-trigger" type="button" data-action="search"><span>搜索产品、配置或报价</span><span>⌘K</span></button>`}
      ${recent.length ? `<section class="section"><div class="section-heading"><h2>最近报价</h2><button class="section-action" type="button" data-action="view" data-view="history">查看全部</button></div><div class="recent-list">${recent.map((entry) => {
        const item = allProducts.find((product) => product.id === entry.itemId);
        return item ? `<button class="recent-card" type="button" data-action="select-product" data-id="${item.id}"><span><strong class="line-title">${escapeHtml(item.model)}</strong><small class="line-subtitle">${escapeHtml(selectedConfiguration(item))}</small></span><strong class="line-price">${money(entry.price)}</strong></button>` : "";
      }).join("")}</div></section>` : ""}
      <section class="section"><div class="section-heading"><h2>选择产品</h2><span class="eyebrow">教育优惠</span></div>
      <div class="product-grid">${cards.map((family) => { const items = familyProducts(family); const start = Math.min(...items.map((item) => item.eduPrice)); const isAccessory = family === "Accessories"; const label = isAccessory ? "配件" : family; const action = isAccessory ? "data-action=\"open-accessories\"" : `data-action="select-family" data-family="${family}"`; return `<button class="product-card" type="button" ${action} aria-label="浏览 ${label}">${productVisual(family)}<span><strong class="product-name">${label}</strong><small class="product-meta">${items.length} 种教育优惠配置</small><strong class="product-price">${money(start)} 起</strong></span></button>`; }).join("")}</div></section>
    </div></section>`;
  }

  function configGroups(item) {
    const items = familyProducts(familyOf(item));
    if (familyOf(item) === "Accessories") {
      const type = accessoryType(item);
      return [
        { key: "accessoryType", label: "配件类型", values: ["Apple Pencil", "键盘"] },
        { key: "model", label: type === "Apple Pencil" ? "选择 Pencil" : "选择键盘", values: unique(items.filter((entry) => accessoryType(entry) === type), "model") },
      ];
    }
    const groups = [{ key: "model", label: "尺寸", values: unique(items, "model") }];
    if (item.chip) groups.push({ key: "chip", label: "芯片", values: unique(items.filter((entry) => entry.model === item.model), "chip") });
    if (item.cpu) groups.push({ key: "cpu", label: "图形处理", values: unique(items.filter((entry) => entry.model === item.model && entry.chip === item.chip), "cpu") });
    if (item.memory) groups.push({ key: "memory", label: "统一内存", values: unique(items.filter((entry) => entry.model === item.model && (!item.chip || entry.chip === item.chip) && (!item.cpu || entry.cpu === item.cpu)), "memory") });
    if (item.storage) groups.push({ key: "storage", label: "存储", values: unique(items.filter((entry) => entry.model === item.model && (!item.chip || entry.chip === item.chip) && (!item.cpu || entry.cpu === item.cpu) && (!item.memory || entry.memory === item.memory)), "storage") });
    if (item.network) groups.push({ key: "network", label: "网络", values: unique(items.filter((entry) => entry.model === item.model && entry.storage === item.storage), "network") });
    return groups.filter((group) => group.values.length > 1);
  }

  function recommendedKeyboards(item) {
    const compatibleModel = item.model.match(/(?:11|13) 英寸 iPad (?:Air|Pro)/)?.[0];
    if (!compatibleModel) return [];
    return accessoryProducts.filter((product) => product.model.includes("妙控键盘") && product.model.includes(compatibleModel));
  }

  function recommendedPencils(item) {
    if (!/^\d+ 英寸 iPad (?:Air|Pro)/.test(item.model)) return [];
    return accessoryProducts.filter((product) => product.model === "Apple Pencil Pro");
  }

  function renderRecommendationCards(items) {
    return items.map((item) => {
      const isAdded = state.draft.some((entry) => entry.itemId === item.id);
      return `<button class="recommendation-card" type="button" data-action="add-recommended-accessory" data-id="${item.id}"><span><strong>${escapeHtml(item.model)}</strong><small>教育优惠价</small></span><span class="recommendation-cta"><strong>${money(item.eduPrice)}</strong><small>${isAdded ? "已加入" : "加入报价"}</small></span></button>`;
    }).join("");
  }

  function quoteEstimate(item) {
    if (state.mode === "education") return { total: item.eduPrice, label: "教育优惠价", supporting: `比官网价节省 ${money(item.saving)}`, details: [["官网价格", money(item.officialPrice)], ["节省", money(item.saving)]] };
    const estimate = utils?.calculateTaxEstimate?.({ taxInclusivePrice: item.officialPrice, vatRate: 13, incomeTaxRate: 5, canDeductVat: true });
    if (!estimate) return { total: item.officialPrice, label: "预计成本", supporting: "企业采购估算", details: [] };
    return { total: estimate.estimatedNetCost, label: "预计最终成本", supporting: `预计总节省 ${money(estimate.totalEstimatedSaving)}`, details: [["发票金额", money(item.officialPrice)], ["VAT", money(estimate.vatAmount)], ["所得税节省", money(estimate.incomeTaxSaving)], ["预计总节省", money(estimate.totalEstimatedSaving)]] };
  }

  function renderConfig() {
    const item = currentItem();
    const family = familyOf(item);
    const estimate = quoteEstimate(item);
    const keyboards = recommendedKeyboards(item);
    const pencils = recommendedPencils(item);
    const itemInDraft = state.draft.some((entry) => entry.itemId === item.id);
    const hasDraft = state.draft.length > 0;
    const total = hasDraft ? quoteTotal() : estimate.total;
    const label = hasDraft ? `当前报价 · ${quoteItemCount()} 件` : estimate.label;
    return `<section class="screen"><div class="screen-content config-content"><header class="app-topbar"><button class="back-button" type="button" data-action="view" data-view="products">‹ 产品</button></header>
      <section class="config-hero">${productVisual(family, true, item)}<div class="config-copy"><p class="eyebrow">${family}</p><h1>${escapeHtml(item.model)}</h1><p>${escapeHtml(selectedConfiguration(item))}</p></div></section>
      <section class="config-section"><div class="segmented" role="tablist" aria-label="报价模式"><button type="button" class="${state.mode === "education" ? "is-active" : ""}" data-action="mode" data-mode="education">教育优惠</button><button type="button" class="${state.mode === "business" ? "is-active" : ""}" data-action="mode" data-mode="business">Business Purchase</button></div></section>
      ${configGroups(item).map((group) => `<section class="config-section"><h2>${group.label}</h2><div class="chip-row">${group.values.map((value) => `<button class="chip ${(group.key === "accessoryType" ? accessoryType(item) : item[group.key]) === value ? "is-active" : ""}" type="button" data-action="config" data-key="${group.key}" data-value="${escapeHtml(value)}">${escapeHtml(value)}</button>`).join("")}</div></section>`).join("")}
      ${keyboards.length ? `<section class="config-section accessory-recommendation"><div class="section-heading"><div><h2>推荐键盘</h2><p>适配当前 ${escapeHtml(item.model)}</p></div></div>${renderRecommendationCards(keyboards)}</section>` : ""}
      ${pencils.length ? `<section class="config-section accessory-recommendation"><div class="section-heading"><div><h2>推荐 Apple Pencil</h2><p>兼容当前 ${escapeHtml(item.model)}</p></div></div>${renderRecommendationCards(pencils)}</section>` : ""}
    </div><aside class="quote-summary" aria-label="当前报价"><div class="quote-summary-main"><button class="quote-summary-details" type="button" data-action="sheet" data-sheet="quote" aria-label="查看报价详情"><span>${label}</span><strong>${money(total)}</strong></button>${itemInDraft ? `<button class="primary-button" type="button" data-action="sheet" data-sheet="quote">查看报价</button>` : `<button class="primary-button" type="button" data-action="add-draft">加入报价</button>`}</div></aside></section>`;
  }

  function renderHistory() {
    const groups = ["今天", "昨天", "更早"];
    return `<section class="screen"><div class="screen-content"><header class="app-topbar"><div><p class="eyebrow">EDU Quote</p><h1 class="app-title">历史</h1></div>${history.length ? `<button class="text-button" type="button" data-action="clear-history">清除</button>` : ""}</header>${history.length ? groups.map((label) => { const entries = history.filter((entry) => dateLabel(entry.createdAt) === label); if (!entries.length) return ""; return `<section class="history-group"><h2>${label}</h2><div class="history-list">${entries.map((entry) => { const item = allProducts.find((product) => product.id === entry.itemId); return item ? `<article class="history-card"><button type="button" data-action="select-product" data-id="${item.id}" style="border:0;background:transparent;padding:0;text-align:left;color:inherit"><strong class="line-title">${escapeHtml(item.model)}</strong><small class="line-subtitle">${escapeHtml(selectedConfiguration(item))} · ${timeLabel(entry.createdAt)}</small><span class="mode-tag">${entry.mode === "education" ? "教育优惠" : "Business Purchase"}</span></button><strong class="line-price">${money(entry.price)}</strong><div class="history-actions"><button type="button" data-action="toggle-history" data-id="${entry.id}" data-key="favorite">${entry.favorite ? "已收藏" : "收藏"}</button><button type="button" data-action="toggle-history" data-id="${entry.id}" data-key="pinned">${entry.pinned ? "已置顶" : "置顶"}</button><button type="button" data-action="delete-history" data-id="${entry.id}">删除</button></div></article>` : ""; }).join("")}</div></section>`; }).join("") : `<div class="empty-state"><div><h2>还没有报价历史</h2><p>完成一次报价展示后，它会安全地保存在这台 iPhone 上。</p><button class="primary-button" style="margin-top:18px" type="button" data-action="view" data-view="products">浏览产品</button></div></div>`}</div></section>`;
  }

  function savedTotal(quote) {
    return quote.items.reduce((total, entry) => total + (allProducts.find((item) => item.id === entry.itemId)?.eduPrice || 0) * entry.quantity, 0);
  }

  function renderSaved() {
    return `<section class="screen"><div class="screen-content"><header class="app-topbar"><div><p class="eyebrow">EDU Quote</p><h1 class="app-title">已存报价</h1></div>${state.draft.length ? `<button class="text-button" type="button" data-action="sheet" data-sheet="save">保存当前</button>` : ""}</header>${state.draft.length ? `<button class="recent-card" type="button" data-action="sheet" data-sheet="save"><span><strong class="line-title">当前报价</strong><small class="line-subtitle">${state.draft.reduce((sum, entry) => sum + entry.quantity, 0)} 件产品待保存</small></span><strong class="line-price">${money(draftTotal())}</strong></button>` : ""}<section class="section">${saved.length ? `<div class="saved-list">${saved.map((quote) => `<article class="saved-card"><div class="saved-card-top"><div><strong class="line-title">${escapeHtml(quote.name)}</strong><small class="line-subtitle">${quote.items.reduce((sum, entry) => sum + entry.quantity, 0)} 件产品 · ${timeLabel(quote.updatedAt)}</small></div><strong class="saved-total">${money(savedTotal(quote))}</strong></div>${quote.note ? `<small class="line-subtitle">${escapeHtml(quote.note)}</small>` : ""}<div class="saved-actions"><button type="button" data-action="open-saved" data-id="${quote.id}">打开</button><button type="button" data-action="duplicate-saved" data-id="${quote.id}">复制</button><button type="button" data-action="delete-saved" data-id="${quote.id}">删除</button></div></article>`).join("")}</div>` : `<div class="empty-state"><div><h2>保存你的第一个报价</h2><p>将产品加入报价后，可添加客户名称和备注，方便下次快速打开。</p><button class="primary-button" style="margin-top:18px" type="button" data-action="view" data-view="products">选择产品</button></div></div>`}</section></div></section>`;
  }

  function renderSettings() {
    const themeButtons = [["system", "系统"], ["light", "浅色"], ["dark", "深色"]];
    return `<section class="screen"><div class="screen-content"><header class="app-topbar"><div><p class="eyebrow">EDU Quote</p><h1 class="app-title">设置</h1></div></header><section class="section"><div class="section-heading"><h2>外观</h2></div><div class="settings-list"><div class="settings-row"><div><strong>外观</strong><small>跟随你的 iPhone</small></div><div class="setting-control">${themeButtons.map(([id, label]) => `<button type="button" class="${settings.theme === id ? "is-active" : ""}" data-action="theme" data-theme="${id}">${label}</button>`).join("")}</div></div><div class="settings-row"><div><strong>高对比度</strong><small>提高边框与辅助文字对比</small></div><button class="switch ${settings.contrast ? "is-on" : ""}" type="button" data-action="toggle-setting" data-key="contrast" aria-pressed="${settings.contrast}"><span></span></button></div><div class="settings-row"><div><strong>减少动态</strong><small>减少过渡与数字动画</small></div><button class="switch ${settings.reduceMotion ? "is-on" : ""}" type="button" data-action="toggle-setting" data-key="reduceMotion" aria-pressed="${settings.reduceMotion}"><span></span></button></div></div></section><section class="section"><div class="section-heading"><h2>报价与数据</h2></div><div class="settings-list"><div class="settings-row"><div><strong>币种</strong><small>人民币 (CNY)</small></div><strong>¥</strong></div><div class="settings-row"><div><strong>价格版本</strong><small>教育优惠目录</small></div><strong>2026.07</strong></div><div class="settings-row"><div><strong>数据来源</strong><small>本地教育优惠价格目录</small></div><strong>本机</strong></div><div class="settings-row"><div><strong>最后更新</strong><small>请在更新价格时同步目录</small></div><strong>—</strong></div></div></section></div></section>`;
  }

  function renderQuoteSheet() {
    const hasDraft = state.draft.length > 0;
    const entries = quoteEntries();
    const total = quoteTotal();
    const label = state.mode === "education" ? (hasDraft ? "教育优惠合计" : "教育优惠价") : "预计最终成本";
    const supporting = hasDraft ? `${quoteItemCount()} 件产品已加入报价` : "加入当前产品后，即可继续添加键盘或 Apple Pencil";
    return `<div class="sheet-layer" role="dialog" aria-modal="true" aria-labelledby="quote-sheet-title"><div class="sheet-backdrop" data-action="close-sheet"></div><section class="sheet"><div class="sheet-handle"></div><header class="sheet-header"><h2 id="quote-sheet-title">当前报价</h2><button class="close-button" type="button" data-action="close-sheet">继续选择</button></header><div class="segmented" style="margin-top:18px"><button type="button" class="${state.mode === "education" ? "is-active" : ""}" data-action="mode" data-mode="education">教育优惠</button><button type="button" class="${state.mode === "business" ? "is-active" : ""}" data-action="mode" data-mode="business">Business Purchase</button></div><div class="quote-result"><span>${label}</span><strong>${money(total)}</strong><p>${supporting}</p></div><dl class="result-details quote-items">${entries.map((entry) => `<div><dt><strong>${escapeHtml(entry.item.model)}</strong><small>${escapeHtml(selectedConfiguration(entry.item))}${entry.quantity > 1 ? ` · ${entry.quantity} 件` : ""}</small></dt><dd><strong>${money(quoteEstimate(entry.item).total * entry.quantity)}</strong>${hasDraft ? `<button type="button" class="quote-item-remove" data-action="remove-draft" data-id="${entry.item.id}">移除</button>` : ""}</dd></div>`).join("")}</dl>${state.mode === "business" ? `<details class="disclosure"><summary>如何计算？</summary><p>以每件产品当前官方零售价为含税金额，按 13% 增值税与 5% 企业所得税率进行理论估算，并假设具备增值税抵扣资格。结果仅供参考，不构成税务、财务或法律建议。</p></details>` : ""}${hasDraft ? `<button class="wide-button" type="button" data-action="present">展示报价</button>` : `<button class="wide-button" type="button" data-action="add-draft">加入报价</button>`}</section></div>`;
  }

  function renderSaveSheet() {
    return `<div class="sheet-layer" role="dialog" aria-modal="true" aria-labelledby="save-sheet-title"><div class="sheet-backdrop" data-action="close-sheet"></div><section class="sheet"><div class="sheet-handle"></div><header class="sheet-header"><h2 id="save-sheet-title">保存报价</h2><button class="close-button" type="button" data-action="close-sheet">取消</button></header><div class="quote-result"><span>教育优惠合计</span><strong>${money(draftTotal() || currentItem().eduPrice)}</strong><p>${state.draft.length || 1} 件产品</p></div><div class="field"><label for="quote-name">报价名称</label><input id="quote-name" type="text" value="${escapeHtml(`${currentItem().model} 报价`)}" maxlength="60" /></div><div class="field"><label for="quote-note">备注（可选）</label><textarea id="quote-note" maxlength="240" placeholder="例如：王女士 · 设计专业"></textarea></div><button class="wide-button" type="button" data-action="save-quote">保存报价</button></section></div>`;
  }

  function renderSearchResults() {
    const needle = state.search.trim().toLocaleLowerCase();
    const productResults = needle ? allProducts.filter((item) => [item.model, selectedConfiguration(item), familyOf(item)].join(" ").toLocaleLowerCase().includes(needle)).slice(0, 8) : [];
    const quoteResults = needle ? saved.filter((quote) => `${quote.name} ${quote.note}`.toLocaleLowerCase().includes(needle)).slice(0, 4) : [];
    if (!needle) return "";
    return `<div class="search-results">${productResults.map((item) => `<button class="search-result" type="button" data-action="select-product" data-id="${item.id}"><span><strong class="line-title">${escapeHtml(item.model)}</strong><small class="line-subtitle">${escapeHtml(selectedConfiguration(item))}</small></span><strong>${money(item.eduPrice)}</strong></button>`).join("")}${quoteResults.map((quote) => `<button class="search-result" type="button" data-action="open-saved" data-id="${quote.id}"><span><strong class="line-title">${escapeHtml(quote.name)}</strong><small class="line-subtitle">已存报价</small></span><strong>打开</strong></button>`).join("")}${!productResults.length && !quoteResults.length ? `<p class="search-empty">没有找到结果</p>` : ""}</div>`;
  }

  function renderInlineSearch() {
    return `<section class="inline-search" aria-label="搜索"><div class="search-input-wrap"><span aria-hidden="true">⌕</span><input id="global-search" type="search" value="${escapeHtml(state.search)}" placeholder="搜索产品、配置或报价" autocomplete="off" /><button class="text-button" type="button" data-action="close-search">取消</button></div><div id="search-results">${renderSearchResults()}</div></section>`;
  }

  function updateSearchResults() {
    const results = root.querySelector("#search-results");
    if (results) results.innerHTML = renderSearchResults();
  }

  function renderPresentation() {
    const entries = quoteEntries();
    const label = state.mode === "education" ? "教育优惠合计" : "预计最终成本";
    return `<section class="presentation" role="dialog" aria-modal="true" aria-label="报价展示"><header><h1>EDU Quote</h1><button class="close-button" type="button" data-action="close-present">退出</button></header><div><section class="presentation-product"><p>${quoteItemCount()} 件产品</p><h2>报价单</h2><p>已选设备与配件</p></section><section class="presentation-price"><span>${label}</span><strong>${money(quoteTotal())}</strong></section><div class="presentation-details">${entries.map((entry) => `<div><span>${escapeHtml(entry.item.model)}${entry.quantity > 1 ? ` × ${entry.quantity}` : ""}</span><strong>${money(quoteEstimate(entry.item).total * entry.quantity)}</strong></div>`).join("")}</div></div><div class="presentation-actions"><button type="button" data-action="share">分享报价</button></div></section>`;
  }

  function render() {
    applySettings();
    const viewHtml = { products: renderProducts, config: renderConfig, history: renderHistory, saved: renderSaved, settings: renderSettings }[state.view]();
    root.innerHTML = `${viewHtml}${renderTabbar()}${state.sheet === "quote" ? renderQuoteSheet() : ""}${state.sheet === "save" ? renderSaveSheet() : ""}${state.presenting ? renderPresentation() : ""}${state.toast ? `<div class="toast" role="status">${escapeHtml(state.toast)}</div>` : ""}`;
    if (state.searchOpen) window.setTimeout(() => root.querySelector("#global-search")?.focus(), 0);
  }

  function selectProduct(id) {
    state.selectedId = id;
    state.view = "config";
    state.searchOpen = false;
    render();
  }

  function selectConfig(key, value) {
    const item = currentItem();
    const candidates = familyProducts(familyOf(item));
    if (key === "accessoryType") {
      const foundAccessory = candidates.find((candidate) => accessoryType(candidate) === value);
      if (foundAccessory) state.selectedId = foundAccessory.id;
      render();
      return;
    }
    const proposal = { model: item.model, chip: item.chip, cpu: item.cpu, memory: item.memory, storage: item.storage, network: item.network, [key]: value };
    const found = candidates.find((candidate) => Object.entries(proposal).every(([field, expected]) => !expected || candidate[field] === expected)) || candidates.find((candidate) => candidate[key] === value && candidate.model === proposal.model) || candidates.find((candidate) => candidate[key] === value);
    if (found) state.selectedId = found.id;
    render();
  }

  async function shareQuote() {
    const label = state.mode === "education" ? "教育优惠合计" : "预计最终成本";
    const text = `${quoteEntries().map((entry) => `${entry.item.model}${entry.quantity > 1 ? ` × ${entry.quantity}` : ""} · ${money(quoteEstimate(entry.item).total * entry.quantity)}`).join("\n")}\n${label} ${money(quoteTotal())}`;
    try {
      if (navigator.share) await navigator.share({ title: "EDU Quote", text });
      else if (navigator.clipboard) await navigator.clipboard.writeText(text);
      notify("报价已复制");
    } catch {
      // The user may cancel the native share sheet; this should stay quiet.
    }
  }

  root.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const { action } = target.dataset;
    if (action === "view") { state.view = target.dataset.view; state.sheet = null; render(); }
    if (action === "search") { state.view = "products"; state.searchOpen = true; render(); }
    if (action === "close-search") { state.searchOpen = false; state.search = ""; render(); }
    if (action === "select-family") { const item = familyProducts(target.dataset.family)[0]; if (item) selectProduct(item.id); }
    if (action === "open-accessories") { const item = familyProducts("Accessories")[0]; if (item) selectProduct(item.id); }
    if (action === "select-product") selectProduct(target.dataset.id);
    if (action === "config") selectConfig(target.dataset.key, target.dataset.value);
    if (action === "mode") { state.mode = target.dataset.mode; render(); }
    if (action === "sheet") { state.sheet = target.dataset.sheet; render(); }
    if (action === "close-sheet") { state.sheet = null; render(); }
    if (action === "add-draft") addDraft();
    if (action === "add-recommended-accessory") addRecommendedAccessory(target.dataset.id);
    if (action === "remove-draft") { state.draft = state.draft.filter((entry) => entry.itemId !== target.dataset.id); render(); }
    if (action === "present") { quoteEntries().forEach((entry) => addHistory(entry.item)); state.sheet = null; state.presenting = true; render(); }
    if (action === "close-present") { state.presenting = false; render(); }
    if (action === "share") shareQuote();
    if (action === "save-quote") createSavedQuote(root.querySelector("#quote-name")?.value.trim(), root.querySelector("#quote-note")?.value.trim());
    if (action === "open-saved") { const quote = saved.find((entry) => entry.id === target.dataset.id); if (quote) { state.draft = clone(quote.items); const first = quote.items[0]; if (first) state.selectedId = first.itemId; state.view = "config"; state.searchOpen = false; render(); } }
    if (action === "duplicate-saved") { const quote = saved.find((entry) => entry.id === target.dataset.id); if (quote) { saved.unshift({ ...clone(quote), id: window.crypto?.randomUUID?.() || `${Date.now()}`, name: `${quote.name} 副本`, updatedAt: Date.now() }); persist(); notify("已复制报价"); } }
    if (action === "delete-saved") { saved = saved.filter((quote) => quote.id !== target.dataset.id); persist(); render(); }
    if (action === "toggle-history") { const entry = history.find((record) => record.id === target.dataset.id); if (entry) { entry[target.dataset.key] = !entry[target.dataset.key]; history.sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt - a.createdAt); persist(); render(); } }
    if (action === "delete-history") { history = history.filter((entry) => entry.id !== target.dataset.id); persist(); render(); }
    if (action === "clear-history") { history = []; persist(); render(); }
    if (action === "theme") { settings.theme = target.dataset.theme; persist(); render(); }
    if (action === "toggle-setting") { settings[target.dataset.key] = !settings[target.dataset.key]; persist(); render(); }
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "global-search") { state.search = event.target.value; updateSearchResults(); }
  });

  window.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); state.view = "products"; state.searchOpen = true; render(); }
    if (event.key === "Escape") { if (state.presenting) state.presenting = false; else if (state.sheet) state.sheet = null; else if (state.searchOpen) state.searchOpen = false; else return; render(); }
  });

  render();
})();
