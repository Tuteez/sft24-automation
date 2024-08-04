import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsRemoveoOnItemsCartPage {
  constructor(page) {
    this.page = page;
  }

  async removeOnEachProductOnCart () {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/Cart.jsx");
    await expect(this.page.locator("{contents.map((item, i) => (<CartItem key={i} item={InventoryData[item]} showButton />))}")).toBeTruthy();
  }
//contents.map((item, i) => (<CartItem key={i} item={InventoryData[item]} showButton />))
// Kaip teisingai tikrinti funkciją 
}
