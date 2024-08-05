import { test, expect } from "@playwright/test";
import { SaucedemoLoginPage } from "../pages/saucedemo-login-page";
import { SaucedemoProductsListPage, SaucedemoSortingProductsList } from "../pages/saucedemo-products-list-page";
import { SaucedemoProductsSortingPage } from "../pages/saucedemo-products-sorting-page";
import { SaucedemoProductsAddingToCartPage } from "../pages/saucedemo-products-adding-to-cart-page";
import { SaucedemoProductsAddingToCartPreviewPage } from "../pages/saucedemo-products-adding-to-cart-onPreview-page";
import { SaucedemoProductsRemoveFromCartPage } from "../pages/saucedemo-products-remove-from-cart";
import { SaucedemoProductsRemoveoOnItemsCartPage } from "../pages/saucedemo-products-remove-butt-on-each-Cart-page";

// Task - 0.1.1 from PPT: Write down your tests by using ‘standard_user’ credentials. T
test("Login with 'standard_user' credentials", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page)

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
})

// Task - 0.1.2 from PPT: Try to switch to any other user and check how tests perform then.
test("Login with any other user credentials - 'locked_out_user' ", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page)

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("locked_out_user");
})

// Task - 0.1.3 from PPT: Try to switch to any other user and check how tests perform then.
test("Login with any other user credentials - 'problem_user' ", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("problem_user");
})

// Task - 1.1 from PDF: Dropdown element with options to sort by on the right top corner of the page.
test("A dropdown element on the right top corner of the page.", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let sortingProductsList = new SaucedemoProductsListPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await sortingProductsList.sortingRightTopCorner();
})

// Task 1.2 from PDF: Available options to select from should be: 
// a. Name (A to Z); 
// b. Name (Z to A); 
// c. Price (low to high); 
// d. Price (high to low).

test("Available options to select from.", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let sortingProductsList = new SaucedemoProductsListPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await sortingProductsList.availableOptionsSelect();
})

// Task 1.3 from PDF: Products sorting should be performed on option select action.

test("Products sorting on select action", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let sortingProductsList = new SaucedemoProductsSortingPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await sortingProductsList.productsSortOnSelectAction();
})

// Task 1.4 from PDF: By default, products should be sorted by Name (A to Z).

test("Default sorting by Name ASC 1st confirm", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let sortingProductsList = new SaucedemoProductsSortingPage(page);
  
  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await sortingProductsList.defaultSortValue();
})

test("Default sorting by Name ASC 2nd confirm", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let sortingProductsList = new SaucedemoProductsSortingPage(page);
  
  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await sortingProductsList.defaultSortValuex2();
})

// Task 2.1 from PDF: Add button ‘Add to cart’ to following system places: 
// a. Products list – to each product card/item.
// b. Product preview page.

test("'Add to cart' on each product card/item 1st confirm", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let addingAddToCart = new SaucedemoProductsAddingToCartPage(page); 
  
  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await addingAddToCart.addToCartOnCard();
})

test("'Add to cart' on each product card/item 2nd confirm", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let addingAddToCart = new SaucedemoProductsAddingToCartPage(page); 
  
  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await addingAddToCart.addToCartonCardx2();
})

test("'Add to cart' on each product preview page", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let addingtoCartOnPreviewP = new SaucedemoProductsAddingToCartPreviewPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await addingtoCartOnPreviewP.addToCartOnPreviewPage();
})

// Task 2.2.from PDF: Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be added to the cart.

test("Once clicked 'Add to cart' product is in a cart", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let addingtoCartOnPreviewP = new SaucedemoProductsAddingToCartPreviewPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await addingtoCartOnPreviewP.addToCartClickAdding();
})

// Task 2.3 from PDF: If there is at least one product added to the cart, button ‘Remove’ should be added to following places:
// a. Cart – for each product separately.
// b. Products list – to each product card/item.
// c. Product preview page.

test("'Remove' on each item in the Cart", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let removeButtOnCartItems = new SaucedemoProductsRemoveoOnItemsCartPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await removeButtOnCartItems.removeOnEachProductOnCart();
})

test("'Remove' in Products list on each product card/item.", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let removeOnEachInProductList = new SaucedemoProductsListPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await removeOnEachInProductList.removeButtOnEachCard();
})

test("'Remove' on Product Preview page.", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let removeOnProductPreview = new SaucedemoProductsAddingToCartPreviewPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await removeOnProductPreview.removeOnProductPreview();
})

// Task 2.4 from PDF: If user clicks ‘Remove’ button related item/product should be removed from the cart.

test("Click on 'Remove' removes from cart", async ({page}) => {
  let saucedemoLoginPage = new SaucedemoLoginPage(page);
  let removeFromCart = new SaucedemoProductsRemoveFromCartPage(page);

  await saucedemoLoginPage.goto();
  await saucedemoLoginPage.loginUser("standard_user");
  await removeFromCart.removeFromCartOnClick();
})


