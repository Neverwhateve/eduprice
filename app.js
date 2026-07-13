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
clearCartButton.addEventListener("click", clearCart);

window.eduPriceApp = Object.freeze({
  getSelectedProduct: () => {
    const item = selectedProduct();
    return item ? { ...item } : null;
  },
  getActiveCategory: () => activeCategory,
});

render();
