import { expect } from "@playwright/test";

export function formatProductId(productName) {
  return productName
    .toLowerCase()
    .replace(/\s+/g, '-')               // Replace spaces with hyphens
    .replace(/[^a-z0-9\-\.\(\)]+/g, ''); // Keep only alphanumeric, hyphens, dots, and parentheses
};

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.sortContainer = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.allProductButtons = page.locator(".btn_inventory");
    this.allProductDescriptions = page.locator(".inventory_item_description");
  };
  
  async getSortOptions() {
    return this.sortContainer.evaluate(select => {
        return Array.from(select.options).map(option => ({
            value: option.value,
            text: option.text
        }));
    });
  };

  async selectSortingOption(value) {
    await this.sortContainer.selectOption(value);
    // Wait for sorting operation to complete
    await this.page.waitForTimeout(2000);
  };

  async getSelectedSortingOption() {
    return await this.sortContainer.inputValue();
  }

 async checkIfEachProductHasButton() { // count all product descriptions and all product buttons and see if the same amount
  expect(this.allProductDescriptions.length).toBe(this.allProductButtons.length); 
 };

// DO NOT EDIT UNDER ANY CIRCUMSTANCE - START
// Helper method to create data-test selectors
 dataTestSelector(testValue) {
  return this.page.locator(`[data-test="${testValue}"]`);
};

addButtonLocator(productName) {
  return this.dataTestSelector(`add-to-cart-${formatProductId(productName)}`);
};

removeButtonLocator(productName) {
  return this.dataTestSelector(`remove-${formatProductId(productName)}`);
};

productLinkLocator(productName) {
  return this.page.locator(`div.inventory_item_name`, { hasText: productName });
};

//DO NOT EDIT UNDER ANY CIRCUMSTANCE - END

async openProductPreview(productName) {
  const productLink = this.productLinkLocator(productName);
  await productLink.click();
};

async addProductToCart(productName) {
  const addButton = this.addButtonLocator(productName);
  const removeButton = this.removeButtonLocator(productName);

  const isAddButtonVisible = await addButton.isVisible();

  if (isAddButtonVisible) {
    await addButton.click();
    await expect(removeButton).toBeVisible({ timeout: 2500 });
  } else {
    await expect(removeButton).toHaveText('Remove');
  };
};

async removeProductFromCart(productName) {
  const removeButton = this.removeButtonLocator(productName);
  const addButton = this.addButtonLocator(productName);

  const isRemoveButtonVisible = await removeButton.isVisible();

  if (isRemoveButtonVisible) {
    await removeButton.click();
    await expect(addButton).toBeVisible({ timeout: 2500 });
  } else {
    await expect(addButton).toHaveText('Add to cart');
  };
};

async isProductInCart() {
  await expect(this.cartBadge).toBeVisible({ timeout: 2500 });
  await expect(this.cartBadge).toHaveText('1');
};

async isProductRemovedFromCart() {
  await expect(this.cartBadge).not.toBeVisible();
};




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
    for (let i = 0; i < list.length - 1; i++) {
      if (asc) {
        if (list[i] > list[i + 1]) {
          return false;
        }
      } else {
        if (list[i] < list[i + 1]) {
          return false;
        }
      }
    }
    return true;
  }
}
