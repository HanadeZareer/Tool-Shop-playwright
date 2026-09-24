import { Page, Locator } from "@playwright/test";
import sidebarData from "../data/sidebar-data.json";

export class SideBar {
  readonly page: Page;

  // Main sidebar container
  readonly filters: Locator;

  // Sorting
  readonly sortSelect: Locator;

  // Search
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResetButton: Locator;

  // Eco-friendly filter
  readonly ecoFriendlyFilter: Locator;

  // Price range
  readonly priceSlider: Locator;
  readonly minPriceHandle: Locator;
  readonly maxPriceHandle: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize the main filters container
    this.filters = page.locator('[data-test="filters"]');

    // Initialize sorting locator
    this.sortSelect = this.filters.locator('[data-test="sort"]');

    // Initialize search locators
    this.searchInput = this.filters.locator('[data-test="search-query"]');
    this.searchButton = this.filters.locator('[data-test="search-submit"]');
    this.searchResetButton = this.filters.locator('[data-test="search-reset"]');

    // Initialize eco-friendly filter locator
    this.ecoFriendlyFilter = this.filters.locator(
      '[data-test="eco-friendly-filter"]',
    );

    // Initialize price range slider
    this.priceSlider = this.filters.locator(
      'ngx-slider[aria-label="ngx-slider"]',
    );

    // Initialize minimum price handle
    this.minPriceHandle = this.priceSlider.locator(".ngx-slider-pointer-min");

    // Initialize maximum price handle
    this.maxPriceHandle = this.priceSlider.locator(".ngx-slider-pointer-max");
  }

  // Select a sorting option using the data defined in sidebar-data.json
  async sortBy(sortName: string): Promise<void> {
    // Find the requested sorting option by name or value
    const sort = sidebarData.sorts.find(
      (item) => item.name === sortName || item.value === sortName,
    );

    // Throw an error if the sorting option does not exist
    if (!sort) {
      throw new Error(`Sort option "${sortName}" not found`);
    }

    // Select the corresponding value from the dropdown
    await this.sortSelect.selectOption(sort.value);
  }

  // Select a product category using its visible label
  async selectCategory(categoryId: number): Promise<void> {
    // Find the requested category in the JSON data
    const category = sidebarData.categories.find(
      (item) => item.id === categoryId,
    );

    // Throw an error if the category does not exist
    if (!category) {
      throw new Error(`Category "${categoryId}" not found`);
    }

    // Find the category label using its visible text
    const categoryLabel = this.filters
      .locator("label")
      .filter({
        hasText: category.name,
      })
      .first();

    // Check the checkbox inside the category label
    await categoryLabel.locator('input[name="category_id"]').check();
  }

  // Select a product brand using its visible label
  async selectBrand(brandId: number): Promise<void> {
    // Find the requested brand in the JSON data
    const brand = sidebarData.brands.find((item) => item.id === brandId);

    // Throw an error if the brand does not exist
    if (!brand) {
      throw new Error(`Brand "${brandId}" not found`);
    }

    // Find the brand label using its visible text
    const brandLabel = this.filters
      .locator("label")
      .filter({
        hasText: brand.name,
      })
      .first();

    // Check the checkbox inside the brand label
    await brandLabel.locator('input[name="brand_id"]').check();
  }

  // Search for products using the search input
  async search(query: string): Promise<void> {
    // Enter the search query
    await this.searchInput.fill(query);

    // Submit the search
    await this.searchButton.click();
  }

  // Reset the search form
  async resetSearch(): Promise<void> {
    // Click the search reset button
    await this.searchResetButton.click();
  }

  // Enable or disable the eco-friendly filter
  async setEcoFriendly(enabled: boolean): Promise<void> {
    // Check the checkbox when enabled
    if (enabled) {
      await this.ecoFriendlyFilter.check();
    } else {
      // Uncheck the checkbox
      await this.ecoFriendlyFilter.uncheck();
    }
  }

  // Get the current minimum price
  async getMinPrice(): Promise<number> {
    return Number(await this.minPriceHandle.getAttribute("aria-valuenow"));
  }

  // Get the current maximum price
  async getMaxPrice(): Promise<number> {
    return Number(await this.maxPriceHandle.getAttribute("aria-valuenow"));
  }

  // Set the price range using "price,min,max"
  async setPriceRange(priceFilter: string): Promise<void> {
    // Separate the filter type, minimum price, and maximum price
    const [, minPriceValue, maxPriceValue] = priceFilter.split(",");

    // Convert minimum price and maximum price to numbers
    const minPrice = Number(minPriceValue);
    const maxPrice = Number(maxPriceValue);

    // Validate the price range
    if (
      !priceFilter.startsWith("price,") ||
      Number.isNaN(minPrice) ||
      Number.isNaN(maxPrice)
    ) {
      throw new Error(
        `Invalid price filter "${priceFilter}". Expected format: price,min,max`,
      );
    }

    // Validate that minimum price is not greater than maximum price
    if (minPrice > maxPrice) {
      throw new Error(
        `Invalid price range "${priceFilter}". Minimum price cannot be greater than maximum price`,
      );
    }

    // Get the current minimum price
    const currentMin = await this.getMinPrice();

    // Get the current maximum price
    const currentMax = await this.getMaxPrice();

    // Set the minimum price
    const minKey = minPrice > currentMin ? "ArrowRight" : "ArrowLeft";

    const minSteps = Math.abs(minPrice - currentMin);

    for (let i = 0; i < minSteps; i++) {
      await this.minPriceHandle.press(minKey);
    }

    // Set the maximum price
    const maxKey = maxPrice > currentMax ? "ArrowRight" : "ArrowLeft";

    const maxSteps = Math.abs(maxPrice - currentMax);

    for (let i = 0; i < maxSteps; i++) {
      await this.maxPriceHandle.press(maxKey);
    }
  }
}
