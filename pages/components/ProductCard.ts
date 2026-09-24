import { Page, Locator } from "@playwright/test";

export class ProductCard {
  readonly page: Page;

  // Product card
  readonly card: Locator;

  // Product information
  readonly name: Locator;
  readonly image: Locator;
  readonly price: Locator;

  // CO2 rating
  readonly co2RatingBadge: Locator;
  readonly co2Letters: Locator;

  // Compare
  readonly compareButton: Locator;

  constructor(page: Page, productId: string) {
    this.page = page;

    // Main product card
    this.card = page.locator(`[data-test="product-${productId}"]`);

    // Product details
    this.name = this.card.locator('[data-test="product-name"]');

    this.image = this.card.locator("img");

    this.price = this.card.locator('[data-test="product-price"]');

    // Compare button
    this.compareButton = this.card.locator('[data-test="compare-btn"]');

    // CO2 rating container
    this.co2RatingBadge = this.card.locator('[data-test="co2-rating-badge"]');

    // A, B, C, D, E
    this.co2Letters = this.co2RatingBadge.locator(".co2-letter");
  }

  // =========================
  // Product
  // =========================

  async open(): Promise<void> {
    await this.card.click();
  }

  async getName(): Promise<string> {
    return (await this.name.textContent())?.trim() ?? "";
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent())?.trim() ?? "";
  }

  async getPriceValue(): Promise<number> {
    const price = await this.getPrice();

    return Number(price.replace("$", "").trim());
  }

  async getImageAlt(): Promise<string> {
    return (await this.image.getAttribute("alt"))?.trim() ?? "";
  }

  // =========================
  // Compare
  // =========================

  async compare(): Promise<void> {
    await this.compareButton.click();
  }

  // =========================
  // CO2 Rating
  // =========================

  async getCo2Rating(): Promise<string> {
    const activeRating = this.co2RatingBadge.locator(".active");

    return (await activeRating.textContent())?.trim() ?? "";
  }

  async getCo2Ratings(): Promise<string[]> {
    return this.co2Letters.allTextContents();
  }

  async getActiveCo2Rating(): Promise<Locator> {
    return this.co2RatingBadge.locator(".active");
  }
}
