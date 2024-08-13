import { test, expect } from "@playwright/test";

export class LoginPage{
    constructor(page){
        //page elementai
        this.page = page;
        this.userNameInput = page.locator('input[data-test="username"]');
        this.userPasswordInput = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-button"]');
    }
    async openPage(){
        await this.page.goto("https://www.saucedemo.com");
    }
    async fillInCredantials(name,password){
        await this.userNameInput.fill(name);
        await this.userPasswordInput.fill(password);
    }
}