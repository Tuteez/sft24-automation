export class LoginPage {
    constructor(page) { 
        this.page = page;
    }

    async login(username, password) {
        await this.page.goto("https://www.saucedemo.com/");
        // Ivedam username
        await this.page.locator("#user-name").fill(username);
        // ivedam password
        await this.page.locator("#password").fill(password);
        // spaudziam login
        await this.page.locator("#login-button").click();



    
    }
}
