export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = this.page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = this.page.locator('div[class="inventory_item_price"]');
    this.dropdown = this.page.locator('.product_sort_container');
    this.dropdownItems = this.dropdown.locator('option');
    this.cartCounter = this.page.locator('.shopping_cart_badge');
  
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async gotoList() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
  
  async InitLogin(username,password) {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#login-button").click();
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

  async dropdownItemCount() {
    return await this.dropdownItems.count();
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
  async sortAZ() {
    await this.dropdown.click()
    await this.dropdown.selectOption("Name (A to Z)");
  }

  async sortZA() {

    await this.dropdown.click()
    await this.dropdown.selectOption("Name (Z to A)");
  }

  async sortASC() {
    await this.dropdown.click()
    await this.dropdown.selectOption("Price (low to high)");
  }

  async sortDESC() {
    await this.dropdown.click()
    await this.dropdown.selectOption("Price (high to low)");
  }

  async addToCartFirst() {
      await this.page.locator(".btn_inventory").first().click();
  }

  async removeFromCartFirst()
  {
    await this.page.locator(".btn_inventory").first().click();
  }

  async addToCartAll() {
    const items = await this.page.$$('.inventory_item');
    for (const item of items) {
        const button = await item.$('text="Add to cart"'); 
        if (button) {
            await button.click();
        } else {
            console.log('No Add to Cart button found for an item.');
        }
    }
  }
  async removeAll() {
    const items = await this.page.$$('.inventory_item');
    for (const item of items) {
        const button = await item.$('text="Remove"'); 
        if (button) {
            await button.click();
        } else {
            console.log('No Add to Cart button found for an item.');
        }
    }
  }


}
