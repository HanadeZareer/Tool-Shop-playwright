import { Page, Locator } from "@playwright/test";
import navigationData from "../data/navigation-data.json";

export class NavigationBar {
  readonly page: Page;

  // Main navigation elements
  readonly homeLink: Locator;
  readonly categoriesButton: Locator;
  readonly contactLink: Locator;

  // User menu
  readonly userMenuButton: Locator;

  // Shopping cart
  readonly cartButton: Locator;
  readonly cartQuantity: Locator;

  // Language selector
  readonly languageButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize main navigation locators
    this.homeLink = page.locator('[data-test="nav-home"]');
    this.categoriesButton = page.locator('[data-test="nav-categories"]');
    this.contactLink = page.locator('[data-test="nav-contact"]');

    // Initialize user menu locator
    this.userMenuButton = page.locator('[data-test="nav-menu"]');

    // Initialize cart locators
    this.cartButton = page.locator('[data-test="nav-cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');

    // Initialize language selector
    this.languageButton = page.locator('[data-test="language-select"]');
  }

  // Navigate to the Home page
  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  // Navigate to the Contact page
  async goToContact(): Promise<void> {
    await this.contactLink.click();
  }

  // Open the Categories dropdown menu
  async openCategories(): Promise<void> {
    await this.categoriesButton.click();
  }

  // Select a category using the data defined in navigation-data.json
  async selectCategory(category: string): Promise<void> {
    await this.openCategories();

    // Find the requested category in the JSON data
    const categoryData = navigationData.categories.find(
      (item) => item.name === category,
    );

    // Throw an error if the category does not exist in the JSON data
    if (!categoryData) {
      throw new Error(`Category "${category}" not found`);
    }

    // Build the locator dynamically using the locator value from JSON
    await this.page.locator(`[data-test="${categoryData.locator}"]`).click();
  }

  // Open the user menu
  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }

  // Select a user menu item using the data defined in navigation-data.json
  async selectUserMenuItem(item: string): Promise<void> {
    await this.openUserMenu();

    // Find the requested menu item in the JSON data
    const menuItem = navigationData.userMenu.find((menu) => menu.name === item);

    // Throw an error if the menu item does not exist
    if (!menuItem) {
      throw new Error(`User menu item "${item}" not found`);
    }

    // Build the locator dynamically and click the selected menu item
    await this.page.locator(`[data-test="${menuItem.locator}"]`).click();
  }

  // Open the shopping cart
  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  // Get the current number of items in the cart
  async getCartQuantity(): Promise<number> {
    const quantity = await this.cartQuantity.textContent();

    // Convert the displayed quantity from string to number
    return Number(quantity?.trim() || "0");
  }

  // Open the language dropdown menu
  async openLanguageMenu(): Promise<void> {
    await this.languageButton.click();
  }

  // Select a language using the data defined in navigation-data.json
  async selectLanguage(language: string): Promise<void> {
    await this.openLanguageMenu();

    // Find the requested language in the JSON data
    const languageData = navigationData.languages.find(
      (item) => item.name === language,
    );

    // Throw an error if the language does not exist
    if (!languageData) {
      throw new Error(`Language "${language}" not found`);
    }

    // Build the locator dynamically and select the language
    await this.page.locator(`[data-test="${languageData.locator}"]`).click();
  }
}
