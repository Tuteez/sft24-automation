import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/loginPage.page";
import { ProductsListPage } from "../pages/products-list-page";

test.describe('Dropdown options', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.fillUserName("standard_user");
        await loginPage.fillPassword("secret_sauce");
        await loginPage.clickLoginButton();
    });
     
    test("User can sort the products by name (a to z)", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectProductSortContainer("Name (A to Z)");
        expect(await productsListPage.isListSortedByName(true)).toBe(true);
    });

    test("User can sort the products by name (z to a)", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectProductSortContainer("Name (Z to A)");
        expect(await productsListPage.isListSortedByName(true)).toBe(true);  //should be false
    });

    test("User can sort the products by price (low to high)", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectProductSortContainer("Price (low to high)");
        expect(await productsListPage.isListSortedByPrice(true)).toBe(true);
    });
    test("User can sort the products by price (high to low)", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectProductSortContainer("Price (high to low)");
        expect(await productsListPage.isListSortedByPrice(false)).toBe(true);
    });
});

test.describe("Cart Feature", async () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.fillUserName("standard_user");
        await loginPage.fillPassword("secret_sauce");
        await loginPage.clickLoginButton();
    
    });

    test("Standard user tries to add 1 product to the cart", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        productsListPage.addToCart("backpack");
        expect(await productsListPage.isAddedToCart()).toBe(true);
        const cartPage = new CartPage(page);
        await productsListPage.navigateToCart();
        expect(await cartPage.getTitle).toBe("Your Cart");
        expect(await cartPage.getCartQuantity).toBe("1");
        expect(await cartPage.getItemName).toBe("Sauce Labs Backpack");

    });

    test("Standard user tries to add 1 product to the cart and remove", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.addToCart("backpack");
        expect(await productsListPage.isAddedToCart()).toBe(true);
        expect(await productsListPage.getTextFromBackpackButton).toEqual('Remove');
        await productsListPage.removeItem('backpack');
        expect(await productsListPage.getTextFromBackpackButton).toBe('Add to cart');
    });

    test("Standard user tries to add 1 product to the cart and then delete from the cart", async ({ page }) => {

        page.locator(".shopping_cart_badge")
        const productsListPage = new ProductsListPage(page);
        await productsListPage.addToCart("backpack");
        expect(await productsListPage.isAddedToCart()).toBe(true);
        const cartPage = new CartPage(page);
        await productsListPage.navigateToCart();
        expect(await cartPage.getTitle).toBe("Your Cart");
        expect(await cartPage.getCartQuantity).toBe("1");
        expect(await cartPage.getItemName).toBe("Sauce Labs Backpack");
        await cartPage.removeItem('backpack');
        await expect(cartPage.getShoppingCartBadge).toHaveCount(0);
    });

    test("Standard user tries to add 2 products to the cart", async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.addToCart("backpack");
        expect(await productsListPage.isAddedToCart()).toBe(true);
        expect(await productsListPage.getCartItemsAmount).toBe("1");
        await productsListPage.addToCart("bike-light");
        expect(await productsListPage.getCartItemsAmount).toBe("2");

    });    
});
