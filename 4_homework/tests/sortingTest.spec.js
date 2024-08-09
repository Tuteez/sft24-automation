import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import {productsListPage} from "../pages/productsListPage";

// Login
test ('Login Page', async(page) =>{

    const login = new loginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user','secret_sauce')
    });
    // Sort by name (A-Z)
test('Sort by name A-Z', async ({ page }) => {
    const filter = new productsListPage(page);  // Pass the page object to the class constructor
        await page.locator('.right-component span').selectOption({ value: 'az' });
    const isSorted = await filter.isListSortedByName(false); 
        expect(isSorted).toBe(true);
    });

    // Sort by name (Z-A)
test ('Sort by name Z-A', async(page) =>{
    const filter = new productsListPage(page);
        await page.locator('.right-component span').selectOption({ value: 'za' });
    const isSorted = await filter.isListSortedByName(true); 
        expect(isSorted).toBe(true);
    });
    // Sort by price (low-high)
test ('Sort by name A-Z', async(page) =>{
    const filter = new productsListPage(page);
        await page.locator('.right-component span').selectOption({ value: 'lohi' });
    const isSorted = await filter.isListSortedByPrice(true); 
        expect(isSorted).toBe(true);
    });
    // Sort by price (high-low)
test ('Sort by name A-Z', async(page) =>{
    const filter = new productsListPage(page);
        await page.locator('.right-component span').selectOption({ value: 'hilo' });
    const isSorted = await filter.isListSortedByPrice(false); 
        expect(isSorted).toBe(true);
    });