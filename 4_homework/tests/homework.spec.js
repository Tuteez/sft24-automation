import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test.describe("SFT-1 Sorting functionality on Products list", async () => {
  let productsListPage;

  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.loginToPage("standard_user", "secret_sauce");
  });

  // 2. Available options to select from should be:
  //    Name (A to Z), Name (Z to A), Price (low to high), Price (high to low)
  test("Dropdown sorting by criterias", async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    
    const sortCriterias = [
      { sortBy: "az", asc: true, type: "name" },
      { sortBy: "za", asc: false, type: "name" },
      { sortBy: "lohi", asc: true, type: "price" },
      { sortBy: "hilo", asc: false, type: "price" }
    ];

    for (const sortCriteria of sortCriterias) {
      await test.step(`Verify sort feature with ${sortCriteria.sortBy}`, async () => {
        await productsListPage.sortBy(sortCriteria.sortBy);
        let isSortedCorrectly;

        if (sortCriteria.type === "name") {
          isSortedCorrectly = await productsListPage.isListSortedByName(sortCriteria.asc);
        } else {
          isSortedCorrectly = await productsListPage.isListSortedByPrice(sortCriteria.asc);
        }

        expect(isSortedCorrectly).toBeTruthy();
      });
    }
  });

  // 4. By default, products should be sorted by Name (A to Z).
  test("Default sort should be by Name (A to Z)", async () => {
    const isSorted = await productsListPage.isListSortedByName(true);
    expect(isSorted).toBeTruthy();
  });
});

test.describe("SFT-2 Ability to add swag to cart.", async () => {
  let productsListPage;

//   Acceptance criteria
// 1. Add button ‘Add to cart’ to following system places:
// a. Products list – to each product card/item.
// b. Product preview page.

// 2. Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be
// added to the cart. (There is no possibility to add more than one).
// 3. If there is at least one product added to the cart, button ‘Remove’ should be added to
// following places:
// a. Cart – for each product separately.
// b. Products list – to each product card/item.
// c. Product preview page.
// 4. If user clicks ‘Remove’ button related item/product should be removed from the cart.

 
});
