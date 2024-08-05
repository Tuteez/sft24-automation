import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div.inventory_item_name');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.sortSelection = page.locator('[data-test="product-sort-container"]');
    this.addToCartButton = page.locator('button:has-text("Add to cart")').nth(0);
    this.removeButton = page.locator('button:has-text("Remove")') ;
    this.shoppingCartLinkButton = page.locator('[data-test="shopping-cart-link"]') ;

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
  ;
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


  //adds first product from the Product List
  async addProductToCartFromProductList(){
    await this.addToCartButton.click();
  }

  //removes  product  from shipping cart by clicking Remove Button on product list page
  async removeProductFromCartFromProductList(){
    await this.removeButton.click();
    await this.shoppingCartLinkButton.click();
    await expect(this.removeButton).not.toBeVisible();


  }


  // sorts and verifies the list based on given parameters
 /**
  * @param {String} sortBy name or price
  * @param {boolean} asc condition to check. True if should be sorted in ascending order, else false 
  * */ 
  async sortBy(sortBy, asc){

      if(sortBy === 'Name'&& asc ===true){
      await expect( await this.isListSortedByName(asc)).toBe(true);
    } else if (sortBy === 'Name' && asc !== true) {
     await this.sortSelection.selectOption('Name (Z to A)');
      await expect(  await this.isListSortedByName(asc)).toBe(true);
    } else if(sortBy === 'Price' && asc ===true ){
      await this.sortSelection.selectOption('Price (low to high)');
      await expect(  await this.isListSortedByPrice(asc)).toBe(true);
    } else if(sortBy === 'Price' && asc !== true){
      await this.sortSelection.selectOption('Price (high to low)');
      await expect(  await this.isListSortedByPrice(asc)).toBe(true);
    }
  
    
  }



}
