import type { Page} from "@playwright/test";
import { expect } from "@playwright/test";

export class LoginPage {
    constructor(private readonly page: Page) {}

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL(/\/$/);
    }

    async login(username: string, password: string) {
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.locator('[data-test="login-button"]').click();

        await expect(this.page).toHaveURL(/.*\/inventory\.html$/);
    }
}