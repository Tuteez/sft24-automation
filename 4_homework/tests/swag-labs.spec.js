import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { CartPage } from "../pages/cart-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
const username = "standard_user";
const password = "secret_sauce";

/**
 * The default sorting option should be by Name from A to Z 
 * (1st user story, 4)
 */
test("Default sort is by Name A to Z", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");
  
  let sorted = await productsListPage.isListSortedByName(true);
  await expect(sorted).toBe(true);

});

/**
 * Selecting sorting by name A to Z should sort the list
 * properly (1st user story 2.a, 3)
 */
test("Select sorting by Name A to Z", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productsListPage.selectSortingOption("Name (Z to A)");
  await productsListPage.selectSortingOption("Name (A to Z)");
  let sorted = await productsListPage.isListSortedByName(true);
  await expect(sorted).toBe(true);

});

/**
 * Selecting sorting by name Z to A should sort the list
 * properly (1st user story 2.b, 3)
 */
test("Select sorting by Name Z to A", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productsListPage.selectSortingOption("Name (A to Z)");
  let sorted = await productsListPage.isListSortedByName(false);
  await expect(sorted).toBe(true);

});

/**
 * Selecting sorting by price low to high should sort the list
 * properly (1st user story 2.c, 3)
 */
test("Select sorting by Price low to high", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productsListPage.selectSortingOption("Price (low to high)");
  let sorted = await productsListPage.isListSortedByPrice(true);
  await expect(sorted).toBe(true);

});

/**
 * Selecting sorting by price high to low should sort the list
 * properly (1st user story 2.d, 3)
 */
test("Select sorting by Price high to low", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productsListPage.selectSortingOption("Price (high to low)");
  let sorted = await productsListPage.isListSortedByPrice(false);
  await expect(sorted).toBe(true);

});

/**
 * It should be able possible to add a product to cart from list view
 * (2nd user story 1.a, 2)
 */
test("Adding to cart from product list view", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);
  let cartPage = new CartPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productsListPage.addToCart();
  await cartPage.goto();
  let correctCount = await cartPage.confirmItemCount(1);
  await expect(correctCount).toBe(true);
});

/**
 * It should be possible to remove an added product from cart from list
 * view (2nd user story 3.b, 4)
 */
test("Removing product from list view", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);
  let cartPage = new CartPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productsListPage.addToCart();
  await productsListPage.removeFromCart();
  await cartPage.goto();
  let correctCount = await cartPage.confirmItemCount(0);
  await expect(correctCount).toBe(true);
});

/**
 * It should be possible to add a product to cart from the product
 * preview page (2nd user story 1.b, 2)
 */
test("Adding to cart from product preview page", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productPreviewPage = new ProductPreviewPage(page);
  let cartPage = new CartPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productPreviewPage.goto(0);
  await productPreviewPage.addToCart();
  
  await cartPage.goto();
  let correctCount = await cartPage.confirmItemCount(1);
  await expect(correctCount).toBe(true);
});

/**
 * It should be possible to remove an added product from cart from the 
 * product preview page (3.c, 4)
 */
test("Removing product from preview page", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productPreviewPage = new ProductPreviewPage(page);
  let cartPage = new CartPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productPreviewPage.goto(0);
  await productPreviewPage.addToCart();
  await productPreviewPage.removeFromCart();

  await cartPage.goto();
  let correctCount = await cartPage.confirmItemCount(0);
  await expect(correctCount).toBe(true);
});

/**
 * It should be possible to remove a product from cart in the cart page
 * (2nd user story 3.a, 4)
 */
test("Removing product from cart page", async ({ page }) => {
  let loginpage = new LoginPage(page);
  let productPreviewPage = new ProductPreviewPage(page);
  let cartPage = new CartPage(page);

  await loginpage.goto();
  await loginpage.login(username, password);
  await expect(page).toHaveTitle("Swag Labs");

  await productPreviewPage.goto(0);
  await productPreviewPage.addToCart();

  await cartPage.goto();
  await cartPage.removeFromCart();
  let correctCount = await cartPage.confirmItemCount(0);
  await expect(correctCount).toBe(true);
});
