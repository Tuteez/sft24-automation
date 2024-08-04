import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { CartPage } from "../pages/cart-page";


//Variables to be used in test cases
let productListPage;
let productPreviewPage;
let cartPage;
const username = "standard_user";
const password = "secret_sauce";


//Running the login function automatically before each test
test.beforeEach(async ({ page }) => {
  productListPage = new ProductsListPage(page);
  productPreviewPage = new ProductPreviewPage(page);
  cartPage = new CartPage(page);
  await productListPage.goto();
  await productListPage.fillUserame(username);
  await productListPage.fillPassword(password);
  await productListPage.clickLogin();
});


test.describe("1st user story - SFT-1 sorting products list", async () => {
    
  //Names of dropdown menu sorting options
    const nameSortAsc = "Name (A to Z)";
    const nameSortDsc = "Name (Z to A)";
    const priceSortAsc = "Price (low to high)";
    const priceSortDsc = "Price (high to low)";

  // Testing to verify if the dropdown menu exists after loging in
    test("Verify that dropdown exists", async ({ page }) => {
      await productListPage.checkForDropdown("Price");
    });

    // Testing to verify if the dropdown options meet the requirements
    test("Verify dropdown options", async ({ page }) => {
      await productListPage.checkForDropdown(nameSortAsc);
      await productListPage.checkForDropdown(nameSortDsc);
      await productListPage.checkForDropdown(priceSortAsc);
      await productListPage.checkForDropdown(priceSortDsc);
    });

    // Testing to verify if when choosing a dropdown option, on 'select' action 
    // the product list if filtered
    test("Verify that product sort is performed on option select action", async ({ page }) => {
      await productListPage.chooseFilter(nameSortAsc);
      await productListPage.isListSortedByName(true);

      await productListPage.chooseFilter(nameSortDsc);
      await productListPage.isListSortedByName(false);

      await productListPage.chooseFilter(priceSortAsc);
      await productListPage.isListSortedByPrice(true);

      await productListPage.chooseFilter(priceSortDsc);
      await productListPage.isListSortedByPrice(false);
    });

    // Testing to verify that the default sort/filter is A-Z
    test("Verify that by default products are sorted A-Z", async ({ page }) => {
      await productListPage.isListSortedByName(true);
    });

});

test.describe("2nd user story - SFT-2 Ability to add swag to cart", async () => {

  const addToCart = "Add to cart";
  const remove = "Remove";

  // Testing to verify if the 'Add to cart' button is in product list page
  // and product preview page
  test("Verify that 'Add to cart' button is in necessary places", async ({ page }) => {
    //Method that verifies if the buttons are in every product item card
    await productListPage.verifyAddToCartBtns(addToCart);

    //Methods that verify if the button is in the product preview page
    await productPreviewPage.goto();
    await productPreviewPage.verifyAddToCartBtn(addToCart);
  });

  // Testing to verify that once the 'Add to cart' button is clicked
  // a second item can't be added and that the item has been added to cart
  test("Verify that 'Add to cart' button works and only adds a single item", async ({ page }) => {
    await productListPage.clickAddToCart();
    await productListPage.verifyAddToCartClick(remove);
  });

  // Testing to verify if after clicking 'Add to cart' the 'Remove' button
  // appears in every page - product list, prieview and cart
  test("Verify that 'Remove' button is added everywhere", async ({ page }) => {
    //verify that 'remove' button is in product list page
    await productListPage.clickAddToCart();
    await productListPage.verifyAddToCartClick(remove);

    //verify that 'remove' button is in your cart page
    await cartPage.goto();
    await cartPage.verifyRemoveBtn();

    //verify that 'remove' button is in product prieview page
    await productPreviewPage.goto();
    await productPreviewPage.verifyRemoveBtn(remove);
  });

  // Testing if clicking 'Remove' button removes the item from the cart
  test("Verify that 'Remove' button removes item from cart", async ({ page }) => {
    //verify that 'Remove' button works in product list page
    await productListPage.clickAddToCart();
    await productListPage.clickRemoveBtn();
    await productListPage.verifyRemoveClick(addToCart);
    await productListPage.clickAddToCart(); // add the item to cart again, so the remove button
                                            // could be verified in cart page

    //verify that 'Remove' button works in your cart page
    await cartPage.goto();
    await cartPage.clickRemoveBtn();
    await cartPage.verifyRemoveClick();

    //verify that 'Remove' button wroks in product prieview page
    await productPreviewPage.goto();
    await productPreviewPage.clickAddToCart();
    await productPreviewPage.clickRemoveBtn();
    await productPreviewPage.verifyRemoveClick(addToCart);

  });

});