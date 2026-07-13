"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  TAX_CONFIG,
  calculateTaxEstimate,
  canDeductVat,
  formatCurrency,
  sanitizeDecimalInput,
  validateMoneyInput,
  validateTaxRate,
} = require("../tax-utils.js");

test("enterprise calculator uses a fixed 13% VAT default", () => {
  assert.equal(TAX_CONFIG.defaultVatRate, 13);
  assert.equal(Object.hasOwn(TAX_CONFIG, "vatRates"), false);
});

test("13% VAT and 5% income tax with VAT deduction", () => {
  const result = calculateTaxEstimate({
    taxInclusivePrice: 11300,
    vatRate: 13,
    incomeTaxRate: 5,
    canDeductVat: true,
  });

  assert.equal(result.taxExclusivePrice, 10000);
  assert.equal(result.vatAmount, 1300);
  assert.equal(result.deductibleVat, 1300);
  assert.equal(result.incomeTaxSaving, 500);
  assert.equal(result.totalEstimatedSaving, 1800);
  assert.equal(result.estimatedNetCost, 9500);
});

test("6% VAT and 5% income tax with VAT deduction", () => {
  const result = calculateTaxEstimate({
    taxInclusivePrice: 10600,
    vatRate: 6,
    incomeTaxRate: 5,
    canDeductVat: true,
  });

  assert.equal(result.taxExclusivePrice, 10000);
  assert.equal(result.vatAmount, 600);
  assert.equal(result.incomeTaxSaving, 500);
  assert.equal(result.estimatedNetCost, 9500);
});

test("VAT is not deducted when eligibility is false", () => {
  const result = calculateTaxEstimate({
    taxInclusivePrice: 11300,
    vatRate: 13,
    incomeTaxRate: 5,
    canDeductVat: false,
  });

  assert.equal(result.deductibleVat, 0);
  assert.equal(result.incomeTaxSaving, 500);
  assert.equal(result.estimatedNetCost, 10800);
});

test("deduction eligibility requires both supported selections", () => {
  assert.equal(canDeductVat("special", "general"), true);
  assert.equal(canDeductVat("ordinary", "general"), false);
  assert.equal(canDeductVat("special", "small"), false);
  assert.equal(canDeductVat("uncertain", "uncertain"), false);
});

test("zero and one-cent amounts remain finite and non-negative", () => {
  const zero = calculateTaxEstimate({ taxInclusivePrice: 0, vatRate: 13, incomeTaxRate: 5, canDeductVat: true });
  const cent = calculateTaxEstimate({ taxInclusivePrice: "0.01", vatRate: 13, incomeTaxRate: 5, canDeductVat: true });

  assert.equal(zero.estimatedNetCost, 0);
  assert.equal(cent.minorUnits.taxInclusivePrice, 1);
  assert.ok(cent.minorUnits.estimatedNetCost >= 0);
  assert.equal(formatCurrency(-0), "¥0.00");
});

test("decimal amounts use cent-based deterministic rounding", () => {
  const result = calculateTaxEstimate({
    taxInclusivePrice: "1234.56",
    vatRate: "13.25",
    incomeTaxRate: "5.50",
    canDeductVat: true,
  });

  assert.equal(Number.isInteger(result.minorUnits.taxExclusivePrice), true);
  assert.equal(
    result.minorUnits.taxInclusivePrice,
    result.minorUnits.taxExclusivePrice + result.minorUnits.vatAmount,
  );
  assert.equal(
    result.minorUnits.totalEstimatedSaving,
    result.minorUnits.deductibleVat + result.minorUnits.incomeTaxSaving,
  );
  assert.equal(formatCurrency("1234.56"), "¥1,234.56");
});

test("largest supported amount is calculated without floating-point overflow", () => {
  const result = calculateTaxEstimate({
    taxInclusivePrice: "999999999999.99",
    vatRate: 13,
    incomeTaxRate: 5,
    canDeductVat: true,
  });

  assert.equal(result.minorUnits.taxInclusivePrice, 99999999999999);
  assert.ok(Number.isFinite(result.estimatedNetCost));
  assert.ok(result.estimatedNetCost >= 0);
});

test("invalid money input is rejected", () => {
  for (const value of ["", "1.2.3", "abc", "-1", "Infinity", Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(validateMoneyInput(value).valid, false, String(value));
  }
  assert.equal(validateMoneyInput("1000000000000").valid, false);
});

test("money input sanitizer limits decimals and removes display separators", () => {
  assert.deepEqual(sanitizeDecimalInput("¥ 11,300.50"), { value: "11300.50", valid: true, error: "" });
  assert.equal(sanitizeDecimalInput("11.2.3").valid, false);
  assert.equal(sanitizeDecimalInput("12.345").valid, false);
  assert.equal(sanitizeDecimalInput("abc").valid, false);
});

test("custom tax rates must be present and within 0–100%", () => {
  assert.equal(validateTaxRate("").valid, false);
  assert.equal(validateTaxRate("-1").valid, false);
  assert.equal(validateTaxRate("100.01").valid, false);
  assert.equal(validateTaxRate("5.123").valid, false);
  assert.equal(validateTaxRate("0").valid, true);
  assert.equal(validateTaxRate("100").valid, true);
});

test("rapid rate changes always produce finite results", () => {
  for (const vatRate of [13, 9, 6, 3, "8.88", 0, 100, 13, 6]) {
    const result = calculateTaxEstimate({
      taxInclusivePrice: "11300.00",
      vatRate,
      incomeTaxRate: vatRate === 100 ? 100 : 5,
      canDeductVat: true,
    });
    assert.ok(Number.isFinite(result.estimatedNetCost));
    assert.ok(result.estimatedNetCost >= 0);
  }
});
