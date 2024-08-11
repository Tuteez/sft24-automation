import { test, expect } from "@playwright/test";
import { LogInPage } from "../pages/log-in-page";
import { UserData } from "../test-data/user-data";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/productPreviewPage";
import { ShoppingCart } from "../pages/shoppingCart";
//Log in to page
test ("Log In to website", async ({ page }) => {
    let logInPage = new LogInPage (page);
    let userData =  new UserData (
        "standard_user",
        "secret_sauce"
    );

    await logInPage.openPage();
    await logInPage.fillUserNameAndPassword(userData);
});
test ("Log In to website - 2", async ({ page }) => {
    let logInPage = new LogInPage (page);
    
    await logInPage.enterWebsite();

});

const differentUserLogInInfo = [
    new UserData("standard_user", "secret_sauce"),
    // new UserData("locked_out_user", "secret_sauce"), // cant log in with the locked out user
    new UserData("problem_user", "secret_sauce"),
    new UserData("performance_glitch_user", "secret_sauce"),
    new UserData("error_user", "secret_sauce"),
    new UserData("visual_user", "secret_sauce")
  ];
  
  differentUserLogInInfo.forEach((user) => {
    test.describe(`Testing with user: ${user.username}`, () => {
      let logInPage;
      let productsListPage;
      let productPreviewPage;
      let shoppingCart;
  
      test.beforeEach(async ({ page }) => {
        logInPage = new LogInPage(page);
        productsListPage = new ProductsListPage(page);
        productPreviewPage = new ProductPreviewPage(page);
        shoppingCart = new ShoppingCart(page);
  
        await logInPage.openPage();
        console.log('Logging in with user:', user);
        await logInPage.fillUserNameAndPassword(user);
        await logInPage.logInButton.click();
      });
  
//#1st user story. SFT-1 Sorting functionality on Products list.
      test('TEST 1.1 verify that page is sorted by name', async ({ page }) => {
        let isSortedByName = await productsListPage.isListSortedByName(true);
        
        expect(isSortedByName).toBe(true);
      });
      test('TEST 1.2 Name (Z to A) verify that page is sorted by name', async ({ page }) => {
        
        await productsListPage.changePageSort("Name (Z to A)");
        let isSortedByName = await productsListPage.isListSortedByName(false);
        expect(isSortedByName).toBe(true);
      });
      test('TEST 1.3 Price (low to high) verify that page is sorted by price', async ({ page }) => {
        
        await productsListPage.changePageSort("Price (low to high)");
        let isSortedByPrice = await productsListPage.isListSortedByPrice(true);
        expect(isSortedByPrice).toBe(true);
      });
      test('TEST 1.4 Price (high to low) verify that page is sorted by price', async ({ page }) => {
        
        await productsListPage.changePageSort("Price (high to low)");
        let isSortedByPrice = await productsListPage.isListSortedByPrice(false);
        expect(isSortedByPrice).toBe(true);
      });

//#2nd user story. SFT-2 Ability to add swag to cart.
    test('TEST 2.1a Add item from a. Products list ', async ({ page }) => {
        await productsListPage.addFirstItemToCart();
       
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });
    test('TEST 2.1b Add item from a. Products list ', async ({ page }) => {
        await productsListPage.enterFirstProductPreviewPage();
        productPreviewPage.addItemToCart();
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });
    test('TEST 2.2a Remove item from the shopping cart', async ({ page }) => {
        await productsListPage.addFirstItemToCart();
        await productsListPage.enterShoppingCart();
        await shoppingCart.removeItemFromTheCart();
    });
    test('TEST 2.2b Remove item from the product list', async ({ page }) => {
        await productsListPage.addFirstItemToCart();
        await productsListPage.removeItemFromProductListPage();
        await expect(page.locator('button.btn.btn_primary.btn_small.btn_inventory').first()).toHaveText("Add to cart");
    });
    test('TEST 2.2c Remove item from the preview page', async ({ page }) => {
        await productsListPage.addFirstItemToCart();
        await productsListPage.enterFirstProductPreviewPage();
        await productPreviewPage.removeItemFromCart();
        await expect(page.locator('button.btn.btn_primary.btn_small.btn_inventory')).toHaveText("Add to cart");
    });
    });
  });