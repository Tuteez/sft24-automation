
import { test } from "@playwright/test";
import { UserLogin } from "../pages/user-login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { testData } from "../data/testData";
import { CartPage } from "../pages/cart-page";

const validUsers = [
  testData.standardUser,
  // testData.problemUser,
  // testData.performanceGlitchUser,
  // testData.errorUser,
  // testData.visualUser,
];

validUsers.forEach((user) => {

  test.describe("Verify 'Add to cart' and 'Remove' buttons functionalities", () => {
    let productsListPage;
    let productPreviewPage;
    let userLogin;
    let cartPage;
    test.beforeEach(async ({ page }) => {
      productsListPage = new ProductsListPage(page);
      productPreviewPage = new ProductPreviewPage(page);
      userLogin = new UserLogin(page);
      cartPage = new CartPage(page);
      await userLogin.fillInLogin(user.name, user.password);
    });
    test.describe(`Verify 'Add to cart' button location`, async () => {
      test.describe(`Verify 'Add to cart' button location ${user.name}`, async () => {
        test("Verify 'Add to Cart' button is in product list", async () => {
          await productsListPage.buttonExists(testData.buttons.addToCart);
        });
        test("Verify 'Add to Cart' button is in preview page", async () => {
          await productPreviewPage.openPreview(testData.productName.backpack);
          await productPreviewPage.buttonExists(testData.buttons.addToCart);
        });
      });
    });
    test.describe(`Verify 'Add to cart' function`, () => {
      test.describe(`Verify 'Add to cart' function ${user.name}`, () => {
        test("Verify single item is added to cart (product list)", async () => {
          await productsListPage.pressAddToCartButton(testData.productName.backpack);
          await productsListPage.verifyProductsAddedToCart("1");
        });

        test("Verify few items are added to cart (product list)", async () => {
          await productsListPage.pressAddToCartButton(testData.productName.backpack);
          await productsListPage.pressAddToCartButton(testData.productName.jacket);
          await productsListPage.verifyProductsAddedToCart("2");
        });

        test("Verify single item is added to cart (preview page)", async () => {
          await productPreviewPage.pressAddToCartButton(testData.productName.backpack);
          await productPreviewPage.verifyNumberOfProductsInCart("1");
        });

        test("Verify few items are added to cart (preview page)", async () => {
          await productPreviewPage.pressAddToCartButton(testData.productName.backpack);
          await cartPage.backToHomePage();
          await productPreviewPage.pressAddToCartButton(testData.productName.jacket);
          await productPreviewPage.verifyNumberOfProductsInCart("2");
        });
      });
    });

    test.describe(`Verify 'Remove from cart' function`, () => {

      test.describe(`Verify 'Remove from cart' function ${user.name}`, () => {

        test.describe("Remove from inside cart page", () => {
          test("Verify single item removed form cart (cart page)", async () => {
            await productPreviewPage.pressAddToCartButton(testData.productName.backpack);
            await productPreviewPage.goToCart();
            await cartPage.removeFromCart(testData.productName.backpack);
            await productPreviewPage.verifyNumberOfProductsInCart("");
          });

          test("Verify two items removed form cart (clicking cart in between)", async () => {
            await productsListPage.pressAddToCartButton(testData.productName.backpack);
            await productsListPage.pressAddToCartButton(testData.productName.jacket);
            await productsListPage.goToCart();
            await cartPage.removeFromCart(testData.productName.backpack);
            await cartPage.goToCart();
            await cartPage.removeFromCart(testData.productName.jacket);
            await productsListPage.verifyProductsAddedToCart("");
          });

          test("Verify two items removed form cart (cart page)", async () => {
            await productsListPage.pressAddToCartButton(testData.productName.backpack);
            await productsListPage.pressAddToCartButton(testData.productName.light);
            await productsListPage.goToCart();
            await cartPage.removeFromCart(testData.productName.backpack);
            await cartPage.removeFromCart(testData.productName.light);
            await productPreviewPage.verifyNumberOfProductsInCart("");
            await cartPage.verifyThatItemIsRemoved(testData.productName.backpack);
            await cartPage.verifyThatItemIsRemoved(testData.productName.light);
          });
        });

        test.describe("Remove while in product list", () => {
          test("Verify single item removed form cart", async () => {
            await productsListPage.pressAddToCartButton(testData.productName.backpack);
            await productsListPage.pressRemoveButton(testData.productName.backpack);
            await productsListPage.verifyProductsAddedToCart("");
            await cartPage.verifyThatItemIsRemoved(testData.productName.backpack);
          });

          test("Verify two items removed form cart", async () => {
            let itemOne = testData.productName.backpack;
            let itemTwo = testData.productName.light;
            await productsListPage.pressAddToCartButton(itemOne);
            await productsListPage.pressAddToCartButton(itemTwo);
            await productsListPage.pressRemoveButton(itemOne);
            await productsListPage.pressRemoveButton(itemTwo);
            await productsListPage.verifyProductsAddedToCart("");
            await cartPage.verifyThatItemIsRemoved(itemOne);
            await cartPage.verifyThatItemIsRemoved(itemTwo);
          });
        });

        test.describe("Remove while in preview page", () => {
          let productPreviewPage;
          let cartPage;
          test.beforeEach(async ({ page }) => {
            productsListPage = new ProductsListPage(page);
            productPreviewPage = new ProductPreviewPage(page);
            cartPage = new CartPage(page);
          });
          test("Verify single item removed form cart", async () => {
            let itemOne = testData.productName.backpack;
            await productPreviewPage.pressAddToCartButton(itemOne);
            await productPreviewPage.removeItemFromCart();
            await productPreviewPage.verifyProductsAddedToCart("");
            await productPreviewPage.goToCart();
            await cartPage.verifyThatItemIsRemoved(itemOne);
          });

          test("Verify two items removed form cart", async () => {
            let itemOne = testData.productName.backpack;
            let itemTwo = testData.productName.light;
            await productPreviewPage.pressAddToCartButton(itemOne);
            await productPreviewPage.removeItemFromCart();
            await productPreviewPage.backToHomePage();
            await productPreviewPage.pressAddToCartButton(itemTwo);
            await productPreviewPage.removeItemFromCart();
            await productPreviewPage.goToCart();
            await productPreviewPage.verifyProductsAddedToCart("");
            await cartPage.verifyThatItemIsRemoved(itemOne);
            await cartPage.verifyThatItemIsRemoved(itemTwo);
          });
        });
      });
    });
  });

});





