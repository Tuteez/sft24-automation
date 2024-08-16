import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="user-name"]', 'standard_user');
    await page.fill('input[name="password"]', 'secret_sauce');
    await page.click('input[type="submit"]');
});

test('Verify sorting products by name (A to Z)', async ({ page }) => {
    let productsPage = new ProductsListPage(page);
    await page.selectOption('select[class="product_sort_container"]', 'az');
    await expect(productsPage.isListSortedByName(true)).resolves.toBe(true);
});

test('Verify sorting by Name (Z to A)', async ({ page }) => {
    let productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption('za');
    await expect(productsPage.isListSortedByName(false)).resolves.toBe(true);
});

test('Verify sorting by Price (low to high)', async ({ page }) => {
    let productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption('lohi');
    await expect(productsPage.isListSortedByPrice(true)).resolves.toBe(true);
});

test('Verify sorting by Price (high to low)', async ({ page }) => {
    let productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption('hilo');
    await expect(productsPage.isListSortedByPrice(false)).resolves.toBe(true);
});
