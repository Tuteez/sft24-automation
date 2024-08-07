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
         let ProductsPage = new ProductsListPage(page);
         await ProductsPage.isListSortedByName();
    });
  
    test('2. Test to determine if website contains four desired sorting options', async ({ page }) => {
        let ProductsPage = new ProductsListPage(page);
        const options = await ProductsPage.getSortOptions();

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
      const ProductsPage = new ProductsListPage(page);
      await ProductsPage.selectSortingOption("az"); // Sort A-Z
      const selectedOption = await ProductsPage.getSelectedSortingOption();
      expect(selectedOption).toBe("az"); // Ensures the sorting option is set correctly
      const isSortedAsc = await ProductsPage.isListSortedByName(true);
      expect(isSortedAsc).toBe(true);
    });
  
    test("3B. Sorting by name works correctly in descending order", async ({ page }) => {
      const ProductsPage = new ProductsListPage(page);
      await ProductsPage.selectSortingOption("za"); // Sort Z-A
      const selectedOption = await ProductsPage.getSelectedSortingOption();
      expect(selectedOption).toBe("za"); // Ensures the sorting option is set correctly
      const isSortedDesc = await ProductsPage.isListSortedByName(false);
      expect(isSortedDesc).toBe(true);
    });
  
    test("4A. Sorting by price works correctly in ascending order", async ({ page }) => {
      const ProductsPage = new ProductsListPage(page);
      await ProductsPage.selectSortingOption("lohi"); // Sort Price Low to High
      const selectedOption = await ProductsPage.getSelectedSortingOption();
      expect(selectedOption).toBe("lohi"); // Ensures the sorting option is set correctly
      const isSortedAsc = await ProductsPage.isListSortedByPrice(true);
      expect(isSortedAsc).toBe(true);
    });
  
    test("4B. Sorting by price works correctly in descending order", async ({ page }) => {
      const ProductsPage = new ProductsListPage(page);
      await ProductsPage.selectSortingOption("hilo"); // Sort Price High to Low
      const selectedOption = await ProductsPage.getSelectedSortingOption();
      expect(selectedOption).toBe("hilo"); // Ensures the sorting option is set correctly
      const isSortedDesc = await ProductsPage.isListSortedByPrice(false);
      expect(isSortedDesc).toBe(true);
    });
  });

//second user story tests

    test("1. Each product has an 'add to cart' button", async ({ page }) => {
        let ProductsPage = new ProductsListPage(page);
        await ProductsPage.checkIfEachProductHasButton();
    });

test.describe('2. Product Tests - for adding and removing items from cart.', () => {

    Object.values(PRODUCTS).forEach((productName) => {
  
      test(`2A. Preview page - ${productName} can be added and removed from cart.`, async ({ page }) => {
        const ProductsPage = new ProductsListPage(page);
        await ProductsPage.openProductPreview(productName);
      
        const PreviewPage = new productPreviewPage(page);
        await expect(PreviewPage.addToCartButton).toBeVisible();
        await PreviewPage.addToCart();
        await PreviewPage.isProductInCart();
        await PreviewPage.removeFromCart();
        await PreviewPage.isProductRemovedFromCart();
      });
  
      test(`2B. Product list page - ${productName} can be added to cart just once and then removed from it.`, async ({ page }) => {
        const ProductsPage = new ProductsListPage(page);
        const productId = formatProductId(productName);
  
        // Add product to cart
        await ProductsPage.addProductToCart(productName);
        
        // Verify if product is in the cart
        await ProductsPage.isProductInCart();
        await expect(ProductsPage.removeButtonLocator(productName)).toHaveText('Remove');
        
        // Try to add the same product again and verify it's still in the cart only once
        await ProductsPage.addProductToCart(productName);
        await ProductsPage.isProductInCart();
        await expect(ProductsPage.removeButtonLocator(productName)).toHaveText('Remove');
        
        // Remove product from cart
        await ProductsPage.removeProductFromCart(productName);
        
        // Verify product is removed from the cart
        await ProductsPage.isProductRemovedFromCart();
        await expect(ProductsPage.addButtonLocator(productName)).toHaveText('Add to cart');
      });
  
      test(`2C. Cart page - ${productName} is in it cart and can be removed.`, async ({ page }) => {
        const ProductsPage = new ProductsListPage(page);
        const CartPages = new cartPage(page);
        const productId = formatProductId(productName);
  
        await ProductsPage.addProductToCart(productName);
        await ProductsPage.isProductInCart();
  
        await CartPages.openCart();
        await CartPages.CartHasItems();
        await CartPages.allCartItemsHaveRemoveButtons();
        await CartPages.removeItemFromCart();
      });
  
    });
  
  });