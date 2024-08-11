import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsAddingToCartPage {
  constructor(page) {
    this.page = page;
  }

  async addToCartOnCard () {
    await this.page.goto("https://www.saucedemo.com/");
    await this.page.locator("#user-name").fill('standard_user');
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await expect(this.page.locator('#add-to-cart-sauce-labs-backpack')).toContainText('Add to cart');
    await expect(this.page.locator('#add-to-cart-sauce-labs-bike-light')).toContainText('Add to cart');
    await expect(this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')).toContainText('Add to cart');
    await expect(this.page.locator('#add-to-cart-sauce-labs-fleece-jacket')).toContainText('Add to cart');
    await expect(this.page.locator('#add-to-cart-sauce-labs-onesie')).toContainText('Add to cart');
    await expect(this.page.locator('[name="add-to-cart-test.allthethings()-t-shirt-(red)"]')).toContainText('Add to cart');
  }

  async addToCartonCardx2 () {
     await this.page.goto("https://www.saucedemo.com/static/js/pages/Inventory.jsx");
     await expect(this.page.locator("return (<InventoryListItem key={item.id} id={item.id} image_url={isProblemUser() || (isVisualFailure && i === 0) ? 'sl-404.jpg' : item.image_url} name={item.name} desc={item.desc} price={isVisualFailure ? randomPrice() : item.price} isTextAlignRight={isVisualFailure && i > 1 && i < 4} missAlignButton={isVisualFailure && i === 5} />")).toBeTruthy();
   }

}
