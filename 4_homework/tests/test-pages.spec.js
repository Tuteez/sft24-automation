import { test, expect } from '@playwright/test';
import { ProductsListPage } from '../pages/products-list-page';




const usernames = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user'
];

usernames.forEach(username => {
  test.describe(`Tests for ${username}`, () => {
    let productsListPage;

    test.beforeEach(async ({ page }) => {
      productsListPage = new ProductsListPage(page);
      await productsListPage.goto();
      await productsListPage.logIn(username);
      await productsListPage.verifyLogin();
    });

test("Check dropdown menu options", async () => {
  const expectedOptions = [
    { value: 'az', text: 'Name (A to Z)' },
    { value: 'za', text: 'Name (Z to A)' },
    { value: 'lohi', text: 'Price (low to high)' },
    { value: 'hilo', text: 'Price (high to low)' }
  ];
  await productsListPage.verifyDropdownOptions(expectedOptions);
})

test("Check A-Z sorting", async ({ page }) => {
  await productsListPage.selectSortOption('az');
  const isSorted = await productsListPage.isListSortedByName(true); // true for ascending
  console.log('Is sorted by name (A-Z):', isSorted);
  expect(isSorted).toBe(true);
});

test("Check Z-A sorting", async ({ page }) => {
  await productsListPage.selectSortOption('za');

  const isSorted = await productsListPage.isListSortedByName(false); // false for descending
  console.log('Is sorted by name (Z-A):', isSorted);
  expect(isSorted).toBe(true);
});
test("Check ascending price sorting", async ({ page }) => {
  await productsListPage.selectSortOption('lohi');
  const isSorted = await productsListPage.isListSortedByPrice(true); // true for ascending
  console.log('Is sorted by price (low-high):', isSorted);
  expect(isSorted).toBe(true);

});

test("Check descending price sorting", async ({ page }) => {
  await productsListPage.selectSortOption('hilo');
  const isSorted = await productsListPage.isListSortedByPrice(false); // false for desc
  console.log('Is sorted by price (high-low):', isSorted);
  expect(isSorted).toBe(true);

});

test('Check default A-Z sorting', async ({ page }) => {
  const isSorted = await productsListPage.isListSortedByName(true); // true for ascending order
  console.log('Is sorted by name (A-Z):', isSorted);
  expect(isSorted).toBe(true);
});

// end of 1st user story


test('Add product to cart from Products List page', async ({ page }) => {
await productsListPage.addToCart(0);
await productsListPage.validateProductCountInCart(1);
const actualCount = await productsListPage.retrieveCartItemCounter();
console.log("Items in cart:", actualCount);

});

test('Add to cart from product page', async ({ page }) => {
  await productsListPage.selectFirstItem();
  await productsListPage.validateItemSelection();
  await productsListPage.addToCart(0);
  await productsListPage.validateProductCountInCart(1);
const actualCount = await productsListPage.retrieveCartItemCounter();
console.log("Items in cart:", actualCount);
});

test('Verify remove button presence', async ({ page }) => {
await productsListPage.addToCart(0);
await productsListPage.checkRemoveButton(0);
});

test('Verify remove button presence from product page', async ({ page }) => {
await productsListPage.selectFirstItem();
await productsListPage.validateItemSelection();
await productsListPage.addToCart(0);
await productsListPage.validateProductCountInCart(1);
await productsListPage.checkRemoveButton(0);
});

test('Verify remove button presence from cart', async ({ page }) => {

await productsListPage.addToCart(0);
await productsListPage.addToCart(1);
await productsListPage.validateProductCountInCart(2);
await productsListPage.enterCart();
await productsListPage.checkRemoveButton(0);
await productsListPage.checkRemoveButton(1);
});

test('Verify remove button functionality', async ({ page }) => {
await productsListPage.addToCart(0);
await productsListPage.validateProductCountInCart(1);
await productsListPage.clickRemoveButton(0);
await productsListPage.validateProductCountInCart(0);
});

test('Verify remove button functionality from product page', async ({ page }) => {
  await productsListPage.selectFirstItem();
  await productsListPage.validateItemSelection();
  await productsListPage.addToCart(0);
  await productsListPage.validateProductCountInCart(1);
  await productsListPage.clickRemoveButton(0);
  await productsListPage.validateProductCountInCart(0);
});

test('Verify remove button functionality from cart', async ({ page }) => {
  await productsListPage.addToCart(0);
  await productsListPage.addToCart(1);
  await productsListPage.validateProductCountInCart(2);
  await productsListPage.enterCart();
  await productsListPage.clickRemoveButton(0);
  await productsListPage.validateProductCountInCart(1);
  await productsListPage.clickRemoveButton(0);
  await productsListPage.validateProductCountInCart(0);


});

  });});












