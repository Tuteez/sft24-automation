import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page.js";
import { AddToCart } from "../pages/add-to-cart-page.js";
import { SortingPage } from "../pages/sorting-page.js";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('https://www.saucedemo.com/','Swag Labs');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

//SFT-2 Ability to add swag to cart. 
// 1. Add button ‘Add to cart’ to following system places: 
// a. Products list – to each product card/item. 
// b. Product preview page.
test('Button "Add to cart" is in each product card/item', async ({ page }) => {
    const addToCart = new AddToCart(page);
    await addToCart.verifyElementTextInAllProductCards('[id^="add-to-cart"]', 'Add to cart');
});
test('Button "Add to cart" is in product preview page', async ({ page }) => {
    const addToCart = new AddToCart(page);
    await addToCart.cLickRandomItemFromList(".inventory_item_name");

    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsVisible('[id^="add-to-cart"]');
    await sortingPage.elementIsEnabled('[id^="add-to-cart"]');
});

//2. Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be 
//added to the cart. (There is no possibility to add more than one).
test('One item can be added to the cart in product list page', async({ page }) => {
    const addToCart = new AddToCart(page);
    let randomNumber = await addToCart.cLickRandomItemFromList('[id^="add-to-cart"]');
    //Add to cart mygtukas nematomas
    await addToCart.nthElementNotVisibleInAllProductCards(randomNumber,'[id^="add-to-cart"]');
    //Remove mygtukas yra matomas ir aktyvus
    await addToCart.nthElementIsVisibleInAllProductCards(randomNumber,'[id^="remove-"]');
    await addToCart.nthElementIsEnabledInAllProductCards(randomNumber,'[id^="remove-"]');
    //Krepšelyje matoma 1 prekė
    await addToCart.verifyElementText(".shopping_cart_badge", "1");
});

test('One item can be added to the cart in product preview page', async({ page }) => {
    const addToCart = new AddToCart(page);
    //Paspaudžiam random prekę
    await addToCart.cLickRandomItemFromList(".inventory_item_name");
    //Paspaudžiam add to cart
    await addToCart.clickTheElement("#add-to-cart");
    //Add to cart mygtukas nematomas
    await addToCart.elementIsNotVisible("#add-to-cart")  
    //Krepšelyje matoma 1 prekė
    await addToCart.verifyElementText(".shopping_cart_badge", "1");
});

// 3. If there is at least one product added to the cart, button ‘Remove’ should be added to 
// following places: 
// a. Cart – for each product separately. 
// b. Products list – to each product card/item. 
// c. Product preview page. 

test('Button Remove is added in Cart - for each product separately.', async({ page }) => {
    const addToCart = new AddToCart(page);
    //Isidedam 2 item
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-backpack");
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-bike-light");
    //Einam į cart
    await addToCart.clickTheElement(".shopping_cart_link");
    //Matomas Remove kiekvienam item
    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsVisible('#remove-sauce-labs-backpack');
    await sortingPage.elementIsEnabled('#remove-sauce-labs-backpack');  
    await sortingPage.elementIsVisible('#remove-sauce-labs-bike-light');
    await sortingPage.elementIsEnabled('#remove-sauce-labs-bike-light');  
});

test('Button Remove is added in the products list to each product card/item.', async({ page }) => {
    const addToCart = new AddToCart(page);
    //Isidedam 2 item
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-backpack");
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-bike-light");
    //Matomas Remove kiekvienam item
    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsVisible('#remove-sauce-labs-backpack');
    await sortingPage.elementIsEnabled('#remove-sauce-labs-backpack');  
    await sortingPage.elementIsVisible('#remove-sauce-labs-bike-light');
    await sortingPage.elementIsEnabled('#remove-sauce-labs-bike-light');  
});

test('Button Remove is added in product preview page.', async({ page }) => {
    const addToCart = new AddToCart(page);
    //Paspaudžiam random prekę
    await addToCart.cLickRandomItemFromList(".inventory_item_name");
    //Paspaudžiam add to cart
    await addToCart.clickTheElement("#add-to-cart");
    //Remove mygtukas yra matomas ir aktyvus
    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsVisible('#remove');
    await sortingPage.elementIsEnabled('#remove');    
});

// 4. If user clicks ‘Remove’ button related item/product should be removed from the cart.
test('When clicked Remove related item/product should be removed from the cart.', async({ page }) => {
    const addToCart = new AddToCart(page);
    //Isidedam 2 item
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-backpack");
    await addToCart.clickTheElement("#add-to-cart-sauce-labs-bike-light");
    //Einam į cart
    await addToCart.clickTheElement(".shopping_cart_link");

    //Suskaičiuojam item. Turi būti 2
    await addToCart.countElements(".cart_item", 2);
    //Krepšelyje matoma 2 prekės
    await addToCart.verifyElementText(".shopping_cart_badge", "2");

    //Spaudžiam Remove
    await addToCart.clickTheElement("#remove-sauce-labs-backpack");

    //Mygtuko nebėra
    await addToCart.countElements("#remove-sauce-labs-backpack", 0);    
    //Sąraše lieka 1
    await addToCart.countElements(".cart_item", 1);
    //Krepšelyje matoma 1 prekė
    await addToCart.verifyElementText(".shopping_cart_badge", "1");

    //Spaudžiam Remove
    await addToCart.clickTheElement("#remove-sauce-labs-bike-light");

    //Mygtuko nebėra
    await addToCart.countElements("#remove-sauce-labs-bike-light", 0); 
    //Suskaičiuojam item. Turi būti 0
    await addToCart.countElements(".cart_item", 0);
    //Shoping cart badge tampa nematomu
    await addToCart.elementIsNotVisible(".shopping_cart_badge");
});
