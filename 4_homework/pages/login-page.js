import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  /**
 * Logs into the store as a given user
 * @param {string} username
 */
  async loginAs(username) {
      await this.page.locator("#user-name").fill(username);
      await this.page.locator("#password").fill("secret_sauce");
      await this.page.locator("#login-button").click();
  }
}
  