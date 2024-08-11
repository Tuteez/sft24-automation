import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsListPage {
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
    await expect(this.page.locator('[data-test="active-option"]')).toHaveClass('active_option');
}

  async sortingRightTopCorner() {
    await this.page.goto("https://www.saucedemo.com/static/js/components/HeaderContainer.jsx");
    await expect(this.page.locator('{secondaryRightComponent && (<RightComponent rightComponent={secondaryRightComponent} />')).toBeTruthy();
}

  async availableOptionsSelect() {
    await this.page.goto("https://www.saucedemo.com/");
    await this.page.locator("#user-name").fill('standard_user');
    await this.page.locator("#password").fill('secret_sauce');
    await this.page.locator("#login-button").click();
    await expect(this.page.locator('[data-test="product-sort-container"]')).toHaveText("Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)");
}
  async removeButtOnEachCard() {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/Inventory.jsx");
    await expect(this.page.locator('return (<InventoryListItem key={item.id} id={item.id} image_url={isProblemUser() || (isVisualFailure && i === 0) ? "sl-404.jpg" : item.image_url} name={item.name} desc={item.desc} price={isVisualFailure ? randomPrice() : item.price} isTextAlignRight={isVisualFailure && i > 1 && i < 4} missAlignButton={isVisualFailure && i === 5} /> );')).toBeTruthy();
}
}