import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page"

const loginData = [
    { userName: 'standard_user', password: 'secret_sauce' },
    { userName: 'problem_user', password: 'secret_sauce' }
];

test("sss", () => {})
      
loginData.forEach(async ({ userName, password }) => {
   // test.describe('SFT-1 Sorting functionality on Products list.', () => { 
        let loginPage;
        let productsListPage;
        test.beforeEach('Login', async ({ page }) => {
            loginPage = new LoginPage(page)
            productsListPage = new ProductsListPage(page);

            await loginPage.goto('/');
            await loginPage.login(userName, password);
            expect(page).toHaveURL('/inventory.html');
        })
        test.afterEach(async () => {
            await page.close();
        });
        test("Check if sorting button exists",async ({ page }) => {
            await page.goto('/inventory.html');
            expect(productsListPage.sortingButton).toBeVisible();
          });
        
  //  });
    

});