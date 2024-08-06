import { expect } from "@playwright/test";



export class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async checkSorting() {
   await expect (this.page.locator(".product_sort_container")).toContainText("Name (A to Z)");
   await expect (this.page.locator(".product_sort_container")).toContainText("Name (Z to A)");
   await expect (this.page.locator(".product_sort_container")).toContainText("Price (low to high)");
   await expect (this.page.locator(".product_sort_container")).toContainText("Price (high to low)");
   //Products sorting should be performed on option select action.
   await expect (this.page.locator("[data-test='active-option']")).toContainText("Name (A to Z)");
  }

  async checkCartButtons()
  {
    const listingCount = await this.page.locator(".inventory_item").count();
    const buttonCount = await this.page.locator(".inventory_item .btn_inventory").count();
    await expect (this.page.locator("#add-to-cart-sauce-labs-backpack")).toContainText("Add ");
    await expect(listingCount).toEqual(buttonCount);

  }
  async checkPreviewButtons(locat)
  {
       await this.page.locator(locat).click();
  }

  async addToCart(locAdd, locRemove, text) 
  {
    await this.page.locator(locAdd).click(); 
    await expect(this.page.locator(".shopping_cart_badge")).toContainText("1"); //checking if a badge indicates that the item is added
    const buttonCount02 = await this.page.locator("[name^='add-to-cart']").count();
    await expect(buttonCount02).toEqual(5) ; //checking if the 'add to cart' button dissapears
    await this.page.locator(".shopping_cart_link").click();
    await expect(this.page.locator(".cart_list")).toContainText(text); //checking if the item appears in the cart
    await this.page.locator("#continue-shopping").click();
    await this.page.locator(locRemove).click();
  }
  async addToCartAll()
  {
    await this.page.locator("#add-to-cart-sauce-labs-backpack").click();
    await this.page.locator("#add-to-cart-sauce-labs-bike-light").click();
    await  this.page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").click();
    await this.page.locator("#add-to-cart-sauce-labs-fleece-jacket").click();
    await this.page.locator("#add-to-cart-sauce-labs-onesie").click();
    await  this.page.locator("[name='add-to-cart-test.allthethings()-t-shirt-(red)']").click();

  }
  async checkRemoveButtons()
  {
    const listingCount = await this.page.locator(".inventory_item").count();
    const buttonCount = await this.page.locator("[name^='remove']").count();
    await expect(listingCount).toEqual(buttonCount);
    //console.log(buttonCount);

  }
  async goToCart()
  {
    await this.page.locator(".shopping_cart_link").click();
  }
}
