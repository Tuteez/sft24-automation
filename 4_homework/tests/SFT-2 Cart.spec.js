import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsViewPage } from "../pages/products-view-page";
import { ProductAddTestPage } from "../pages/product-add-test-page";
import { CartPage } from "../pages/cart-page";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.logIn('standard_user', 'secret_sauce');
});

// Add button ‘Add to cart’ to
// A - Products list to each product card/item
test("Testing if each product item on main page has an 'Add to cart' button", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const item = await productAddTestPage.randomProductItem();
    await expect(item.locator(productAddTestPage.addToCartButtonLocator)).toHaveText("Add to cart");
});

// Add button ‘Add to cart’ to
// B - Product preview page.
test("Testing if each product's preview page has an 'Add to cart' button", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const cartPage = new CartPage(page);
    const item = await productAddTestPage.randomProductItem();
    await productAddTestPage.enterProductPreview(item);
    //DWA PYTANIA:
    //Czy asercja ma byc w tescie - wiec jest ale pobiera z kl. ProductAddTestPage selektor
    //Czy jest tak jest ok, to czy selektor mam umieszczac dodatkowo w klasie cartPage?
    //Używam tego selektora takze w metodzie addRandomMain z klasy  
    await expect(page.locator(productAddTestPage.addToCartButtonLocator)).toBeVisible();
});

//Once the user clicks on the button ‘Add to cart’
//one piece of selected swag should be added to the cart.
test("Adding products to cart test", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const cartPage = new CartPage(page)
    const productName = await productAddTestPage.addRandomMain();
    //check if number of items next to cart badge changed to 1
    const isCartValueCorrect = await productAddTestPage.checkCartValue(1);
    expect(isCartValueCorrect).toBe(true);
    //Go to cart page
    await productAddTestPage.clickCartButton();
    //Check if product name from addRandomMain() is present in the cart-page
    await expect(cartPage.inventoryItemName).toHaveText(productName);
});

// Once the user clicks on the button ‘Add to cart’
//button ‘Remove’ should be added to
//A - Cart – for each product separately.
test("Remove button appears in the cart", async ({ page }) => {
    const productAddTestPage = new ProductAddTestPage(page);
    const productName = await productAddTestPage.addRandomMain();
    await productAddTestPage.removeButtonInCart(productName);


});