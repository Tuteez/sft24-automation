import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { ShoppingCartPage } from "../pages/shopping-cart-page";

//login
let username = "standard_user"; //i declared username variable with let because i change it at the end of code to see how it workd with other usernames
const password = "secret_sauce"; //i declared password variable with const because theres provided only one password for all usernames
test("User login", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.userLoginToPage(username, password);
});


test.describe("1st User Story", async () => {
  let loginPage;
  let productsListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);

    await loginPage.userLoginToPage(username, password);
  });

//1. Add dropdown element with options to sort by on the right top corner of the page.
//This test more looks like manual because it can be done easily by visual verification and also different screens get different results.
//Also I think it's not a good practise to check like I did because even I set viewpoer size, different screens might get different results.
test("1. Verify sorting dropdown button is on the right top corner of the page", async ({
  page,
}) => {

  await page.setViewportSize({ width: 701, height: 824 });

  const filterElementLocation = await productsListPage.getElementLocation();

  console.log(filterElementLocation);

  expect(filterElementLocation.top).toBe(70);
  expect(filterElementLocation.right).toBe(680);
});

//2. Available options to select from should be: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low).
test.describe("2. Verify available sorting dropdown button options", async () => {

  test("2.1. Verify count of sorting options", async ({ page }) => {
    await expect(await productsListPage.getAllSortingOptions()).toHaveCount(4);
  });

  test("2.a. Verify availability of 'Name (A to Z)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("az")
    ).toHaveText("Name (A to Z)");
  });

  test("2.b. Verify availability of 'Name (Z to A)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("za")
    ).toHaveText("Name (Z to A)");
  });

  test("2.c. Verify availability of 'Price (low to high)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("lohi")
    ).toHaveText("Price (low to high)");
  });

  test("2.d. Verify availability of 'Price (high to low)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("hilo")
    ).toHaveText("Price (high to low)");
  });
});

//3. Products sorting should be performed on option select action.
test.describe("3. Verify sorting funcionallity", async () => {
  
  test("3.1. Verify sorting funcionallity by 'Name (A to Z)' option", async ({ page }) => {
    await productsListPage.selectSortingOption("Name (A to Z)");
    await expect(await productsListPage.isListSortedByName(true)).toBe(true);
    //.isListSortedByPrice(true), true, nes mums reikia asc
    //.toBe(true), ka expectinam, kad praeitu testas
  });

  test("3.2. Verify sorting funcionallity by 'Name (Z to A)' option", async ({ page }) => {
    await productsListPage.selectSortingOption("Name (Z to A)");
    await expect(await productsListPage.isListSortedByName(false)).toBe(true);
  });

  test("3.3. Verify sorting funcionallity by 'Price (low to high)' option", async ({
    page,
  }) => {
    await productsListPage.selectSortingOption("Price (low to high)");
    await expect(await productsListPage.isListSortedByPrice(true)).toBe(true);
  });

  test("3.4. Verify sorting funcionallity by 'Price (high to low)' option", async ({
    page,
  }) => {
    await productsListPage.selectSortingOption("Price (high to low)");
    await expect(await productsListPage.isListSortedByPrice(false)).toBe(true);
  });
});

//4. By default, products should be sorted by Name (A to Z).
test("4. Verify default sorting option is 'Name (A to Z)'", async ({ page }) => {
  
  await expect(await productsListPage.getActiveSortingOption()).toContainText(
    "Name (A to Z)"
  );
});

});



test.describe("2nd User Story", async () => {
  let loginPage;
  let productsListPage;
  let shoppingCartPage;
  let productPreviewPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.userLoginToPage(username, password);
    productsListPage = new ProductsListPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    productPreviewPage = new ProductPreviewPage(page);
  });


//1. Add button ‘Add to cart’ to following system places: Products list – to each product card/item, Product preview page.
test.describe("1. Verify 'Add to cart' button availability", async () => {
  
  test("1.a. Verify that each product card/item in the products list has 'Add to cart' button", async ({
    page,
  }) => {
    const inventoryItemCount =
      await productsListPage.getAllInventoryItemCount();
    const addToCartButtonCount =
      await productsListPage.getAllAddToCartButtonCount();

    await expect(inventoryItemCount).toBe(addToCartButtonCount);
  });

  test("1.b. Verify that Product preview page has 'Add to cart' button", async ({
    page,
  }) => {
    await productPreviewPage.goToProductPreviewPage();
    await expect(await productPreviewPage.getAddToCartButton()).toBeVisible();
  });
});

