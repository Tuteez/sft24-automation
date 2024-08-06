import {expect} from "@playwright/test";

export class ComputersListPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://computer-database.gatling.io/computers");
        await expect(this.page).toHaveTitle("Computers database");
    }

    async openNewComputerCreationPage() {
        await this.page.locator("#add").click();
        await expect(this.page.locator("#main h1")).toHaveText("Add a computer");
    }

    async fillComputerName(name) {
        await this.page.locator("#name").fill(name);
    }

    async checkMessage(message) {
        await expect(this.page.locator(".alert-message")).toContainText(message);
    }

    async searchBy(searchText) {
        await this.page.locator("#searchbox").fill(searchText);
        await this.page.locator("#searchsubmit").click();
    }

    async noResultsFound(searchText) {
        await expect(this.page.locator(".well")).toContainText(searchText);
    }

    async checkItemsCount(itemsCount) {
        await expect(this.page.locator(".computers tbody tr")).toHaveCount(itemsCount);
    }
}
