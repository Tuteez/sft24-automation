class ProductsListPage {
  constructor(page) {
      this.page = page;
      this.sortDropdown = page.locator('.product_sort_container');
      this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
      this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
      this.addToCartButtons = page.locator('.btn_inventory');
  }

  async sortProducts(option) {
      await this.sortDropdown.selectOption(option);
  }

  async isListSortedByName(asc) {
      let list = await this.itemNameDiv.allTextContents();
      return this.isListSorted(list, asc);
  }

  async isListSortedByPrice(asc) {
      let list = await this.itemPriceDiv.allTextContents();
      list = list.map(price => parseFloat(price.slice(1)));
      return this.isListSorted(list, asc);
  }

  isListSorted(list, asc) {
      return list.every((num, idx, arr) => {
          if (asc) {
              return num <= arr[idx + 1] || idx === arr.length - 1;
          }
          return num >= arr[idx + 1] || idx === arr.length - 1;
      });
  }

  async addToCart(productName) {
      const product = this.page.locator(`.inventory_item:has-text("${productName}")`);
      await product.locator('.btn_inventory').click();
  }
}

module.exports = ProductsListPage;