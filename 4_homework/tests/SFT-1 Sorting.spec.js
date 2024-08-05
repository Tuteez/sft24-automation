import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsViewPage } from "../pages/products-view-page";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.logIn('standard_user', 'secret_sauce');
});


//Testing if dropdown sorting container is present
test("Testing if dropdown menu is present on Products Page", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.checkSortContainer();
});

//Testing if dropdown sorting element is positioned in upper right corner of viewport 
test("Is dropdown sorting element in upper right side of viewport", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.isUpperRightSide();
});

//Testing options in dropdown sorting element
test("Dropdown element sorting options testing", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.checkDropdownOptions();
});

//Testing if ascending sorting works correctly
test("A-Z sorting test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByName(true);
    expect(isSorted).toBe(true);
});

//Testing if descending sorting works correctly
test("Z-A sorting test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByName(false);
    expect(isSorted).toBe(true);
});

// Test if price sorting ascending works correctly
test("Price ascending sorting test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByPrice(true);
    expect(isSorted).toBe(true);
});

//Test if price sorting descending works correctly
test("Price descending sorting test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByPrice(false);
    expect(isSorted).toBe(true);
});

//Testing if page is A-Z name sorted by default 
test("Default A-Z sorting Test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    const isSorted = await productsViewPage.isListSortedByNameDefault();
    expect(isSorted).toBe(true);
});
