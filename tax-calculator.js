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
    vatOptions: document.querySelector("#vat-rate-options"),
    incomeOptions: document.querySelector("#income-tax-rate-options"),
    customVatWrap: document.querySelector("#custom-vat-wrap"),
    customVatInput: document.querySelector("#custom-vat-rate"),
    customVatError: document.querySelector("#custom-vat-error"),
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
    "comparison-official-price",
    "comparison-edu-price",
    "comparison-direct-saving",
    "comparison-edu-net-cost",
    "comparison-total-difference",
  ];
  const outputs = Object.fromEntries(outputIds.map((id) => [id, document.querySelector(`#${id}`)]));

  const state = {
    product: app.getSelectedProduct(),
    priceSource: "edu",
    customAmount: "",
    vatChoice: String(TAX_CONFIG.defaultVatRate),
    customVatRate: "",
    incomeTaxChoice: String(TAX_CONFIG.defaultIncomeTaxRate),
    customIncomeTaxRate: "",
    invoiceType: TAX_CONFIG.defaultInvoiceType,
    taxpayerType: TAX_CONFIG.defaultTaxpayerType,
    inputErrors: { price: "", vat: "", income: "" },
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
        if (stateKey === "vatChoice") state.inputErrors.vat = "";
        if (stateKey === "incomeTaxChoice") state.inputErrors.income = "";
        renderControls();
        updateCalculations();
        if (entry.value === "custom") {
          const input = stateKey === "vatChoice" ? elements.customVatInput : elements.customIncomeInput;
          window.setTimeout(() => input.focus(), 0);
        }
      });
      container.append(button);
    });
  }

  function currentAmount() {
    if (!state.product) return "0";
    if (state.priceSource === "official") return String(state.product.officialPrice);
    if (state.priceSource === "custom") return state.customAmount;
    return String(state.product.eduPrice);
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
    elements.context.textContent = product
      ? `${product.model} · 教育优惠价 ${utils.formatCurrency(product.eduPrice)} · 官方价 ${utils.formatCurrency(product.officialPrice)}`
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

    elements.customVatWrap.hidden = state.vatChoice !== "custom";
    elements.customIncomeWrap.hidden = state.incomeTaxChoice !== "custom";
    if (document.activeElement !== elements.customVatInput) elements.customVatInput.value = state.customVatRate;
    if (document.activeElement !== elements.customIncomeInput) elements.customIncomeInput.value = state.customIncomeTaxRate;

    elements.invoiceType.value = state.invoiceType;
    elements.taxpayerType.value = state.taxpayerType;
    setFieldError(elements.priceError, state.inputErrors.price);
    setFieldError(elements.customVatError, state.vatChoice === "custom" ? state.inputErrors.vat : "");
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
    const vatRate = effectiveRate(state.vatChoice, state.customVatRate);
    const incomeTaxRate = effectiveRate(state.incomeTaxChoice, state.customIncomeTaxRate);
    const amountValidation = utils.validateMoneyInput(amount);
    const vatValidation = utils.validateTaxRate(vatRate);
    const incomeValidation = utils.validateTaxRate(incomeTaxRate);

    if (!amountValidation.valid && !state.inputErrors.price) state.inputErrors.price = amountValidation.error;
    if (state.vatChoice === "custom" && !vatValidation.valid && !state.inputErrors.vat) state.inputErrors.vat = vatValidation.error;
    if (state.incomeTaxChoice === "custom" && !incomeValidation.valid && !state.inputErrors.income) {
      state.inputErrors.income = incomeValidation.error;
    }

    const hasBlockingError =
      state.inputErrors.price ||
      !amountValidation.valid ||
      (state.vatChoice === "custom" && (state.inputErrors.vat || !vatValidation.valid)) ||
      (state.incomeTaxChoice === "custom" && (state.inputErrors.income || !incomeValidation.valid));

    setFieldError(elements.priceError, state.inputErrors.price);
    setFieldError(elements.customVatError, state.vatChoice === "custom" ? state.inputErrors.vat : "");
    setFieldError(elements.customIncomeError, state.incomeTaxChoice === "custom" ? state.inputErrors.income : "");
    elements.results.classList.toggle("is-unavailable", Boolean(hasBlockingError));

    if (hasBlockingError || !state.product) {
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
    const eduEstimate = utils.calculateTaxEstimate({
      taxInclusivePrice: state.product.eduPrice,
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

    const officialCents = utils.parseMoneyToCents(state.product.officialPrice);
    const eduCents = utils.parseMoneyToCents(state.product.eduPrice);
    const directSavingCents = Math.max(0, officialCents - eduCents);
    const totalDifferenceCents = Math.max(0, officialCents - eduEstimate.minorUnits.estimatedNetCost);
    setText("comparison-official-price", utils.formatCurrencyFromCents(officialCents));
    setText("comparison-edu-price", utils.formatCurrencyFromCents(eduCents));
    setText("comparison-direct-saving", utils.formatCurrencyFromCents(directSavingCents));
    setText("comparison-edu-net-cost", utils.formatCurrencyFromCents(eduEstimate.minorUnits.estimatedNetCost));
    setText("comparison-total-difference", utils.formatCurrencyFromCents(totalDifferenceCents));
  }

  function resetCalculator() {
    state.priceSource = "edu";
    state.customAmount = state.product ? String(state.product.eduPrice) : "";
    state.vatChoice = String(TAX_CONFIG.defaultVatRate);
    state.customVatRate = "";
    state.incomeTaxChoice = String(TAX_CONFIG.defaultIncomeTaxRate);
    state.customIncomeTaxRate = "";
    state.invoiceType = TAX_CONFIG.defaultInvoiceType;
    state.taxpayerType = TAX_CONFIG.defaultTaxpayerType;
    state.inputErrors = { price: "", vat: "", income: "" };
    renderControls();
    updateCalculations();
  }

  function handleDecimalInput(input, stateKey, errorKey, maxIntegerDigits) {
    const sanitized = utils.sanitizeDecimalInput(input.value, { maxIntegerDigits, maxFractionDigits: 2 });
    input.value = sanitized.value;
    state[stateKey] = sanitized.value;
    state.inputErrors[errorKey] = sanitized.valid ? "" : sanitized.error;

    if (errorKey === "vat" || errorKey === "income") {
      const validation = utils.validateTaxRate(sanitized.value);
      if (sanitized.valid && !validation.valid) state.inputErrors[errorKey] = validation.error;
    }

    updateCalculations();
  }

  makeRateButtons(elements.vatOptions, TAX_CONFIG.vatRates, "vatChoice");
  makeRateButtons(elements.incomeOptions, TAX_CONFIG.incomeTaxRates, "incomeTaxChoice");
  fillSelect(elements.invoiceType, TAX_CONFIG.invoiceTypes, state.invoiceType);
  fillSelect(elements.taxpayerType, TAX_CONFIG.taxpayerTypes, state.taxpayerType);

  openButton.addEventListener("click", () => {
    panel.hidden = false;
    state.product = app.getSelectedProduct();
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

  elements.customVatInput.addEventListener("input", () => {
    handleDecimalInput(elements.customVatInput, "customVatRate", "vat", 3);
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
    if (state.priceSource !== "custom") state.inputErrors.price = "";
    if (!panel.hidden) {
      renderControls();
      updateCalculations();
    }
  });

  resetCalculator();
})();
