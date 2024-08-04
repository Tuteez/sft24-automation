import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsAddingToCartPreviewPage {
  constructor(page) {
    this.page = page;
  }

  async addToCartOnPreviewPage () {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/InventoryItem.jsx");
    await expect(this.page.locator('return (<Button customClass="btn_inventory" label={label} onClick={onClick} size={BUTTON_SIZES.SMALL} testId={testId} type={type} />)')).toBeTruthy();
    // await expect(this.page.locator('return (Button customClass="btn_inventory" label={label} onClick={onClick} size={BUTTON_SIZES.SMALL} testId={testId} type={type} />)')).toBeTruthy();
    // await expect(this.page.locator('#add-to-cart-sauce-labs-backpack')).toBeTruthy();
    // await expect(this.page.locator('button')).toBeTruthy();
    // await this.page.goto("https://www.saucedemo.com/static/js/components/InventoryListItem.jsx")
    // await this.page.locator("const ButtonType = ({ id, item, itemInCart, missAlignButton }) => {const label = itemInCart ? 'Remove' : 'Add to cart'; const onClick = itemInCart ? () => removeFromCart(id) : () => addToCart(id); const type = itemInCart ? BUTTON_TYPES.SECONDARY : BUTTON_TYPES.PRIMARY; const testId = `${label}-${item}`.replace(/\s+/g, "-").toLowerCase(); const buttonClass = `btn_inventory ${ missAlignButton ? 'btn_inventory_misaligned' : ''}")
  }

  async addToCartClickAdding() {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/InventoryItem.jsx");
    await expect(this.page.locator('onClick = itemInCart ? () => removeFromCart(id) : () => addToCart(id)')).toBeTruthy();
    await expect(this.page.locator('ShoppingCart.addItem(itemId); setItemInCart(true)')).toBeTruthy();
  }

  async removeOnProductPreview() {
    await this.page.goto("https://www.saucedemo.com/static/js/pages/InventoryItem.jsx");
 //   await this.page.locator('const testId = label === "Remove" ? "remove" : "add-to-cart";').toBeTruthy();
    await expect(this.page.locator('<ButtonType id={item.id} itemInCart={itemInCart} item={item.name}/>')).toBeTruthy(); 
      //=> {const label = itemInCart ? "Remove" : "Add to cart"; const onClick = itemInCart ? () => removeFromCart(id) : () => addToCart(id); const type = itemInCart ? BUTTON_TYPES.SECONDARY : BUTTON_TYPES.PRIMARY; const testId = label === "Remove" ? "remove" : "add-to-cart";')) 
      

      // <-- ar yra koks JavaScript assertion metodas, kuris "testuotų", gal labiau patvirtintų kintamuosius ir jų egzistavimą kode? Visą funkciją?
      // Ar "toBeTruphy" tikrina iš esmės ar funkcija išmeta True? 
  } 

}
