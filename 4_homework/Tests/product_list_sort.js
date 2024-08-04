import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test("Login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com.");
  let productsListPage = new ProductsListPage(page);
  await productsListPage.fillLogin("standard_user");
  await productsListPage.fillPassword();
  await productsListPage.login();
});
// Task - 1: Check list sorting
test("Default sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  expect(page.locator("#product_sort_container").toContainText("Name(A-Z)"))
  expect(productsListPage.isListSortedByName(true)).ToBe(true);
});
test("Reverse name sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  productsListPage.changeList("Name(Z-A)");
  expect(productsListPage.isListSortedByName(false)).ToBe(true);
});
test("Price sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  productsListPage.changeList("Price(low to high)");
  expect(productsListPage.isListSortedByPrice(true)).ToBe(true);
});
test("Reverse price sort", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  productsListPage.changeList("Price(high to low)");
  expect(productsListPage.isListSortedByPrice(false)).ToBe(true);
});
//Task - 2: Update existing test to verify computer creation workflow with POM
test("Sort by name", async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto();
  await productsListPage.openNewComputerCreationPage();
});
