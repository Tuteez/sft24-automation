import { test } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { LoginPage } from "../pages/login-page";

import { testData } from "../data/testData";

const validUsers = [
  testData.standardUser,
  testData.problemUser,
  testData.performanceGlitchUser,
  testData.errorUser,
  testData.visualUser,
];

const optionText = Object.values(testData.optionText);

validUsers.forEach((user) => {
  test.describe(`Product list functionality`, () => {
    let loginPage;
    let productListPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productListPage = new ProductsListPage(page);

      await loginPage.goToLoginPage();
      await loginPage.login(user.name, user.password);
      await productListPage.validateLogin(testData.productPageTextValidation);
    });

    test.describe(`Product sorting functionality with ${user.name}`, () => {
      test("Default sorting by Name (A to Z)", async () => {
        await productListPage.validateByProductNameAtoZ();
      });

      test("Sorting by Name (Z to A)", async () => {
        await productListPage.selectSortOption(testData.optionText.nameZtoA);
        await productListPage.validateByProductNameZtoA();
      });

      test("Sorting by Price (low to high)", async () => {
        await productListPage.selectSortOption(testData.optionText.priceLowToHigh);
        await productListPage.validateByPriceLowToHigh();
      });

      test("Sorting by Price (high to low)", async () => {
        await productListPage.selectSortOption(testData.optionText.priceHighToLow);
        await productListPage.validateByPriceHighToLow();
      });

      test("Validate dropdown options", async () => {
        await productListPage.validateDropdownOptions(optionText);
      });
    });

    test.describe(`Product list cart functionality with ${user.name}`, () => {
      test("Add 1 product to cart from the main page", async () => {
        await productListPage.addProductToCart();
      });

      test("Add multiple products to cart from the main page", async () => {
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
      });

      test("Add product in the preview mode", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
      });

      test("Add one product from the main page and then one from the preview mode", async () => {
        await productListPage.addProductToCart(0);
        await productListPage.openPreviewPage(1);
        await productListPage.addProductToCart();
      });

      test("Add a product in preview mode and then add another product in the main page", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.backToProducts();
        await productListPage.addProductToCart();
      });

      test("Remove 1 product from cart in the main page", async () => {
        await productListPage.addProductToCart();
        await productListPage.removeProductFromCart();
      });

      test("Remove multiple products from cart in the main page", async () => {
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.removeProductFromCart();
        await productListPage.removeProductFromCart();
      });

      test("Add a product, delete it and add it again in the main page", async () => {
        await productListPage.addProductToCart();
        await productListPage.removeProductFromCart();
        await productListPage.addProductToCart();
      });

      test("Add a product, delete it and add it again in the preview mode", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.removeProductFromCart();
        await productListPage.addProductToCart();
      });

      test("Add a product in the main page and delete it in the preview mode", async () => {
        await productListPage.addProductToCart();
        await productListPage.openPreviewPage();
        await productListPage.removeProductFromCart();
      });

      test("Add a product in the preview mode and delete it in the main page", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.backToProducts();
        await productListPage.removeProductFromCart();
      });

      test("Add a product in the main page and delete in the cart", async () => {
        await productListPage.addProductToCart();
        await productListPage.goToCart();
        await productListPage.removeProductFromCart();
      });

      test("Add multiple products in the main page and delete in the cart", async () => {
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.goToCart();
        await productListPage.removeProductFromCart();
        await productListPage.removeProductFromCart();
      });

      test("Add a product in the preview mode and delete in the cart", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.goToCart();
        await productListPage.removeProductFromCart();
      });

      test("Add 3 products in the main page and validate that the main page has 3 remove buttons", async () => {
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.validateRemoveButtons(3);
      });

      test("Add 2 products in preview mode and validate that the main page has 2 remove buttons", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.backToProducts();
        await productListPage.openPreviewPage(1);
        await productListPage.addProductToCart();
        await productListPage.backToProducts();
        await productListPage.validateRemoveButtons(2);
      });

      test("Add 3 products in the main page and validate that the cart has 3 remove buttons", async () => {
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.addProductToCart();
        await productListPage.goToCart();
        await productListPage.validateRemoveButtons(3);
      });

      test("Try to add the same product in previewMode twice (FAILS)", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addSameProductTwice();
      });

      test("Try to add the same product in the main page twice (FAILS)", async () => {
        await productListPage.addSameProductTwice();
      });

      test("Cart product count should not change when page is refreshed", async () => {
        await productListPage.addProductToCart();
        await productListPage.page.reload();
        await productListPage.validateProductCountInCart(1);
      });

      test("Verify that cart is empty after loging in", async () => {
        await productListPage.validateThatCartIsEmpty();
      });

      test("Verify that Remove button is displayed in the main page, preview mode and cart when the product has been added in the main page", async () => {
        await productListPage.addProductToCart();
        await productListPage.validateThatRemoveButtonIsVisible();
        await productListPage.openPreviewPage();
        await productListPage.validateThatRemoveButtonIsVisible();
        await productListPage.goToCart();
        await productListPage.validateThatRemoveButtonIsVisible();
      });

      test("Verify that Remove button is displayed in the main page, preview mode and cart when the product has been added in preview page", async () => {
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.validateThatRemoveButtonIsVisible();
        await productListPage.backToProducts();
        await productListPage.validateThatRemoveButtonIsVisible();
        await productListPage.goToCart();
        await productListPage.validateThatRemoveButtonIsVisible();
      });

      test("Verify that Remove button is NOT displayed in the main page, preview mode and cart when no product has been added", async () => {
        await productListPage.validateThatRemoveButtonIsNotVisible();
        await productListPage.openPreviewPage();
        await productListPage.validateThatRemoveButtonIsNotVisible();
        await productListPage.goToCart();
        await productListPage.validateThatRemoveButtonIsNotVisible();
      });

      test("Verify that remove button is NOT displayed in the main page, preview mode and cart when the product has been removed from the cart", async () => {
        await productListPage.addProductToCart();
        await productListPage.removeProductFromCart();
        await productListPage.validateThatRemoveButtonIsNotVisible();
        await productListPage.openPreviewPage();
        await productListPage.addProductToCart();
        await productListPage.removeProductFromCart();
        await productListPage.validateThatRemoveButtonIsNotVisible();
        await productListPage.goToCart();
        await productListPage.validateThatRemoveButtonIsNotVisible();
      });

      test("Verify that correct product has been added to the cart from main page", async () => {
        await productListPage.saveAddedProductName();
        await productListPage.addProductToCart();
        await productListPage.goToCart();
        await productListPage.validateProductInCart();
      });

      test("Verify that correct product has been added to the cart from preview page", async () => {
        await productListPage.openPreviewPage();
        await productListPage.saveAddedProductName(true);
        await productListPage.addProductToCart();
        await productListPage.goToCart();
        await productListPage.validateProductInCart();
      });
    });
  });
});
