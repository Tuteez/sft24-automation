import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';
import { Cart } from '../pages/Cart';


  test ('Verify adding item to Cart', async ({page})=>{
    let loginPage = new LoginPage(page);
    let productsListPage = new ProductsListPage(page);
    let cart = new Cart(page)
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    //Add product to Cart and go to Cart
    await productsListPage.clickAddToCart();
    await productsListPage.clickGoToCart();

    //Verify if item in the cart is correct by checking item name
    let ItemInCartName = await cart.getItemInCartName();
    expect(ItemInCartName).toBe("Sauce Labs Backpack");

    //Verify if item in the cart is correct by checking item price
    let ItemInCartPrice = await cart.getItemInCartPrice();
    expect(ItemInCartPrice).toBe("$29.99");

  })


  test ('Verify removing item from Cart', async ({page})=>{
    let loginPage = new LoginPage(page);
    let productsListPage = new ProductsListPage(page);
    let cart = new Cart(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    //Add product to Cart and go to Cart
    await productsListPage.clickAddToCart();
    await productsListPage.clickGoToCart();



    //Remove item from cart
    await cart.removeItemFromCart();

    //Verify if item was removed
    const cartItemLocator = cart.itemCartItemDiv
    const count = await cartItemLocator.count();
    expect(count).toBe(0);


  })