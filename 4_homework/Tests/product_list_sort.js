import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test("Login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com.");
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
});
// Task - 1: Check list sorting
test("Default sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  expect(page.locator("#product_sort_container").isVisible())
  expect(productsListPage.isListSortedByName(true)).ToBe(true);
});
test("Reverse name sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.changeList("Name(Z-A)");
  expect(productsListPage.isListSortedByName(false)).ToBe(true);
});
test("Price sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.changeList("Price(low to high)");
  expect(productsListPage.isListSortedByPrice(true)).ToBe(true);
});
test("Reverse price sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.changeList("Price(high to low)");
  expect(productsListPage.isListSortedByPrice(false)).ToBe(true);
});
//Task - 2: Update existing test to verify computer creation workflow with POM
test("Find button", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  expect(page.locator("#btn btn_primary btn_small btn_inventory")).isVisible();
});
test("Test add button", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.pressButton(".add-to-cart-sauce-labs-bike-light");
  expect(page.locator("#btn btn_secondary btn_small btn_inventory")).isVisible();
});
test("Test remove button", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.pressButton(".add-to-cart-sauce-labs-bike-light");
  productsListPage.pressButton(".remove-sauce-labs-bike-light");
  expect(page.locator("#btn btn_primary btn_small btn_inventory")).isVisible();
});
test("Test cart remove", async({page})=>{
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.pressButton(".add-to-cart-sauce-labs-bike-light");
  await productsListPage.pressButton(".shopping_cart_link");
  await productsListPage.pressButton("#remove-sauce-labs-bike-light");
});
test("Test details add", async({page})=>{
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  await productsListPage.pressButton("#item_0_title_link");
  await productsListPage.pressButton("#add-to-cart");
});
test("Test details remove", async({page})=>{
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.login();
  productsListPage.pressButton(".add-to-cart-sauce-labs-bike-light");
  await productsListPage.pressButton("#item_0_title_link");
  await productsListPage.pressButton("#remove");
});
