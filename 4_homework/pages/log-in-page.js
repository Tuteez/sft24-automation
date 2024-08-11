
import { expect } from "@playwright/test";
import { UserData } from "../test-data/user-data";
export class LogInPage {
    constructor(page){
        this.page = page;
        this.userNameInput = page.locator('input[data-test="username"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.logInButton = page.locator('input[data-test="login-button"]');
    }

async openPage(){
    await this.page.goto("https://www.saucedemo.com/");
    //await expect(this.page).toHaveTitle("Swag Labs");
}
    

async fillUserNameAndPassword(user) {
    await this.userNameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    }
    /*
    await this.page.locator('#user-name').fill(userData.username);
    await this.page.locator('#password').fill(userData.password);
    await this.page.locator('#login-button').click();*/
//test

async enterWebsite (){
    let userData =  new UserData (
        "standard_user",
        "secret_sauce"
    );
//test
    await this.openPage();
    await this.fillUserNameAndPassword(userData);
}
}
