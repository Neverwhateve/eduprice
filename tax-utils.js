(function initTaxUtils(globalScope) {
  "use strict";

  const MAX_MONEY_INTEGER_DIGITS = 12;
  const MAX_TAX_RATE = 100;
  const RATE_SCALE = 100;
  const PERCENT_SCALE = 10000;

  const TAX_CONFIG = Object.freeze({
    incomeTaxRates: Object.freeze([25, 20, 5]),
    defaultVatRate: 13,
    defaultIncomeTaxRate: 5,
    defaultInvoiceType: "uncertain",
    defaultTaxpayerType: "uncertain",
    invoiceTypes: Object.freeze([
      Object.freeze({ value: "special", label: "增值税专用发票" }),
      Object.freeze({ value: "ordinary", label: "增值税普通发票" }),
      Object.freeze({ value: "uncertain", label: "其他或不确定" }),
    ]),
    taxpayerTypes: Object.freeze([
      Object.freeze({ value: "general", label: "一般纳税人" }),
      Object.freeze({ value: "small", label: "小规模纳税人" }),
      Object.freeze({ value: "uncertain", label: "不确定" }),
    ]),
  });

  const currencyFormatter = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function roundDivision(numerator, denominator) {
    if (denominator <= 0n) throw new RangeError("除数必须大于 0");
    return (numerator + denominator / 2n) / denominator;
  }

  function sanitizeDecimalInput(rawValue, options = {}) {
    const maxIntegerDigits = options.maxIntegerDigits || MAX_MONEY_INTEGER_DIGITS;
    const maxFractionDigits = options.maxFractionDigits ?? 2;
    const raw = String(rawValue ?? "");
    const withoutFormatting = raw.replace(/[\s,，¥￥]/g, "");

    if (withoutFormatting.includes("-")) {
      return { value: "", valid: false, error: "请输入不小于 0 的数值" };
    }

    const invalidCharacters = withoutFormatting.replace(/[0-9.]/g, "");
    const decimalParts = withoutFormatting.split(".");
    const integerPart = (decimalParts[0] || "").replace(/\D/g, "").slice(0, maxIntegerDigits);
    const fractionPart = decimalParts.slice(1).join("").replace(/\D/g, "").slice(0, maxFractionDigits);
    const hasDecimalPoint = withoutFormatting.includes(".");
    const normalizedInteger = integerPart.replace(/^0+(?=\d)/, "") || (hasDecimalPoint ? "0" : "");
    const value = hasDecimalPoint ? `${normalizedInteger}.${fractionPart}` : normalizedInteger;

    if (invalidCharacters) {
      return { value, valid: false, error: "仅支持输入数字和小数点" };
    }
    if (decimalParts.length > 2) {
      return { value, valid: false, error: "只能输入一个小数点" };
    }
    if ((decimalParts[0] || "").replace(/\D/g, "").length > maxIntegerDigits) {
      return { value, valid: false, error: `整数部分最多 ${maxIntegerDigits} 位` };
    }
    if ((decimalParts[1] || "").replace(/\D/g, "").length > maxFractionDigits) {
      return { value, valid: false, error: `小数部分最多 ${maxFractionDigits} 位` };
    }

    return { value, valid: true, error: "" };
  }

  function parseScaledDecimal(value, scaleDigits, label) {
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new TypeError(`${label}必须是有限数值`);
    }

    const raw = String(value ?? "").trim().replace(/[\s,，¥￥]/g, "");
    if (!raw) throw new TypeError(`${label}不能为空`);
    if (!/^\d+(?:\.\d+)?$/.test(raw)) throw new TypeError(`${label}格式无效`);

    const [integerPart, fractionPart = ""] = raw.split(".");
    if (fractionPart.length > scaleDigits) throw new TypeError(`${label}最多保留 ${scaleDigits} 位小数`);

    const scale = 10n ** BigInt(scaleDigits);
    const fraction = (fractionPart + "0".repeat(scaleDigits)).slice(0, scaleDigits);
    const scaled = BigInt(integerPart) * scale + BigInt(fraction || "0");
    if (scaled > BigInt(Number.MAX_SAFE_INTEGER)) throw new RangeError(`${label}超出支持范围`);
    return Number(scaled);
  }

  function parseMoneyToCents(value) {
    const cents = parseScaledDecimal(value, 2, "金额");
    const maximumCents = Number(`${"9".repeat(MAX_MONEY_INTEGER_DIGITS)}99`);
    if (cents > maximumCents) throw new RangeError(`金额整数部分最多 ${MAX_MONEY_INTEGER_DIGITS} 位`);
    return cents;
  }

  function parseRateToBasisPoints(value) {
    const basisPoints = parseScaledDecimal(value, 2, "税率");
    if (basisPoints > MAX_TAX_RATE * RATE_SCALE) {
      throw new RangeError("税率应在 0%–100% 之间");
    }
    return basisPoints;
  }

  function validateMoneyInput(value) {
    try {
      const cents = parseMoneyToCents(value);
      return { valid: true, error: "", cents };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  function validateTaxRate(value) {
    try {
      const basisPoints = parseRateToBasisPoints(value);
      return { valid: true, error: "", basisPoints };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  function centsToAmount(cents) {
    return Number((cents / 100).toFixed(2));
  }

  function formatCurrencyFromCents(cents) {
    const normalizedCents = Object.is(cents, -0) ? 0 : Math.max(0, Number(cents) || 0);
    return currencyFormatter.format(normalizedCents / 100);
  }

  function formatCurrency(value) {
    try {
      return formatCurrencyFromCents(parseMoneyToCents(value));
    } catch {
      return formatCurrencyFromCents(0);
    }
  }

  function canDeductVat(invoiceType, taxpayerType) {
    return invoiceType === "special" && taxpayerType === "general";
  }

  function calculateTaxEstimate({ taxInclusivePrice, vatRate, incomeTaxRate, canDeductVat: allowVatDeduction }) {
    const priceCents = parseMoneyToCents(taxInclusivePrice);
    const vatBasisPoints = parseRateToBasisPoints(vatRate);
    const incomeTaxBasisPoints = parseRateToBasisPoints(incomeTaxRate);
    const price = BigInt(priceCents);
    const vatRateScale = BigInt(vatBasisPoints);
    const incomeRateScale = BigInt(incomeTaxBasisPoints);
    const percentScale = BigInt(PERCENT_SCALE);

    const taxExclusiveCents = roundDivision(price * percentScale, percentScale + vatRateScale);
    const vatCents = price - taxExclusiveCents;
    const deductibleVatCents = allowVatDeduction ? vatCents : 0n;
    const incomeTaxSavingCents = roundDivision(taxExclusiveCents * incomeRateScale, percentScale);
    const totalEstimatedSavingCents = deductibleVatCents + incomeTaxSavingCents;
    const estimatedNetCostCents = price > totalEstimatedSavingCents ? price - totalEstimatedSavingCents : 0n;

    const minorUnits = Object.freeze({
      taxInclusivePrice: Number(price),
      taxExclusivePrice: Number(taxExclusiveCents),
      vatAmount: Number(vatCents),
      deductibleVat: Number(deductibleVatCents),
      incomeTaxSaving: Number(incomeTaxSavingCents),
      totalEstimatedSaving: Number(totalEstimatedSavingCents),
      estimatedNetCost: Number(estimatedNetCostCents),
    });

    return Object.freeze({
      taxInclusivePrice: centsToAmount(minorUnits.taxInclusivePrice),
      taxExclusivePrice: centsToAmount(minorUnits.taxExclusivePrice),
      vatAmount: centsToAmount(minorUnits.vatAmount),
      deductibleVat: centsToAmount(minorUnits.deductibleVat),
      incomeTaxSaving: centsToAmount(minorUnits.incomeTaxSaving),
      totalEstimatedSaving: centsToAmount(minorUnits.totalEstimatedSaving),
      estimatedNetCost: centsToAmount(minorUnits.estimatedNetCost),
      vatRate: vatBasisPoints / RATE_SCALE,
      incomeTaxRate: incomeTaxBasisPoints / RATE_SCALE,
      canDeductVat: Boolean(allowVatDeduction),
      minorUnits,
    });
  }

  const api = Object.freeze({
    TAX_CONFIG,
    MAX_MONEY_INTEGER_DIGITS,
    sanitizeDecimalInput,
    validateMoneyInput,
    validateTaxRate,
    parseMoneyToCents,
    parseRateToBasisPoints,
    formatCurrency,
    formatCurrencyFromCents,
    canDeductVat,
    calculateTaxEstimate,
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (globalScope) globalScope.TaxUtils = api;
})(typeof window !== "undefined" ? window : globalThis);
