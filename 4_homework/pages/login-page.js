import {expect} from '@playwright/test';
import messages from "../utils/messages";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.messagePanel = page.locator('[data-test="error"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
        await expect(this.page).toHaveTitle("Swag Labs");
    }

    async fillUsername(username) {
        await this.username.fill(username);
    }

    async fillPassword(password) {
        await this.password.fill(password);
    }

    async doLogin(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.loginButton.click();
    }

    async checkInvalidCredentials() {
        await expect(this.messagePanel).toHaveText(messages.login.invalid);
    }
}
