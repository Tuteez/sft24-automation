import { expect } from "@playwright/test";

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
  async checkIfCoputerCreated() {
    await expect(this.page.locator('div.alert-message.warning')).toContainText('Done');
  }
  async searchInput(input) {
    await this.page.locator('#searchbox').fill(input);
    await this.page.locator('#searchsubmit').click();
  }
  async verifyNoData() {
    await expect(this.page.locator('.well')).toContainText("Nothing to display");
  }
  async verifyPCExists(input) {
    await expect(this.page.locator('table>tbody>tr>td>a')).toContainText(input);
  }
  async verifyItemscountInTable(count) {
    await expect(this.page.locator('table tbody tr')).toHaveCount(count);
  }
}
