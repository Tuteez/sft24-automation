import { expect } from "@playwright/test";
export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
  }

  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well
  // (you can use what is provided or write your own)

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByName(asc) {
    let list = await this.itemNameDiv.allTextContents();

    return await this.isListSorted(list, asc);
  }

  /**
   * Checks if products are sorted properly by price
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByPrice(asc) {
    let list = await this.itemPriceDiv.allTextContents();
    list.forEach((element, index) => {
      list[index] = parseFloat(element.slice(1));
    });

    return await this.isListSorted(list, asc);
  }

  /**
   *
   * @param {Array} list list of elements to check
   * @param {boolean} asc condition to check. True if should be sorted in ascending order, else false
   * @returns True if list sorted as expected, else false
   */
  async isListSorted(list, asc) {
    return list.every(function (num, idx, arr) {
      if (asc === true) {
        return num <= arr[idx + 1] || idx === arr.length - 1 ? true : false;
      }
      return num >= arr[idx + 1] || idx === arr.length - 1 ? true : false;
    });
  }
  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
    await this.page.locator("#user-name").fill("standard_user");
    // await this.page.locator("#user-name").fill("locked_out_user");
    // await this.page.locator("#user-name").fill("problem_user");
    // await this.page.locator("#user-name").fill("performance_glitch_user");
    // await this.page.locator("#user-name").fill("error_user");
    // await this.page.locator("#user-name").fill("visual_user");
    await this.page.locator("#password").fill("secret_sauce");
    await this.page.locator("#login-button").click();
  }

  async containsDropdown() {
    const dropDown = this.page.locator(".product_sort_container");
    await expect(dropDown).toBeVisible();

    const options = await dropDown.locator("option");
    const expectedOptions = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];
    await expect(options).toHaveCount(expectedOptions.length);
  }

  async dropDownContainsOptions() {
    const dropDown = this.page.locator(".product_sort_container");
    const options = await dropDown.locator("option");
    const expectedOptions = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];
    for (let i = 0; i < expectedOptions.length; i++) {
      await expect(options.nth(i)).toHaveText(expectedOptions[i]);
    }
  }

  async productSortingPerformed() {
    const dropDown = this.page.locator(".product_sort_container");

    await expect(await this.isListSortedByName(true)).toBe(true);

    await dropDown.selectOption({ label: "Name (Z to A)" });
    await expect(await this.isListSortedByName(false)).toBe(true);

    await dropDown.selectOption({ label: "Price (low to high)" });
    await expect(await this.isListSortedByPrice(true)).toBe(true);

    await dropDown.selectOption({ label: "Price (high to low)" });
    await expect(await this.isListSortedByPrice(false)).toBe(true);
  }
  async defaultSortingSelected() {
    await expect(await this.isListSortedByName(true)).toBe(true);
  }

  async addCartButtonPresent() {
    const buttons = this.page.locator("text=Add to Cart");
    await expect(await buttons.count()).toBe(6);
  }

  async clickAddCartButtons() {
    const items = this.page.locator(".inventory_item_description");
    const count = await items.count();

    // Adds all (6) items to cart
    for (let i = 0; i < count; i++) {
      const button = items.nth(i).locator(".pricebar").locator("button");

      await button.scrollIntoViewIfNeeded();
      await button.waitFor({ state: "visible" });
      await button.click();
    }
    //Goes to cart page
    await this.page.locator(".shopping_cart_link").click();
    // Locates and counts all items in cart
    const cartItems = this.page.locator(".cart_item");
    const cartCount = await cartItems.count();
    // Checks if there are 6
    await expect(cartCount).toBe(6);

    /*Could have been done by checking the shopping_cart_badge number. 
    Doing this would have let me to complete the test without navigating to another page, 
    but idk, maybe the badge number is bad
     */
  }

  async checkForRemove() {
    const items = this.page.locator(".inventory_item_description");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const button = items.nth(i).locator(".pricebar").locator("button");

      await button.scrollIntoViewIfNeeded();
      await button.waitFor({ state: "visible" });

      // Clicks all "Add to Cart" buttons in products list page
      await button.click();
      // Expects to see "Remove" buttons where "Add to cart" buttons used to be
      await expect(
        items.nth(i).locator(".pricebar").locator("text=Remove")
      ).toBeVisible();
      // Goes into every Product preview page and checks for Remove button
      await items.nth(i).locator(".inventory_item_label").locator("a").click();

      await expect(this.page.locator("#remove")).toBeVisible();
      await this.page.goBack();
      await this.page.waitForLoadState("load");
    }

    // Goes into cart page
    await this.page.locator(".shopping_cart_link").click();
    const cartItems = this.page.locator(".cart_item");
    const cartCount = await cartItems.count();

    // Checks if there are "Remove" buttons near every cart item
    for (let i = 0; i < cartCount; i++) {
      await expect(
        await cartItems
          .nth(i)
          .locator(".cart_item_label")
          .locator(".item_pricebar")
          .locator("text=Remove")
      ).toBeVisible();
    }
  }
}
