
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
}
    
async fillUserNameAndPassword(user) {
    await this.userNameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    }
    
async enterWebsite (){
    let userData =  new UserData (
        "standard_user",
        "secret_sauce"
    );
    await this.openPage();
    await this.fillUserNameAndPassword(userData);
    }
}
