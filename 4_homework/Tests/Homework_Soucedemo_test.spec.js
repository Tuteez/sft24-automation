import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test.describe("Sauce Demo Tests", () => {
  let productsList;

  test.beforeEach(async ({ page }) => {
    productsList = new ProductsListPage(page);
    await productsList.goto();
    await productsList.loginToPage("standard_user", "secret_sauce");
  });

  test("Log in to sauce demo page", async ({ page }) => {
    await expect(page).toHaveURL(/inventory\.html$/); // tikrinam, ar prisijungė
  });

  //sorting tests
  test("Verify the sorting dropdown is present", async ({ page }) => {
    const sortDropdown = page.locator(".product_sort_container");
    await expect(sortDropdown).toBeVisible();
  });

  test("Verify default sorting is 'Name (A to Z)'", async ({ page }) => {
    const sortDropdown = page.locator(".product_sort_container");
    await expect(sortDropdown).toHaveValue("az");
    const isSorted = await productsList.isListSortedByName(true);
    expect(isSorted).toBe(true);
  });

  test("Verify sorting by 'Name (A to Z)'", async ({ page }) => {
    const sortDropdown = page.locator('.product_sort_container');
    await sortDropdown.selectOption('az'); // Assuming 'az' is the value for "Name (A to Z)"
    const isSorted = await productsList.isListSortedByName(true);
    expect(isSorted).toBe(true);
  });

  test("Verify sorting by 'Name (Z to A)'", async ({ page }) => {
    const sortDropdown = page.locator('.product_sort_container');
    await sortDropdown.selectOption('za'); 
    const isSorted = await productsList.isListSortedByName(false);
    expect(isSorted).toBe(true);
  });

  test("Verify sorting by 'Price (low to high)'", async ({ page }) => {
    const sortDropdown = page.locator('.product_sort_container');
    await sortDropdown.selectOption('lohi');
    const isSorted = await productsList.isListSortedByPrice(true);
    expect(isSorted).toBe(true);
  });

  test("Verify sorting by 'Price (high to low)'", async ({ page }) => {
    const sortDropdown = page.locator('.product_sort_container');
    await sortDropdown.selectOption('hilo');
    const isSorted = await productsList.isListSortedByPrice(false);
    expect(isSorted).toBe(true);
  });

  //cart tests

  test("Verify 'Add to cart' button is present on each product card", async ({ page }) => {
    const addToCartButtons = await page.locator('.inventory_item .btn_inventory');
    await expect(addToCartButtons).toHaveCount(6); 
    await addToCartButtons.first().click();
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test("Verify 'Add to cart' button on product preview page", async ({ page }) => {
    await page.click('.inventory_item .inventory_item_name');
    const addToCartButton = page.locator('.btn_inventory');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test("Verify 'Remove' button functionality on product card", async ({ page }) => {
    const addToCartButton = await page.locator('.inventory_item .btn_inventory').first();
    await addToCartButton.click();
    const removeButton = await page.locator('.inventory_item .btn_inventory').first();
    await expect(removeButton).toHaveText('Remove');
    await removeButton.click();jjjj
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });

  test("Verify 'Remove' button functionality in cart", async ({ page }) => {
    await productsList.addToCartByIndex(0);
    await productsList.goToCart();
    const removeButton = page.locator('.cart_item .cart_button');
    await expect(removeButton).toHaveText('Remove');
    await removeButton.click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });

  //purchase tests
  test("Verify the ability to complete a purchase", async ({ page }) => {
    await productsList.addToCartByIndex(0);
    await productsList.goToCart();
    await productsList.proceedToCheckout();
    await productsList.fillCheckoutInformation('Labas', 'Krabas', '12345');
    await productsList.finishCheckout();
    const orderConfirmation = await productsList.getOrderConfirmation();
    expect(orderConfirmation).toBe('Thank you for your order!');
  });

  test("Verify error message when checkout information is missing", async ({ page }) => {
    await productsList.addToCartByIndex(0);
    await productsList.goToCart();
    await productsList.proceedToCheckout();
    await productsList.continueCheckoutWithoutInfo();
    const errorMessage = await productsList.getErrorMessage();
    expect(errorMessage).toBe('Error: First Name is required');
  });

  test("Verify the ability to complete a purchase with multiple products", async ({ page }) => {
    await productsList.addToCartByIndex(0);
    await productsList.addToCartByIndex(1);
    await productsList.goToCart();
    await productsList.proceedToCheckout();
    await productsList.fillCheckoutInformation('Labas', 'Krabas', '12345');
    await productsList.finishCheckout();
    const orderConfirmation = await productsList.getOrderConfirmation();
    expect(orderConfirmation).toBe('Thank you for your order!');
  });

  test("Verify correct products are displayed during checkout process", async ({ page }) => {
    const productName = await page.locator('.inventory_item .inventory_item_name').first().textContent();
    await productsList.addToCartByIndex(0);
    await productsList.goToCart();
    const cartProductName = await page.locator('.cart_item .inventory_item_name').textContent();
    expect(cartProductName).toBe(productName);
  });

  //additional
  test("Verify user remains logged in when navigating between pages", async ({ page }) => {
    await productsList.addToCartByIndex(0);
    await page.click('.shopping_cart_link');
    await page.goto('https://www.saucedemo.com/inventory.html');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

});
