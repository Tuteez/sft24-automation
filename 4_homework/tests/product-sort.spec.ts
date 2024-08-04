import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { LoginPage } from "../pages/login-page";

// EXAMPLE
// test("<TEST NAME>", async ({ page }) => {

// <TEST CODE>

// });

test("Sorting functionality on Products list", async ({ page }) => {
  const productPage = new ProductsListPage(page);
  const loginPage = new LoginPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  // naviguojam i produktu puslapi
  await page.goto("https://www.saucedemo.com/inventory.html");

  await expect(await productPage.isListSortedByName(true)).toBe(true);

  //nunaviguoti ant (Name A-Z) dropdown
  await page.locator(".product_sort_container").selectOption("az");

  //užtikrinti,kad product name A-Z veikia
  await expect(await productPage.isListSortedByName(true)).toBe(true);

  //Pasirinkti (Name Z-A)
  await page.locator(".product_sort_container").selectOption("za");

  //užtikrinti,kad product name Z-A veikia
  await expect(await productPage.isListSortedByName(false)).toBe(true);

  //Pasirinkti (Price low high)
  await page.locator(".product_sort_container").selectOption("lohi");

  //užtikrinti,kad (Price low high) veikia
  await expect(await productPage.isListSortedByPrice(true)).toBe(true);

  //Pasirinkti (Price low high)
  await page.locator(".product_sort_container").selectOption("hilo");

  //užtikrinti,kad (Price low high) veikia
  await expect(await productPage.isListSortedByPrice(false)).toBe(true);
});

test("Add to cart and removal functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  //#2nd user story. SFT-2 Ability to add swag to cart.
  //Go to https://www.saucedemo.com/inventory.html mane page
  await page.goto("https://www.saucedemo.com/inventory.html");

  //Navigate to burger meniu
  await page.locator("#react-burger-menu-btn").click();

  // Click on "all items"
  await page.locator("#inventory_sidebar_link").click();

  //Navigate to card Click add item to cart
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  expect(
    await page.locator("#add-to-cart-sauce-labs-backpack").isVisible()
  ).toBe(false);

  await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").click();
  expect(
    await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").isVisible()
  ).toBe(false);

  //Check if you can add same item again?
  //Open cart
  await page.locator(".shopping_cart_link").click();

  //Remove button for each product separately
  await expect(page.locator("#remove-sauce-labs-backpack")).toBeVisible();
  await expect(page.locator("#remove-sauce-labs-bolt-t-shirt")).toBeVisible();

  await page.locator("#remove-sauce-labs-bolt-t-shirt").click();
  await expect(
    page.locator("#remove-sauce-labs-bolt-t-shirt")
  ).not.toBeVisible();

  await page.locator(".inventory_item_name").click();

  await expect(page.locator("#remove")).toBeVisible();
  await page.locator("#remove").click();
  await expect(page.locator("#remove")).not.toBeVisible();

  await page.locator(".shopping_cart_link").click();

  await expect(await page.locator(".inventory_item_name")).toHaveCount(0);
});
