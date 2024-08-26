const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cart.page');
const { ProductPage } = require('../pages/product.page');
const { LoginPage } = require('../pages/login.page');
const env = require('../env'); // Import environment variables

test.describe('Cart Functionality', () => {
    let cartPage;
    let productPage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);
        loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(env.credentials.standardUser.username, env.credentials.standardUser.password);
        await loginPage.assertLoginSuccess();
    });

    test('should add a product to the cart from product list', async () => {
        await productPage.addProductToCart(env.items.backpack);
        expect(await cartPage.getNumberOfItems()).toBe(1);
    });

    test('should add a product to the cart from product preview page', async () => {
        await productPage.openProductDetails(env.items.backpack);
        await productPage.addProductToCartFromDetails();
        expect(await cartPage.getNumberOfItems()).toBe(1);
    });

    test('should display "Remove" button in product list after adding product to cart', async () => {
        await productPage.addProductToCart(env.items.backpack);
        expect(await productPage.removeButton(env.items.backpack)).toBeVisible();
    });

    test('should display "Remove" button in cart after adding product to cart', async () => {
        await productPage.addProductToCart(env.items.backpack);
        await cartPage.navigateToCart();
        await cartPage.removeItem(env.items.backpack);
        expect(await cartPage.getNumberOfItems()).toBe(0);
    });

    test('should display "Remove" button on product preview page after adding product to cart', async () => {
        await productPage.openProductDetails(env.items.backpack);
        await productPage.addProductToCartFromDetails();
        expect(await productPage.removeButtonFromDetails()).toBeVisible();
    });

    test('should remove a product from the cart from product list', async () => {
        await productPage.addProductToCart(env.items.backpack);
        await productPage.removeProductFromCart(env.items.backpack);
        expect(await cartPage.getNumberOfItems()).toBe(0);
    });

    test('should remove a product from the cart from product preview page', async () => {
        await productPage.openProductDetails(env.items.backpack);
        await productPage.addProductToCartFromDetails();
        await productPage.removeProductFromDetails();
        expect(await cartPage.getNumberOfItems()).toBe(0);
    });

    test('should remove a product from the cart page', async () => {
        await productPage.addProductToCart(env.items.backpack);
        await cartPage.navigateToCart();
        expect(await cartPage.getNumberOfItems()).toBe(1);
        await cartPage.removeItem(env.items.backpack);
        expect(await cartPage.getNumberOfItems()).toBe(0);
    });
});
