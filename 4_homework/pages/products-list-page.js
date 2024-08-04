import { expect } from "@playwright/test";
export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.firstUserName = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
    this.dropdownElement = this.page.locator('.product_sort_container');
    this.option = this.dropdownElement.locator('option');
    this.addItem = this.page.locator('#add-to-cart-sauce-labs-backpack')
    this.cartCounter = this.page.locator('.shopping_cart_badge')
    this.specificItemRemove = this.page.locator('#remove-sauce-labs-backpack')
    
  }

  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well
  // (you can use what is provided or write your own)

   async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page).toHaveTitle('Swag Labs');
   }
  //Log in with first user
  async login() {
    await this.firstUserName.fill('standard_user');;
    await this.password.fill('secret_sauce');
  
    //click login
    await this.loginButton.click();
  }


  // Verify to get dropdown options
  async getDropdownOptions() {
  
    return await this.option.allTextContents();
  }

  // Verify dropdown has 4 options
  async dropdownHasFourOptions() {
    const options = await this.getDropdownOptions();
    return options.length;
  }

  
  

  //Verify Dropdown element options work as intendent 
  async elementExist_AZ() {

    await this.dropdownElement.click()
    await this.dropdownElement.selectOption("Name (A to Z)");

  }

  async elementExist_ZA() {

    await this.dropdownElement.click()
    await this.dropdownElement.selectOption("Name (Z to A)");

  }

  async elementExist_asc() {

    await this.dropdownElement.click()
    await this.dropdownElement.selectOption("Price (low to high)");

  }

  async elementExist_desc() {

    await this.dropdownElement.click()
    await this.dropdownElement.selectOption("Price (high to low)");


  }

  async elementActive() {

    await expect(this.page.locator('.active_option')).toHaveText('Name (A to Z)');   


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
// Method to check does all items have ‘Add to cart’ 
  async itemsContainAddToCart() {
    const items = await this.page.$$('.inventory_item')
    let allHaveAddToCartButton = true;
    for (const item of items) {
      const addToCartButton = await item.$('.btn.btn_primary.btn_small.btn_inventory');
      if (!addToCartButton) {
          allHaveAddToCartButton = false;
        

          break ;
        ;
          
      }
      
  } return allHaveAddToCartButton
  
 
  }
  // add to cart action
  async addToCart() {

    await this.addItem.click()


  }
  // Verify that the cart has only 1 item
  async getCartItemCountOne() {
    
    return parseInt ( await this.cartCounter.textContent(), 6)
    

  }
 //Verify all items are added to the cart
  async addToCartAll() {
    
    const itemLocators = this.page.locator('.inventory_item');

   
    const itemCount = await itemLocators.count();

 
    for (let i = 0; i < itemCount; i++) {
      
      const addToCartButtonLocator = itemLocators.nth(i).locator('.btn.btn_primary.btn_small.btn_inventory');
      
   
      if (await addToCartButtonLocator.isVisible()) {
        await addToCartButtonLocator.click(); 
      }
    } return itemCount
  }

  // Method to check does all items have ‘Remove’ 
  async itemsContainRemove() {
    const items = await this.page.$$('.inventory_item')
    let allHaveRemove = true;
    for (const item of items) {
      const removeButton = await item.$('.btn.btn_secondary.btn_small.btn_inventory');
      if (!removeButton) {
          allHaveRemove = false;
        

          break ;
        ;
          
      }
      
  } return allHaveRemove
  

}

async clickSpecificItemRemove() {

  await this.specificItemRemove.click()

}


async isRemoveButtonVisible() {
  return await  this.specificItemRemove.isVisible();
}

}
