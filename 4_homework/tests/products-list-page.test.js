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

    test.describe(`Product sorting functionality`, () => {
      test("Default sorting should be chosen as `by Name (A to Z)` after logging in", async () => {
        await productListPage.validateByProductNameAtoZ();
      });

      test("After choosing sorting `by Name (Z to A)`, the sorting option should change to our chosen value and products should be sorted accordingly", async () => {
        await productListPage.selectSortOption(testData.optionText.nameZtoA);
        await productListPage.validateByProductNameZtoA();
      });

      test("After choosing sorting `by Price (low to high)`, the sorting option should change to our chosen value and products should be sorted accordingly", async () => {
        await productListPage.selectSortOption(
          testData.optionText.priceLowToHigh
        );
        await productListPage.validateByPriceLowToHigh();
      });

      test("After choosing sorting `by Price (hight to low)`, the sorting option should change to our chosen value and products should be sorted accordingly", async () => {
        await productListPage.selectSortOption(
          testData.optionText.priceHighToLow
        );
        await productListPage.validateByPriceHighToLow();
      });

      test("Validate dropdown options are from A-Z, Z-A, Low-to-High and High-to-low", async () => {
        await productListPage.validateDropdownOptions(optionText);
      });
    });

    test.describe(`Product list cart functionality`, () => {
      test.describe(`main page functionality`, () => {
        test.describe(`Add to cart`, () => {
          test("Add 1 product to cart from the main page, cart should display that one product has been added to the cart", async () => {
            await productListPage.addProductToCart();
          });

          test("Add multiple products to cart from the main page, cart should display that three products have been added to the cart", async () => {
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
          });

          test("Try to add the same product in the main page twice (FAILS)", async () => {
            await productListPage.addSameProductTwice();
          });

          test("Cart product count should not change when page is refreshed", async () => {
            await productListPage.addProductToCart();
            await productListPage.page.reload();
            await productListPage.validateProductCountInCart(1);
          });

          test("Verify that correct product has been added to the cart from main page", async () => {
            await productListPage.saveAddedProductName();
            await productListPage.addProductToCart();
            await productListPage.goToCart();
            await productListPage.validateProductInCart();
          });
        });
        test.describe(`Remove from cart`, () => {
          test("After adding and removing a product in the main page, cart should display 0 products in the cart", async () => {
            await productListPage.addProductToCart();
            await productListPage.removeProductFromCart();
          });

          test("After adding and removing 2 products in the main page, cart should display 0 products in the cart", async () => {
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.removeProductFromCart();
            await productListPage.removeProductFromCart();
          });
        });

        test.describe(`Add and remove `, () => {
          test("After adding , deleting a product, the product should be able to be added again and cart should dispaly 1 product in the cart", async () => {
            await productListPage.addProductToCart();
            await productListPage.removeProductFromCart();
            await productListPage.addProductToCart();
          });

          test("After adding a product in the main page, product should be able to be removed in the cart page", async () => {
            await productListPage.addProductToCart();
            await productListPage.goToCart();
            await productListPage.removeProductFromCart();
          });
        });

        test.describe(`mixed functionality`, () => {
          test("Add 3 products in the main page and validate that the main page has 3 remove buttons", async () => {
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.validateRemoveButtons(3);
          });

          test("Add 3 products in the main page and delete 2 products in the cart, the cart should have 1 product remaining", async () => {
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.goToCart();
            await productListPage.removeProductFromCart();
            await productListPage.removeProductFromCart();
          });

          test("Add 3 products in the main page and validate that the cart has 3 remove buttons", async () => {
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.addProductToCart();
            await productListPage.goToCart();
            await productListPage.validateRemoveButtons(3);
          });

          test("Verify that cart is empty after loging in", async () => {
            await productListPage.validateThatCartIsEmpty();
          });
        });
      });

      test.describe(`preview page functionality`, () => {
        test("Product should be able to be added in preview page and cart should display 1 product", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
        });

        test("Product should be able to be added in preview page and removed, the cart should display 0 products", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.removeProductFromCart();
        });

        test("After adding, removing the product, we should be able to add the product again, the cart should display 1 product", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.removeProductFromCart();
          await productListPage.addProductToCart();
        });

        test("The product should be able to be added to the cart and cart page should display 1 product in cart", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.goToCart();
          await productListPage.removeProductFromCart();
        });

        test("Add 2 products in preview mode and validate that the main page should have 2 remove buttons", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.backToProducts();
          await productListPage.openPreviewPage(1);
          await productListPage.addProductToCart();
          await productListPage.backToProducts();
          await productListPage.validateRemoveButtons(2);
        });

        test("Try to add the same product in previewMode twice (FAILS)", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addSameProductTwice();
        });

        test("Verify that correct product has been added to the cart from preview page", async () => {
          await productListPage.openPreviewPage();
          await productListPage.saveAddedProductName(true);
          await productListPage.addProductToCart();
          await productListPage.goToCart();
          await productListPage.validateProductInCart();
        });
      });

      test.describe(`Mix main page and preview page functionality`, () => {
        test("We should be able to add 1 product in the main page first and 1 product from preview page later, cart should display 2 products in the cart", async () => {
          await productListPage.addProductToCart(0);
          await productListPage.openPreviewPage(1);
          await productListPage.addProductToCart();
        });

        test("We should be able to add 1 product in the preview page first and 1 product from the main page later, cart should display 2 products in the cart", async () => {
          await productListPage.openPreviewPage();
          await productListPage.addProductToCart();
          await productListPage.backToProducts();
          await productListPage.addProductToCart();
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
      });
    });
  });
});
