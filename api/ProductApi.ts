import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "./ApiClient";

export class ProductApi extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // Get products from the API
  async getProducts(params?: {
    by_brand?: number;
    by_category?: number;
    is_rental?: string;
    between?: string;
    sort?: string;
  }): Promise<APIResponse> {
    return await this.request.get(`${this.apiBaseUrl}/products`, {
      params,
    });
  }
}
