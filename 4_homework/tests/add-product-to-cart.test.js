import { LoginPage } from "../pages/login-page";
import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { ShoppingCartPage } from "../pages/shopping-cart-page";
import { ProductPreviewPage } from "../pages/product-preview-page";


test.describe("Verify add to cart feature with login (beforeEach)", async () => {
  let loginPage;
  let productsListPage;
  let shoppingCartPage;
  let productPreviewPage;


  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
  });

  test("Add product to cart from product list", async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    await productsListPage.addProductToCartFromProductList();
    await shoppingCartPage.verifyProductAdded();
  })

  test("Add product to cart from product preview list", async ({ page }) => {
     productPreviewPage = new ProductPreviewPage(page);
     shoppingCartPage = new ShoppingCartPage(page);
    await productPreviewPage.addProductToCartFromPreview();
    await shoppingCartPage.verifyProductAdded();
  })


});