//2. Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be added to the cart. (There is no possibility to add more than one).
test.describe("2. Verify 'Add to cart' button functionality", async () => {
 
  test("2.1. Verify 'Add to cart' button functionality in products list page", async ({
    page,
  }) => {
    //get all labels (array)
    const productTitles = await productsListPage.getProductsTitles();
    //console.log(productTitles);

    //took first label from array and extracted text content
    const firstProductTitle = await productTitles[0].textContent();
    //console.log(firstProductTitle);

    await productsListPage.addItemToCart();
    await shoppingCartPage.goToShoppingCartPage();

    const cartProductTitles = await productsListPage.getProductsTitles();
    const cartFirstProductTitle = await cartProductTitles[0].textContent();
    //console.log(cartFirstProductTitle);

    expect(firstProductTitle).toBe(cartFirstProductTitle);
  });

  test("2.2. Verify that cart badge is updated in products list page", async ({
    page,
  }) => {
    await productsListPage.addItemToCart();
    await expect(await productsListPage.getCartIconBadge()).toContainText("1");
  });

  test("2.3. Verify 'Add to cart' button functionality in product preview page", async ({
    page,
  }) => {
    await productPreviewPage.goToProductPreviewPage();
    const productTitlesPreviewPage =
      await productPreviewPage.getProductsTitles();
    //console.log(productTitlesPreviewPage);
    const firstProductTitlePreviewPage =
      await productTitlesPreviewPage[0].textContent();
    //console.log(firstProductTitlePreviewPage);

    await productPreviewPage.addItemToCart();

    await shoppingCartPage.goToShoppingCartPage();
    //await expect(await shoppingCartPage.getItemTitle()).toContainText("Sauce Labs Backpack");
    const cartProductTitles = await productsListPage.getProductsTitles();
    const cartFirstProductTitle = await cartProductTitles[0].textContent();
    //console.log(cartFirstProductTitle);

    expect(firstProductTitlePreviewPage).toBe(cartFirstProductTitle);
  });

  test("2.4. Verify that cart badge is updated in product preview page", async ({
    page,
  }) => {
    await productPreviewPage.goToProductPreviewPage();
    await productPreviewPage.addItemToCart();
    await expect(await productPreviewPage.getCartIconBadge()).toContainText(
      "1"
    );
  });
});

//3. If there is at least one product added to the cart, button ‘Remove’ should be added to following places: Cart – for each product separately, Products list – to each product card/item, Product preview page.
test.describe("3. Verify 'Remove' button availability", async () => {
  
  test("3.a. Verify 'Remove' button is available on shopping cart page", async ({
    page,
  }) => {
    await productsListPage.addItemToCart();
    await shoppingCartPage.goToShoppingCartPage();
    await expect(await shoppingCartPage.getRemoveButton()).toBeVisible();
  });

  test("3.b. Verify 'Remove' button is available on products list page", async ({
    page,
  }) => {
    await productsListPage.addItemToCart();
    await expect(await productsListPage.getRemoveButton()).toBeVisible();
  });

  test("3.c. Verify 'Remove' button is available on product preview page", async ({
    page,
  }) => {
    await productPreviewPage.goToProductPreviewPage();
    await productPreviewPage.addItemToCart();
    await expect(await productPreviewPage.getRemoveButton()).toBeVisible();
  });
});

//4. If user clicks ‘Remove’ button related item/product should be removed from the cart.
test.describe("4. Verify 'Remove' button functionality", async () => {
 
  test("4.1. Verify 'Remove' button functionality on products list page", async ({ page }) => {
    await productsListPage.addItemToCart();
    await (await productsListPage.getRemoveButton()).click();

    await expect(await productsListPage.getCartIconBadge()).not.toBeVisible();

    await shoppingCartPage.goToShoppingCartPage();
    await expect(await shoppingCartPage.getItemTitle()).not.toBeVisible();
  });

  test("4.2. Verify 'Remove' button functionality on product preview page", async ({ page }) => {
    await productPreviewPage.goToProductPreviewPage();
    await productPreviewPage.addItemToCart();
    await (await productPreviewPage.getRemoveButton()).click();

    await expect(await productPreviewPage.getCartIconBadge()).not.toBeVisible();

    await shoppingCartPage.goToShoppingCartPage();
    await expect(await shoppingCartPage.getItemTitle()).not.toBeVisible();
  });

  test("4.3. Verify 'Remove' button functionality on shopping cart page", async ({ page }) => {
    await productsListPage.addItemToCart();
    await shoppingCartPage.goToShoppingCartPage();
    await (await shoppingCartPage.getRemoveButton()).click();

    await expect(await shoppingCartPage.getCartIconBadge()).not.toBeVisible();
    await expect(await shoppingCartPage.getItemTitle()).not.toBeVisible();
  });

});

});



//OPTIONAL part (I wrotte bugs which my automation testing code provided)

//none of the tests passed because user can't login and proceed to further tests (as expected to be for locked out user)
//username = "locked_out_user";

//sorting functionality doesn't work, values can't be clicked and changed (only default 'Name (A to Z)' is available)
//product can't be added to the cart on product preview page
//when product is added there's no available 'Remove' button on product preview page
//'Remove' button functionality doens't work on producst list page and product preview page
//username = "problem_user";

//all tests passed but it took longer (1st run - 3min, 2nd run - 3,1min) which is almost 5 times longer comparing to standart_user (1st run - 39.7s , 2nd run - 36.9s)
//username = "performance_glitch_user";

//sorting functionality doesn't work, values can't be clicked and changed (only default 'Name (A to Z)' is available)
//'Remove' button functionality doens't work on producst list page and product preview page
//username = "error_user";

//sorting by 'Price (low to high)' and 'Price (high to low)' options doesn't work, when chosen they give wrong products order
//username = "visual_user";