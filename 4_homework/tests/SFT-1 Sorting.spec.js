import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsViewPage } from "../pages/products-view-page";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.logIn('standard_user', 'secret_sauce');
});


//Add dropdown element with options to sort by on the right top corner of the page.
test("Should have a dropdown menu present on Products Page", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.checkSortContainer();
});

test("Should check if dropdown sorting element is in upper right side of viewport", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.isUpperRightSide();
});

// //2. Available options to select from should be:
// a. Name (A to Z).
// b. Name (Z to A).
// c. Price (low to high).
// d. Price (high to low).
test("Should check if all dropdown options are present", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.checkDropdownOptions();
});

//3. Products sorting should be performed on option select action.
test("Should check if A-Z sorting works correctly", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByName(true);
    expect(isSorted).toBe(true);
});

test("Z-A sorting works correctly", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByName(false);
    expect(isSorted).toBe(true);
});

test("Should check if Price ascending sorting works correctly", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByPrice(true);
    expect(isSorted).toBe(true);
});

test("Should check if Price descending sorting sorting works correctly", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByPrice(false);
    expect(isSorted).toBe(true);
});

//4. By default, products should be sorted by Name (A to Z).
test("Should check if items are A-Z sorted by default", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByNameDefault();
    expect(isSorted).toBe(true);
});
