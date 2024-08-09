import { test } from "@playwright/test";
import { UserLogin } from "../pages/user-login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { testData } from "../data/testData";

const validUsers = [
  testData.standardUser,
  // testData.problemUser,
  // testData.performanceGlitchUser,
  // testData.errorUser,
  // testData.visualUser,
];

validUsers.forEach((user) => {
  let productsListPage;
  let userLogin;
  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    userLogin = new UserLogin(page);
    await userLogin.fillInLogin(user.name, user.password);
  });
  test.describe("Verify dropdown element is found in right top corner of the page", async () => {
    test(`Verify dropdown element is found in right top corner of the page (${user.name})`, async ({ page }) => {
      let productsListPage = new ProductsListPage(page);
      let userLogin = new UserLogin(page);
      await userLogin.fillInLogin(user.name, user.password);
      await productsListPage.findRightLeftLocation(testData.locators.productSorting);
    });
  });
  test.describe("Verify available dropdown options", async () => {

    testData.sortingOptionValues.forEach((option) => {
      test(`Verify dropdown element has option ${option.dropdownOption} (${user.name})`, async () => {
        await productsListPage.findInDropdownList(option.dropdownOption);
      });
    });
  });

  test.describe(`Verify products are ordered correctly (${user.name})`, async () => {

    test(`Verify default sorting by Name (A to Z) (${user.name})`, async () => {
      await productsListPage.verifyListSorting("name", true)
    });

    testData.sortingOptionValues.forEach((option) => {
      test(`Verify sorting by ${option.dropdownOption} (${user.name})`, async () => {
        await productsListPage.selectInDropdownList(option.dropdownOption);
        await productsListPage.verifyListSorting(option.expectedSorting.sortedBy, option.expectedSorting.ascending)
      });
    });
  });
});