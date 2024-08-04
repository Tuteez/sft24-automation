import { expect } from "@playwright/test";

export class ComputersCreatePage {
  constructor(page) {
    this.page = page;
  }

 


  async fillComputerData() {
    await expect(this.page.locator('#main h1')).toHaveText('Add a computer');
   await this.page.locator('#name').fill('my computer');
 
   await this.page.locator('#introduced').fill('2022-04-05');
   
   await this.page.locator('#discontinued').fill('2023-04-05');
  
   await this.page.locator('#company').selectOption("Sony");}
   
   async createThisComputer(){
    await this.page.locator('input[type=submit]').click();
    await expect(this.page.locator(".alert-message")).toContainText("Done");}
   
}
