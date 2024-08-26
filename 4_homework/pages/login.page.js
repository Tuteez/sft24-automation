const { expect } = require('@playwright/test');
const env = require('../env'); // Import the environment variables

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async navigate() {
        await this.page.goto(env.urls.baseUrl); // Use base URL from env
    }

    async login(username = env.credentials.standardUser.username, password = env.credentials.standardUser.password) {
        // Use default credentials from env if none are provided
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async assertLoginSuccess() {
        await expect(this.page.locator('.inventory_list')).toBeVisible();
    }

    async assertLoginFailure() {
        await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    }
}

module.exports = { LoginPage };

