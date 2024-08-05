import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { Users } from "../user-data/userCreds";
import { ProductsListPage } from "../pages/products-list-page";


test.describe("Dropdown menu functionality", async () => {
    let loginPage;
    let productListPage;
    let users;

    test.beforeEach(async ({ page }) => {
        users = new Users();
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.userLogin(page, users.standard_user);
    });

    test("Verify dropdown options visibility", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.dropDownMenuOptionsCount();
    });

    test("Verify dropdown options", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.dropDownMenuAvailableOptions();
    });

    test("Verify product ascending soring (A-Z)", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.sortSelectAZ();
    });

    test("Verify product ascending sorting (Z-A)", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.sortSelectZA();
    });

    test("Verify product price sorting (Low-High)", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.sortPriceLowHigh();
    });

    test("Verify product price sorting (High-Low)", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.sortPriceHighLow();
    });

    test("Default product sort (A-Z)", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.searchDefaultByAZ();
    });

    test("Each product card has 'Add to cart' button element", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.checkEachProductCardCartEelement();
    });

    test("Each item has product prievew page with description", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.getProductPreviewDescription();
    });

    test("Add one item to cart functionality", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.addOneItemToCart();
    });

    test("Remove button in cart functionality", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.clickRemoveButtonCart();
    });

    test("Remove button in product page functionality", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.clickRemoveButtonProductPage();
    });

    test("Remove button in product description page functionality", async ({ page }) => {
        productListPage = new ProductsListPage(page);
        await productListPage.clickRemoveButtonProductDescriptionPage();
    });

});
