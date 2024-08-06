import { expect } from "@playwright/test";
import { USERS } from "../configs/user-config";

export class loginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  };

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
  };

  async fillInUsername(value) {
    await this.username.fill(value);
  };

  async fillInPassword(value) {
    await this.password.fill(value);
  };

  async pressLoginButton() {
    await this.loginButton.click();
    await expect(this.page.locator(".title")).toContainText("Products");
    await expect(this.page.locator(".app_logo")).toContainText("Swag Labs");
  };

  async loginChosenUser(userRole) {
    const user = USERS[userRole];
    if (!user) {
      throw new Error(`User role "${userRole}" not found in configuration`);
    };

    await this.fillInUsername(user.username);
    await this.fillInPassword(user.password);
    await this.pressLoginButton();
  };

};