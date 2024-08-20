import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsListPage} from '../pages/products-list-page';
import { Cart } from '../pages/Cart';
import users from '../pages/LoginUsers';

users.forEach((user) => {
  test.describe(`Tests for ${user.username}`, () => {
    test.beforeEach(async ({ page }) => {
      console.log(`Running tests for user: ${user.username}`);
      const loginPage = new LoginPage(page);
      await loginPage.logInAsUser(user.username, user.password);
    });


  test ('Verify if correct item was added to cart', async ({page})=>{
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

  test ('Verify if one item was added to cart', async ({page})=>{
    let productsListPage = new ProductsListPage(page);
    const productIndex = 0;
    await productsListPage.clickAddToCartByIndex(productIndex);
    await productsListPage.clickGoToCart();

    let cart = new Cart(page)
    let ItemInCartCount = await cart.getItemsCount();
    expect(ItemInCartCount).toBe(1);
  })


  test ('Verify if removing item from Cart works', async ({page})=>{
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
  })
})

