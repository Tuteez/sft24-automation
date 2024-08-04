import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { CartPage } from "../pages/cart-page";

// SFT-1
test.describe("SFT-1", async () => {
  let productsListPage;
  test("1. Add dropdown element with options to sort by on the right top corner of the page.", async ({
    page,
  }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.containsDropdown();
  });

  test("2. Dropdown contains proper options", async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.containsDropdown();
    await productsListPage.dropDownContainsOptions();
  });
  test("3. Products sorting should be performed on option select action.", async ({
    page,
  }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.containsDropdown();
    await productsListPage.dropDownContainsOptions();
    await productsListPage.productSortingPerformed();
  });
  test("4. By default, products should be sorted by Name (A to Z).", async ({
    page,
  }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.containsDropdown();
    await productsListPage.defaultSortingSelected();
  });
});

// SFT-2
test.describe("SFT-2", async () => {
  let cartPage;
  let productsListPage;
  test("1. 'Add button' present in required places", async ({ page }) => {
    cartPage = new CartPage(page);
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.addCartButtonPresent();
    await cartPage.goto();
    await cartPage.addCartButtonPresent();
  });

  test("2. Clicking 'Add to cart' ", async ({ page }) => {
    cartPage = new CartPage(page);
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.clickAddCartButtons();
  });

  test("3. 'Remove' should be added when product is added", async ({
    page,
  }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.checkForRemove();
  });
  test("4. Clicking 'Remove'", async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.addToCartAndRemove();
  });
});
