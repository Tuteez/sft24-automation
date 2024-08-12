import { expect } from "../../3_e2e/playwright.config";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-test="username"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
    
    
  }
    async openPage() {
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveText("Password for all users");
    
  }

  async fillUsernameAndPassword(){
    await this.usernameInput.fill("standart_user");
    await this.passwordInput.fill("secret_sauce");
  }

};
  