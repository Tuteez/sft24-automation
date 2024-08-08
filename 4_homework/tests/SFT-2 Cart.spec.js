import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPreviewPage } from '../pages/product-preview-page';
import { ProductAddTestPage } from '../pages/product-add-test-page';
import { CartPage } from '../pages/cart-page';

let usersAccount = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'locked_out_user', password: 'secret_sauce' }
];

// OPTIONAL: Try to switch to any other user and check how tests perform then.
usersAccount.forEach(user => {
    test.describe(`${user.username} tests`, () => {
        test.beforeEach(async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.logIn(user.username, user.password);
        });

        // Add button ‘Add to cart’ to
        // Products list – to each product card/item.
        test("Check if each product on products list has the 'Add to cart' button", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const item = await productAddTestPage.randomProductItem();
            await expect(item.locator(productAddTestPage.addToCartButtonLocator)).toHaveText("Add to cart");
        });

        // Add button ‘Add to cart’ to
        // B - Product preview page.
        test("Check if each product in preview page has the 'Add to cart' button", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const productPreviewPage = new ProductPreviewPage(page);
            const item = await productAddTestPage.randomProductItem();
            await productPreviewPage.enterProductPreview(item); // Help! mam 401, wiesz dlaczego?
            await expect(productAddTestPage.addToCartButtonLocator).toBeVisible();
        });

        // Once the user clicks on the button ‘Add to cart’
        // one piece of selected swag should be added to the cart.
        test("checking if adding products to cart test works correctly", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const cartPage = new CartPage(page);
            const productName = await productAddTestPage.addRandomMain();
            // Go to cart page
            await productAddTestPage.clickCartButton();
            // Check if product name from addRandomMain() is present in the cart-page
            await expect(cartPage.inventoryItemName).toHaveText(productName);
        });

        // TASK 3 - Once the user clicks on the button ‘Add to cart’ button ‘Remove’ should be added to
        // 3A - Cart – for each product separately.
        test("Should check if 'Remove' button appears in the cart", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const cartPage = new CartPage(page);
            const productName = await productAddTestPage.addRandomMain();
            await productAddTestPage.clickCartButton();
            await expect(cartPage.cartRemoveButtonLocator).toBeVisible();
        });

        // 3B - Products list – to each product card/item.
        test("Should check if remove button appears next to the product", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const productName = await productAddTestPage.addRandomMain();
            const removeButtonLocator = productAddTestPage.getRemoveButtonLocator(productName);
            await expect(removeButtonLocator).toBeVisible();
        });

        // 3C - Product preview page.
        test("Should check if remove button appear in product preview page", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const productPreviewPage = new ProductPreviewPage(page);
            const item = await productAddTestPage.randomProductItem();
            await productAddTestPage.clickAddToCartButton(item);
            await productAddTestPage.enterProductPreview(item);
            await expect(productPreviewPage.removeButtonLocator).toBeVisible();
        });

        // 4. If user clicks ‘Remove’ button related item/product should be removed from the cart
        test("Should check if remove button removes related item", async ({ page }) => {
            const productAddTestPage = new ProductAddTestPage(page);
            const cartPage = new CartPage(page);
            const item = await productAddTestPage.randomProductItem();
            const itemName = await item.locator(productAddTestPage.itemNameSelector).innerText();
            await productAddTestPage.clickAddToCartButton(item);
            await productAddTestPage.clickCartButton();
            await cartPage.clickRemoveButton();
            await expect(page.locator(`text=${itemName}`)).not.toBeVisible();
        });
    });
});