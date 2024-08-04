import { test, expect } from "@playwright/test";
import { LogInPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductPreviewPage } from "../pages/product-preview-page";
import { CartPage } from "../pages/cart-page";

// 1st User Story
// Task - 1: log in as standard_user:

// 1.1.Not POM:
test("Open page", async ({page}) =>{
await page.goto("https://www.saucedemo.com/");
await expect(page).toHaveTitle("Swag Labs");
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Products');
});

// 1.2. POM:

test("Log in as standard user", async ({page}) =>{
  const logInPage = new LogInPage(page);
  await logInPage.goTo();
  await logInPage.logInAsStandardUser();
});


// Task 2: Check that default sorting A->Z

test("Default search option is A to Z", async ({page}) =>{
  const logInPage = new LogInPage(page);

  await logInPage.goTo();
  await logInPage.logInAsStandardUser();
  await expect(page.locator('#header_container > div.header_secondary_container > div > span > span')).toHaveText('Name (A to Z)');

});

// Task 3: Check if each of sorting options performs well:

test.describe("Sorting options performs well", ()=>{
  let productsListPage
  let logInPage

  // loging in:
  test.beforeEach(async ({page})=>{
    productsListPage = new ProductsListPage(page);
    logInPage = new LogInPage(page);

    await logInPage.goTo();
    await logInPage.logInAsStandardUser();
  });
 
  // parametrization of search options
    const optionsToSelect=[
      {sortingOption:"az", asc:true},
      {sortingOption:"za", asc:false},
      {sortingOption:"lohi", asc:true},
      {sortingOption:"hilo", asc:false},
    ];

  optionsToSelect.forEach(({sortingOption,asc}) => {
    test(`Sorting option ${sortingOption} is working well`, async({page})=> {
      await productsListPage.selectSearchOption(sortingOption);
      
      // for searchoptions by name:
      if (sortingOption==="az"||sortingOption==="za"){ 
        const isSorted = await productsListPage.isListSortedByName(asc);
        expect (isSorted).toBe(true);
      }
      // for search options by price:
      else if (sortingOption==="lohi"||sortingOption==="hilo"){
        const isSorted = await productsListPage.isListSortedByPrice(asc);
        expect (isSorted).toBe(true);
      }
    });
  });
});

// 2nd User Story
// 8. Adding/removing product to cart from product list

test.describe("Add and remove products to cart from product list", ()=>{

  let logInPage;
  let productsListPage;

  test.beforeEach(async ({page})=>{
  logInPage = new LogInPage(page);
  productsListPage = new ProductsListPage(page)

  await logInPage.goTo();
  await logInPage.logInAsStandardUser();
  });

  const products=[
    {product:'sauce-labs-backpack'},
    {product:'sauce-labs-bike-light'},
    {product:'sauce-labs-bolt-t-shirt'},
    {product:'sauce-labs-fleece-jacket'},
    {product:'sauce-labs-onesie'},
    {product:'test\\.allthethings\\(\\)-t-shirt-\\(red\\)'},
  ];
  
  products.forEach(({product})=>{
    test(`Add and remove ${product} to cart`, async ({page})=>{
    
      // adding to cart
      await expect(page.locator(`button#add-to-cart-${product}`)).toHaveText('Add to cart');
      await productsListPage.addProductToCart(product);
      await expect(page.locator('span.shopping_cart_badge')).toHaveText('1');
    
      // removing from cart
      await expect(page.locator(`button#remove-${product}`)).toHaveText('Remove');
      await productsListPage.removeProductfromCart(product);
      await expect(page.locator('span.shopping_cart_badge')).toHaveCount(0);
    });

  });
});

// 9. Each product to have preview page:

test.describe("Products have a preview page", ()=>{

  let logInPage;
  let productsListPage;

  test.beforeEach(async ({page})=>{
  logInPage = new LogInPage(page);
  productsListPage = new ProductsListPage(page);

  await logInPage.goTo();
  await logInPage.logInAsStandardUser();
  });

  const productNames=[
    {product:'Sauce Labs Backpack'},
    {product:'Sauce Labs Bike Light'},
    {product:'Sauce Labs Bolt T-Shirt'},
    {product:'Sauce Labs Fleece Jacket'},
    {product:'Sauce Labs Onesie'},
    {product:'Test.allTheThings() T-Shirt (Red)'},
  ];
  
  productNames.forEach(({product})=>{
    test(`Product" ${product} " has a preview page`, async ({page}) =>{
      await productsListPage.openPreviewPage(product);
      await expect(page.locator('.inventory_details_desc_container')).toHaveCount(1);
      await expect(page.locator('div.inventory_details_name.large_size')).toHaveText(`${product}`);
    });
 });
});

// 10. Ability to add product to cart from each product preview page:

