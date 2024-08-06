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

      await page.goto("/");
      await loginPage.login(userName, password);
      expect(page).toHaveURL(/inventory.html/);
    });

    test(`Check if sorting button exists for user: ${userName}`, async ({
      page,
    }) => {
      //Checks if the element exists on the secondary Header on the right side
      expect(await productsListPage.sortingElementLocationIsCorrect());
      await expect(productsListPage.sortingElement).toBeVisible();
    });
    test(`Check if by default, products are sorted by Name (A to Z) for user: ${userName}`, async ({
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
      await productsListPage.sortingElement.selectOption("az");
      expect(await productsListPage.isListSortedByName(true)).toEqual(true);
    });
    test(`Check if sorting option is Z-A sorts correctly for user: ${userName}`, async ({}) => {
      await productsListPage.sortingElement.selectOption("za");

      expect(await productsListPage.isListSortedByName(false)).toEqual(true);
    });
    test(`Check if sorting option is Price hight to low sorts correctly for user: ${userName}`, async ({
      page,
    }) => {
      await productsListPage.sortingElement.selectOption("hilo");
      expect(await productsListPage.isListSortedByPrice(false)).toEqual(true);
    });
    test(`Check if sorting option is Price low to high sorts correctly for user: ${userName}`, async ({
      page,
    }) => {
      await productsListPage.sortingElement.selectOption("lohi");
      const sortingIsCorrect = await productsListPage.isListSortedByPrice(true);
      expect(sortingIsCorrect).toEqual(true);
    });
  });
});
