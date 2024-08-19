import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page"
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { CartPage } from "../pages/cart-page";

// SFT-1 Sorting functionality on Product list.
test.describe("Checks if sorting functionality on a product list works as expected for a standard_user", () => {
  
  let loginPage;
  let productListPage;
  test.beforeEach(async ({ page }) =>{
    loginPage = new LoginPage(page);
    productListPage = new ProductsListPage(page);
    await loginPage.goto();
    await loginPage.loginStandardUser();
  });

  test("Check available dropdown list options", async () => {

    await productListPage.hasDropdownOptions();
  });

  test("Product sorting by name (A to Z)", async () => {

    await productListPage.chooseSorting("az");
    expect(await productListPage.isListSortedByName(true)).toBe(true);
    await productListPage.checkActiveSorting("Name (A to Z)");
  });

  test("Product sorting by name (Z to A)", async () => {

    await productListPage.chooseSorting("za");
    expect(await productListPage.isListSortedByName(false)).toBe(true);
    await productListPage.checkActiveSorting("Name (Z to A)");
  });

  test("Product sorting by price (low to high)", async () => {

    await productListPage.chooseSorting("lohi");
    expect(await productListPage.isListSortedByName(true)).toBe(true);
    await productListPage.checkActiveSorting("Price (low to high)");
  });

  test("Product sorting by price (high to low)", async () => {

    await productListPage.chooseSorting("hilo");
    expect(await productListPage.isListSortedByName(false)).toBe(true);
    await productListPage.checkActiveSorting("Price (high to low)");
  });

  test("Check default product sorting (A to Z)", async () => {

    await productListPage.checkActiveSorting("Name (A to Z)");
  });
});

// SFT-2 Ability to add swag to cart.
test.describe("Checks if adding and removing swag from a cart works as expected for standard_user", () => {

  let loginPage;
  let productListPage; 
  let productPreviewPage; 
  let cartPage;
  test.beforeEach(async ({ page }) =>{
    loginPage = new LoginPage(page);
    productListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.loginStandardUser();
  });
  
  test('Verify "Add to cart" button in two places', async () => {

    await productListPage.checkAddToCartButton();
    await productListPage.showProductDetails();
    await productPreviewPage.checkAddToCartButton();
  });

  test('Adding a swag to cart', async () => {

    await productListPage.isAddToCartActive();
    await productListPage.isProductAdded();
  });

  test('Button "Remove" in three places', async () => {

    await productListPage.removeButtonExists();
    await productPreviewPage.removeButtonExists();
    await cartPage.removeButtonExists();
  });

  test('Removing product from cart', async () => {

    await productListPage.removeFromCart();
  });
});