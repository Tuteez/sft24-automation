import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPage } from "../pages/product-page";


let item_list = [
    'test\\.allthethings\\(\\)-t-shirt-\\(red\\)',
    "sauce-labs-backpack",
    "sauce-labs-bike-light",
    "sauce-labs-bolt-t-shirt",
    "sauce-labs-fleece-jacket",
    "sauce-labs-onesie"
  ];  

item_list.forEach((item_name) => {
    test("Check adding to cart and removing item: " + item_name, async ({ page }) => {
        let loginPage = new LoginPage(page);
        let productsListPage = new ProductsListPage(page);
        await loginPage.goto();
        await loginPage.enterUsername("standard_user");
        await loginPage.enterPassword("secret_sauce");
        await loginPage.pressLoginButtonSuccess();
        await productsListPage.addToCart(item_name);
        await productsListPage.checkAdded(item_name);
        await productsListPage.removeFromCart(item_name);
        await productsListPage.checkRemoved(item_name);
    });
});

for (let i = 0; i < 6; i++) {
    test("Check navigating to item page, adding to cart and removing item: " + i, async ({ page }) => {
        let loginPage = new LoginPage(page);
        let productsListPage = new ProductsListPage(page);
        let productPage = new ProductPage(page);
        await loginPage.goto();
        await loginPage.enterUsername("standard_user");
        await loginPage.enterPassword("secret_sauce");
        await loginPage.pressLoginButtonSuccess();
        await productsListPage.openProductPage(i);
        await productPage.addToCart();
        await productPage.checkAdded();
        await productPage.removeFromCart();
        await productPage.checkRemoved();
    });
};