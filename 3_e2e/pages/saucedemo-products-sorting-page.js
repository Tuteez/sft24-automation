import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsSortingPage {
  constructor(page) {
    this.page = page;
  }

  async productsSortOnSelectAction () {
    await this.page.goto("https://www.saucedemo.com/static/js/utils/Sorting.js");
    await expect(this.page.locator("return [...data].sort((a, b) => a[property].localeCompare(b[property]))")).toBeTruthy();
    await expect(this.page.locator("return [...data].sort((a, b) => b[property].localeCompare(a[property]))")).toBeTruthy();
    await expect(this.page.locator("return [...data].sort((a, b) => Number(a[property]) - Number(b[property]));")).toBeTruthy();
    await expect(this.page.locator("return [...data].sort((a, b) => Number(b[property]) - Number(a[property]));")).toBeTruthy();
  }

  async defaultSortValue() {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/Inventory.jsx");
    await expect(this.page.locator("const [inventoryList, setInventoryList] = useState(sortAsc(InventoryData, 'name')")).toBeTruthy();
  }

  async defaultSortValuex2() {
    await this.page.goto("https://www.saucedemo.com/");
    await this.page.locator("#user-name").fill('standard_user');
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await expect(this.page.locator('[data-test="active-option"]')).toContainText('Name (A to Z)');
  }

  async addToCartOnCard () {
    await this.page.goto("https://www.saucedemo.com/");
    await this.page.locator("#user-name").fill('standard_user');
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await this.page.locator('tekstas')
  }
}