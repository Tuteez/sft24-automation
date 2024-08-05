import { test, expect } from "@playwright/test";
import { LogInPage } from "../pages/log-in-page";
import { UserData } from "../test-data/user-data";
//Log in to page
test ("Log In to website", async ({ page }) => {
    let logInPage = new LogInPage (page);
    let userData =  new UserData (
        "standard_user",
        "secret_sauce"
    );

    await logInPage.goto();
    await logInPage.logIn(userData);
});
test ("Log In to website - 2", async ({ page }) => {
    let logInPage = new LogInPage (page);
    
    await logInPage.enterWebsite();

});