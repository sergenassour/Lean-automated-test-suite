import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class InventoryPage {
    readonly items: Locator;
    readonly cartLink: Locator;

    constructor(private readonly page: Page) {
        this.items = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async assertOnInventoryPage() {
        await expect(this.page).toHaveURL(/\/inventory\.html$/);
        await expect(this.items.first()).toBeVisible();
    }

    async addRandomItemToCart(count: number) {
        const total = await this.items.count();
        if (total < count) throw new Error(`Only ${total} items available, need ${count}.`);

        const picked = new Set<number>();
        while (picked.size < count) picked.add(Math.floor(Math.random() * total));

        for (const idx of picked) {
            const item = this.items.nth(idx);
            const addButton = item.locator('[data-test^="add-to-cart-"]');
            await addButton.click();
            const removeButton = item.locator('[data-test^="remove-"]');
            await expect(removeButton).toBeVisible();
        }
    }
    
    async openCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/\/cart\.html$/);
    }
}