const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login-page');
const ProductsListPage = require('../pages/products-list-page');
const CartPage = require('../pages/cart-page');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Add product to cart', async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addToCart('Sauce Labs Backpack');
    await page.click('.shopping_cart_link');
    const cartItems = await cartPage.getCartItems();
    const itemNames = cartItems.map(item => item.split('\n')[1].trim());
    expect(itemNames).toContain('Sauce Labs Backpack');
});

test('Remove product from cart', async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addToCart('Sauce Labs Backpack');
    await page.click('.shopping_cart_link');
    await cartPage.removeFromCart('Sauce Labs Backpack');
    const cartItems = await cartPage.getCartItems();
    const itemNames = cartItems.map(item => item.split('\n')[1].trim());
    expect(itemNames).not.toContain('Sauce Labs Backpack');
});
