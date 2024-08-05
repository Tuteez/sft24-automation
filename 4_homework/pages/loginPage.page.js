
export class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async fillUserName(name) {
    await this.page.locator("#user-name").fill(name);
  }

  async fillPassword(password) {
    await this.page.locator("#password").fill(password);
  }

  async clickLoginButton(button) {
    await this.page.locator("#login-button").click(button);
  }

}
