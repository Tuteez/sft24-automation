
import { test, expect } from "@playwright/test";
import { UserLogin } from "../pages/user-login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { testData } from "../data/testData";
import { CartPage } from "../pages/cart-page";

//#1st user story. SFT-1 Sorting functionality on Products list.

/*

1. Add button ‘Add to cart’ to following system places:
a. Products list – to each product card/item.
b. Product preview page.
Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be
added to the cart. (There is no possibility to add more than one).
3. If there is at least one product added to the cart, button ‘Remove’ should be added to
following places:
a. Cart – for each product separately.
b. Products list – to each product card/item.
c. Product preview page.
4. If user clicks ‘Remove’ button related item/product should be removed from the cart.
*/

test.beforeEach(async ({ page }) => {
  let userLogin = new UserLogin(page);
  await userLogin.fullLogin(testData.standardUser.name, testData.standardUser.password);
});


test.describe("Verify 'Add to cart' button location", async () => {
  let productsListPage;
  let productPreviewPage;
  let cartPage;
  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);
    cartPage = new CartPage(page);
  });
  test("Verify 'Add to Cart' button is in product list", async () => {
    await productsListPage.buttonExists(testData.buttons.addToCart);
  });

  test("Verify 'Add to Cart' button is in preview page", async () => {
    await productPreviewPage.openPreview(testData.productName.backpack);
    await productPreviewPage.buttonExists(testData.buttons.addToCart);
  });
});

test.describe("Verify 'Add to cart' function", () => {
  let productsListPage;
  let productPreviewPage;
  let cartPage;
  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);
    cartPage = new CartPage(page);
  });
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


test.describe("Verify 'Remove from cart' function", () => {
  let productsListPage;
  let productPreviewPage;
  let cartPage;
  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);
    cartPage = new CartPage(page);
  });
  test.describe("Remove from inside cart page", () => {
    test("Verify single item removed form cart (cart page)", async () => {
      await productPreviewPage.pressAddToCartButton(testData.productName.backpack);
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
    let productsListPage;
    let productPreviewPage;
    let cartPage;
    test.beforeEach(async ({ page }) => {
      productsListPage = new ProductsListPage(page);
      productPreviewPage = new ProductPreviewPage(page);
      cartPage = new CartPage(page);
    });
    test("Verify single item removed form cart", async () => {

    });

    test("Verify multiple items removed form cart", async () => {

    });

  });
});








