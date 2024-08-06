import { expect } from "@playwright/test";

export class PreviewPage {
  constructor(page) {
    this.page = page;
  }

  async checkPreviewCartButton()
  {
      await expect (this.page.locator(".inventory_details_desc_container")).toContainText('Add to cart');
      await this.page.locator("#back-to-products").click();
  }
  async checkPreviewRemoveButton()
  {
      await expect (this.page.locator(".inventory_details_desc_container")).toContainText('Remove');
      await this.page.locator("#back-to-products").click();
  }

  

}