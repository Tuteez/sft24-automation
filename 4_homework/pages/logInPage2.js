import { expect } from "@playwright/test";
export class LogInPage {
    constructor(page){
        this.page = page;
        this.userNameInput = page.locator('input[data-test="username"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.logInButton = page.locator('input[data-test="login-button"]');
    }
    async openPage(){
        await this.page.goto("https://www.saucedemo.com/");;
       /* await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle("Swag Labs");*/
    }
    async fillUserNameAndPassword(){
        await this.userNameInput.fill("standard_user");
        await this.passwordInput.fill("secret_sauce");
    }
}