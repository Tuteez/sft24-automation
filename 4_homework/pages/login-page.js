export class LoginPage {
  constructor(page) {
    this.page = page;
  }


async userLoginToPage (username, password){
await this.page.goto("https://www.saucedemo.com/");
await this.page.locator("#user-name").fill(username)
await this.page.locator("#password").fill(password);
await this.page.locator("#login-button").click();
await this.page.waitForSelector(".primary_header");
}
};
