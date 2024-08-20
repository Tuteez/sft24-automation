import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsListPage } from "../pages/products-list-page";
import users from "../pages/LoginUsers";

users.forEach((user) => {
    test.describe(`Tests for ${user.username}`, () => {
      test.beforeEach(async ({ page }) => {
        console.log(`Running tests for user: ${user.username}`);
        const loginPage = new LoginPage(page);
        await loginPage.logInAsUser(user.username, user.password);
      });
  
      test(('Sort products by name in ascending order'), async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectSortAction("az");
        const isSorted = await productsListPage.isListSortedByName(true);
        expect(isSorted).toBe(true);
      });
  
      test('Sort products by name in descending order', async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectSortAction("za");
        const isSorted = await productsListPage.isListSortedByName(false);
        expect(isSorted).toBe(true);
      });
      test('Sort products by price in ascending order', async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectSortAction("lohi");
        const isSorted = await productsListPage.isListSortedByPrice(true);
        expect(isSorted).toBe(true);
      });
      test('Sort products by price in descending order', async ({ page }) => {
        const productsListPage = new ProductsListPage(page);
        await productsListPage.selectSortAction("hilo");
        const isSorted = await productsListPage.isListSortedByPrice(false);
        expect(isSorted).toBe(true);
      })
    })
  });
