export class LoginPage {
  constructor(page) {
    this.page = page;
    this.name = 'standard_user';
  
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login() {
    await this.page.locator('#user-name').fill(this.name);
    await this.page.locator('#password').fill('secret_sauce');
    await this.page.locator('#login-button').click();

  }


}
