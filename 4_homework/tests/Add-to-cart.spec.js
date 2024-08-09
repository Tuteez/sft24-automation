import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';
import { Cart } from '../pages/Cart';


test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.logInAsUser('standard_user', 'secret_sauce');
  });


  test ('Verify adding item to Cart', async ({page})=>{
    //Add product to Cart and go to Cart
    let productsListPage = new ProductsListPage(page);
    await productsListPage.clickAddToCart();
    await productsListPage.clickGoToCart();

    //Verify if item in the cart is correct by checking item name
    let cart = new Cart(page)
    let ItemInCartName = await cart.getItemInCartName();
    expect(ItemInCartName).toBe("Sauce Labs Backpack");

    //Verify if item in the cart is correct by checking item price
    let ItemInCartPrice = await cart.getItemInCartPrice();
    expect(ItemInCartPrice).toBe("$29.99");

  })


  test ('Verify removing item from Cart', async ({page})=>{
    //Add product to Cart and go to Cart
    let productsListPage = new ProductsListPage(page);
    await productsListPage.clickAddToCart();
    await productsListPage.clickGoToCart();

    //Remove item from cart
    let cart = new Cart(page);
    await cart.removeItemFromCart();

    //Verify if item was removed
    let cartItemLocator = cart.itemCartItemDiv
    let count = await cartItemLocator.count();
    expect(count).toBe(0);

  })

  /*I know that I could optimize the performance 
  of the code through additional work, but due to time constraints, 
  I had to leave it as is */