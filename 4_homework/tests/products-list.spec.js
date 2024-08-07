// tests/products-list.spec.js
import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';



test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logInAsUser('standard_user', 'secret_sauce');
});


test('Sort products by name in ascending order', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.selectSortAction('az');
  let isSorted = await productsListPage.isListSortedByName(true);
  expect(isSorted).toBe(true);
});
