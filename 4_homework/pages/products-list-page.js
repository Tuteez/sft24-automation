export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator(".inventory_item_name");
    //somehow this selector didn't worked ('div[class="inventory_item_name"]') so i changed it;
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    //this selector worked
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
    console.log(">>>>>>>>>>>", list);
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
    console.log(">>>>>>>>>>>", list);
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
      //every - jei su kiekviena reiksme bus true, tuomet tik ir bus true, jei kazkuri neatitiks, bus false
      if (asc === true) {
        return num <= arr[idx + 1] || idx === arr.length - 1 ? true : false;
      } //num <= arr[idx + 1] tikrina ar dabartine tikrinama reiksme yra ne didesne uz sekancia po jos
      // idx === arr.length - 1 tikrina ar tai yra paskutine reiksme
      return num >= arr[idx + 1] || idx === arr.length - 1 ? true : false;
    }); //tikrina ar dabartine tikrinama reiksme yra ne zemesne nei sekanti
  }

  //Show dropdown element location
    async getElementLocation() {
    return await this.page.locator(".product_sort_container").evaluate((element) => {
    return element.getBoundingClientRect();
  });
  }
  
 //return all sorting options that are available
  async getAllSortingOptions() {
    return await this.page.locator("option");
  }

//check if there are specific sorting options
  async getSortingOptionByValue(value) {
    return await this.page.locator(`option[value="${value}"]`);
  }

//select specific sorting option
  async selectSortingOption(option) {
    await this.page.locator(".product_sort_container").selectOption(option);
  }

  //return default sorting option
  async getActiveSortingOption() {
    return await this.page.locator(".active_option");
  }

  //return how much items there are in product list
  async getAllInventoryItemCount() {
    return await this.page.locator(".inventory_item").count();
  }

  //return how much 'Add to cart' buttons there are in products list
  async getAllAddToCartButtonCount() {
    return await this.page.locator(".btn").count();
  }

  //add item to cart in product list
  async addItemToCart() {
    await this.page.waitForSelector("#add-to-cart-sauce-labs-backpack");
    await this.page.locator("#add-to-cart-sauce-labs-backpack").click();
  }

  //return products titles
  async getProductsTitles() {
    return await this.page.locator(".inventory_item_name").all();
  }

  //check if cart icon have badge after one item is added
  async getCartIconBadge() {
    return await this.page.locator(".shopping_cart_badge");
  }

  //check if theres remove button in product list
  async getRemoveButton() {
    await this.page.waitForSelector("#remove-sauce-labs-backpack");
    return await this.page.locator("#remove-sauce-labs-backpack");
  }

  /*  I was curious to try make loop with arrays, which i could be using in 2nd user story
  //await productsListPage.goToEachProductPreviewPage();
  //go to product preview page of each item from productsListPage
  async goToEachProductPreviewPage() {
    //get all the elements
    const items = await this.page.locator(".inventory_item_name").all();
    //loops to go through all elements
    for (let i = 0; i < items.length; i++) {
      //click on the item
      await items[i].click();
      //wait for the product preview page to be loaded
      await this.page.waitForSelector(".inventory_details_name");
      //check if product preview page has 'Add to cart' button
      await this.page.locator("#add-to-cart").click();
      await this.page.locator("#remove").click();

      //go back to the main product list page
      await this.page.goBack();
      //wait for product list page to be loaded
      await this.page.waitForSelector(".inventory_item_name");
    }
  }
   */ 
}
