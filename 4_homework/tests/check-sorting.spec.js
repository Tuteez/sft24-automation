import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";

let sorting_options_list = [ 
    ["Name (A to Z)", true],
    ["Name (Z to A)", false],
    ["Price (low to high)", true],
    ["Price (high to low)", false]
];
let user_list = [
    'standard_user',
    'locked_out_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
];
let sorted = Boolean; 
sorting_options_list.forEach((option) =>{
    let sorting_option = option[0];
    let sorting_asc = option[1];
    test("Login and check sorting function: " + sorting_option, async ({ page }) => {
        let loginPage = new LoginPage(page);
        let productsListPage = new ProductsListPage(page);
        await loginPage.goto();
        await loginPage.enterUsername(user_list[0]);
        await loginPage.enterPassword("secret_sauce");
        await loginPage.pressLoginButtonSuccess();
        await productsListPage.sort(sorting_option);
        if (sorting_option.startsWith("Name")){
            sorted =  await productsListPage.isListSortedByName(sorting_asc);
        }
        if (sorting_option.startsWith("Price")){
            sorted = await productsListPage.isListSortedByPrice(sorting_asc);
        }
        await expect(sorted).toBe(true);
})});