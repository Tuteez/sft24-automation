import { test, expect, ba } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductDetailsPage } from "../pages/product-details-page";

test.describe("SFT-2 Ability to add swag to cart.", () => {
  const loginData = [
    { userName: "standard_user", password: "secret_sauce" },
    //  { userName: "problem_user", password: "secret_sauce" },
  ];

  let loginPage;
  let productsListPage;
  let productDetailsPage;
  loginData.forEach(({ userName, password }) => {
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productsListPage = new ProductsListPage(page);
      productDetailsPage = new ProductDetailsPage(page);

      await page.goto("/");
      await loginPage.login(userName, password);
      expect(page).toHaveURL(/inventory.html/);
    });
    test(`Check Add to chart button from Products list – to each product card/item. for user: ${userName}`, async ({
      page,
    }) => {
      // Click the random items add to chart button
      const elements = await page.locator("div.pricebar > button").all();
      expect(elements).toHaveLength(6);

      var element = elements.at(0);
      await element.click();

      var bage = await page.locator(".shopping_cart_badge").textContent();
      expect(bage).toBe("1");

      var buttonText = await element.textContent();
      expect(buttonText).toBe("Remove");
    });
  });

  test("check if item can be aded from product details page", async ({
    page,
  }) => {
    await page.locator(".inventory_item_name ").first().click();
    productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.addToCart.click({ force: true });
    expect(
      await page.locator(".inventory_details_container button").textContent()
    ).toContain("Remove");
    var bage = await page.locator(".shopping_cart_badge").textContent();
    expect(bage).toBe("1");
  });
  test("check if item is displayed in cart page and remove button is next to ir", async ({
    page,
  }) => {
    await page.locator("div.pricebar > button").first().click();
    var bage = await page.locator(".shopping_cart_badge").textContent();
    expect(bage).toBe("1");
    var buttonText = await page
      .locator("div.pricebar > button")
      .first()
      .textContent();
    expect(buttonText).toBe("Remove");
    await page.locator(".inventory_item_name ").first().click();
    expect(
      await page.locator(".inventory_details_container button").textContent()
    ).toContain("Remove");
    await page.locator(".shopping_cart_badge").click();
    expect(await page.locator(".cart_list>.cart_item")).toHaveCount(1);
    expect(await page.locator(".cart_item button").textContent()).toContain(
      "Remove"
    );
  });
  test("check if item is removed if remove button is clicked", async ({
    page,
  }) => {
    await page.locator("div.pricebar > button").first().click();
    var bage = await page.locator(".shopping_cart_badge").textContent();
    expect(bage).toBe("1");
    var buttonText = await page
      .locator("div.pricebar > button")
      .first()
      .textContent();
    expect(buttonText).toBe("Remove");
    await page.locator(".inventory_item_name ").first().click();
    expect(
      await page.locator(".inventory_details_container button").textContent()
    ).toContain("Remove");
    await page.locator(".shopping_cart_badge").click();
    expect(await page.locator(".cart_list>.cart_item")).toHaveCount(1);
    await page.locator(".cart_item button").click();
    expect(await page.locator(".cart_list>.cart_item")).toHaveCount(0);
  });
});
