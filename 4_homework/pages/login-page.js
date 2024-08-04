import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async goToLoginPage() {
        await this.page.goto("https://www.saucedemo.com");
        await expect(this.page).toHaveTitle("Swag Labs");
      }
    
      async login(username, password) {
        await this.page.locator("#user-name").fill(username);
        await this.page.locator("#password").fill(password);
        await this.page.locator("#login-button").click();
      }
    
      async validateLoginErrorMessage(errorMessage) {
        await expect(this.page.locator("h3")).toHaveText(errorMessage);
      }
      
    };