import { test, expect, ba } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";

test.describe("SFT-1 Sorting functionality on Products list.", () => {
  const loginData = [
    { userName: "standard_user", password: "secret_sauce" },
    { userName: "problem_user", password: "secret_sauce" },
  ];

  loginData.forEach(({ userName, password }) => {
    let loginPage;
    let productsListPage;
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productsListPage = new ProductsListPage(page);

      await page.goto("/");
      await loginPage.login(userName, password);
      expect(page).toHaveURL(/inventory.html/);
    });

    test(`Check if sorting button exists for user: ${userName}`, async ({
      page,
    }) => {
      await page.goto("/inventory.html");
      await expect(productsListPage.sortingButton).toBeVisible();

      await page.close();
    });
  });
});
