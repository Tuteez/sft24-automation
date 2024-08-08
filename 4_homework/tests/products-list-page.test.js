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
  test.describe(`Product list functionality with ${user.name}`, () => {
    let loginPage;
    let productListPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productListPage = new ProductsListPage(page);

      await loginPage.goToLoginPage();
      await loginPage.login(user.name, user.password);
      await productListPage.validateLogin(testData.productPageTextValidation);
    });

    test.describe("Product sorting functionality", () => {
      test("Default sorting should be chosen as by Name (A to Z)", async () => {
        await productListPage.validateByProductNameAtoZ();
      });

      test("Should sort list of products by name (Z to A)", async () => {
        await productListPage.selectSortOption(testData.optionText.nameZtoA);
        await productListPage.validateByProductNameZtoA();
      });

      test("Should sort list of products by price (Low to High)", async () => {
        await productListPage.selectSortOption(
          testData.optionText.priceLowToHigh
        );
        await productListPage.validateByPriceLowToHigh();
      });

      test("Should sort list of products by price (High to Low)", async () => {
        await productListPage.selectSortOption(
          testData.optionText.priceHighToLow
        );
        await productListPage.validateByPriceHighToLow();
      });

      test("Dropdown options should be A-Z, Z-A, Low-to-High and High-to-low", async () => {
        await productListPage.validateDropdownOptions(optionText);
      });
    });

    test.describe("Product list, cart ADD and REMOVE operations", () => {
      test.describe("Main page ADD and REMOVE operations", () => {
        test("Cart count should update accordingly adding a single product", async () => {
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(1);
        });

        test("Cart count should update accordingly adding a three products", async () => {
          await productListPage.addProductToCart();
          await productListPage.addProductToCart();
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(3);
        });

        test("Adding the same product twice should FAIL", async () => {
          await productListPage.addSameProductTwice();
          await productListPage.validateProductCountInCart(1);
        });

        test("Cart product count should not change when page is refreshed", async () => {
          await productListPage.addProductToCart();
          await productListPage.page.reload();
          await productListPage.validateProductCountInCart(1);
        });

        test("Cart page should display correct product has been added to the cart", async () => {
          await productListPage.saveAddedProductName();
          await productListPage.addProductToCart();
          await productListPage.goToCart();
          await productListPage.validateProductInCart();
        });

        test("Should be able to add and remove the same product infinitely", async () => {
          await productListPage.addProductToCart(1);
          await productListPage.removeProductFromCart();
          await productListPage.validateProductCountInCart(0);
          await productListPage.addProductToCart(1);
          await productListPage.removeProductFromCart();
          await productListPage.validateProductCountInCart(0);
          await productListPage.addProductToCart(1);
          await productListPage.removeProductFromCart();
          await productListPage.validateProductCountInCart(0);
        });

        test("Product should be able to be removed from the cart page", async () => {
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(1);
          await productListPage.goToCart();
          await productListPage.removeProductFromCart();
          await productListPage.validateProductCountInCart(0);
        });

        test("Cart page should display correct numbers of REMOVE buttons", async () => {
          await productListPage.addProductToCart();
          await productListPage.addProductToCart();
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(3);
          await productListPage.validateRemoveButtons(3);
          await productListPage.goToCart();
          await productListPage.validateRemoveButtons(3);
          await productListPage.removeProductFromCart();
          await productListPage.validateRemoveButtons(2);
          await productListPage.removeProductFromCart();
          await productListPage.validateRemoveButtons(1);
          await productListPage.validateProductCountInCart(1);
        });

        test("Cart should be empty after logging in", async () => {
          await productListPage.validateThatCartIsEmpty();
        });

        test("Remove button should be displayed in the main, preview and cart pages when the product has been added", async () => {
          await productListPage.addProductToCart();
          await productListPage.validateThatRemoveButtonIsVisible();
          await productListPage.openPreviewPage();
          await productListPage.validateThatRemoveButtonIsVisible();
          await productListPage.goToCart();
          await productListPage.validateThatRemoveButtonIsVisible();
        });
      });

      test.describe("Preview page ADD and REMOVE operations", () => {
        test("Cart should display 0 products after adding 1 product to the cart", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(1);
        });

        test("Cart should display 0 products after adding and removing product", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.removeProductFromCart();
          await productListPage.validateProductCountInCart(0);
        });

        test("User should be able to add the product again after removing it from the cart", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.removeProductFromCart();
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(1);
        });

        test("User should be able to remove product in cart page after it has been added in preview page", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.goToCart();
          await productListPage.removeProductFromCart();
          await productListPage.validateProductCountInCart(0);
        });

        test("Cart should display 2 products after adding 2 different products to cart", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.backToProducts();
          await productListPage.openPreviewPage(1);
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(2);
          await productListPage.backToProducts();
          await productListPage.validateRemoveButtons(2);
        });

        test("Trying to add the same product in preview mode should fail", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addSameProductTwice();
          await productListPage.validateProductCountInCart(1);
        });

        test("Cart page should display correct product after adding it to the cart ", async () => {
          await productListPage.openPreviewPage();
          await productListPage.saveAddedProductName(true);
          await productListPage.addProductToCart();
          await productListPage.goToCart();
          await productListPage.validateProductInCart();
        });

        test("Remove button should be displayed in main, preview and cart pages after adding a product to the cart in the preview page", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.validateThatRemoveButtonIsVisible();
          await productListPage.backToProducts();
          await productListPage.validateThatRemoveButtonIsVisible();
          await productListPage.goToCart();
          await productListPage.validateThatRemoveButtonIsVisible();
        });
      });

      test.describe("Mix main page, preview page and Cart ADD and REMOVE operations", () => {
        test("Cart should display 2 products in the cart after adding a product from main page and then from preview page", async () => {
          await productListPage.addProductToCart(0);
          await productListPage.openPreviewPage(1);
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(2);
        });

        test("Cart should display 2 products in the cart after adding a product from preview page and then from main page", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.backToProducts();
          await productListPage.addProductToCart();
          await productListPage.validateProductCountInCart(2);
        });

        test("Remove button should not be displayed in main, preview and cart pages before adding a product ", async () => {
          await productListPage.validateThatRemoveButtonIsNotVisible();
          await productListPage.openPreviewPage();
          await productListPage.validateThatRemoveButtonIsNotVisible();
          await productListPage.goToCart();
          await productListPage.validateThatRemoveButtonIsNotVisible();
        });

        test("Remove button should not be displayed in main, preview and cart pages after adding and removing a product", async () => {
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
      });
    });
  });
});
