import { request } from "@playwright/test";
import fs from "fs";
import path from "path";
import { BrandApi } from "../api/BrandApi";
import { CategoryApi } from "../api/CategoryApi";

async function generateSidebarData(): Promise<void> {
  // Initialize API request context
  const requestContext = await request.newContext();

  // Initialize API classes
  const brandApi = new BrandApi(requestContext);
  const categoryApi = new CategoryApi(requestContext);

  // Get brands from API
  const brandsResponse = await brandApi.getBrands();

  // Get categories from API
  const categoriesResponse = await categoryApi.getCategories();

  // Validate API responses
  if (!brandsResponse.ok()) {
    throw new Error(`Failed to get brands. Status: ${brandsResponse.status()}`);
  }

  if (!categoriesResponse.ok()) {
    throw new Error(
      `Failed to get categories. Status: ${categoriesResponse.status()}`,
    );
  }

  // Read API response data
  const brands = await brandsResponse.json();
  const categories = await categoriesResponse.json();

  // Convert API brands to sidebar data
  const sidebarBrands = brands.map((brand: any) => ({
    name: brand.name,
    id: brand.id,
  }));

  // Convert API categories to sidebar data
  const sidebarCategories = categories.map((category: any) => ({
    name: category.name,
    id: category.id,
  }));

  // Keep the sorting configuration
  const sorts = [
    {
      name: "name-asc",
      value: "name,asc",
    },
    {
      name: "name-desc",
      value: "name,desc",
    },
    {
      name: "price-high-low",
      value: "price,desc",
    },
    {
      name: "price-low-high",
      value: "price,asc",
    },
    {
      name: "co2-a-e",
      value: "co2_rating,asc",
    },
    {
      name: "co2-e-a",
      value: "co2_rating,desc",
    },
  ];

  // Create sidebar data
  const sidebarData = {
    sorts,
    categories: sidebarCategories,
    brands: sidebarBrands,
  };

  // Define JSON file path
  const filePath = path.join(process.cwd(), "data", "sidebar-data.json");

  // Write data to JSON file
  fs.writeFileSync(filePath, JSON.stringify(sidebarData, null, 2), "utf-8");

  console.log("sidebar-data.json updated successfully.");

  // Close API request context
  await requestContext.dispose();
}

generateSidebarData();
