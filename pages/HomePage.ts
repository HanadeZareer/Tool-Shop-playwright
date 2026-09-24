import { Page } from "@playwright/test";
import { NavigationBar } from "./NavigationBar";
import { SideBar } from "./SideBar";
import { ProductCard } from "./components/ProductCard";

export class HomePage {
  readonly page: Page;

  // Page components
  readonly navigationBar: NavigationBar;
  readonly sideBar: SideBar;

  // Products currently displayed on the page
  productCards: ProductCard[] = [];

  constructor(page: Page) {
    this.page = page;

    // Initialize page components
    this.navigationBar = new NavigationBar(page);
    this.sideBar = new SideBar(page);
  }

  // Get the product cards currently displayed on the UI
  private getDisplayedProductCards() {
    return this.page.locator('[data-test^="product-"]');
  }

  // Extract the product ID from a product card
  private async getProductId(
    card: ReturnType<Page["locator"]>,
  ): Promise<string> {
    const testId = await card.getAttribute("data-test");

    if (!testId) {
      throw new Error("Product card does not have a data-test attribute");
    }

    return testId.replace("product-", "");
  }

  // Initialize ProductCard objects from the products displayed on the UI
  async initializeProductCards(): Promise<void> {
    const cards = this.getDisplayedProductCards();
    const count = await cards.count();

    this.productCards = [];

    for (let i = 0; i < count; i++) {
      // Get the product ID directly from the UI
      const productId = await this.getProductId(cards.nth(i));

      // Create a ProductCard using the UI product ID
      this.productCards.push(new ProductCard(this.page, productId));
    }
  }

  // Get the product IDs of the products currently displayed on the UI
  async getProductIds(): Promise<string[]> {
    return Promise.all(
      this.productCards.map((product) => this.getProductId(product.card)),
    );
  }

  // Get product names displayed on the UI
  async getDisplayedProductNames(): Promise<string[]> {
    return this.page.locator('[data-test="product-name"]').allTextContents();
  }

  // Get product prices displayed on the UI
  async getDisplayedProductPrices(): Promise<number[]> {
    // Get product prices as text
    const priceTexts = await this.page
      .locator('[data-test="product-price"]')
      .allTextContents();

    // Convert prices from text to numbers
    return priceTexts.map((price) => Number(price.replace("$", "").trim()));
  }
}
