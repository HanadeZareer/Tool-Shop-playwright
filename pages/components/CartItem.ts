import { Locator, Page } from "@playwright/test";

export class CartItem {
  readonly page: Page;
  readonly row: Locator;
  readonly productTitle: Locator;
  readonly quantityInput: Locator;
  readonly productPrice: Locator;
  readonly totalPrice: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, productName: string) {
    this.page = page;

    // Locate the table row containing the requested product
    this.row = page.locator("tbody tr").filter({
      hasText: productName,
    });

    // Product name
    this.productTitle = this.row.locator('[data-test="product-title"]');

    // Product quantity
    this.quantityInput = this.row.locator('[data-test="product-quantity"]');

    // Product unit price
    this.productPrice = this.row.locator('[data-test="product-price"]');

    // Total price for this product
    this.totalPrice = this.row.locator('[data-test="line-price"]');

    // Remove product button
    this.removeButton = this.row.locator("a.btn-danger");
  }

  // Get the product name
  async getProductName(): Promise<string> {
    return (await this.productTitle.textContent())?.trim() ?? "";
  }

  // Get the product quantity
  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.inputValue());
  }

  // Update the product quantity
  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  // Get the unit price
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent())?.trim() ?? "";
  }

  // Get the unit price as a number
  async getProductPriceValue(): Promise<number> {
    const price = await this.getProductPrice();

    return Number(price.replace("$", "").trim());
  }

  // Get the total price for this product
  async getTotalPrice(): Promise<string> {
    return (await this.totalPrice.textContent())?.trim() ?? "";
  }

  // Get the total price as a number
  async getTotalPriceValue(): Promise<number> {
    const price = await this.getTotalPrice();

    return Number(price.replace("$", "").trim());
  }

  // Remove the product from the cart
  async remove(): Promise<void> {
    await this.removeButton.click();
  }
}
