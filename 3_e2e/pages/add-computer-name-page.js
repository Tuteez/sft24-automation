import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class AddComputerName {
  constructor(page) {
    this.page = page;
  }

  async addComputerName(name) {
    await this.page.locator("#name").fill(name);
  }
  async dateIntroduced(name) {
    await this.page.locator("#name").fill(name);
  }
  
}
