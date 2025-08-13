import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutPage {
    readonly summaryItems: Locator;

    constructor(private readonly page: Page) {
        this.summaryItems = page.locator('.cart_item');
    }

    async fillInformation(first: string, last: string, zip: string) {
        await this.page.locator('[data-test="firstName"]').fill(first);
        await this.page.locator('[data-test="lastName"]').fill(last);
        await this.page.locator('[data-test="postalCode"]').fill(zip);
        await this.page.locator('[data-test="continue"]').click();
        await expect(this.page).toHaveURL(/.*\/checkout-step-two\.html$/);
    }

    async assertOverviewItemsCount(expected: number) {
        await expect(this.summaryItems).toHaveCount(expected);
    }

    async finish() {
        await this.page.locator('[data-test="finish"]').click();
        await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
        await expect(this.page.locator('[data-test="complete-header"]'))
            .toHaveText(/thank you for your order!/i);
    }
}