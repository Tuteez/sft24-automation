import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { Cart } from "../pages/cart";
import { ProductPreview } from "../pages/product-preview";
const pwd = "secret_sauce";
const users = ['standard_user','problem_user','performance_glitch_user','error_user','visual_user'];

/* #1st user story. SFT-1 Sorting functionality on Products list.
Business value: As a user I want to have the ability to sort products list. This would help to see
the most relevant products at the top of the list and improve user experience.
Applicable user roles: all authenticated system users
Acceptance criteria
1. Add dropdown element with options to sort by on the right top corner of the page.
2. Available options to select from should be:
a. Name (A to Z).
b. Name (Z to A).
c. Price (low to high).
d. Price (high to low).
3. Products sorting should be performed on option select action.
4. By default, products should be sorted by Name (A to Z). */
users.forEach(user => {

  test.describe(`SFT-1 ${user} Sorting functionality`, () => {
    let productsListPage;
    test.beforeEach(async ({ page }) => {
      productsListPage = new ProductsListPage(page);
      await productsListPage.goto();
      await productsListPage.InitLogin(user,pwd);
      await expect(page).toHaveTitle("Swag Labs");
    });
    var s = `${user} Dropdown has 4 options`;
    test(s, async () => {
      expect (await productsListPage.dropdownItemCount()).toBe(4);
    });
    var s2 = `${user} Sort a to z`;
    test(s2, async () => {
      await productsListPage.sortAZ();
      expect(await productsListPage.isListSortedByName(true)).toBe(true);
    });
    var s3 = `${user} Sort z to a`;
    test(s3, async () => {
      await productsListPage.sortZA();
      expect(await productsListPage.isListSortedByName(false)).toBe(true);
    });
    var s4 = `${user} Sort by Price (low to high)`;
    test(s4, async () => {
      await productsListPage.sortASC();
      expect(await productsListPage.isListSortedByPrice(true)).toBe(true);
    });
    var s5 = `${user} Sort by Price (high to low)`;
    test(s5, async () => {
      await productsListPage.sortDESC();
      expect(await productsListPage.isListSortedByPrice(false)).toBe(true);
    });
    var s6 =`${user} Sort default a to z`;
    test(s6, async () => {
      expect(await productsListPage.isListSortedByName(true)).toBe(true);
    });
  });
});
// #2nd user story. SFT-2 Ability to add swag to cart.
// Business value: As a user I want to have the ability to add wanted swag to cart. This would let me
// proceed with checkout action later and eventually buy the swag.
// Applicable user roles: all authenticated system users
// Acceptance criteria
// 1. Add button ‘Add to cart’ to following system places:
// a. Products list – to each product card/item.
// b. Product preview page.

// 2. Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be
// added to the cart. (There is no possibility to add more than one).
// 3. If there is at least one product added to the cart, button ‘Remove’ should be added to
// following places:
// a. Cart – for each product separately.
// b. Products list – to each product card/item.
// c. Product preview page.
// 4. If user clicks ‘Remove’ button related item/product should be removed from the cart.
users.forEach(user => {

  test.describe(`SFT-2 ${user} Add to cart.`, async () => {
    let productsListPage;
    let cart;
    let preview;

    test.beforeEach(async ({ page }) => {
      productsListPage = new ProductsListPage(page);
      cart= new Cart(page);
      preview = new ProductPreview(page)
      await productsListPage.goto();
      await productsListPage.InitLogin(user,pwd);
      await expect(page).toHaveTitle("Swag Labs");
    });

    var s = `${user} Add to cart in products lists`;
    test(s, async ({page}) => {
      await productsListPage.addToCartFirst();
      await cart.gotoCart();
      expect(await page.locator('[data-test="title"]')).toHaveText('Your Cart');
      expect(await cart.countCart()).toBe(1);
      await cart.removeFromCart();
      expect(await cart.countCart()).toBe(0);
    });

    var s2 = `${user} Add to cart from preview pages`;
    test(s2, async ({page}) => {
      await preview.goto(1);
      expect(await page.locator('[data-test="inventory-item"]')).toBeVisible();
      await preview.addToCart()
      await cart.gotoCart();
      expect(await page.locator('[data-test="title"]')).toHaveText('Your Cart');
      expect(await cart.countCart()).toBe(1);
      await cart.removeFromCart();
      expect(await cart.countCart()).toBe(0);
    });

    
    var s3 = `${user} Verify for all Add to cart`;
    test(s3, async ({ page }) => {
        await productsListPage.addToCartAll();
        await cart.gotoCart();
        expect(await page.locator('[data-test="title"]')).toHaveText('Your Cart');
        expect(await cart.countCart()).toBe(6);
        await cart.removeFromCart();
        expect(await cart.countCart()).toBe(5);
    });
    var s4 = `${user} Verify remove all list`;
    test(s4, async ({ page }) => {
      await productsListPage.addToCartAll();
      await cart.gotoCart();
      expect(await cart.countCart()).toBe(6);
      await productsListPage.gotoList();
      await productsListPage.removeAll();
      await cart.gotoCart();
      expect(await cart.countCart()).toBe(0);
    });
    var s5 = `${user} Remove from preview `;
    test(s5, async ({page}) => {
      await preview.goto(1);
      expect(await page.locator('[data-test="inventory-item"]')).toBeVisible();
      await preview.addToCart();
      expect(await page.getByRole('button',{name: 'Remove'})).toBeVisible();
      expect(await page.getByRole('button',{name: 'Add to cart'})).toBeHidden();
      await preview.removeFromCart();
      expect(await page.getByRole('button',{name: 'Add to cart'})).toBeVisible();
      expect(await page.getByRole('button',{name: 'Remove'})).toBeHidden();
      await cart.gotoCart();
      expect(await cart.countCart()).toBe(0);
    });

  });
});
