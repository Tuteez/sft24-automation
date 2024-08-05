import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsViewPage } from "../pages/products-view-page";
import { ProductAddTestPage } from "../pages/product-add-test-page";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.logIn('standard_user', 'secret_sauce');
});

// Add button ‘Add to cart’ to following system places
// A - Products list to each product card/item.
test("Testing if each product item has an 'Add to cart' button", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    await productAddTestPage.inventoryItemsAddToCartButtons();
});
// Add button ‘Add to cart’ to following system places
// B Product preview page.
test("Testing if each product's preview page has an 'Add to cart' button", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    await productAddTestPage.productPreviewPagesAddButtons();
});