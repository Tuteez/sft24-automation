const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/product.page');
const { LoginPage } = require('../pages/login.page');
const env = require('../env'); // Import environment variables

test.describe('Product Sorting Functionality', () => {
    let productPage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await loginPage.navigate();
        await loginPage.login(env.credentials.standardUser.username, env.credentials.standardUser.password); // Use env variables
        await loginPage.assertLoginSuccess();
    });

    test('should sort products by name A to Z', async () => {
        await productPage.sortProducts('az');
        const titles = await productPage.getProductTitles();
        expect(titles).toEqual(titles.slice().sort());
    });

    test('should sort products by name Z to A', async () => {
        await productPage.sortProducts('za');
        const titles = await productPage.getProductTitles();
        expect(titles).toEqual(titles.slice().sort().reverse());
    });

    test('should sort products by price low to high', async () => {
        await productPage.sortProducts('lohi');
        const prices = await productPage.getProductPrices();
        const sortedPrices = prices.slice().sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by price high to low', async () => {
        await productPage.sortProducts('hilo');
        const prices = await productPage.getProductPrices();
        const sortedPrices = prices.slice().sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
        expect(prices).toEqual(sortedPrices);
    });

    test('should display products sorted by name A to Z by default', async () => {
        const titles = await productPage.getProductTitles();
        expect(titles).toEqual(titles.slice().sort());
    });

    test('should have the correct sorting options in the dropdown', async () => {
        const options = await productPage.getSortingOptions();
        expect(options).toEqual(env.sortingOptions); // Use env variable for sorting options
    });
});

