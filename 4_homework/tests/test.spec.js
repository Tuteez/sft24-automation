import { test, expect } from "@playwright/test";
import {LoginPage } from "../pages/logInPage";
import {ProductsListPage } from "../pages/products-list-page";
import { PreviewPage } from "../pages/previewPage";
import { CartPage } from "../pages/cartPage";

const users = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
];
users.forEach(user => {
  test.describe(`Login tests for user: ${user}`, () => {
    // This will run before each test
    test.beforeEach(async ({ page }) => {
      let logInPage = new LoginPage(page);
      await logInPage.openPage();
      await logInPage.fillInCredantials(user, "secret_sauce");
      await logInPage.loginButton.click();
    });
    //test to check if A-Z is shown correctly.
    test(`should check if the page is sorted from A-Z for ${user}`, async ({ page }) => {
      //products list page
      //islistedbyname neveikia nes itemNameDiv nezinau ar veikia.
      //test to check if A-Z is shown correctly.
      let productsListPage = new ProductsListPage(page);
      let isListSortedByName = await productsListPage.isListSortedByName(true);

      expect(isListSortedByName).toBe(true);
    });
    //test to check if Z-A is shown correctly.
    test(`should check if the page is sorted from Z-A for ${user}`, async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.sortItemsBy('za');
      let isListSortedByName = await productsListPage.isListSortedByName(false);

      expect(isListSortedByName).toBe(true);
    });
    //test to check if page is sorted price(low to high) correctly.
    test(`should check if the page is sorted price(low to high) for ${user}`, async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.sortItemsBy('lohi');
      let isListSortedByPrice = await productsListPage.isListSortedByPrice(true);

      expect(isListSortedByPrice).toBe(true);
    });
    //test to check if page is sorted by price(high to low) correctly.
    test(`should check if the page is sorted by price(high to low for ${user}`, async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.sortItemsBy('hilo');
      let isListSortedByPrice = await productsListPage.isListSortedByPrice(false);

      expect(isListSortedByPrice).toBe(true);
    });
    //test if user is able to add item to cart & remove button appeared & cart icon changed
    test(`should check if user can add an item to cart for ${user}`, async ({page}) =>{
      let productsListPage = new ProductsListPage(page);
      //add the first element on the page to cart
      await productsListPage.itemAddItemToCart.first().click();
      //check if button changed after clicking
      await expect(productsListPage.removeItemFromCart).toHaveText('Remove');
      //check if cart icon changed when an item was added

      await expect(productsListPage.removeCartIconChange).toHaveText('1');
      });
      //test to check if theres a remove button in preview page.
    test(`should show a remove button in preview page for ${user}`, async ({page}) =>{
      let productsListPage = new ProductsListPage(page);
      let previewPage = new PreviewPage(page);
        //add the first element on the page to cart
        await productsListPage.itemAddItemToCart.first().click();
        //open the first elements preview page
        await productsListPage.itemPreviewButton.first().click();
        //see if theres a remove button in the preview page

        await expect(previewPage.removeItemFromCart).toHaveText('Remove');
        });
      //test to check if theres a remove button in cart page
    test(`should show a remove button in cart page for ${user}`, async ({page}) =>{
      let productsListPage = new ProductsListPage(page);
      let cartPage = new CartPage(page);
        //add the first element on the page to cart
        await productsListPage.itemAddItemToCart.first().click();
        //click on the cart button
        await productsListPage.itemCartButton.click();
        const firstCartItem = await cartPage.getFirstCartItem();
        const removeButtonText = await cartPage.getRemoveButtonText(firstCartItem);
      
        await expect(removeButtonText).toBe('Remove');
        });
  });
});
