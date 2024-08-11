import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  async loginUser(user_name) {
    await this.page.locator("#user-name").fill(user_name);
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await expect(this.page.locator(".title")).toHaveText("Products");
  }

  async loginLockedOutUser(locked_name) {
    await this.page.locator("#user-name").fill(locked_name);
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await expect(this.page.locator('[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  }

}