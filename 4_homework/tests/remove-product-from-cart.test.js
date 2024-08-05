import { LoginPage } from "../pages/login-page";
import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { ShoppingCartPage } from "../pages/shopping-cart-page";
import { ProductPreviewPage } from "../pages/product-preview-page";


test.describe("Verify remove from cart feature with login (beforeEach)", async () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
  });

  test("Remove product from shopping cart", async ({ page }) => {

    let productsListPage = new ProductsListPage(page);
    let shoppingCartPage = new ShoppingCartPage(page);
    await productsListPage.addProductToCartFromProductList();
    await shoppingCartPage.clickRemoveProduct();
    await shoppingCartPage.verifyProductRemoved();

  })

  test("Remove product from product preview page", async ({ page }) => {


    let productPreviewPage = new ProductPreviewPage(page);
    let shoppingCartPage = new ShoppingCartPage(page);

    await productPreviewPage.addProductToCartFromPreview();
    await productPreviewPage.removeProductFromPreviewPage();
    await shoppingCartPage.verifyProductRemoved();
  })

  test("Remove product from product List", async ({ page }) => {


    let productsListPage = new ProductsListPage(page);
    let shoppingCartPage = new ShoppingCartPage(page);

    await productsListPage.addProductToCartFromProductList();
    await productsListPage.removeProductFromCartFromProductList();
     await shoppingCartPage.verifyProductRemoved();
  })


});