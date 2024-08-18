
import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';



test.beforeEach(async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.logInAsUser('standard_user', 'secret_sauce');
});


test('Sort products by name in ascending order', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.selectSortAction('az');
  let isSortedAz = await productsListPage.isListSortedByName(true);
  expect(isSortedAz).toBe(true);

  await productsListPage.selectSortAction('za');
  let isSortedZa = await productsListPage.isListSortedByName(false);
  expect(isSortedZa).toBe(true);

  await productsListPage.selectSortAction('lohi');
  let isSortedLohi = await productsListPage.isListSortedByPrice(true);
  expect(isSortedLohi).toBe(true);

  await productsListPage.selectSortAction('hilo');
  let isSortedHilo = await productsListPage.isListSortedByPrice(false);
  expect(isSortedHilo).toBe(true);
});
