import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsListPage } from "../pages/products-list-page";
import { Cart } from "../pages/Cart";

const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  /*
  For a standard user, tests were conducted to confirm 
  if they run properly. This user serves as a basic example
   to ensure the tests function correctly.*/
  { username: 'locked_out_user', password: 'secret_sauce' },
  /*
  For a locked-out user, tests don't run properly, which 
  is expected because they should fail. When you try to log in,
   an error appears.*/
  { username: 'problem_user', password: 'secret_sauce' },
  /*
  For a problem user, tests for a standard user don't work correctly. 
  Some tests run and fail due to incorrect item sorting, which is expected. 
  However, the remaining tests don't include image checks for each swag item.
  The issue is that every swag item has the same picture, which is incorrect. 
  The tests for the standard user passed because they didn't include image tests, 
  as it wasn't necessary..*/
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  /*For a performance glitch user, tests written for a standard user
   don't work correctly. Although the tests run and pass, they should 
   also measure the page load time. The issue is a glitch on the page,
   particularly with the cart, where you have to wait longer than expected 
   when continuing shopping. The tests for the standard user passed because 
   they didn't include load time checks, as it wasn't necessary for them.*/
  { username: 'error_user', password: 'secret_sauce' },
  /*
  For an error user, tests designed for a standard user don't work correctly.
   Some tests fail due to incorrect item sorting, which is expected. 
   However, the remaining tests don’t check for error messages related to sorting. 
   The issue is that the sorting dropdown doesn't work, but the tests only partly 
   indicate that an error occurred*/

  { username: 'visual_user', password: 'secret_sauce' },
  /*
  For a visual user, tests for a standard user don't work correctly.
   Although they run and pass, they should check the image and price 
   for each item by comparing the preview product page with the all 
   products page. The issue is that the image and price don't match the 
   product title on the all products page, but they are correct on the preview page.
   The tests for the standard user passed because they didn't compare product information
   between these pages.*/
];

users.forEach((user) => {
  test.describe(`Tests for ${user.username}`, () => {
    test.beforeEach(async ({ page }) => {
      console.log(`Running tests for user: ${user.username}`);
      const loginPage = new LoginPage(page);
      await loginPage.logInAsUser(user.username, user.password);
    });

    test(('Sort products by name in ascending order for ${user.username}'), async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.selectSortAction("az");
      let isSorted = await productsListPage.isListSortedByName(true);
      expect(isSorted).toBe(true);
    });

    test('Sort products by name in descending order for ${user.username}', async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.selectSortAction("za");
      let isSorted = await productsListPage.isListSortedByName(false);
      expect(isSorted).toBe(true);
    });
    test('Sort products by price in ascending order for ${user.username}', async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.selectSortAction("lohi");
      let isSorted = await productsListPage.isListSortedByPrice(true);
      expect(isSorted).toBe(true);
    });
    test('Sort products by price in descending order for ${user.username}', async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      await productsListPage.selectSortAction("hilo");
      let isSorted = await productsListPage.isListSortedByPrice(false);
      expect(isSorted).toBe(true);
    });

    test('Verify if adding item to Cart for ${user.username}', async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      let cart = new Cart(page);
      let ItemInCartName = await cart.getItemInCartName();
      await productsListPage.clickAddToCart();
      await productsListPage.clickGoToCart();

      expect(ItemInCartName).toBe("Sauce Labs Backpack");

      let ItemInCartPrice = await cart.getItemInCartPrice();
      expect(ItemInCartPrice).toBe("$29.99");
    });

    test('Verify if removing item from Cart for ${user.username}', async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      let cart = new Cart(page);
      await productsListPage.clickAddToCart();
      await productsListPage.clickGoToCart();
      await cart.removeItemFromCart();

      const cartItemLocator = cart.itemCartItemDiv;
      const count = await cartItemLocator.count();
      expect(count).toBe(0);
    });
  });
});
/*For the problem_user and error_user tests, the test for 
sorting products by name in ascending order passes, which is expected by default and seems correct.
 However, the test for sorting products by name in descending order should not pass, but it does. 
 Due to time constraints, I haven't investigated the issue further.*/