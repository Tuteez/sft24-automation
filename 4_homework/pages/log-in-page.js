
import { expect } from "@playwright/test";
import { UserData } from "../test-data/user-data";
export class LogInPage {
    constructor(page){
        this.page = page;
    }

async goto(){
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveTitle("Swag Labs");
}
    
async logIn(userData){
    await this.page.locator('#user-name').fill(userData.username);
    await this.page.locator('#password').fill(userData.password);
    await this.page.locator('#login-button').click();
}

async enterWebsite (){
    let userData =  new UserData (
        "standard_user",
        "secret_sauce"
    );
//test
    await this.goto();
    await this.logIn(userData);
}
}
