import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  async loginUser(user_name) {
    await this.page.locator("#user-name").fill(user_name);
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await expect(this.page.locator(".title")).toHaveText("Products");
}








  // async loginStandardUser(user_name) {
    // await this.page.locator("#user-name").fill(user_name);
    // await this.page.locator("#password").fill('secret_sauce');
    // await this.page.locator("#login-button").click();
    // await expect(this.page.locator(".title")).toHaveText("Products") || await expect(this.page.locator("#h3")).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  // }

//  async openNewComputerCreationPage() {
    // await this.page.locator("#add").click();
    // await expect(this.page.locator("#main h1")).toHaveText("Add a computer");
  // }

  // async emptySearchList(value) {
    // await this.page.locator("#searchbox").fill(value);
    // await this.page.locator('#searchsubmit').click();
// }

  // async emptySearchListConfirmation() {
    // await expect(this.page.locator("#main h1")).toHaveText("No computer");
      //locator(".well")).toContainText("Nothing to display");
      //locator("#main")).toHaveText("No computer");
// }

}