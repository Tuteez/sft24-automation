const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login-page');
const ProductsListPage = require('../pages/products-list-page');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Sort products by name (A to Z)', async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.sortProducts('az');
    const isSorted = await productsPage.isListSortedByName(true);
    expect(isSorted).toBe(true);
});

test('Sort products by name (Z to A)', async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.sortProducts('za');
    const isSorted = await productsPage.isListSortedByName(false);
    expect(isSorted).toBe(true);
});

test('Sort products by price (low to high)', async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.sortProducts('lohi');
    const isSorted = await productsPage.isListSortedByPrice(true);
    expect(isSorted).toBe(true);
});

test('Sort products by price (high to low)', async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.sortProducts('hilo');
    const isSorted = await productsPage.isListSortedByPrice(false);
    expect(isSorted).toBe(true);
});
