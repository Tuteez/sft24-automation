import test, { expect } from "@playwright/test";
import { testData } from "../data/testData";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_label"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
  }

  async findRightLeftLocation(object) {

    let location = await this.page.locator(object).boundingBox();
    console.log(location);

    const screen = this.page.locator(object).page().viewportSize();
    console.log(screen);
    var positionVertical = "";
    var positionHorizontal = "";

    if (location.y <= screen.height / 2) {
      positionVertical = "top";
    } else {
      positionVertical = "bottom";
    }

    if (location.x >= screen.width / 2) {
      positionHorizontal = "right";
    } else {
      positionHorizontal = "left";
    }

    if (positionVertical !== "top" && positionHorizontal !== "right") {
      throw new Error(testData.errorMessages.incorrectButtonLocation);
    }
    console.log('positionVertical =' + positionVertical + ', positionHorizontal=' + positionHorizontal);

  }

  async findInDropdownList(filterBy) {
    console.log(filterBy);

    const filterOptions = await this.page.locator(testData.locators.selectOption).all();
    console.log(filterOptions);
    await this.page.locator(testData.locators.selectContainer).click();

    for (const filterOption of filterOptions) {
      var optionName = await filterOption.textContent()
      console.log(optionName);
      await filterOption.click();

      let matchFound = false;
      if (optionName === filterBy) {
        matchFound = true;
        break;
      }

    }
    await expect(this.page.locator(testData.locators.productSorting)).toContainText(filterBy);
  }

  async selectInDropdownList(filterBy) {
    if (filterBy === "") {
      filterBy = testData.defaultSortingOption;
    }
    await this.page.locator(testData.locators.productSorting).selectOption(filterBy);
  }

  async getListValues(type) {
    if (type === "name") {
      return await this.itemNameDiv.allTextContents();
    }
    if (type === "price") {
      let list = await this.itemPriceDiv.allTextContents();
      return list.map((element) => parseFloat(element.slice(1)));
    }

    throw new Error('List type not supported');
  }

  async verifyListSorting(name, asc) {
    let list = await this.getListValues(name)

    if (!await this.isListSorted(list, asc)) {
      throw new Error('List is order doesn\'t work');
    }
  }

  async isListSorted(list, asc) {
    return list.every(function (num, idx, arr) {
      if (asc === true) {
        return num <= arr[idx + 1] || idx === arr.length - 1 ? true : false;
      }
      return num >= arr[idx + 1] || idx === arr.length - 1 ? true : false;
    });
  }

  async buttonExists(buttonText) {
    await expect(this.page.getByText(buttonText).first()).toBeVisible();
  }

  async pressAddToCartButton(productName) {
    const item = this.page.locator(`.inventory_item:has(.inventory_item_name:text-is("${productName}"))`);
    await item.locator('button[data-test^="add-to-cart"]').click();
  }

  async verifyProductsAddedToCart(numberOfProducts) {
    await expect(this.page.locator("#shopping_cart_container")).toHaveText(numberOfProducts);
  }

  async goToCart() {
    await this.page.locator("#shopping_cart_container").click();
  }

  async pressRemoveButton(productName) {
    const item = this.page.locator(`.inventory_item:has(.inventory_item_name:text-is("${productName}"))`);
    await item.locator('button[id*="remove"]').click();
  }
}
