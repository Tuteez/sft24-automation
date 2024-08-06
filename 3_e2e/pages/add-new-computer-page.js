export class AddComputerPage {
    constructor(page) {
        this.page = page;
    }

    async submitComputer(computerData) {
        await this.page.locator("#name").fill(computerData.name);
        await this.page.locator("#introduced").fill(computerData.introduced);
        await this.page.locator("#discontinued").fill(computerData.discontinued);
        await this.page.locator("#company").selectOption(computerData.company);


        await this.page.locator(".btn.primary").click();
    }
}