import { test } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { LoginPage } from "../pages/login-page";

import { testData } from "../data/testData";

const validUsers = [
    testData.standardUser,
    testData.problemUser,
    testData.performanceGlitchUser,
    testData.errorUser,
    testData.visualUser,
];

test.describe("SauceDemo webpage login testing", async () => {
    let loginPage;
    let productListPage;
  
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productListPage = new ProductsListPage(page);
      await loginPage.goToLoginPage();
    });

    validUsers.forEach(user => {
        test.describe("Validate successfull logins", async () => {
            test(`Validate ${user.name} logging in Successfully`, async () => {
              await loginPage.login(user.name, user.password);
              await productListPage.validateLogin(testData.productPageTextValidation);
            });
        });
    });

    test.describe("Validate unsuccessful logins", async () => {
        test("Validate locked out user FAILING logging in", async () => {
            await loginPage.login(testData.lockedOutUser.name, testData.lockedOutUser.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.lockedOutUserErrorMessage);
        });

        test("Validate invalid user FAILING log in ", async () => {
            await loginPage.login(testData.invalidUser.name, testData.invalidUser.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.loginErrorMessage);
        });
        
        test("Validate empty user FAILING to log in", async () => {
            await loginPage.login(testData.emptyUser.name, testData.emptyUser.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.emptyBodyLoginErrorMessage);
        });

        test("Validate empty password FAILING to log in", async () => {
            await loginPage.login(testData.emptyPassword.name, testData.emptyPassword.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.emptypasswordLoginErrorMessage);
        });
    });
});