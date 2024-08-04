export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Goes to login page
   */
  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  /**
   * Logs in using provided username and password
   * @param {string} username provided username
   * @param {string} password provided password
   */
  async login(username, password) {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#login-button").click();
  }
}
