
import { expect } from "@playwright/test";
import { getRandomValues } from "crypto";


export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.dropdown = page.locator('.product_sort_container');
    this.dropdownOptions = this.dropdown.locator('option');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.shoppingCartCount = page.locator('.shopping_cart_badge');
    this.firstItem = page.locator('.inventory_item_name');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.cartButton = page.locator('.shopping_cart_link');
    
  }


async goto() {
  await this.page.goto("https://www.saucedemo.com/");
  await expect(this.page).toHaveTitle("Swag Labs");
}


async logIn(username = 'standard_user', password = 'secret_sauce') {
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
  await this.page.click('#login-button');
}

async verifyLogin() {
  await expect(this.page.locator('.app_logo')).toContainText("Swag Labs");
}


async verifyDropdownOptions(expectedOptions) {
  const actualValues = await this.dropdownOptions.evaluateAll(options => options.map(option => option.value));
  const actualTexts = await this.dropdownOptions.evaluateAll(options => options.map(option => option.textContent.trim()));

  expect(actualValues).toEqual(expectedOptions.map(opt => opt.value));
  expect(actualTexts).toEqual(expectedOptions.map(opt => opt.text));
}
/* async getDropdownOptions() {   //this might be better, replace later
    return await this.sortDropdown.locator("option").allTextContents();
  }

  async validateDropdownOptions(expectedOptions) {
    let options = await this.getDropdownOptions();
    await expect(options).toEqual(expectedOptions);
    await expect(options).toHaveLength(expectedOptions.length);
  }*/

/**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
async isListSortedByName(asc) {
  let list = await this.itemNameDiv.allTextContents();
  return this.isListSorted(list, asc);
} catch (error) {
  console.error('Error while checking if list is sorted by name:', error);
  throw error;
}

/*/**
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


async isListSorted(list, asc) {
  const sortedList = [...list].sort((a, b) => (asc ? a - b : b - a));
  return list.every((item, index) => item === sortedList[index]);
}
/*/**
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



async selectSortOption(optionValue) {
  await this.dropdown.selectOption({ value: optionValue });
}
// end of 1st user story


async addToCart(index = 0) {
await this.addToCartButton.nth(index).click();
}

async retrieveCartItemCounter() {
  if ((await this.shoppingCartCount.count()) === 0) {
    return 0;
  } else {
    let counterText = await this.shoppingCartCount.textContent();
    return parseInt(counterText);
    
  }}

async validateProductCountInCart(expectedCount) {
  let actualCount = await this.retrieveCartItemCounter();
 expect(actualCount).toEqual(expectedCount);
}

async selectFirstItem(index = 0) {
await this.firstItem.nth(index).click();

}

async validateItemSelection() {
  const backToProductsButton = this.page.locator('#back-to-products');
  await expect(backToProductsButton).toBeVisible();
}

async checkRemoveButton(index = 0) {
  await expect(this.removeButton.nth(index)).toBeVisible();
}

async enterCart() {
await this.cartButton.click();
}

async clickRemoveButton(index = 0) {
await this.removeButton.nth(index).click();

}

}


