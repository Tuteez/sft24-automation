import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
      this.page = page;
      this.errorMessage = page.locator("h3");
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
        await expect(this.errorMessage).toHaveText(errorMessage)
      }
      
    };