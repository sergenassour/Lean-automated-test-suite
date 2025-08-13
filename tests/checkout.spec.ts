import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/login.js';
import { InventoryPage } from '../src/pages/inventory.js';
import { CheckoutPage } from '../src/pages/checkout.js';
import { CartPage } from '../src/pages/cart.js';

test.describe('SauceDemo - Happy Path Checkout', () => {
  test('select 3 random items and complete checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await inventory.assertOnInventoryPage();
    await inventory.addRandomItemToCart(3);
    await inventory.openCart();

    await cart.assertItemsCount(3);
    await cart.checkout();

    await checkout.fillInformation('First', 'Last', 'H0H0H0');
    await checkout.assertOverviewItemsCount(3);
    await checkout.finish();
  });
});