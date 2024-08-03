import { test, expect } from "@playwright/test";
import { ProductsListPage } from "../pages/products-list-page";

test.describe("SFT-1 Sorting functionality on Products list", async () => {
  let productsListPage;

  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    // standard_user
    // locked_out_user
    // problem_user
    // performance_glitch_user
    // error_user
    // visual_user
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

  test.beforeEach(async ({ page }) => {
    productsListPage = new ProductsListPage(page);
    await productsListPage.goto();
    await productsListPage.loginToPage("standard_user", "secret_sauce");
  });

  // 1. Add button ‘Add to cart’ to following system places:
  // a. Products list – to each product card/item.
  test("Add an item to the cart from the products list", async () => {
    await productsListPage.addToCartFirstFromProductsList();
  });
  // b. Product preview page.
  test("Add an item to the cart from the product preview page", async () => {
    await productsListPage.addToCartFirstPreviewProduct();
  });

  // 2. Once the user clicks on the button ‘Add to cart’, one piece of selected swag should be
  // added to the cart. (There is no possibility to add more than one).
  test("Add the item once", async ({ page })  => {
    await productsListPage.addToCartFirstFromProductsList();
    await page.locator('.inventory_item_name').first().click();
    await expect(page.locator("#remove")).toBeVisible();
  });

  // 3. If there is at least one product added to the cart, button ‘Remove’ should be added to
  // following places:
  // a. Cart – for each product separately.
  test("Remove items from the cart", async ({ page }) => {
    await productsListPage.addToCartFirstFromProductsList();
    await page.locator("#shopping_cart_container").click();
    await productsListPage.removeButtonCart();
  });
  // b. Products list – to each product card/item.
  test("Remove item from cart from the products list", async () => {
    await productsListPage.addToCartFirstFromProductsList();
    await productsListPage.removeButtonProductsList();
  });
  // c. Product preview page.
  test("Remove item from cart from the products preview page", async () => {
    await productsListPage.addToCartFirstPreviewProduct();
    await productsListPage.removeButtonPreviewProduct();
  });

});
