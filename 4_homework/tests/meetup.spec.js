import { test, expect } from "@playwright/test";
import { LogInPage } from "../pages/logInPage2";
import { ProductsListPage } from "../pages/products-list-page";

test ("Log In to website", async ({ page }) => {
    let logInPage = new LogInPage(page);
    let productstListPage = new ProductsListPage(page);
    //await this.page.goto("https://www.saucedemo.com/");
    
    logInPage.openPage();
    //await expect(page).toHaveTitle("Swag Labs");
    await logInPage.fillUserNameAndPassword();
    await logInPage.logInButton.click();


    let isSortedByName = await productstListPage.isListSortedByName(true);
    expect(isSortedByName).toBe(true);

});