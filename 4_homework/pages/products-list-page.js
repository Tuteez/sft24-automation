import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.addToCartBtn = page.locator('.btn_primary');
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

  /**
   * Method opens the login page
   */
  async goto(){
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  /**
   * Fill the username field
   * @param {string} username 
   */
  async fillUserame(username) {
    await this.page.locator("#user-name").fill(username);
  }

  /**
   * Fill the the password field
   * @param {string} password 
   */
  async fillPassword(password) {
    await this.page.locator("#password").fill(password);
  }

  /**
   * Clicks the login button
   */
  async clickLogin() {
    await this.page.locator("#login-button").click();
  }


  /**
   * Verifies that the dropdown exists
   * @param {string} value an option from the dropdown menu 
   */
  async checkForDropdown(value) {
    await expect(this.page.locator(".product_sort_container")).toContainText(value);
  }

  /**
   * Chooses an option in the dropdown
   * @param {string} filter an option from the menu
   */
  async chooseFilter(filter) {
    await this.page.locator(".product_sort_container").selectOption(filter);
  }

  /**
   * Clicks 'Add to cart' button
   */
  async clickAddToCart(){
    await this.page.locator("#add-to-cart-sauce-labs-backpack").click();
    
  }

  /**
   * Verifies that after clicking 'Add to cart', the button changes into 'Remove',
   *  item is added into cart and the original 'Add to cart' button is no longer visible
   * @param {string} buttonValue the 'Remove' button text value
   */
  async verifyAddToCartClick(buttonValue){
    //verify that after clicking 'add to cart' the button changes into 'Remove'
    await expect(this.page.locator("#remove-sauce-labs-backpack")).toContainText(buttonValue);

    //verify that after clicking 'add to cart' the button is not visible anymore
    await expect(this.page.locator("#add-to-cart-sauce-labs-backpack")).not.toBeVisible();

    //verify that after clicking 'add to cart' the cart icon shows the ammount of items in cart
    await expect(this.page.locator(".shopping_cart_badge")).toContainText(/[1-9]/);
  }

  /**
   * Method that verifies if each product in the product list page
   *  has it's own 'Add to cart' button
   */
  async verifyAddToCartBtns(addToCart){
    let isButton = false;
    let list = await this.addToCartBtn.allTextContents();
    list.forEach((element, index) => {
      if(list[index] == addToCart)
      {
        isButton = true;
      }
      else{
        isButton = false;
      }
    });
    await expect(isButton).toBe(true);
  }

  /**
   * Clicks the 'Remove' button
   */
  async clickRemoveBtn(){
    await this.page.locator("#remove-sauce-labs-backpack").click();
  }
  
  /**
   * Verifies that after clicking 'Remove', the button changes into 'Add to cart',
   *  item is removed from cart and the original 'Remove' button is no longer visible
   * @param {string} buttonValue the 'Add to cart' button text value
   */
  async verifyRemoveClick(buttonValue){
    //verify that after clicking 'Remove' the button changes into 'Add to cart'
    await expect(this.page.locator("#add-to-cart-sauce-labs-backpack")).toContainText(buttonValue);
    
    //verify that after clicking 'Remove' the button is not visible anymore
    await expect(this.page.locator("#remove-sauce-labs-backpack")).not.toBeVisible();

    //verify that after clicking 'Remove' the cart is empty 
    await expect(this.page.locator(".shopping_cart_badge")).not.toBeVisible();
  }
}
