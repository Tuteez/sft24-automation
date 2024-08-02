import {test, expect} from "@playwright/test";
import {ComputersListPage} from "../pages/computers-list-page";
import {AddComputerPage} from "../pages/add-new-computer-page";

import {NewComputerCreationPage} from "../pages/new-computer-creation-page";
import {ComputerData} from "../test-data/computer-data";


// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({page}) => {
    await page.goto("https://computer-database.gatling.io/computers");
    await expect(page).toHaveTitle("Computers database");
    await page.locator("#add").click();

    //set name
    await page.locator("#name").fill("My name");
    //set date
    await page.locator("#introduced").fill("1989-12-12");
    //set Discontinued
    await page.locator("#discontinued").fill("1990-01-10");
    // set Company
    await page.locator("#company").selectOption("Sony");
    await page.locator(".btn.primary").click();

    await expect(page.locator(".alert-message")).toContainText("Done !");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({page}) => {
    let computersListPage = new ComputersListPage(page);
    let newComputerCreationPage = new NewComputerCreationPage(page);

    await computersListPage.goto();
    await computersListPage.openNewComputerCreationPage();

    await newComputerCreationPage.fillComputerName("My name");
    await newComputerCreationPage.fillComputerDateIntroduced("1989-12-12");
    await newComputerCreationPage.fillComputerDateDiscontinued("1990-01-10");
    await newComputerCreationPage.fillComputerCompany("Sony");
    await newComputerCreationPage.clickButton();
    await computersListPage.checkMessage("Done !");
})

//Task - 3: Create test to check computers list search feature when search result doesn’t match any records
test("Verify search feature when no data", async ({page}) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();

    await computersListPage.searchBy("search text");
    await computersListPage.noResultsFound("Nothing to display");
});

//Task 4 - Add at least two more tests for searching feature and move them all to same group (describe)
test.describe("Verify search feature", async () => {
    test("Verify search feature with one match", async ({page}) => {
        let computersListPage = new ComputersListPage(page);
        await computersListPage.goto();

        await computersListPage.searchBy("ASCI red");


        await computersListPage.checkItemsCount(1);
    });
    test("Verify search feature with two match", async ({page}) => {
        let computersListPage = new ComputersListPage(page);
        await computersListPage.goto();

        await computersListPage.searchBy("ASCI blue");

        await computersListPage.checkItemsCount(2);
    });
});

//Task - 5: Introduce setup method (beforeEach) from previously created tests group
test.describe("Set up beforeEach method", async () => {
    let computersListPage;
    test.beforeEach(async ({page}) => {
        computersListPage = new ComputersListPage(page);
        await computersListPage.goto();
    });

    test("Verify search feature with one match", async ({page}) => {
        await computersListPage.searchBy("ASCI red");
        await computersListPage.checkItemsCount(1);
    });
    test("Verify search feature with two match", async ({page}) => {
        await computersListPage.searchBy("ASCI blue");
        await computersListPage.checkItemsCount(2);
    });
});

//Optional: Task - 6: Rearrange previously created tests group to use parametrization
test.describe("Verify search feature with parametrization", async () => {
    let searchCriteria = [
        {
            searchBy: "NoMatch",
            resultCount: 0,
        },
        {
            searchBy: "ASCI red",
            resultCount: 1,
        },
        {
            searchBy: "ASCI blue",
            resultCount: 2,
        }
    ];

    searchCriteria.forEach((searchCriteria) => {
        test(`Verify search feature with ${searchCriteria.resultCount} matche(s) `, async ({page}) => {
            let computersListPage = new ComputersListPage(page);

            await computersListPage.goto();
            await computersListPage.searchBy(searchCriteria.searchBy);

            await computersListPage.checkItemsCount(searchCriteria.resultCount);
        });
    });
});

//Optional: Task - 7: Create object from values used in initial computer creation test
test.describe("Create object from values used in initial computer creation test", async () => {
    test("Create new computer with test data", async ({page}) => {
        let computersListPage = new ComputersListPage(page);
        let addNewComputerPage = new AddComputerPage(page);

        let computerData = {
            name: "My new computer",
            introduced: "1979-12-12",
            discontinued: "1999-01-10",
            company: "Sony"
        };
        await computersListPage.goto();
        await computersListPage.openNewComputerCreationPage();
        await addNewComputerPage.submitComputer(computerData);
        await computersListPage.checkMessage("Done !");
    });
});

//Optional: Task - 8: Introduce test data object instead of hardcoded values

test("Create new computer with test data v.2", async ({page}) => {
    let computerData = new ComputerData(
        "My new other computer",
        "1979-12-12",
        "1999-01-10",
        "RCA"
    )
    let computersListPage = new ComputersListPage(page);
    let addNewComputerPage = new AddComputerPage(page);

    await computersListPage.goto();
    await computersListPage.openNewComputerCreationPage();
    await addNewComputerPage.submitComputer(computerData);
    await computersListPage.checkMessage("Done !");
});