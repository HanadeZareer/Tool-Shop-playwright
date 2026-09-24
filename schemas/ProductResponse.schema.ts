import { z } from "zod";

export const BrandResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
});

export const CategoryResponseSchema = z.object({
  id: z.number().int(),
  parent_id: z.number().int().nullable(),
  name: z.string(),
  slug: z.string(),
});

export const ImageResponseSchema = z.object({
  id: z.number().int(),
  by_name: z.string(),
  by_url: z.string(),
  source_name: z.string(),
  source_url: z.string(),
  file_name: z.string(),
  title: z.string(),
});

export const ProductResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  stock: z.number().int(),
  price: z.number(),
  is_location_offer: z.number().int(),
  is_rental: z.number().int(),
  co2_rating: z.enum(["A", "B", "C", "D", "E"]),
  brand_id: z.number().int(),
  category_id: z.number().int(),
  product_image_id: z.number().int(),
  is_eco_friendly: z.boolean(),

  product_image: ImageResponseSchema,
  category: CategoryResponseSchema,
  brand: BrandResponseSchema,
});

export const ProductsResponseSchema = z.object({
  current_page: z.number().int(),
  data: z.array(ProductResponseSchema),
  from: z.number().int().nullable(),
  last_page: z.number().int(),
  per_page: z.number().int(),
  to: z.number().int().nullable(),
  total: z.number().int(),
});
