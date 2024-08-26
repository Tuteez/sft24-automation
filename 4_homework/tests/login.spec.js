const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const env = require('../env'); // Import environment variables

test.describe('Sauce Demo Login Tests', () => {
    let loginPage;  // Define the variable outside

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  // Assign it in beforeEach
        await loginPage.navigate();
    });

    test('Successful login with valid credentials', async ({ page }) => {
        await loginPage.login(env.credentials.standardUser.username, env.credentials.standardUser.password);  // Use env variables
        await loginPage.assertLoginSuccess();
    });

    test('Failed login with invalid credentials', async ({ page }) => {
        await loginPage.login('invalid_user', 'invalid_password');  // Using hardcoded invalid credentials
        await loginPage.assertLoginFailure();
    });
});

