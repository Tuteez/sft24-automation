import { LoginPage } from "../pages/login-page";
import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";


test.describe("Verify sort product list feature with login (beforeEach) and parameterized data", async () => {
  let loginPage;
  

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
  });

  [
    { sortBy: 'Name', asc: true },
    { sortBy: 'Name', asc: false },
    { sortBy: 'Price', asc: true },
    { sortBy: 'Price', asc: false },
  ].forEach(({ sortBy, asc }) => {
    test(`sort by ${sortBy} in  ${asc ? 'asc' : 'desc'}`, async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
     await productsListPage.sortBy(sortBy, asc);
    });
  });
  
});

  