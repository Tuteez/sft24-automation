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
test("AZ sorting Test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.azSorting();
});;

//Testing if descending sorting works correctly
test("ZA sorting Test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.zaSorting();
});

//Test if price sorting ascending works correctly
test("Price ascending sorting Test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.ascendingPriceSorting();
});

//Test if price sorting descending works correctly
test("Price descending sorting Test", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.priceDescendingSorting();
});

//Testing default sorting  by Name (A to Z)
test("Default sorting by Name (A to Z)", async ({ page }) => {
    const productsViewPage = new ProductsViewPage(page);
    await productsViewPage.DefaultAzSorting();
});