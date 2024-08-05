import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
        await expect(this.page).toHaveTitle("Swag Labs");
    }

    //logs into the website using parametrization - different users data
    async logIn(username, password) {
        await this.page.locator("#user-name").fill(username);
        await this.page.locator("#password").fill(password);
        await this.page.locator("#login-button").click();
        await expect(this.page.locator('span[data-test="title"]')).toHaveText('Products');
    }
}

