import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/login-page";
import { ProductsListPage } from "../pages/products-list-page";
import { formatProductId } from "../pages/products-list-page";
import { cartPage } from "../pages/cart-page";


//Runs before each test.
test.beforeEach(async ({ page }) => {
    let openLoginPage = new loginPage(page);

    await openLoginPage.goto();
    await openLoginPage.fillInUsername("standard_user");
    await openLoginPage.fillInPassword("secret_sauce");
    await openLoginPage.pressLoginButton();

  });
    
//first user story tests
    test("1. Confirmation that products are sorted by name as default", async ({ page }) => {
         let ProductsPage = new ProductsListPage(page);
         await ProductsPage.isListSortedByName();
    });
  
    test('2. website contains four desired sorting options', async ({ page }) => {
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

    test("3. Sorting by name works correctly", async ({ page }) => {
        let ProductsPage = new ProductsListPage(page);
        await ProductsPage.selectSortingOption("az") // check expectedOptions above for values to put into 'selectSortingOption'
        await ProductsPage.isListSortedByName(); // does not work :(
    });

    test("4. Sorting by price works correctly", async ({ page }) => {
        let ProductsPage = new ProductsListPage(page);
        await ProductsPage.selectSortingOption("lohi") // check expectedOptions above for values to put into 'selectSortingOption'
        await ProductsPage.isListSortedByPrice(); // does not work :(
    });

//second user story tests

    test("1. Each product has an 'add to cart' button", async ({ page }) => {
        let ProductsPage = new ProductsListPage(page);
        await ProductsPage.eachProductHasButton();
    });

    //WIP
    test("2. product preview has an 'add to cart' and 'remove' buttons", async ({ page }) => {
    });
    //WIP

//Example products:
//const productName = "Test.allTheThings() T-Shirt (Red)";
//const productName = "Sauce Labs Backpack";

    test("3. Product can be added to cart just once and then removed from it", async ({ page }) => {
        const ProductsPage = new ProductsListPage(page);
        const productName = "Test.allTheThings() T-Shirt (Red)"; // < Use product name that should be added to cart. Two examples above
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

//Example products:
//const productName = "Test.allTheThings() T-Shirt (Red)";
//const productName = "Sauce Labs Backpack";

    test("4. Cart has an item in it and it can be removed", async ({ page }) => {
        let ProductsPage = new ProductsListPage(page);
        const productName = "Test.allTheThings() T-Shirt (Red)"; // < Use product name that should be added to cart. Two examples above
        const productId = formatProductId(productName);
        let CartPages = new cartPage(page);

        await ProductsPage.addProductToCart(productName);
        await ProductsPage.isProductInCart();

        await CartPages.openCart();
        await CartPages.CartHasItems();
        await CartPages.allCartItemsHaveRemoveButtons();
        await CartPages.removeItemFromCart(); 
    });
