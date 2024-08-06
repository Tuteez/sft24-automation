import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  async fillTheData(loginData) {
     await this.page.locator('#user-name').fill(loginData.username);
     await this.page.locator('#password').fill(loginData.password);
     await this.page.locator("#login-button").click();
  }
}
