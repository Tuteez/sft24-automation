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

test('Sort products by name in descending order', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.selectSortAction('za');
  let isSorted = await productsListPage.isListSortedByName(false);
  expect(isSorted).toBe(true);
});
test('Sort products by price in ascending order', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.selectSortAction('lohi');
  let isSorted = await productsListPage.isListSortedByPrice(true);
  expect(isSorted).toBe(true);
});
test('Sort products by price in descending order', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.selectSortAction('hilo');
  let isSorted = await productsListPage.isListSortedByPrice(false);
  expect(isSorted).toBe(true);
});
