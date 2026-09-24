import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  readonly request: APIRequestContext;

  // API Base URL
  readonly apiBaseUrl = "https://api-with-bugs.practicesoftwaretesting.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }
}
