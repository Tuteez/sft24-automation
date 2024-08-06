import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/login-page";
import {ProductsListPage} from "../pages/products-list-page";
import {CartPage} from "../pages/cart-page";
import {ProductPage} from "../pages/product-page";

import {LoginData} from "../test-data/login-data";

let loginPage;
let productsListPage;
let cartPage;
let productPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);

    await loginPage.goto();
});

test.describe("Login functionality", async () => {
    test("Successful login", async ({page}) => {
        let loginData = new LoginData(
            "standard_user",
            "secret_sauce"
        )
        await loginPage.doLogin(loginData.username, loginData.password);
        await productsListPage.checkLoggedIn();

    });
    test("Failing login - invalid username", async ({page}) => {

        let loginData = new LoginData(
            "standard_user",
            "secret_sauce",
            "invalid_username"
        )
        await loginPage.doLogin(loginData.invalidUsername, loginData.password);
        await loginPage.checkInvalidCredentials();
    });
    test("Failing login - invalid password", async ({page}) => {

        let loginData = new LoginData(
            "standard_user",
            "secret_sauce",
            "invalid_username",
            "invalid_password"
        )
        await loginPage.doLogin(loginData.username, loginData.invalidPassword);
        await loginPage.checkInvalidCredentials();
    });
});
test.describe("Sorting functionality on Products list", async () => {
    test.beforeEach(async ({page}) => {
        let loginData = new LoginData(
            "standard_user",
            "secret_sauce"
        )
        await loginPage.doLogin(loginData.username, loginData.password);
        await productsListPage.checkLoggedIn();
    });
    test("Sorting items - by default", async ({page}) => {
        await expect(page.locator('[data-test="active-option"]')).toHaveText("Name (A to Z)");
        expect(productsListPage.isListSortedByName(true)).toBeTruthy();
    });
    test("Sorting items - by price(low to high)", async ({page}) => {
        await productsListPage.doSorting("Price (low to high)");
        expect(productsListPage.isListSortedByPrice(true)).toBeTruthy();

    });
    test("Sorting items - by price(high to low)", async ({page}) => {
        await productsListPage.doSorting("Price (high to low)");
        expect(productsListPage.isListSortedByPrice(false)).toBeTruthy();

    });

    test("Sorting items - by name(A to Z)", async ({page}) => {
        await productsListPage.doSorting("Name (A to Z)");
        expect(productsListPage.isListSortedByName(true)).toBeTruthy();
    });
    test("Sorting items - by name(Z to A)", async ({page}) => {
        await productsListPage.doSorting("Name (A to Z)");
        expect(productsListPage.isListSortedByName(false)).toBeTruthy();
    });
});

test.describe("Ability to add swag to the cart", async () => {
    test.beforeEach(async ({page}) => {
        let loginData = new LoginData(
            "standard_user",
            "secret_sauce"
        )
        await loginPage.doLogin(loginData.username, loginData.password);
        await productsListPage.checkLoggedIn();
    });
    test("Add swag to the cart from product list", async ({page}) => {
        cartPage = new CartPage(page);

        await productsListPage.clickAddToCart();
        await productsListPage.openCart();
        await cartPage.checkCart("Sauce Labs Backpack", "1");

    });
    test("Add swag to the cart from product preview page", async ({page}) => {
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);

        await productsListPage.openItem();
        await productPage.addToCart();
        await productPage.openCart();
        await cartPage.checkCart("Sauce Labs Backpack", "1");
    });
});

test.describe("Ability to remove swag from the cart", async () => {
    test.beforeEach(async ({page}) => {
        let loginData = new LoginData(
            "standard_user",
            "secret_sauce"
        )
        await loginPage.doLogin(loginData.username, loginData.password);
        await productsListPage.checkLoggedIn();
        await productsListPage.clickAddToCart();
    });

    test("Remove swag from the cart from cart page", async ({page}) => {
        cartPage = new CartPage(page);

        await productsListPage.openCart();
        await cartPage.removeItem();
        await cartPage.checkEmptyCart();
    });
    test("Remove swag from the cart from product list page", async ({page}) => {
        cartPage = new CartPage(page);

        await productsListPage.removeItem();
        await productsListPage.openCart();
        await cartPage.checkEmptyCart();
    });
    test("Remove swag from the cart from product preview page", async ({page}) => {
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);

        await productsListPage.openItem();
        await productPage.removeItem();
        await productPage.openCart();
        await cartPage.checkEmptyCart();
    });
});