import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';
import { Cart } from '../pages/Cart';


test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.logInAsUser('standard_user', 'secret_sauce');
  });


  test ('Verify adding item to Cart', async ({page})=>{
    let productsListPage = new ProductsListPage(page);

    const productIndex = 0;
    let productName = await productsListPage.getProductNameByIndex(productIndex);
    let productPrice = await productsListPage.getProductPriceByIndex(productIndex);
    
    await productsListPage.clickAddToCartByIndex(productIndex);
    await productsListPage.clickGoToCart();

    let cart = new Cart(page)
    let ItemInCartName = await cart.getItemInCartName();
    expect(ItemInCartName).toBe(productName);

    let ItemInCartPrice = await cart.getItemInCartPrice();
    expect(ItemInCartPrice).toBe(productPrice);

  })


  test ('Verify removing item from Cart', async ({page})=>{
    let productsListPage = new ProductsListPage(page);
    const productIndex = 0;
    await productsListPage.clickAddToCartByIndex(productIndex);
    await productsListPage.clickGoToCart();

    let cart = new Cart(page);
    await cart.removeItemFromCart();

    let cartItemLocator = cart.itemCartItemDiv
    let count = await cartItemLocator.count();
    expect(count).toBe(0);

  })


