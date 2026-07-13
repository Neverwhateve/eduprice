(function initTaxCalculator() {
  "use strict";

  const utils = window.TaxUtils;
  const app = window.eduPriceApp;
  const panel = document.querySelector("#tax-calculator");
  const openButton = document.querySelector("#open-tax-calculator");
  if (!utils || !app || !panel || !openButton) return;

  const { TAX_CONFIG } = utils;
  const elements = {
    closeButton: document.querySelector("#close-tax-calculator"),
    resetButton: document.querySelector("#reset-tax-calculator"),
    form: document.querySelector("#tax-form"),
    context: document.querySelector("#tax-product-context"),
    sourceButtons: [...document.querySelectorAll("[data-price-source]")],
    priceInput: document.querySelector("#tax-price-input"),
    priceError: document.querySelector("#tax-price-error"),
    incomeOptions: document.querySelector("#income-tax-rate-options"),
    customIncomeWrap: document.querySelector("#custom-income-tax-wrap"),
    customIncomeInput: document.querySelector("#custom-income-tax-rate"),
    customIncomeError: document.querySelector("#custom-income-tax-error"),
    invoiceType: document.querySelector("#invoice-type"),
    taxpayerType: document.querySelector("#taxpayer-type"),
    deductionStatus: document.querySelector("#deduction-status"),
    results: document.querySelector("#tax-results"),
  };

  const outputIds = [
    "estimated-net-cost",
    "total-estimated-saving",
    "detail-inclusive-price",
    "detail-exclusive-price",
    "detail-vat-rate",
    "detail-vat-amount",
    "detail-deductible-vat",
    "detail-income-tax-rate",
    "detail-income-tax-saving",
  ];
  const outputs = Object.fromEntries(outputIds.map((id) => [id, document.querySelector(`#${id}`)]));

  const state = {
    product: app.getSelectedProduct(),
    calculationScope: "product",
    cartSummary: null,
    priceSource: "official",
    customAmount: "",
    incomeTaxChoice: String(TAX_CONFIG.defaultIncomeTaxRate),
    customIncomeTaxRate: "",
    invoiceType: TAX_CONFIG.defaultInvoiceType,
    taxpayerType: TAX_CONFIG.defaultTaxpayerType,
    inputErrors: { price: "", income: "" },
  };

  const decimalFormatter = new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function setText(id, value) {
    if (outputs[id]) outputs[id].textContent = value;
  }

  function setFieldError(element, message) {
    element.textContent = message || "";
    element.hidden = !message;
  }

  function fillSelect(select, options, selectedValue) {
    select.replaceChildren(
      ...options.map((option) => {
        const node = document.createElement("option");
        node.value = option.value;
        node.textContent = option.label;
        node.selected = option.value === selectedValue;
        return node;
      }),
    );
  }

  function makeRateButtons(container, rates, stateKey) {
    const entries = [...rates.map((rate) => ({ value: String(rate), label: `${rate}%` })), { value: "custom", label: "自定义" }];
    entries.forEach((entry) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.rateValue = entry.value;
      button.dataset.rateGroup = stateKey;
      button.setAttribute("role", "radio");
      button.textContent = entry.label;
      button.addEventListener("click", () => {
        state[stateKey] = entry.value;
        state.inputErrors.income = "";
        renderControls();
        updateCalculations();
        if (entry.value === "custom") {
          window.setTimeout(() => elements.customIncomeInput.focus(), 0);
        }
      });
      container.append(button);
    });
  }

  function currentAmount() {
    if (!hasTaxContext()) return "0";
    if (state.priceSource === "official") return String(officialAmount());
    if (state.priceSource === "custom") return state.customAmount;
    return String(officialAmount());
  }

  function hasTaxContext() {
    if (state.calculationScope === "cart") {
      return Boolean(state.cartSummary && state.cartSummary.itemCount > 0 && state.cartSummary.officialTotal > 0);
    }
    return Boolean(state.product);
  }

  function officialAmount() {
    if (state.calculationScope === "cart") return state.cartSummary?.officialTotal || 0;
    return state.product?.officialPrice || 0;
  }

  function effectiveRate(choice, customValue) {
    return choice === "custom" ? customValue : choice;
  }

  function formatRate(rate) {
    const numericRate = Number(rate);
    if (!Number.isFinite(numericRate)) return "—";
    return `${numericRate.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}%`;
  }

  function formatInputAmount(value) {
    const validation = utils.validateMoneyInput(value);
    return validation.valid ? decimalFormatter.format(validation.cents / 100) : value;
  }

  function selectPriceSource(source) {
    if (source === "custom" && state.priceSource !== "custom") {
      state.customAmount = currentAmount();
    }
    state.priceSource = source;
    state.inputErrors.price = "";
    renderControls();
    updateCalculations();
    if (source === "custom") window.setTimeout(() => elements.priceInput.focus(), 0);
  }

  function renderControls() {
    const product = state.product;
    const officialSourceButton = elements.sourceButtons.find((button) => button.dataset.priceSource === "official");
    officialSourceButton.textContent = state.calculationScope === "cart" ? "组合官网合计" : "官方零售价";
    elements.context.textContent = state.calculationScope === "cart" && state.cartSummary
      ? `设备组合 · ${state.cartSummary.itemCount} 件 · 官网合计 ${utils.formatCurrency(state.cartSummary.officialTotal)}`
      : product
        ? `${product.model} · 企业采购按官方零售价 ${utils.formatCurrency(product.officialPrice)} 估算`
        : "选择产品后即可自动带入价格。";

    elements.sourceButtons.forEach((button) => {
      const selected = button.dataset.priceSource === state.priceSource;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-checked", String(selected));
    });

    if (document.activeElement !== elements.priceInput) {
      elements.priceInput.value = formatInputAmount(currentAmount());
    }

    document.querySelectorAll("[data-rate-group]").forEach((button) => {
      const selected = state[button.dataset.rateGroup] === button.dataset.rateValue;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-checked", String(selected));
    });

    elements.customIncomeWrap.hidden = state.incomeTaxChoice !== "custom";
    if (document.activeElement !== elements.customIncomeInput) elements.customIncomeInput.value = state.customIncomeTaxRate;

    elements.invoiceType.value = state.invoiceType;
    elements.taxpayerType.value = state.taxpayerType;
    setFieldError(elements.priceError, state.inputErrors.price);
    setFieldError(elements.customIncomeError, state.incomeTaxChoice === "custom" ? state.inputErrors.income : "");

    const eligible = utils.canDeductVat(state.invoiceType, state.taxpayerType);
    elements.deductionStatus.classList.toggle("is-eligible", eligible);
    elements.deductionStatus.classList.toggle("is-ineligible", !eligible);
    elements.deductionStatus.innerHTML = eligible
      ? "<strong>当前组合可进入增值税抵扣估算</strong><span>仅为符合条件时的理论估算，请结合实际财务处理确认。</span>"
      : "<strong>暂不计入增值税抵扣</strong><span>请根据企业实际纳税身份、发票类型及财务处理方式确认。</span>";
  }

  function clearResultValues() {
    outputIds.forEach((id) => setText(id, "—"));
  }

  function updateCalculations() {
    const amount = currentAmount();
    const vatRate = TAX_CONFIG.defaultVatRate;
    const incomeTaxRate = effectiveRate(state.incomeTaxChoice, state.customIncomeTaxRate);
    const amountValidation = utils.validateMoneyInput(amount);
    const incomeValidation = utils.validateTaxRate(incomeTaxRate);

    if (!amountValidation.valid && !state.inputErrors.price) state.inputErrors.price = amountValidation.error;
    if (state.incomeTaxChoice === "custom" && !incomeValidation.valid && !state.inputErrors.income) {
      state.inputErrors.income = incomeValidation.error;
    }

    const hasBlockingError =
      state.inputErrors.price ||
      !amountValidation.valid ||
      (state.incomeTaxChoice === "custom" && (state.inputErrors.income || !incomeValidation.valid));

    setFieldError(elements.priceError, state.inputErrors.price);
    setFieldError(elements.customIncomeError, state.incomeTaxChoice === "custom" ? state.inputErrors.income : "");
    elements.results.classList.toggle("is-unavailable", Boolean(hasBlockingError));

    if (hasBlockingError || !hasTaxContext()) {
      clearResultValues();
      return;
    }

    const eligible = utils.canDeductVat(state.invoiceType, state.taxpayerType);
    const estimate = utils.calculateTaxEstimate({
      taxInclusivePrice: amount,
      vatRate,
      incomeTaxRate,
      canDeductVat: eligible,
    });
    setText("estimated-net-cost", utils.formatCurrencyFromCents(estimate.minorUnits.estimatedNetCost));
    setText("total-estimated-saving", utils.formatCurrencyFromCents(estimate.minorUnits.totalEstimatedSaving));
    setText("detail-inclusive-price", utils.formatCurrencyFromCents(estimate.minorUnits.taxInclusivePrice));
    setText("detail-exclusive-price", utils.formatCurrencyFromCents(estimate.minorUnits.taxExclusivePrice));
    setText("detail-vat-rate", formatRate(estimate.vatRate));
    setText("detail-vat-amount", utils.formatCurrencyFromCents(estimate.minorUnits.vatAmount));
    setText(
      "detail-deductible-vat",
      eligible ? utils.formatCurrencyFromCents(estimate.minorUnits.deductibleVat) : "暂不计入抵扣",
    );
    setText("detail-income-tax-rate", formatRate(estimate.incomeTaxRate));
    setText("detail-income-tax-saving", utils.formatCurrencyFromCents(estimate.minorUnits.incomeTaxSaving));

  }

  function resetCalculator() {
    state.priceSource = "official";
    state.customAmount = hasTaxContext() ? String(officialAmount()) : "";
    state.incomeTaxChoice = String(TAX_CONFIG.defaultIncomeTaxRate);
    state.customIncomeTaxRate = "";
    state.invoiceType = TAX_CONFIG.defaultInvoiceType;
    state.taxpayerType = TAX_CONFIG.defaultTaxpayerType;
    state.inputErrors = { price: "", income: "" };
    renderControls();
    updateCalculations();
  }

  function handleDecimalInput(input, stateKey, errorKey, maxIntegerDigits) {
    const sanitized = utils.sanitizeDecimalInput(input.value, { maxIntegerDigits, maxFractionDigits: 2 });
    input.value = sanitized.value;
    state[stateKey] = sanitized.value;
    state.inputErrors[errorKey] = sanitized.valid ? "" : sanitized.error;

    if (errorKey === "income") {
      const validation = utils.validateTaxRate(sanitized.value);
      if (sanitized.valid && !validation.valid) state.inputErrors[errorKey] = validation.error;
    }

    updateCalculations();
  }

  makeRateButtons(elements.incomeOptions, TAX_CONFIG.incomeTaxRates, "incomeTaxChoice");
  fillSelect(elements.invoiceType, TAX_CONFIG.invoiceTypes, state.invoiceType);
  fillSelect(elements.taxpayerType, TAX_CONFIG.taxpayerTypes, state.taxpayerType);

  openButton.addEventListener("click", () => {
    state.calculationScope = "product";
    state.cartSummary = null;
    state.product = app.getSelectedProduct();
    state.priceSource = "official";
    state.customAmount = state.product ? String(state.product.officialPrice) : "";
    state.inputErrors.price = "";
    panel.hidden = false;
    renderControls();
    updateCalculations();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  elements.closeButton.addEventListener("click", () => {
    panel.hidden = true;
    openButton.focus();
  });
  elements.resetButton.addEventListener("click", resetCalculator);
  elements.form.addEventListener("submit", (event) => event.preventDefault());
  elements.sourceButtons.forEach((button) => {
    button.addEventListener("click", () => selectPriceSource(button.dataset.priceSource));
  });

  elements.priceInput.addEventListener("focus", () => {
    elements.priceInput.value = currentAmount();
    elements.priceInput.select();
  });
  elements.priceInput.addEventListener("input", () => {
    if (state.priceSource !== "custom") {
      state.customAmount = currentAmount();
      state.priceSource = "custom";
      renderControls();
    }
    handleDecimalInput(elements.priceInput, "customAmount", "price", utils.MAX_MONEY_INTEGER_DIGITS);
  });
  elements.priceInput.addEventListener("blur", () => {
    const validation = utils.validateMoneyInput(state.customAmount || currentAmount());
    if (validation.valid) {
      state.inputErrors.price = "";
      elements.priceInput.value = formatInputAmount(currentAmount());
      updateCalculations();
    }
  });

  elements.customIncomeInput.addEventListener("input", () => {
    handleDecimalInput(elements.customIncomeInput, "customIncomeTaxRate", "income", 3);
  });
  elements.invoiceType.addEventListener("change", () => {
    state.invoiceType = elements.invoiceType.value;
    renderControls();
    updateCalculations();
  });
  elements.taxpayerType.addEventListener("change", () => {
    state.taxpayerType = elements.taxpayerType.value;
    renderControls();
    updateCalculations();
  });

  window.addEventListener("eduprice:selectionchange", (event) => {
    state.product = event.detail.product;
    if (state.calculationScope === "product" && state.priceSource !== "custom") state.inputErrors.price = "";
    if (!panel.hidden && state.calculationScope === "product") {
      renderControls();
      updateCalculations();
    }
  });

  window.addEventListener("eduprice:carttaxrequest", (event) => {
    const itemCount = Number(event.detail?.itemCount);
    const officialTotal = Number(event.detail?.officialTotal);
    if (!Number.isInteger(itemCount) || itemCount < 1 || !Number.isFinite(officialTotal) || officialTotal <= 0) return;
    state.calculationScope = "cart";
    state.cartSummary = { itemCount, officialTotal };
    state.priceSource = "official";
    state.customAmount = String(officialTotal);
    state.inputErrors.price = "";
    panel.hidden = false;
    renderControls();
    updateCalculations();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetCalculator();
})();
