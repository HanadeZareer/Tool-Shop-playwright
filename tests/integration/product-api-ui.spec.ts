import { test, expect } from "@playwright/test";
import { ProductApi } from "../../api/ProductApi";
import { HomePage } from "../../pages/HomePage";
import { ProductsResponseSchema } from "../../schemas/ProductResponse.schema";
import getProductsTests from "../../data/product-api-tests.json";

test.describe("Product API - UI Integration", () => {
  getProductsTests.getProductsTests.forEach((testCase) => {
    test(`${testCase.testCase} - ${testCase.description}`, async ({
      page,
      request,
    }) => {
      // Initialize API object
      const productApi = new ProductApi(request);

      // Get products from the API
      const response = await productApi.getProducts(testCase.params);

      // Validate API response status
      expect(response.status()).toBe(testCase.expectedStatus);

      // Get API response body
      const body = await response.json();

      // Validate API response using Zod schema
      const apiResponse = ProductsResponseSchema.parse(body);

      // Get products returned by the API
      const apiProducts = apiResponse.data;

      // Initialize Home Page
      const homePage = new HomePage(page);

      // Open the Home Page
      await page.goto("/");

      if (testCase.params.sort) {
        await homePage.sideBar.sortBy(testCase.params.sort);
      }
      if (testCase.params.by_category) {
        await homePage.sideBar.selectCategory(testCase.params.by_category);
      }
      if (testCase.params.by_brand) {
        await homePage.sideBar.selectBrand(testCase.params.by_brand);
      }
      if (testCase.params.between) {
        await homePage.sideBar.setPriceRange(testCase.params.between);
      }

      // Get product names displayed on the UI
      const uiNames = await homePage.getDisplayedProductNames();

      // Get product names from API
      const apiNames = apiProducts.map((product) => product.name);

      // Compare UI products with API products
      expect(uiNames).toEqual(apiNames.slice(0, uiNames.length));
    });
  });
});
