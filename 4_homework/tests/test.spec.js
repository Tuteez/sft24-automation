import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { ShoppingCartPage } from "../pages/shopping-cart-page";

//login
let username = "standard_user"; //ar gera praktika isikelti username ir password (jei ateityje keisis, tai palieku let)
const password = "secret_sauce"; //ar palikti pass const, nes jis nekinta sitam page, ar ale palikti let, nes kad kodas butu more universal jei testuoti reiktu kazka kita
test("User login", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.userLoginToPage(username, password);
});

//1.1. Add dropdown element with options to sort by on the right top corner of the page.
/*
test("1.1. Verify sorting dropdown is on the right top corner of the page", async ({page})=>{
  let loginPage = new LoginPage(page);
  await loginPage.userLoginToPage(username, password);
  let productsListPage = new ProductsListPage(page);

await page.setViewportSize({ width: 701, height: 824 });

const filterElementLocation = await productsListPage.getElementLocation(); 

console.log(filterElementLocation); 

expect(filterElementLocation.top).toBe(70);
expect(filterElementLocation.right).toBe(680);
});
*/

//1.2. Available options to select from should be: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low).
test.describe("1.2. Verify available sorting dropdown optionss", async () => {
  let loginPage;
  let productsListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);

    await loginPage.userLoginToPage(username, password);
  });

  test("Verify count of sorting options", async ({ page }) => {
    await expect(await productsListPage.getAllSortingOptions()).toHaveCount(4);
  });

  test("a. Verify availability of 'Name (A to Z)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("az")
    ).toHaveText("Name (A to Z)");
  });

  test("b. Verify availability of 'Name (Z to A)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("za")
    ).toHaveText("Name (Z to A)");
  });

  test("c. Verify availability of 'Price (low to high)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("lohi")
    ).toHaveText("Price (low to high)");
  });

  test("d. Verify availability of 'Price (high to low)' sorting option", async ({
    page,
  }) => {
    await expect(
      await productsListPage.getSortingOptionByValue("hilo")
    ).toHaveText("Price (high to low)");
  });
});

//1.3. Products sorting should be performed on option select action.
test.describe("1.3. Verify sorting funcionallity", async () => {
  let loginPage;
  let productsListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);

    await loginPage.userLoginToPage(username, password);
  });

  test("Verify sorting by 'Name (A to Z)' option", async ({ page }) => {
    await productsListPage.selectSortingOption("Name (A to Z)");
    await expect(await productsListPage.isListSortedByName(true)).toBe(true);
    //.isListSortedByPrice(true), true, nes mums reikia asc
    //.toBe(true), ka expectinam, kad praeitu testas
  });

  test("Verify sorting by 'Name (Z to A)' option", async ({ page }) => {
    await productsListPage.selectSortingOption("Name (Z to A)");
    await expect(await productsListPage.isListSortedByName(false)).toBe(true);
  });

  test("Verify sorting by 'Price (low to high)' option", async ({ page }) => {
    await productsListPage.selectSortingOption("Price (low to high)");
    await expect(await productsListPage.isListSortedByPrice(true)).toBe(true);
  });

  test("Verify sorting by 'Price (high to low)' option", async ({ page }) => {
    await productsListPage.selectSortingOption("Price (high to low)");
    await expect(await productsListPage.isListSortedByPrice(false)).toBe(true);
  });
});

//1.4. By default, products should be sorted by Name (A to Z).
test("1.4. Verify default sorting option", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.userLoginToPage(username, password);
  let productsListPage = new ProductsListPage(page);

  await expect(await productsListPage.getActiveSortingOption()).toContainText(
    "Name (A to Z)"
  );
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//2.1. Add button ‘Add to cart’ to following system places: Products list – to each product card/item, Product preview page.
test.describe("2.1. Verify 'Add to cart' button availability", async () => {
  let loginPage;
  let productsListPage;
  let productPreviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.userLoginToPage(username, password);
    productsListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);
  });

  test("a. Verify that each product card/item in the products list has 'Add to cart' button", async ({
    page,
  }) => {
    const inventoryItemCount =
      await productsListPage.getAllInventoryItemCount();
    const addToCartButtonCount =
      await productsListPage.getAllAddToCartButtonCount();

    await expect(inventoryItemCount).toBe(addToCartButtonCount);
  });

  test("b. Verify that Product preview page has 'Add to cart' button", async ({
    page,
  }) => {
    await productPreviewPage.goToProductPreviewPage();
    await expect(await productPreviewPage.getAddToCartButton()).toBeVisible();
  });
});

