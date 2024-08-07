import { expect } from "@playwright/test";

export class LoginPage {
    
    constructor(page) {
        this.page = page;
      }

      async goto() {
        await this.page.goto("https://www.saucedemo.com");
        await expect(this.page).toHaveTitle("Swag Labs");
      }

      async loginStandardUser() {
        await this.page.locator("#user-name").fill("standard_user");
        await this.page.locator("#password").fill("secret_sauce");
        await this.page.locator("#login-button").click();
      }
      
}