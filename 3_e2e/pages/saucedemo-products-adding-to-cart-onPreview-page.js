import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsAddingToCartPreviewPage {
  constructor(page) {
    this.page = page;
  }

  async addToCartOnPreviewPage () {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/InventoryItem.jsx");
    await expect(this.page.locator('return (<Button customClass="btn_inventory" label={label} onClick={onClick} size={BUTTON_SIZES.SMALL} testId={testId} type={type} />)')).toBeTruthy();
  }

  async addToCartClickAdding() {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/InventoryItem.jsx");
    await expect(this.page.locator('onClick = itemInCart ? () => removeFromCart(id) : () => addToCart(id)')).toBeTruthy();
    await expect(this.page.locator('ShoppingCart.addItem(itemId); setItemInCart(true)')).toBeTruthy();
  }

  async removeOnProductPreview() {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/InventoryItem.jsx");
    await expect(this.page.locator('<ButtonType id={item.id} itemInCart={itemInCart} item={item.name}/>')).toBeTruthy(); 
  } 
}
