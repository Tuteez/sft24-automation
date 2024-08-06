import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto(){
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  async enterUsername(username){
    await this.page.locator("#user-name").fill(username);
    }

  async enterPassword (password){
    await this.page.locator("#password").fill(password);
  } 

  async pressLoginButtonSuccess(){
    await this.page.locator("#login-button").click();
    await expect(this.page.locator(".title")).toHaveText("Products");
  }
  
  
}