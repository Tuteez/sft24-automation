// @ts-check
const { test, expect } = require('@playwright/test');
import { LoginPage } from 'C:/Users/Emilijos AK/Documents/sft24-automation/4_homework/pages/login-page.js';
//import { ProductsListPage } from '../pages/products-list-page';
import { InventoryPage } from 'C:/Users/Emilijos AK/Documents/sft24-automation/4_homework/pages/inventory-page.js';
import { PreviewPage } from 'C:/Users/Emilijos AK/Documents/sft24-automation/4_homework/pages/preview-page.js';
import { CartPage } from 'C:/Users/Emilijos AK/Documents/sft24-automation/4_homework/pages/cart-page.js';



let searchCriterias = [
  {
    add: "#add-to-cart-sauce-labs-backpack", remove: "#remove-sauce-labs-backpack", text: "Sauce Labs Backpack", locator: "#item_4_title_link",
  },
  {
    add: "#add-to-cart-sauce-labs-bike-light", remove: "#remove-sauce-labs-bike-light", text: "Sauce Labs Bike Light", locator: "#item_0_title_link",
  },
  {
    add: "#add-to-cart-sauce-labs-bolt-t-shirt", remove: "#remove-sauce-labs-bolt-t-shirt", text: "Sauce Labs Bolt T-Shirt", locator: "#item_1_title_link",
  },
  {
    add: "#add-to-cart-sauce-labs-fleece-jacket", remove: "#remove-sauce-labs-fleece-jacket", text: "Sauce Labs Fleece Jacket", locator: "#item_5_title_link",
  },
  {
    add: "#add-to-cart-sauce-labs-onesie", remove: "#remove-sauce-labs-onesie", text: "Sauce Labs Onesie", locator: "#item_2_title_link",
  },
  {
    add: "[name='add-to-cart-test.allthethings()-t-shirt-(red)']", remove: "[name='remove-test.allthethings()-t-shirt-(red)']", text: "Test.allTheThings() T-Shirt (Red)", locator: "#item_3_title_link",
  },

];


test.beforeEach(async ({ page }) => {
  let loginPage = new LoginPage(page);
  let loginData = {
    username: "standard_user",
    password: "secret_sauce"
  };
  await loginPage.goto();
  await loginPage.fillTheData(loginData);
});



//user story 1:
test("US 1. Testing the sorting functionality", async ({ page }) => {
  let invertoryPage = new InventoryPage(page);
  await page.goto("https://www.saucedemo.com/inventory.html");
  await invertoryPage.checkSorting();
});




//user story 2:

//Add button ‘Add to cart’ to following system places:
test.describe("US2", () => {
test.describe("1. Testing add to cart button", () => { //Products list – to each product card/item.
test("a. Testing add to cart button in products page", async ({ page }) => {
  let invertoryPage = new InventoryPage(page);
  let previewPage = new PreviewPage(page);
  await invertoryPage.checkCartButtons();
});

test.describe("b. Testing add to cart button in preview page", () => {
  searchCriterias.forEach((searchCriteria) => {
test(`Verifying ${searchCriteria.text} add to cart button is present in preview`, async ({ page }) => { //Product preview page.
  let invertoryPage = new InventoryPage(page);
  let previewPage = new PreviewPage(page);
  await invertoryPage.checkPreviewButtons(searchCriteria.locator);
  await previewPage.checkPreviewCartButton();
});
});
});
});



//Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be added to the cart. (There is no possibility to add more than one).
test.describe("2. Verifying items are added to the cart", () => {
  
  
searchCriterias.forEach((searchCriteria) => {
test(`Verifying ${searchCriteria.text} item is added to cart`, async ({ page }) => {
  let invertoryPage = new InventoryPage(page);
  await invertoryPage.addToCart(searchCriteria.add, searchCriteria.remove, searchCriteria.text);
});
});
});


//If there is at least one product added to the cart, button ‘Remove’ should be added to following places
test.describe("3. Testing remove button", () => {

  
test("a. Testing remove button in products list", async ({ page }) => { //Products list – to each product card/item.
  let invertoryPage = new InventoryPage(page);
  await invertoryPage.addToCartAll(); //add all items to cart
  await invertoryPage.checkRemoveButtons(); //check if all list items have a remove button
});

test.describe("b. Testing remove button in preview page", () => {
  
searchCriterias.forEach((searchCriteria) => {
test(`Verifying remove button is present in ${searchCriteria.locator} product preview page`, async ({ page }) => { //Product preview page.
  let invertoryPage = new InventoryPage(page);
  let previewPage = new PreviewPage(page);
  await invertoryPage.addToCartAll(); //add all items to cart
  await invertoryPage.checkPreviewButtons(searchCriteria.locator); //open each item's preview
});
});
});

test.describe("c. Testing remove button in the cart", () => {
searchCriterias.forEach((searchCriteria) => {
test(`Verifying ${searchCriteria.remove} remove button in the cart`, async ({ page }) => { //Cart – for each product separately.
  let invertoryPage = new InventoryPage(page);
  let cartPage = new CartPage(page);
  await invertoryPage.addToCartAll(); //add all items to cart
  await invertoryPage.goToCart(); //go to cart
  await cartPage.checkCartRemoveButton(searchCriteria.remove); //check if all added items have a remove button
});
});
});
});


test.describe("4. Testing remove button functionality", () => {
  searchCriterias.forEach((searchCriteria) => {
test(`Verifying remove button removes ${searchCriteria.remove} item from the cart`, async ({ page }) => { 
  let invertoryPage = new InventoryPage(page);
  let cartPage = new CartPage(page);
  await invertoryPage.addToCartAll(); //add all items to cart
  await invertoryPage.goToCart(); //go to cart
  await cartPage.checkIfRemoves(searchCriteria.remove); //remove an item and check if it dissapeared
});
});
});
});