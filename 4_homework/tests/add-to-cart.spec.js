import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductDetailsPage } from "../pages/product-details-page";
import { CartPage } from "../pages/cart-page";

test.describe("SFT-2 Ability to add swag to cart.", () => {
  const loginData = [
    { userName: "standard_user", password: "secret_sauce" },
    //  { userName: "problem_user", password: "secret_sauce" },
  ];

  let loginPage;
  let productsListPage;
  let productDetailsPage;
  let cartPage;
  loginData.forEach(({ userName, password }) => {
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productsListPage = new ProductsListPage(page);
      productDetailsPage = new ProductDetailsPage(page);
      cartPage = new CartPage(page);

      await page.goto("/");
      await loginPage.login(userName, password);
      expect(page).toHaveURL(/inventory.html/);
    });
    test(`Check Add to chart button from Products list – to each product card/item. for user: ${userName}`, async ({
      page,
    }) => {
      const actionButtonButtons =
        await productsListPage.actionButtonButtton.all();
      expect(actionButtonButtons.length).toBe(6);

      for (const _ in actionButtonButtons) {
        let actionButtonButton = page
          .getByRole("button", {
            name: "Add to cart",
          })
          .first();

        await actionButtonButton.click();
      }

      expect(await productsListPage.cartBadge.textContent()).toBe(
        `${actionButtonButtons.length}`
      );
    });
  });

  test("Check if item can be added from product details page and remove button is displayed everywhere once item is added in the cart", async ({
    page,
  }) => {
    //click first items title
    await productsListPage.itemName.first().click();
    await productDetailsPage.actionButton.click({ force: true });
    expect(await productDetailsPage.actionButton.textContent()).toContain(
      "Remove"
    );
    expect(await productDetailsPage.cartBadge.textContent()).toBe("1");
    await productDetailsPage.cartBadge.click();
    expect(await cartPage.itemsInList).toHaveCount(1);
    expect(await cartPage.actionButton.textContent()).toContain("Remove");
  });

  test("Check if item is removed if remove button is clicked", async ({
    page,
  }) => {
    await productsListPage.firstactionButton.click();
    expect(await productsListPage.cartBadge.textContent()).toBe("1");
    expect(await productsListPage.firstactionButton.textContent()).toBe(
      "Remove"
    );
    await productDetailsPage.cartBadge.click();
    expect(await cartPage.itemsInList).toHaveCount(1);
    await cartPage.actionButton.click();
    expect(await cartPage.itemsInList).toHaveCount(0);
  });
});
