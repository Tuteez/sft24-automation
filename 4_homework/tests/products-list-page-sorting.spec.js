import { test, expect, ba } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";

test.describe("SFT-1 Sorting functionality on Products list check.", async () => {
  const loginData = [
    { userName: "standard_user", password: "secret_sauce" },
    //{ userName: "problem_user", password: "secret_sauce" },
  ];

  loginData.forEach(({ userName, password }) => {
    let loginPage;
    let productsListPage;
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);

      productsListPage = new ProductsListPage(page);

      console.log(productsListPage);

      await page.goto("/");
      await loginPage.login(userName, password);
      await page.goto("https://www.saucedemo.com/inventory.html");
    });

    test(`Check if sorting button exists for user: ${userName}`, async ({
      page,
    }) => {
      //Checks if the element exists on the secondary Header on the right side
      expect(
        await productsListPage.sortingButtonLocationIsCorrect()
      ).toBeTruthy();
      await expect(productsListPage.sortingButton).toBeVisible();
    });
    test(`Check available sorting options for user: ${userName}`, async ({
      page,
    }) => {
      //did not work, otherwise beVisible() should have been used
      await productsListPage.clickSortingButton();
      expect(await productsListPage.sortingOptionAZ).toBeTruthy();
      expect(await productsListPage.sortingOptionZA).toBeTruthy();
      expect(await productsListPage.sortingOptionLoHi).toBeTruthy();
      expect(await productsListPage.sortingOptionHiLo).toBeTruthy();
    });
    test(`By default, products should be sorted by Name (A to Z) for user: ${userName}`, async ({
      page,
    }) => {
      expect(await productsListPage.getActiveOptionText()).toEqual(
        "Name (A to Z)"
      );
      expect(await productsListPage.isListSortedByName()).toEqual(true);
    });
    test(`Check if sorting option is A-Z sorts correctly for user: ${userName}`, async ({
      page,
    }) => {
      await productsListPage.sortingButton.selectOption("az");
      expect(await productsListPage.isListSortedByName(true)).toBe(true);
    });
    test(`Check if sorting option is Z-A sorts correctly for user: ${userName}`, async ({
      page,
    }) => {
      await productsListPage.sortingButton.selectOption("za");

      await expect(
        await productsListPage.isListSortedByName(false)
      ).toBeTruthy();
    });
    test(`Check if sorting option is Price hight to low sorts correctly for user: ${userName}`, async ({
      page,
    }) => {
      await productsListPage.sortingButton.selectOption("hilo");
      await expect(
        await productsListPage.isListSortedByPrice(false)
      ).toBeTruthy();
    });
    test(`Check if sorting option is Price low to high sorts correctly for user: ${userName}`, async ({
      page,
    }) => {
      await productsListPage.sortingButton.selectOption("lohi");
      var sortingIsCorrect = await productsListPage.isListSortedByPrice(true);
      expect(sortingIsCorrect).toBeTruthy();
    });
  });
});
