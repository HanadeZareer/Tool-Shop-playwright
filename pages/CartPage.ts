import { Page, Locator } from "@playwright/test";
import { CartItem } from "./components/CartItem";

export class CartPage {
  readonly page: Page;

  // Cart product rows
  readonly cartRows: Locator;

  // Cart actions
  readonly continueShoppingButton: Locator;
  readonly proceedToCheckoutButton: Locator;

  // Cart summary
  readonly cartSubtotal: Locator;
  readonly ecoDiscount: Locator;
  readonly cartTotal: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize product rows only
    // This excludes subtotal and discount rows
    this.cartRows = page.locator("tbody tr").filter({
      has: page.locator('[data-test="product-title"]'),
    });

    // Initialize cart action locators
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );

    this.proceedToCheckoutButton = page.locator('[data-test="proceed-1"]');

    // Initialize cart summary locators
    this.cartSubtotal = page.locator('[data-test="cart-subtotal"]');

    this.ecoDiscount = page.locator('[data-test="cart-eco-discount"]');

    this.cartTotal = page.locator('[data-test="cart-total"]');
  }

  // Get a cart item by product name
  getCartItem(productName: string): CartItem {
    return new CartItem(this.page, productName);
  }

  // Get all products currently in the cart
  async getCartItems(): Promise<CartItem[]> {
    const count = await this.cartRows.count();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      // Get product name from the current row
      const productName = (
        await this.cartRows
          .nth(i)
          .locator('[data-test="product-title"]')
          .textContent()
      )?.trim();

      if (!productName) {
        continue;
      }

      // Create CartItem using the product name
      items.push(new CartItem(this.page, productName));
    }

    return items;
  }

  // Calculate subtotal from all product line totals
  async calculateSubtotal(): Promise<number> {
    const cartItems = await this.getCartItems();

    let subtotal = 0;

    for (const item of cartItems) {
      subtotal += await item.getTotalPriceValue();
    }

    return Number(subtotal.toFixed(2));
  }

  // Get the displayed subtotal
  async getDisplayedSubtotal(): Promise<number> {
    const subtotal = await this.cartSubtotal.textContent();

    return Number(subtotal?.replace(/[^0-9.]/g, "").trim() || "0");
  }

  // Check whether an eco-friendly discount is displayed
  async hasEcoDiscount(): Promise<boolean> {
    return await this.ecoDiscount.isVisible();
  }

  // Get the displayed eco-friendly discount
  // Returns 0 when there is no discount
  async getEcoDiscount(): Promise<number> {
    if (!(await this.hasEcoDiscount())) {
      return 0;
    }

    const discount = await this.ecoDiscount.textContent();

    return Number(discount?.replace(/[^0-9.]/g, "").trim() || "0");
  }

  // Calculate the expected final cart total
  async calculateCartTotal(): Promise<number> {
    const subtotal = await this.calculateSubtotal();
    const discount = await this.getEcoDiscount();

    return Number((subtotal - discount).toFixed(2));
  }

  // Get the displayed final cart total
  async getDisplayedCartTotal(): Promise<number> {
    const total = await this.cartTotal.textContent();

    return Number(total?.replace(/[^0-9.]/g, "").trim() || "0");
  }

  // Continue shopping
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  // Proceed to checkout
  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
