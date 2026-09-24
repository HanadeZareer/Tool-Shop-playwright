import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "./ApiClient";

export class CategoryApi extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // Get all categories
  async getCategories(): Promise<APIResponse> {
    return await this.request.get(`${this.apiBaseUrl}/categories`);
  }
}
