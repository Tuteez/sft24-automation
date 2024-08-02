import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page.js";
import { SortingPage } from "../pages/sorting-page.js";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('https://www.saucedemo.com/', 'Swag Labs');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// SFT-1 Sorting functionality on Products list.
//1. Dropdown element with options to sort by on the right top corner of the page. 
test('Sorting dropdown element is visible, enabled and has 4 options', async ({ page }) => {
    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsVisible('.product_sort_container');
    await sortingPage.elementIsEnabled('.product_sort_container');
    await sortingPage.elementHas4Options('.product_sort_container option');
});
test('Sorting dropdown element is on the right top corner of the page', async ({ page }) => {
    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsAtRight('.product_sort_container');
    await sortingPage.elementIsAtTop('.product_sort_container');
});

// 2. Available options to select from should be:  
// a. Name (A to Z). 
// b. Name (Z to A). 
// c. Price (low to high). 
// d. Price (high to low). 

test('Options displayed: "A to Z", "Z to A", "low to high", "high to low"', async({page}) => {
    const sortingPage = new SortingPage(page);
    await sortingPage.elementOptionsNamesAreValid("Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)");
})

//3. Products sorting should be performed on option select action. 
test("Selected Sorting is performed on option select: 'Z to A' and 'A to Z'", async ({page}) =>{
    const sortingPage = new SortingPage(page);
    await sortingPage.selectSortingByValue('za');
    await sortingPage.verifyItemsSortedZA('.inventory_item_name');
    await sortingPage.selectSortingByValue('az');
    await sortingPage.verifyItemsSortedAZ('.inventory_item_name');
})
test("Selected Sorting is performed on option select: 'low to high' and 'high to low'", async ({page}) =>{
    const sortingPage = new SortingPage(page);
    await sortingPage.selectSortingByValue('lohi');
    await sortingPage.verifyItemsSortedLohi('.inventory_item_price');
    await sortingPage.selectSortingByValue('hilo');
    await sortingPage.verifyItemsSortedHiLo('.inventory_item_price');    
})
//4. By default, products should be sorted by Name (A to Z)
test("Default sorting is 'A to Z'", async({page}) => {
    const sortingPage = new SortingPage(page);
    await sortingPage.elementIsSelected('az');
    await sortingPage.verifyItemsSortedAZ('.inventory_item_name');
})