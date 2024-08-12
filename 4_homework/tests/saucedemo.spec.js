import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { formatProductId } from "../pages/products-list-page";
import { cartPage } from "../pages/cart-page";
import { productPreviewPage } from "../pages/product-preview-page";
import { PRODUCTS } from "../configs/products-config";


//Runs before each test.
test.beforeEach(async ({ page }) => {
    let openLoginPage = new loginPage(page);
    
    await openLoginPage.goto();
    await openLoginPage.loginChosenUser("MAIN") // see user.config.js for possible roles
  });
    
//first user story tests
    test("1. Confirmation that products are sorted by 'Name (A to Z)' as default", async ({ page }) => {
         let productsPage = new ProductsListPage(page);
         await productsPage.isListSortedByName();
    });
  
    test('2. Test to determine if website contains four desired sorting options', async ({ page }) => {
        let productsPage = new ProductsListPage(page);
        const options = await productsPage.getSortOptions();

        // list of expected options for sorting
        const expectedOptions = [
            { value: 'az', text: 'Name (A to Z)' },
            { value: 'za', text: 'Name (Z to A)' },
            { value: 'lohi', text: 'Price (low to high)' },
            { value: 'hilo', text: 'Price (high to low)' }
        ];
        //comparing visible options to expected options listed above
        for (const expectedOption of expectedOptions) {
            expect(options).toContainEqual(expectedOption);
            };
    });

test.describe("3. Product Sorting Tests", () => {

  test("3A. Sorting by name works correctly in ascending order", async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption("az"); // Sort A-Z
    expect(await productsPage.getSelectedSortingOption()).toBe("az");
    expect(await productsPage.isListSortedByName(true)).toBe(true);
  });

  test("3B. Sorting by name works correctly in descending order", async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption("za"); // Sort Z-A
    expect(await productsPage.getSelectedSortingOption()).toBe("za");
    expect(await productsPage.isListSortedByName(false)).toBe(true);
  });

  test("3C. Sorting by price works correctly in ascending order", async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption("lohi"); // Sort Price Low to High
    expect(await productsPage.getSelectedSortingOption()).toBe("lohi");
    expect(await productsPage.isListSortedByPrice(true)).toBe(true);
  });

  test("3D. Sorting by price works correctly in descending order", async ({ page }) => {
    const productsPage = new ProductsListPage(page);
    await productsPage.selectSortingOption("hilo"); // Sort Price High to Low
    expect(await productsPage.getSelectedSortingOption()).toBe("hilo");
    expect(await productsPage.isListSortedByPrice(false)).toBe(true);
  });
});

//second user story tests

    test("1. Each product has an 'add to cart' button", async ({ page }) => {
        let productsPage = new ProductsListPage(page);
        await productsPage.checkIfEachProductHasButton();
    });

test.describe('2. Product Tests - for adding and removing items from cart.', () => {

    Object.values(PRODUCTS).forEach((productName) => {
  
      test(`2A. Preview page - ${productName} can be added and removed from cart.`, async ({ page }) => {
        const productsPage = new ProductsListPage(page);
        await productsPage.openProductPreview(productName);
      
        const previewPage = new productPreviewPage(page);
        await expect(previewPage.addToCartButton).toBeVisible();
        await previewPage.addToCart();
        await previewPage.isProductInCart();
        await previewPage.removeFromCart();
        await previewPage.isProductRemovedFromCart();
      });
  
      test(`2B. Product list page - ${productName} can be added to cart just once and then removed from it.`, async ({ page }) => {
        const productsPage = new ProductsListPage(page);
        const productId = formatProductId(productName);
  
        // Add product to cart
        await productsPage.addProductToCart(productName);
        
        // Verify if product is in the cart
        await productsPage.isProductInCart();
        await expect(productsPage.removeButtonLocator(productName)).toHaveText('Remove');
        
        // Try to add the same product again and verify it's still in the cart only once
        await productsPage.addProductToCart(productName);
        await productsPage.isProductInCart();
        await expect(productsPage.removeButtonLocator(productName)).toHaveText('Remove');
        
        // Remove product from cart
        await productsPage.removeProductFromCart(productName);
        
        // Verify product is removed from the cart
        await productsPage.isProductRemovedFromCart();
        await expect(productsPage.addButtonLocator(productName)).toHaveText('Add to cart');
      });
  
      test(`2C. Cart page - ${productName} is in it cart and can be removed.`, async ({ page }) => {
        const productsPage = new ProductsListPage(page);
        const cartPages = new cartPage(page);
        const productId = formatProductId(productName);
  
        await productsPage.addProductToCart(productName);
        await productsPage.isProductInCart();
  
        await cartPages.openCart();
        await cartPages.checkIfCartHasItems();
        await cartPages.checkIfAllCartItemsHaveRemoveButtons();
        await cartPages.removeItemFromCart();
      });
  
    });
  
  });