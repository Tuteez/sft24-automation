import { test, expect, ba } from "@playwright/test";
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
      const addToCartButtons = await productsListPage.addToCartButtton.all();
      expect(addToCartButtons.length).toBe(6);

      for (const _ in addToCartButtons) {
        let addToCartButton = page
          .getByRole("button", {
            name: "Add to cart",
          })
          .first();

        await addToCartButton.click();
      }

      expect(await productsListPage.cartBadge.textContent()).toBe(
        `${addToCartButtons.length}`
      );
    });
  });

  test("check if item can be added from product details page", async ({
    page,
  }) => {
    productDetailsPage = new ProductDetailsPage(page);
    //click first items title
    await productsListPage.itemName.first().click();
    await productDetailsPage.addToCart.click({ force: true });
    expect(await productDetailsPage.addToChartButton.textContent()).toContain(
      "Remove"
    );
    expect(await productDetailsPage.cartBadge.textContent()).toBe("1");
  });
  test("check if remove button is displayed everywhere once item is added in the cart ", async ({
    page,
  }) => {
    await productsListPage.firstAddToChartButton.click();
    expect(await productsListPage.cartBadge.textContent()).toBe("1");
    expect(await productsListPage.firstAddToChartButton.textContent()).toBe(
      "Remove"
    );
    await productsListPage.itemName.first().click();
    expect(await productDetailsPage.addToChartButton.textContent()).toContain(
      "Remove"
    );
    await productDetailsPage.cartBadge.click();
    expect(await cartPage.itemsInList).toHaveCount(1);
    expect(await cartPage.addToChartButton.textContent()).toContain("Remove");
  });

  test("check if item is removed if remove button is clicked", async ({
    page,
  }) => {
    await productsListPage.firstAddToChartButton.click();
    expect(await productsListPage.cartBadge.textContent()).toBe("1");
    expect(await productsListPage.firstAddToChartButton.textContent()).toBe(
      "Remove"
    );
    await productDetailsPage.cartBadge.click();
    expect(await cartPage.itemsInList).toHaveCount(1);
    await cartPage.addToChartButton.click();
    expect(await cartPage.itemsInList).toHaveCount(0);
  });
});
