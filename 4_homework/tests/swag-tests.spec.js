import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { LoginPage } from "../pages/login-page";
import { ItemDescriptionPage } from "../pages/item-description-page";
import { CartPage } from "../pages/cart-page";

// User story 1 - sorting functionality

test.describe("Sorting feature", async () => {
    //Log into page before each test
    test.beforeEach(async({page}) => {
        let loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginAs("standard_user");
        await expect(page).toHaveTitle("Swag Labs");
    });

    // US1 AC1
    test("Dropdown element present", async ({page}) => {
        await expect(page.locator("span.product_sort_container")).toBeVisible;
    });

    // US1 AC2 (tests)
    test("Sorting by name descending present", async ({page}) => {
        await expect(page.locator("option[value='az']")).toContainText("Name (A to Z)");
    });
    test("Sorting by name ascending present", async ({page}) => {
        await expect(page.locator("option[value='za']")).toContainText("Name (Z to A)");
    });
    test("Sorting by price ascending present", async ({page}) => {
        await expect(page.locator("option[value='lohi']")).toContainText("Price (low to high)");
    });
    test("Sorting by price descending present", async ({page}) => {
        await expect(page.locator("option[value='hilo']")).toContainText("Price (high to low)");
    });

/*     
    //AC 2 parametrized
    test.describe("Sorting options", async () => {
        let sortingOptions = [
            {name: "by name acsending", value: "az", expected: "Name (A to Z)"},
            {name: "by name decsending", value: "za", expected: "Name (Z to A)"},
            {name: "by price acsending", value: "lohi", expected: "Price (low to high)"},
            {name: "by price decsending", value: "hilo", expected: "Price (high to low)"},
        ];

        sortingOptions.forEach((sortingOption) => {
            test("Sorting option ${sortingOption.name} present", async () => {
                let productsLisPage = new ProductsListPage(page);

                await productsLisPage.sortOption(sortingOption.value, sortingOption.expected);
                //await expect(page.locator("value='az'")).toContainText("${sortingOption.expected}");
            });
        }); 
    }) ;*/

    // US1 AC4
    test("Default sorted by name ascending", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        await productsLisPage.isListSortedByName(true);
        await expect(page.locator("option[value='hilo']")).toContainText("Price (high to low)");
    });

    // US1 AC3  (tests)
    test("Sorted by name ascending", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        //await productsLisPage.sortSelect("az");
        await page.locator("select.product_sort_container").selectOption("Name (A to Z)");
        await productsLisPage.isListSortedByName(true);
    });
    test("Sorted by name descending", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        //await productsLisPage.sortSelect("az");
        await page.locator("select.product_sort_container").selectOption("Name (Z to A)");
        await productsLisPage.isListSortedByName(false);
    });
    test("Sorted by price ascending", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        //await productsLisPage.sortSelect("az");
        await page.locator("select.product_sort_container").selectOption("Price (high to low)");
        await productsLisPage.isListSortedByName(true);
    });
    test("Sorted by price descending", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        //await productsLisPage.sortSelect("az");
        await page.locator("select.product_sort_container").selectOption("Price (high to low)");
        await productsLisPage.isListSortedByName(false);
    });

});



//User story 2 - adding to cart

test.describe("Add to cart and remove feature", async () => {
    //Log into page before each test
    test.beforeEach(async({page}) => {
        let loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginAs("standard_user");
        await expect(page).toHaveTitle("Swag Labs");
    });

    // US2 AC1 (2 tests)
    test("Add to cart from product list page", async ({page}) => {
        await page.locator("button.btn.btn_primary.btn_small").toBeVisible;
    });
    test("Add to cart from item description page", async ({page}) => {
        let itemDescriptionPage = new ItemDescriptionPage(page);

        await itemDescriptionPage.goto();
        await page.locator("button.btn.btn_primary.btn_small").toBeVisible;
    });

    // US2 AC2 (2 tests)
    test ("Button click in product list page adds to cart", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        await productsLisPage.clickAddButton();
        await expect(page.locator("span.shopping_cart_badge")).toBeVisible;
    });
    test ("Button click in item description page adds to cart", async ({page}) => {
        let itemDescriptionPage = new ItemDescriptionPage(page);

        await itemDescriptionPage.goto();
        await itemDescriptionPage.clickAddButton();
        await expect(page.locator("span.shopping_cart_badge")).toBeVisible;
    });

    // US2 AC3 (3 tests)
    test ("Button click in product list page makes remove button visible", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        await productsLisPage.clickAddButton();
        await expect(page.locator("#remove-sauce-labs-backpack")).toBeVisible;
    });
    test ("Button click in item description page makes remove button visible", async ({page}) => {
        let itemDescriptionPage = new ItemDescriptionPage(page);

        await itemDescriptionPage.goto();
        await itemDescriptionPage.clickAddButton();
        await expect(page.locator("#remove")).toBeVisible;
    });
    test ("Rremove button is visible in cart page", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);
        let cartPage = new CartPage(page);

        await productsLisPage.clickAddButton();
        await cartPage.goto();
        await expect(page.locator("#remove-sauce-labs-backpack")).toBeVisible;
    });

    // US2 AC3 (3 tests)
    test ("Remove button click in product list page removes item from cart", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);

        await productsLisPage.clickAddButton();
        await expect(page.locator("span.shopping_cart_badge")).toBeVisible;
        await productsLisPage.clickRemoveButton();
        await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toBeVisible;
    });
    test ("Remove button click in item description page removes item from cart", async ({page}) => {
        let itemDescriptionPage = new ItemDescriptionPage(page);

        await itemDescriptionPage.goto();
        await itemDescriptionPage.clickAddButton();
        await expect(page.locator("#remove")).toBeVisible;
        await itemDescriptionPage.clickRemoveButton();
        await expect(page.locator("#add-to-cart")).toBeVisible;
    });
    test ("Remove button click in cart page removes item from cart", async ({page}) => {
        let productsLisPage = new ProductsListPage(page);
        let cartPage = new CartPage(page);

        await productsLisPage.clickAddButton();
        await cartPage.goto();
        await expect(page.locator("#remove-sauce-labs-backpack")).toBeVisible;
        await cartPage.clickRemoveButton();
        await expect(page.locator("div.removed_cart_item")).toHaveCount(1);
    });

});

