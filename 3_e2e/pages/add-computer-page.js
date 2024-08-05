import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class AddComputerPage {
  constructor(page) {
    this.page = page;
  }

  async addComputerName(name) {
    await this.page.locator('#name').fill(name);
  }
}
