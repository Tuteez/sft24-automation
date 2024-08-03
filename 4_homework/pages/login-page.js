export class LoginPage {
    constructor(page) {
        this.page = page;
    }
    enterUserName(userName) {
        this.page.locator('#user-name').fill(userName);
    }
    enterPassword(password) {
        this.page.locator('#password').fill(password);
    }
    clickLogin() {
        this.page.locator('#login-button').click()
    }
    login(userName, password) {
        this.enterUserName(userName);
        this.enterPassword(password);
        this.clickLogin();
    }
}