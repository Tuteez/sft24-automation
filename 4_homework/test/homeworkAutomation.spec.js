import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { ProductsListPage } from "./pages/products-list-page";
import { SortingFunctionalityPage } from "../pages/sorting-functionality-page";
import { AddToCart } from "../pages/add-to-cart-page";

// #1st user story. SFT-1 Sorting functionality on Products list.
test ( "Log in website", async ({ page }) => {
  let loginPage = new LoginPage(page)
//   let productsListPage = new ProductsListPage (page);

  await loginPage.openPage();
  await expect(page).toHaveTitle("Swag Labs");
  await loginPage.fillUsernameAndPassword();
  await loginPage.loginButton.click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//   let isSortedByName = await productsListPage.isListSortedByName(true);
//   expect(isSortedByName).toBe(false)
  
});
test ( "Sorting dropdown element is visible, enabled", async ({ page }) => {
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

        await sortingFunctionalityPage.filterElementIsVisible();
        await sortingFunctionalityPage.filterElementIsEnabled();

});

test ( "Sorting dropdown element is on the right top of the page", async ({ page }) => {
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

        await sortingFunctionalityPage.filterElementIsOnTheRightSide();
        await sortingFunctionalityPage.filterElementIsOnTheTop();
});

test ( "Available sorting options ", async ({ page }) =>{
     let sortingFunctionalityPage = new SortingFunctionalityPage(page);
     await sortingFunctionalityPage.dropdownElementOptionNamesAreValid();

});

test ( "Selected sorting is performed on option select by name", async ({ page }) =>{
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

    await sortingFunctionalityPage.selectSortingByValue('az')
    await sortingFunctionalityPage.verifyFilterOptionByNameAz('.inventory_item_name');
    await sortingFunctionalityPage.selectSortingByValue('za')
    await sortingFunctionalityPage.verifyFilterOptionByNameAz('.inventory_item_name');
});

test ( "Selected sorting is performed on option select bt price", async ({ page }) =>{
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

    await sortingFunctionalityPage.selectSortingByValue('lohi')
    await sortingFunctionalityPage.verifyFilterOptionByNameAz('.inventory_item_price');
    await sortingFunctionalityPage.selectSortingByValue('hilo')
    await sortingFunctionalityPage.verifyFilterOptionByNameAz('.inventory_item_price');
});

test ("Default sorting by Name (A to Z)", async ({ page }) =>{
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);
    await sortingFunctionalityPage.elementIsSelected('az');
    await sortingFunctionalityPage.verifyFilterOptionByNameAz('.inventory_item_name');
});

// #2nd user story. SFT-2 Ability to add swag to cart.

test ('There is an "Add to cart" button',async ({ page }) => {
    let addToCart = new AddToCart(page);
    await addToCart.addToCartButtonIsVisible();
    
});
test('Button "Add to cart" is in each product card/item', async ({ page }) => {
    let addToCart = new AddToCart(page);
    await addToCart.verifyTextInAllElementsInProductCards('[id^="add-to-cart"]', 'Add to cart');
});
test('Button "Add to cart" is in product preview page', async ({ page }) => {
    let addToCart = new AddToCart(page);
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

    await addToCart.clickRandomItemFromList(".inventory_item_name");
    await sortingFunctionalityPage.elementIsVisible('[id^="add-to-cart"]');
    await sortingFunctionalityPage.elementIsEnabled('[id^="add-to-cart"]');
});

test('Only one item can be added to the cart in product list page', async({ page }) => {
let addToCart = new AddToCart();
let randomNumber = await addToCart.clickRandomItemFromList('[id^="add-to-cart"]');
await addToCart.nthElementIsVisibleInAllProductCards(randomNumber,'[id^="remove-"]');
await addToCart.nthElementIsEnabledInAllProductCards(randomNumber,'[id^="remove-"]');
await addToCart.verifyElementText(".shopping_cart_badge", "1");
});

test('"Remove" button is added in cart - for each product seperately', async ({ page }) => {
    let addToCart = new AddToCart(page);
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

    await addToCart.clickTheElement("#add-to-cart-sauce-labs-onesie");
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-bolt-t-shirt");
    await addToCart.clickTheElement(".shopping_cart_link");

    await sortingFunctionalityPage.elementIsVisible('#remove-sauce-labs-onesie');
    await sortingFunctionalityPage.elementIsEnabled('#remove-sauce-labs-onesie');  
    await sortingFunctionalityPage.elementIsVisible('#remove-sauce-labs-bolt-t-shirt');
    await sortingFunctionalityPage.elementIsEnabled('#remove-sauce-labs-bolt-t-shirt');  
});

test('Button Remove is added in the products list to each product card/item.', async({ page }) => {
    let addToCart = new AddToCart(page);
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

    await addToCart.clickTheElement("#add-to-cart-sauce-labs-onesie");
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-bolt-t-shirt");
    
    await sortingFunctionalityPage.elementIsVisible('#remove-sauce-labs-onesie');
    await sortingFunctionalityPage.elementIsEnabled('#remove-sauce-labs-onesie');  
    await sortingFunctionalityPage.elementIsVisible('#remove-sauce-labs-bolt-t-shirt');
    await sortingFunctionalityPage.elementIsEnabled('#remove-sauce-labs-bolt-t-shirt');  
});

test('Button Remove is added in product preview page.', async({ page }) => {
    let addToCart = new AddToCart(page);
    let sortingFunctionalityPage = new SortingFunctionalityPage(page);

    await addToCart.clickRandomItemFromList(".inventory_item_name");
    await addToCart.clickTheElement("#add-to-cart");
    await sortingFunctionalityPage.elementIsVisible('#remove');
    await sortingFunctionalityPage.elementIsEnabled('#remove');    
});
test('if users removes and item, it should be removed from the cart', async({ page }) =>{
        let addToCart = new AddToCart(page);
        
        await addToCart.clickTheElement("#add-to-cart-sauce-labs-onesie");
        await addToCart.clickTheElement(".shopping_cart_link");
        await addToCart.clickTheElement("#remove-sauce-labs-onesie");
        await addToCart.countElements(".cart_item", 0);
        await addToCart.elementIsNotVisible(".shopping_cart_badge");
    
});