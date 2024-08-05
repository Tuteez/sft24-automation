import { test, expect } from "@playwright/test";
import { UserLogin } from "../pages/user-login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { testData } from "../data/testData";

//#1st user story. SFT-1 Sorting functionality on Products list.

/*
Business value: As a user I want to have the ability to sort products list. This would help to see
the most relevant products at the top of the list and improve user experience.
Applicable user roles: all authenticated system users
Acceptance criteria
1. Add dropdown element with options to sort by on the right top corner of the page.
2. Available options to select from should be:
  a. Name (A to Z).
  b. Name (Z to A).
  c. Price (low to high).
  d. Price (high to low).
3. Products sorting should be performed on option select action.
4. By default, products should be sorted by Name (A to Z).
*/


let userName = "standard_user";
var password = "secret_sauce";
var dropdown1Object = "Name (A to Z)";
var dropdown2Object = "Name (Z to A)";
var dropdown3Object = "Price (low to high)";
var dropdown4Object = "Price (high to low)";

// test.beforeEach( async ({ page }) => {
//   let userLogin = new UserLogin(page);
//   await userLogin.fullLogin(userName, password);
// });

const validUsers = [
  testData.standardUser,
  testData.problemUser,
  testData.performanceGlitchUser,
  testData.errorUser,
  testData.visualUser,
];

test("Verify dropdown element is found in right top corner of the page", async ({
  page,
}) => {
  let productsListPage = new ProductsListPage(page);
  let userLogin = new UserLogin(page);
  await userLogin.fullLogin(testData.standardUser.name, testData.standardUser.password);
  await productsListPage.findRightLeftLocation(testData.locators.productSorting);
});

test.describe("Verify available dropdown options", async () => {
  let productsListPage

  test.beforeEach(async ({ page }) => {
    let userLogin = new UserLogin(page);
    await userLogin.fullLogin(testData.standardUser.name, testData.standardUser.password);
    productsListPage = new ProductsListPage(page);
  });

  testData.sortingOptionValues.forEach((option) => {
    test(`Verify dropdown element has option ${option.dropdownOption}`, async () => {
      await productsListPage.findInDropdownList(option.dropdownOption);
    });
  });
});


validUsers.forEach((user) => {
  test.describe(`Verify products are ordered correctly (${user.name})`, async () => {
    let userLogin;
    let productsListPage;

    test.beforeEach(async ({ page }) => {
      userLogin = new UserLogin(page);
      await userLogin.fullLogin(user.name, user.password);
      productsListPage = new ProductsListPage(page);
    });

    test("Verify default sorting by Name (A to Z)", async () => {
      await productsListPage.verifyListSorting("name", true)
    });

    testData.sortingOptionValues.forEach((option) => {
      test(`Verify sorting by ${option.dropdownOption}`, async () => {
        await productsListPage.selectInDropdownList(option.dropdownOption);
        await productsListPage.verifyListSorting(option.expectedSorting.sortedBy, option.expectedSorting.ascending)
      });
    });
  });
});

test.describe("Verify products are ordered correctly (Problem user)", async () => {
  test.beforeEach(async ({ page }) => {
    userName = "problem_user";
    let userLogin = new UserLogin(page);
    await userLogin.fullLogin(userName, password);
  });

  test("Verify default sorting by Name (A to Z)", async ({ page }) => {
    let productsListPage = new ProductsListPage(page);

    await productsListPage.selectInDropdownList("");
  });

  test("Verify sorting by Name (Z to A)", async ({ page }) => {
    let productsListPage = new ProductsListPage(page);
    await productsListPage.selectInDropdownList(dropdown2Object);
  });

  test("Verify sorting by price (low to high)", async ({ page }) => {
    let productsListPage = new ProductsListPage(page);
    await productsListPage.selectInDropdownList(dropdown3Object);
  });

  test("Verify sorting by price (high to low)", async ({ page }) => {
    let productsListPage = new ProductsListPage(page);
    await productsListPage.selectInDropdownList(dropdown4Object);
  });
});

// test.describe("Verify products are ordered correctly (Performance glitch user)", async () => {
//   test.beforeEach(async ({ page }) => {
//     userName = "performance_glitch_user";
//     let userLogin = new UserLogin(page);
//     await userLogin.fullLogin(userName, password);
//   });

//   test("Verify default sorting by Name (A to Z)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);

//     await productsListPage.selectInDropdownList("");
//   });

//   test("Verify sorting by Name (Z to A)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown2Object);
//   });

//   test("Verify sorting by price (low to high)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown3Object);
//   });

//   test("Verify sorting by price (high to low)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown4Object);
//   });
// });

// test.describe("Verify products are ordered correctly (Error user)", async () => {
//   test.beforeEach(async ({ page }) => {
//     userName = "error_user";
//     let userLogin = new UserLogin(page);
//     await userLogin.fullLogin(userName, password);
//   });

//   test("Verify default sorting by Name (A to Z)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);

//     await productsListPage.selectInDropdownList("");
//   });

//   test("Verify sorting by Name (Z to A)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown2Object);
//   });

//   test("Verify sorting by price (low to high)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown3Object);
//   });

//   test("Verify sorting by price (high to low)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown4Object);
//   });
// });

// test.describe("Verify products are ordered correctly (Visual user)", async () => {
//   test.beforeEach(async ({ page }) => {
//     userName = "visual_user";
//     let userLogin = new UserLogin(page);
//     await userLogin.fullLogin(userName, password);
//   });

//   test("Verify default sorting by Name (A to Z)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);

//     await productsListPage.selectInDropdownList("");
//   });

//   test("Verify sorting by Name (Z to A)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown2Object);
//   });

//   test("Verify sorting by price (low to high)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown3Object);
//   });

//   test("Verify sorting by price (high to low)", async ({ page }) => {
//     let productsListPage = new ProductsListPage(page);
//     await productsListPage.selectInDropdownList(dropdown4Object);
//   });
// });
