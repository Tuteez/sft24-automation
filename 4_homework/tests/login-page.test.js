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
            test(` ${user.name} should be able to log in Successfully`, async () => {
              await loginPage.login(user.name, user.password);
              await productListPage.validateLogin(testData.productPageTextValidation);
            });
        });
    });

    test.describe("Verify unsuccessful logins attempts", async () => {
        test("Locked out user should fail logging in", async () => {
            await loginPage.login(testData.lockedOutUser.name, testData.lockedOutUser.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.lockedOutUserErrorMessage);
        });

        test("User with invalid credentials should fail logging in", async () => {
            await loginPage.login(testData.invalidUser.name, testData.invalidUser.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.loginErrorMessage);
        });
        
        test("User with empty username input should fail logging in", async () => {
            await loginPage.login(testData.emptyUser.name, testData.emptyUser.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.emptyBodyLoginErrorMessage);
        });

        test("User with empty password input should fail logging in", async () => {
            await loginPage.login(testData.emptyPassword.name, testData.emptyPassword.password);
            await loginPage.validateLoginErrorMessage(testData.errorMessages.emptypasswordLoginErrorMessage);
        });
    });
});