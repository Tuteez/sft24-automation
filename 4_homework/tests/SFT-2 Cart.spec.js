import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { ProductAddTestPage } from "../pages/product-add-test-page";
import { CartPage } from "../pages/cart-page";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.logIn('standard_user', 'secret_sauce');
});

// Add button ‘Add to cart’ to
//Products list – to each product card/item.
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
    await productPreviewPage.enterProductPreview(item); //Help! mam 401, wiesz dlaczego? 
    await expect(page.locator(productAddTestPage.addToCartButtonLocator)).toBeVisible();
});

//Once the user clicks on the button ‘Add to cart’
//one piece of selected swag should be added to the cart.
test("checking if adding products to cart test works correctly", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const cartPage = new CartPage(page)
    const productName = await productAddTestPage.addRandomMain();
    //Go to cart page
    await productAddTestPage.clickCartButton();
    //Check if product name from addRandomMain() is present in the cart-page
    await expect(cartPage.inventoryItemName).toHaveText(productName);
});

//TASK 3 - Once the user clicks on the button ‘Add to cart’ button ‘Remove’ should be added to
//3A - Cart – for each product separately.
test("Checking if 'Remove' button appears in the cart", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const cartPage = new CartPage(page);
    const productName = await productAddTestPage.addRandomMain();
    await productAddTestPage.clickCartButton();
    await expect(cartPage.cartRemoveButtonLocator).toBeVisible();
});

//3B - Products list – to each product card/item.
test("Should check if remove button appears next to the product", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const productName = await productAddTestPage.addRandomMain();
    const removeButtonLocator = productAddTestPage.getRemoveButtonLocator(productName);
    await expect(removeButtonLocator).toBeVisible();
});

//3C c. Product preview page.
test("Should check if remove button appear in product preview page", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const productPreviewPage = new ProductPreviewPage(page);
    const item = await productAddTestPage.randomProductItem();
    await productAddTestPage.clickAddToCartButton(item);
    await productAddTestPage.enterProductPreview(item);
    await expect(productPreviewPage.removeButtonLocator).toBeVisible();
});

//4. 4. If user clicks ‘Remove’ button related item/product should be removed from the cart
test("Should check if remove button appear in product preview page", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const productPreviewPage = new ProductPreviewPage(page);
    const item = await productAddTestPage.randomProductItem();
    await productAddTestPage.clickAddToCartButton(item);
    await productAddTestPage.enterProductPreview(item);
TUTAJ MUSZE WSTAWIC CLIKNIC REMOVE
    await expect(page.locator(productAddTestPage.addToCartButtonLocator)).toBeVisible();
});