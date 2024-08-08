import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsViewPage } from "../pages/products-view-page";

let usersAccount = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' }
];

//// OPTIONAL TASK: Try to switch to any other user and check how tests perform then.
usersAccount.forEach(user => {
    test.describe(`${user.username} tests`, () => {
        test.beforeEach(async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.logIn(user.username, user.password);
        });

        test("Should have a dropdown menu present on Products Page", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            const dropdownCount = await productsViewPage.checkSortContainer();
            expect(dropdownCount).toBeGreaterThan(0);
        });

        test("Should check if dropdown sorting element is in upper right side of viewport", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            await productsViewPage.isUpperRightSide();
            const isCorrectlyPositioned = await productsViewPage.isUpperRightSide();
            expect(isCorrectlyPositioned).toBe(true)
        });

        test("Should check if all dropdown options are present", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            await productsViewPage.checkDropdownOptions(); 
        });

        test("Should check if A-Z sorting works correctly", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            const isSorted = await productsViewPage.isListSortedByName(true);
            expect(isSorted).toBe(true);
        });

        test("Should check if Z-A sorting works correctly", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            const isSorted = await productsViewPage.isListSortedByName(false);
            expect(isSorted).toBe(true);
        });

        test("Should check if Price ascending sorting works correctly", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            const isSorted = await productsViewPage.isListSortedByPrice(true);
            expect(isSorted).toBe(true);
        });

        test("Should check if Price descending sorting works correctly", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            const isSorted = await productsViewPage.isListSortedByPrice(false);
            expect(isSorted).toBe(true);
        });

        test("Should check if items are A-Z sorted by default", async ({ page }) => {
            const productsViewPage = new ProductsViewPage(page);
            const isSorted = await productsViewPage.isListSortedByNameDefault();
            expect(isSorted).toBe(true);
        });
    });
});