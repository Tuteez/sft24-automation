import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="user-name"]', 'standard_user');
    await page.fill('input[name="password"]', 'secret_sauce');
    await page.click('input[type="submit"]');
});

test('Verify adding product to cart from product page', async ({ page }) => {
    let productsPage = new ProductsListPage(page);
    await productsPage.openProductPage('Sauce Labs Backpack');
    await productsPage.addToCartFromProductPage();
    await expect(productsPage.isProductInCart('Sauce Labs Backpack')).resolves.toBe(true);
});

test('Verify removing product from cart from product page', async ({ page }) => {
    let productsPage = new ProductsListPage(page);
    await productsPage.openProductPage('Sauce Labs Backpack');
    await productsPage.addToCartFromProductPage();
    await productsPage.removeFromCartFromProductPage();
    await expect(productsPage.isProductInCart('Sauce Labs Backpack')).resolves.toBe(false);
});
