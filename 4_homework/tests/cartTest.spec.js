import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { productsListPage } from "../pages/ProductsListPage";
import { productPage } from "../pages/productPage";
import { cartPage } from "../pages/cartPage";
test ('Login Page', async(page) =>{

    // Login
    const login = new loginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user','secret_sauce');
})
test("Store Page", async(page)=>{
    // Store page
    const addCart = new productsListPage(page);
//add to cart
        await addCart.addToCart;
        await expect(badgeElement).toHaveText('1');
//remove from cart
        await gotoProductsPage;
        await removeFromCart;
        await expect(badgeElement).toBeHidden();
})
test ('Product Page',async(page)=>{
    // Product page
    const addCart = new productPage(page);
        await gotoProductsPage;
//add to cart
        await addCart.addToCart;
        await expect(badgeElement).toHaveText('1');
//remove from cart
        await gotoProductsPage;
        await addCart.removeFromCart;
        await expect(badgeElement).toBeHidden();
})

    // Cart
test ('Cart Page',async(page)=>{
    const cart = new cartPage(page);
    const main = productsListPage(page);
    //add to cart
        await main.gotoProductsPage;
        await main.addToCart;
        await expect(badgeElement).toHaveText('1');
//remove from cart
        await cart.goToCart;
        await cart.removeFromCart
        await expect(badgeElement).toBeHidden();
})