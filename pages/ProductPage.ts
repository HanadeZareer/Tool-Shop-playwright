import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  // Product information
  readonly productName: Locator;
  readonly category: Locator;
  readonly brand: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;

  // Product badges and ratings
  readonly ecoBadge: Locator;
  readonly co2RatingBadge: Locator;
  readonly co2Letters: Locator;

  // Product actions
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;
  readonly addToCompareButton: Locator;

  // Quantity controls
  readonly quantityInput: Locator;
  readonly increaseQuantityButton: Locator;
  readonly decreaseQuantityButton: Locator;

  // Product status
  readonly outOfStockMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize product information locators
    this.productName = page.locator('[data-test="product-name"]');
    this.category = page.locator('[aria-label="category"]');
    this.brand = page.locator('[aria-label="brand"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.productDescription = page.locator('[data-test="product-description"]');

    // Initialize product badge and rating locators
    this.ecoBadge = page.locator('[data-test="eco-badge"]');
    this.co2RatingBadge = page.locator('[data-test="co2-rating-badge"]');
    this.co2Letters = this.co2RatingBadge.locator(".co2-letter");

    // Initialize product action locators
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.addToFavoritesButton = page.locator('[data-test="add-to-favorites"]');
    this.addToCompareButton = page.locator('[data-test="add-to-compare"]');

    // Initialize quantity locators
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.increaseQuantityButton = page.locator(
      '[data-test="increase-quantity"]',
    );
    this.decreaseQuantityButton = page.locator(
      '[data-test="decrease-quantity"]',
    );

    // Initialize product status locator
    this.outOfStockMessage = page.locator('[data-test="out-of-stock"]');
  }

  // Get the product name
  async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? "";
  }

  // Get the product category
  async getCategory(): Promise<string> {
    return (await this.category.textContent())?.trim() ?? "";
  }

  // Get the product brand
  async getBrand(): Promise<string> {
    return (await this.brand.textContent())?.trim() ?? "";
  }

  // Get the product price
  async getProductPrice(): Promise<number> {
    return Number(await this.productPrice.textContent());
  }

  // Get the product description
  async getProductDescription(): Promise<string> {
    return (await this.productDescription.textContent())?.trim() ?? "";
  }

  // Check whether the product is eco-friendly
  async isEcoFriendly(): Promise<boolean> {
    return await this.ecoBadge.isVisible();
  }

  // Get the active CO2 rating
  async getCo2Rating(): Promise<string> {
    const activeRating = this.co2RatingBadge.locator(".active");
    return (await activeRating.textContent())?.trim() ?? "";
  }

  // Get all CO2 ratings
  async getCo2Ratings(): Promise<string[]> {
    return this.co2Letters.allTextContents();
  }

  // Add the product to the cart
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  // Add the product to favorites
  async addToFavorites(): Promise<void> {
    await this.addToFavoritesButton.click();
  }

  // Add the product to compare
  async addToCompare(): Promise<void> {
    await this.addToCompareButton.click();
  }

  // Get the current product quantity
  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.inputValue());
  }

  // Increase the product quantity
  async increaseQuantity(): Promise<void> {
    await this.increaseQuantityButton.click();
  }

  // Decrease the product quantity
  async decreaseQuantity(): Promise<void> {
    await this.decreaseQuantityButton.click();
  }

  // Set the product quantity
  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  // Check whether the product is out of stock
  async isOutOfStock(): Promise<boolean> {
    return await this.outOfStockMessage.isVisible();
  }

  // Check whether Add to Cart is enabled
  async isAddToCartEnabled(): Promise<boolean> {
    return await this.addToCartButton.isEnabled();
  }
}
