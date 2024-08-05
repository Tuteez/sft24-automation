import { expect } from "@playwright/test";
import { Users } from "../user-data/userCreds";



export class LoginPage {

  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async userLogin(page, user) {
    await page.locator("#user-name").fill(user.username);
    await page.locator("#password").fill(user.password);
    await page.locator("input[type='submit']").click();
  }
}

