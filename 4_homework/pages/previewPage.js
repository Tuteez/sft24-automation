import { test, expect } from "@playwright/test";

export class PreviewPage{
    constructor(page){
        //page elementai
        this.page = page;
        this.removeItemFromCart = page.locator('button[data-test="remove"]');
    }
}