export class LoginPage {
  constructor(page) {
    this.page = page;
    this.name = 'standard_user';
    this.password = 'secret_sauce';
    this.loginButton = page.locator('#login-button');
  
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login() {
    await this.page.locator('#user-name').fill(this.name);
    await this.page.locator('#password').fill(this.password);
    await this.loginButton.click();

  }


}
