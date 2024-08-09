import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
test ('Login Successful', async(page) =>{
  
    const login = new loginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user','secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})
test ('Login Failed', async(page) =>{
  
    const login = new loginPage(page);
        await login.gotoLoginPage();
        await login.login('TrainsGuy','Locomotive');
        await expect(await page.locator('.error-message-container.error h3')).toContainText('Epic sadface:');
    }
);