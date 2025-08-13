import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class CartPage {
    readonly cartItems: Locator;

    constructor(private readonly page: Page) {
        this.cartItems = page.locator('.cart_item');
    }

    async assertItemsCount(expected: number) {
        await expect(this.cartItems).toHaveCount(expected);
    }

    async checkout() {
        await this.page.locator('[data-test="checkout"]').click();
        await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    }
}
