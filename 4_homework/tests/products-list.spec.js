// tests/products-list.spec.js
import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';

test.beforeEach(async ({ page }) => {
  let loginPage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('should sort products by name in ascending order', async ({ page }) => {
  const productsListPage = new ProductsListPage(page);
  await productsListPage.sortProductsBy('az');
  const isSorted = await productsListPage.isListSortedByName(true);
  expect(isSorted).toBe(true);
});

test('should sort products by name in descending order', async ({ page }) => {
  const productsListPage = new ProductsListPage(page);
  await productsListPage.sortProductsBy('za');
  const isSorted = await productsListPage.isListSortedByName(false);
  expect(isSorted).toBe(true);
});

test('should sort products by price in ascending order', async ({ page }) => {
  const productsListPage = new ProductsListPage(page);
  await productsListPage.sortProductsBy('lohi');
  const isSorted = await productsListPage.isListSortedByPrice(true);
  expect(isSorted).toBe(true);
});

test('should sort products by price in descending order', async ({ page }) => {
  const productsListPage = new ProductsListPage(page);
  await productsListPage.sortProductsBy('hilo');
  const isSorted = await productsListPage.isListSortedByPrice(false);
  expect(isSorted).toBe(true);
});

