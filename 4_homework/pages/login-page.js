import { expect } from "@playwright/test";

export class LogInPage {
  constructor(page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveTitle("Swag Labs");
  };
    

  async logInAsStandardUser(){
    await this.page.locator('#user-name').fill('standard_user');
    await this.page.locator('#password').fill('secret_sauce');
    await this.page.locator('#login-button').click();
    await expect(this.page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Products');
  };

  async logInAsOtherUserTypes(userName, password){
    await this.page.locator('#user-name').fill(userName);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login-button').click();
    await expect(this.page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Products');
  };
  
};