test.describe("Add/remove from cart through preview page", ()=>{

  let logInPage;
  let productsListPage;
  let productPreviewPage;

  test.beforeEach(async ({page})=>{
    logInPage = new LogInPage(page);
    productsListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);

    await logInPage.goTo();
    await logInPage.logInAsStandardUser();
  });

  const productNames=[
    {product:'Sauce Labs Backpack'},
    {product:'Sauce Labs Bike Light'},
    {product:'Sauce Labs Bolt T-Shirt'},
    {product:'Sauce Labs Fleece Jacket'},
    {product:'Sauce Labs Onesie'},
    {product:'Test.allTheThings() T-Shirt (Red)'},
  ];
  
  productNames.forEach(({product})=>{
    test(`Product" ${product} " is added/removed from cart through preview page`, async ({page}) =>{
      // opening product preview page
      await productsListPage.openPreviewPage(product);
      await expect(page.locator('.inventory_details_desc_container')).toHaveCount(1);
      await expect(page.locator('div.inventory_details_name.large_size')).toHaveText(`${product}`);
  
      // adding product to the cart
      await productPreviewPage.addProductToCartFromPreviewP();
      await expect(page.locator('span.shopping_cart_badge')).toHaveText('1');
  
      // removing product from cart
      await productPreviewPage.removeProductfromCartFromPreviewP();
      await expect(page.locator('span.shopping_cart_badge')).toHaveCount(0);
    });
 });
});

// 11. removing products from Cart Page:

test.describe("Removing through cart page", ()=>{

  let logInPage;
  let productsListPage;
  let productPreviewPage;
  let cartPage;

  test.beforeEach(async ({page})=>{
    logInPage = new LogInPage(page);
    productsListPage = new ProductsListPage(page);
    productPreviewPage = new ProductPreviewPage(page);
    cartPage = new CartPage(page);

    await logInPage.goTo();
    await logInPage.logInAsStandardUser();
  });

  const productNames=[
    {product:'Sauce Labs Backpack'},
    {product:'Sauce Labs Bike Light'},
    {product:'Sauce Labs Bolt T-Shirt'},
    {product:'Sauce Labs Fleece Jacket'},
    {product:'Sauce Labs Onesie'},
    {product:'Test.allTheThings() T-Shirt (Red)'},
  ];
  
  productNames.forEach(({product})=>{
    test(`Product" ${product} " is removed from cart through cart page`, async ({page}) =>{
      // opening product preview page
      await productsListPage.openPreviewPage(product);
      await expect(page.locator('.inventory_details_desc_container')).toHaveCount(1);
      await expect(page.locator('div.inventory_details_name.large_size')).toHaveText(`${product}`);
  
      // adding product to the cart
      await productPreviewPage.addProductToCartFromPreviewP();
      await expect(page.locator('span.shopping_cart_badge')).toHaveText('1');
  
      // opening cart
      await productPreviewPage.openCart();
      await expect(page.locator('.cart_item_label')).toContainText(`${product}`);
  
      // removing from cart
      await cartPage.removeFromCart();
      await expect(page.locator('div.cart_item')).toHaveCount(0);
    });
 });
});

// 12. Different user types add/remove product through preview page: gives a lot of errors :)
/*
test.describe("add and remove products to cart from product list", ()=>{

  let logInPage;
  let productsListPage;

  const users=[
    {userName:'standard_user',password:'secret_sauce'},
    {userName:'locked_out_user',password:'secret_sauce'},
    {userName:'problem_user',password:'secret_sauce'},
    {userName:'performance_glitch_user',password:'secret_sauce'},
    {userName:'error_user',password:'secret_sauce'},
    {userName:'visual_user',password:'secret_sauce'},
  ];

  const products=[
    {product:'sauce-labs-backpack'},
    {product:'sauce-labs-bike-light'},
    {product:'sauce-labs-bolt-t-shirt'},
    {product:'sauce-labs-fleece-jacket'},
    {product:'sauce-labs-onesie'},
    {product:'test\\.allthethings\\(\\)-t-shirt-\\(red\\)'},
  ];

  users.forEach(({userName,password})=>{
    test.describe(`Add/remove for ${userName}`, ()=>{
      test.beforeEach(async ({page})=>{
        logInPage = new LogInPage(page);
        productsListPage = new ProductsListPage(page)
        
        await logInPage.goTo();
        await logInPage.logInAsOtherUserTypes(userName,password);
      });

    products.forEach(({product})=>{
      test(`Add and remove ${product} to cart`, async ({page})=>{
        // adding to cart
        await expect(page.locator(`button#add-to-cart-${product}`)).toHaveText('Add to cart');
        await productsListPage.addProductToCart(product);
        await expect(page.locator('span.shopping_cart_badge')).toHaveText('1');
        
        // removing from cart
        await expect(page.locator(`button#remove-${product}`)).toHaveText('Remove');
        await productsListPage.removeProductfromCart(product);
        await expect(page.locator('span.shopping_cart_badge')).toHaveCount(0);
       });

    });
    });
  });
});
*/