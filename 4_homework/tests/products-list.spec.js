// tests/products-list.spec.js
import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';

test("Login to the page", async({page}) =>{
  let loginPage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});


test('should sort products by name in ascending order', async ({ page }) => {
  let loginPage = new LoginPage(page);
  let productsListPage = new ProductsListPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  

  await productsListPage.selectSortAction('az');
  let isSorted = await productsListPage.isListSortedByName(true);
  expect(isSorted).toBe(true);
});
