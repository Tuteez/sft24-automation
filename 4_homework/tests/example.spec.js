// @ts-check
import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductsListPageFour } from "../pages/products-list-page-four";
import { ProductsListPageCart } from "../pages/products-list-page-cart";

test('Login', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 



})



  
  //Check if dropdown element exist and has options
test('Dropdown element has options', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  expect (await productsListPage.dropdownHasFourOptions()).toBe(4);
  const expectedOptions = [
    'Name (A to Z)',
    'Name (Z to A)',
    'Price (low to high)',
    'Price (high to low)']

    const actualOptions = await productsListPage.getDropdownOptions();
  
    // Check if all expected options are present in the dropdown
    expectedOptions.forEach(option => {
      expect(actualOptions).toContain(option);
    })
  
})

 //Check if dropdown element works with Name (Z to A)
 test('Dropdown element Name (Z to A) exists', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.elementExist_ZA();
  expect (await productsListPage.isListSortedByName(false)).toBe (true);
  
 
})
  
 //Check if dropdown element works with Price (low to high)
 test('Dropdown element Price (low to high) exists', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.elementExist_asc()
  expect (await productsListPage.isListSortedByPrice(true)).toBe (true);
})

//Check if dropdown element works with Price (high to low)
test('Dropdown element Price  (high to low) exists', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.elementExist_desc();
  expect (await productsListPage.isListSortedByPrice(false)).toBe (true);
  
 
})

//Checkif by default, products should be sorted by Name (A to Z)
test('By default, products should be sorted by Name (A to Z)', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.elementActive() 

  expect (await productsListPage.isListSorted(['Sauce Labs Backpack', 'Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie'],true)).toBe (true);
})


//Add button ‘Add to cart’ to following system places:
//a. Products list – to each product card/item.

test('Each product has Add to cart button', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.elementActive()
  expect (await productsListPage.itemsContainAddToCart()).toBe(true);

})

//b. Product preview page clicking on title

test('Product preview page has Add to cart button through title', async ({ page }) => {
  let productsListPageFour = new ProductsListPageFour(page);
  await productsListPageFour.goto(); 
  await productsListPageFour.login(); 
  await productsListPageFour.previewPageTitle();



})

 // Product preview page clicking on image

 test('Product preview page has Add to cart button through image', async ({ page }) => {
  let productsListPageFour = new ProductsListPageFour(page);
  await productsListPageFour.goto(); 
  await productsListPageFour.login(); 
  await productsListPageFour.previewPageImage();
})
//Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be 
//added to the cart. (There is no possibility to add more than one).
test('Once Add to cart is clicked red marker shows up near cart(1)', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.addToCart();
  expect( await productsListPage.getCartItemCountOne()).toBe(1)
})
//Adding all items to the cart
test('Once Add to cart is clicked on all 6 items, items show up in cart', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  expect (await productsListPage.addToCartAll()).toBe(6);

})
/*If there is at least one product added to the cart, button ‘Remove’ should be added to 
following places:
*/
//a. Cart – for each product separately.

test('Each product the cart has Remove button', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  let productsListPageCart = new ProductsListPageCart(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  await productsListPage.addToCartAll();
  await productsListPageCart.clickOnCart();
  
  expect (await productsListPageCart.itemsContainRemove()).toBe(true)
 ;
  

})


//b. Products list – to each product card/item.
test('Each product in the list has Remove button', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  await productsListPage.goto(); 
  await productsListPage.login(); 
  expect (await productsListPage.addToCartAll()).toBe(6);
  expect (await productsListPage.itemsContainRemove()).toBe(true);
  


})


//c. Product preview page has remove button
test('Once Add to cart clicked Remove button shows up', async ({ page }) => {
  let productsListPageFour = new ProductsListPageFour(page);
  await productsListPageFour.goto(); 
  await productsListPageFour.login(); 
  await productsListPageFour.previewPageTitle();
  await productsListPageFour.addToCart()

 

})

// If user clicks ‘Remove’ button related item/product should be removed from the cart in the cart page
test('Remove button related item/product should be removed from the cart in the cart page', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);
  let productsListPageCart = new ProductsListPageCart(page);
  await productsListPage.goto(); 
  await productsListPage.login();
  await productsListPage.addToCart();
  await productsListPageCart.clickOnCart();
  await productsListPageCart.ClickOnRemove();
  expect(await productsListPageCart.isRemoveButtonVisible()).toBe(false);
 
  


})

// If user clicks ‘Remove’ button related item/product should be removed from the cart in the list page
test('Remove button related item/product should be removed from the cart in the list page', async ({ page }) => {
  let productsListPage = new ProductsListPage(page);

  await productsListPage.goto(); 
  await productsListPage.login();
  await productsListPage.addToCart();
  await productsListPage.clickSpecificItemRemove();
  expect(await productsListPage.isRemoveButtonVisible()).toBe(false);


 
  
  


})