# SauceDemo – Automated Test Suite (Playwright + TypeScript)

## Overview
This project automates the **happy-path checkout** on SauceDemo: login → select **3 random items** → add to cart → checkout → verify success.  
The brief asks specifically for a **successful checkout scenario** (no negative tests), using **JS/TS** with Playwright, with **assertions** and **reporting**.

**Live site:** https://www.saucedemo.com/

---

## Tech Stack & Dependencies
- **Node.js** ≥ 18
- **Playwright Test** (`@playwright/test`)
- **TypeScript**

These meet the brief’s requirement to use JS/TS with **Playwright**.

**Dev dependencies (example):**
```json
{
  "@playwright/test": "^1.46.0",
  "typescript": "^5.4.0",
  "eslint": "^8.57.0",
  "@typescript-eslint/eslint-plugin": "^7.7.0",
  "@typescript-eslint/parser": "^7.7.0"
}
```

---

## Setup

```bash
# 1) install node dependencies
npm i

# 2) install Playwright browsers + OS deps
npx playwright install --with-deps
```

---

## How to Run
### Run the full suite (headless, all browsers)
```bash
npx playwright test
```

---

## Reporting & Debug Artifacts
The brief requires clear reporting. We use Playwright’s built-in HTML report, traces, screenshots, and videos on failures.
It automatically opens the HTML report however you could always run it yourself using,
```bash
npx playwright show-report
```

---

## Test Coverage (End-to-End Flow)

1. **Login**
   - Navigate to `/` (via `baseURL`).
   - Fill **username** `standard_user` and **password** `secret_sauce`.
   - Click **Login** and assert URL ends with `/inventory.html`.

2. **Select 3 Random Items**
   - Query all items via `.inventory_item`.
   - Randomly pick **3 unique** indices (Set-based selection).
   - For each picked item:
     - Click **Add to cart**.
     - Assert the corresponding **Remove** button (e.g., `[data-test^="remove-"]`) is visible.

3. **Cart & Checkout**
   - Open the cart (shopping cart icon) and assert **3** items are present.
   - Click **Checkout** and assert URL ends with `/checkout-step-one.html`.
   - Fill **First Name**, **Last Name**, **Postal Code** and click **Continue**.
   - Assert URL ends with `/checkout-step-two.html`.
   - Assert the **overview** lists **3** items.

4. **Finish**
   - Click **Finish** and assert URL ends with `/checkout-complete.html`.
   - Assert success text **“Thank you for your order!”** is visible.

> This coverage implements the required **successful checkout** (happy path) scenario only, with appropriate assertions at each step.