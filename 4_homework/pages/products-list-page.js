export class ProductsListPage {
    constructor(page) {
      this.page = page;
      this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
      this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
      this.itemSortProductByDiv = page.locator('.product_sort_container');
      this.itemAddToCartDiv = page.locator('#add-to-cart-sauce-labs-backpack')
      this.itemGoToCartDiv = page.locator('.shopping_cart_link')
      this.itemProductName = page.locator('.inventory_item_name')
      this.itemProductPrice = page.locator('.inventory_item_price')
    }
  
  
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



    async selectSortAction(value) {
      await this.itemSortProductByDiv.selectOption(value);
    }

    async clickAddToCart(value) {
      await  this.itemAddToCartDiv.click();
    }
    
    async clickGoToCart(value) {
      await  this.itemGoToCartDiv.click();
    }

    async getFirstProductName() {
      let ItemProductName = await this.itemProductName.textContent();
      return ItemProductName;
    }


    async getFirstProductPrice() {
      let ItemProductPrice = await this.itemProductPrice.textContent();
      return ItemProductPrice;
    }


  }
  