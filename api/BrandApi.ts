import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "./ApiClient";

export class BrandApi extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // Get all brands
  async getBrands(): Promise<APIResponse> {
    return await this.request.get(`${this.apiBaseUrl}/brands`);
  }
}
