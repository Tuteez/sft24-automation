export class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async enterUserName(userName) {
    await this.page.locator("#user-name").fill(userName);
  }
  async enterPassword(password) {
    await this.page.locator("#password").fill(password);
  }
  async clickLogin() {
    await this.page.locator("#login-button").click();
  }
  async login(userName, password) {
    await this.enterUserName(userName);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}