//2.2. Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be added to the cart. (There is no possibility to add more than one).
test.describe("2.2.", async () => {
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

  //1TC add to cart product liste, check ar carte prisidejo vienas
  //2TC check ar gali dar karta bandyt prideti product liste ir carte

  //3TC add to cart preview page, check ar prisidejo vienas
  ////4TC check ar gali dar karta bandyt prideti preview page ir carte, (tiesiog dar karta click)
  test("1TC", async ({ page }) => {
    //get all labels (array)
    const productTitles = await productsListPage.getProductsTitles();
    //console.log(productTitles);
    //took first label from array and extracted text content
    const firstProductTitle = await productTitles[0].textContent();
    //console.log(firstProductTitle);

    await productsListPage.addItemToCart();
    await expect(await productsListPage.getCartIconBadge()).toContainText("1");

    // pratestuoti, kad neina antra karta prideti //await productsListPage.addItemToCart();
    await shoppingCartPage.goToShoppingCartPage();
    //await expect(await shoppingCartPage.getItemTitle()).toContainText("Sauce Labs Backpack");
    const cartProductTitles = await productsListPage.getProductsTitles();
    const cartFirstProductTitle = await cartProductTitles[0].textContent();
    //console.log(cartFirstProductTitle);

    expect(firstProductTitle).toBe(cartFirstProductTitle);
  });

  test("cart badge added product list", async ({ page }) => {
    await productsListPage.addItemToCart();
    await expect(await productsListPage.getCartIconBadge()).toContainText("1");
  });

  test("3TC", async ({ page }) => {
    await productPreviewPage.goToProductPreviewPage();
    const productTitlesPreviewPage =
      await productPreviewPage.getProductsTitles();
    //console.log(productTitlesPreviewPage);
    const firstProductTitlePreviewPage =
      await productTitlesPreviewPage[0].textContent();
    //console.log(firstProductTitlePreviewPage);

    await productPreviewPage.addItemToCartProductPreviewPage();

    await shoppingCartPage.goToShoppingCartPage();
    //await expect(await shoppingCartPage.getItemTitle()).toContainText("Sauce Labs Backpack");
    const cartProductTitles = await productsListPage.getProductsTitles();
    const cartFirstProductTitle = await cartProductTitles[0].textContent();
    //console.log(cartFirstProductTitle);

    expect(firstProductTitlePreviewPage).toBe(cartFirstProductTitle);
  });

  test("cart badge added preview page", async ({ page }) => {
    await productPreviewPage.goToProductPreviewPage();
    await productPreviewPage.addItemToCartProductPreviewPage();
    await expect(await productPreviewPage.getCartIconBadge()).toContainText(
      "1"
    );
  });
});

//2.3. If there is at least one product added to the cart, button ‘Remove’ should be added to following places: Cart – for each product separately, Products list – to each product card/item, Product preview page.
//TC1 prideti preke(galima before eache, kaip login pasidaryti) ir carte patikrinti ar yra remove button
//TC2 prideti preke ir product liste patikrinti ar yra remove button
//TC3 prideti preke ir preview page patikrinti ar yra remove button

test.describe("2.3.", async () => {
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

  test("2.3.prisedu product liste ir pereinu visur pasiziuret ar yra remove", async ({
    page,
  }) => {
    await productsListPage.addItemToCart();
    await expect(await productsListPage.getRemoveButton()).toBeVisible();

    await productPreviewPage.goToProductPreviewPage();
    await expect(await productPreviewPage.getRemoveButton()).toBeVisible();

    await shoppingCartPage.goToShoppingCartPage();
    await expect(await shoppingCartPage.getRemoveButton()).toBeVisible();
  });
});

//2.4. If user clicks ‘Remove’ button related item/product should be removed from the cart.
//carte remove preke(galima before eache, kaip login pasidaryti) ir patikrinti ar removino is carto
//product liste remove preke(galima before eache, kaip login pasidaryti) ir patikrinti ar removino is carto
//preview page remove preke(galima before eache, kaip login pasidaryti) ir patikrinti ar removino is carto
test("2.4.", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.userLoginToPage(username, password);
  let productsListPage = new ProductsListPage(page);
  let shoppingCartPage = new ShoppingCartPage(page);
  //prisidesiu daikta
  //removinu
  //check ar removino cipsa ir carto viduj

  await productsListPage.addItemToCart();
  await (await productsListPage.getRemoveButton()).click();

  await expect(await productsListPage.getCartIconBadge()).not.toBeVisible();

  await shoppingCartPage.goToShoppingCartPage();
  await expect(await shoppingCartPage.getItemTitle()).not.toBeVisible();
});
