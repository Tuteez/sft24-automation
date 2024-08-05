import { expect } from "@playwright/test";

export class loginPage {
  constructor(page) {
    this.page = page;
  };

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
  };

  async fillInUsername(value) {
    await this.page.locator("#user-name").fill(value);
  };

  async fillInPassword(value) {
    await this.page.locator("#password").fill(value);
  };

  async pressLoginButton() {
    await this.page.locator("#login-button").click();
    await expect(this.page.locator(".title")).toContainText("Products");
    await expect(this.page.locator(".app_logo")).toContainText("Swag Labs");
  };
};