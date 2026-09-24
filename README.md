# Tool Shop - Playwright Automation

A Playwright automation project for testing the **Practice Software Testing** web application through UI, API, and API/UI integration testing.

The project uses **TypeScript**, **Playwright**, **Page Object Model (POM)**, reusable API service classes, data-driven testing, and **Zod schema validation** to create maintainable and scalable automated tests.

---

## Demo Application

**Practice Software Testing**

https://practicesoftwaretesting.com/

---

## Technologies

- **Playwright**
- **TypeScript**
- **Node.js**
- **Page Object Model (POM)**
- **Playwright API Testing**
- **Playwright Fixtures**
- **Zod**
- **JSON Test Data**
- **Git / GitHub**
- **Playwright HTML Reporter**
- **Spec-Doc Reporter**
- **Allure Reporter**

---

## Project Structure

```text
Tool Shop - playwright/
│
├── .github/
│
├── api/
│   ├── ApiClient.ts
│   ├── BrandApi.ts
│   ├── CategoryApi.ts
│   └── ProductApi.ts
│
├── data/
│   ├── navigation-data.json
│   ├── product-api-tests.json
│   ├── products.json
│   └── sidebar-data.json
│
├── pages/
│   ├── components/
│   │   ├── CartItem.ts
│   │   └── ProductCard.ts
│   │
│   ├── CartPage.ts
│   ├── HomePage.ts
│   ├── NavigationBar.ts
│   ├── ProductPage.ts
│   └── SideBar.ts
│
├── schemas/
│   └── ProductResponse.schema.ts
│
├── setup/
│   └── generate-sidebar-data.ts
│
├── tests/
│   ├── api/
│   │   └── products.spec.ts
│   │
│   ├── integration/
│   │   └── product-api-ui.spec.ts
│   │
│   └── ui/
│       ├── cart.spec.ts
│       └── search.spec.ts
│
├── utils/
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

Generated folders such as `node_modules/`, `playwright-report/`, and `test-results/` are not included in the source structure above.

---

## Directory Overview

### `api/`

Contains reusable API service classes.

- `ApiClient.ts` — Base API client.
- `ProductApi.ts` — Product-related API requests.
- `BrandApi.ts` — Brand-related API requests.
- `CategoryApi.ts` — Category-related API requests.

This structure keeps API request logic separate from test specifications.

---

### `pages/`

Contains Page Object Model classes for the web application.

- `HomePage.ts` — Home page actions and product-related operations.
- `ProductPage.ts` — Product details and product actions.
- `CartPage.ts` — Shopping cart interactions and validations.
- `NavigationBar.ts` — Navigation functionality.
- `SideBar.ts` — Product filtering and sorting functionality.

#### `pages/components/`

Reusable page components:

- `ProductCard.ts`
- `CartItem.ts`

These components encapsulate repeated UI elements and their interactions.

---

### `data/`

Contains JSON files used as external test data.

- `navigation-data.json`
- `product-api-tests.json`
- `products.json`
- `sidebar-data.json`

Using external data helps keep test logic separate from test parameters and supports data-driven testing.

---

### `schemas/`

Contains Zod schemas used to validate API response structures.

```text
ProductResponse.schema.ts
```

The schema validates the structure of product API responses before the data is used by the integration tests.

---

### `setup/`

Contains setup and data-generation utilities.

```text
generate-sidebar-data.ts
```

This utility is used to generate sidebar-related test data dynamically.

---

### `tests/`

Contains all automated test specifications.

The tests are separated into three categories:

```text
tests/
├── api/
├── integration/
└── ui/
```

This separation keeps UI, API, and integration responsibilities clear and maintainable.

---

# Test Coverage

## 1. UI Testing

UI tests are located in:

```text
tests/ui/
```

### Product Search

File:

```text
tests/ui/search.spec.ts
```

The search scenario validates product searching using different search criteria.

The automated flow includes:

1. Open the application.
2. Search for products using different criteria.
3. Identify the matching product.
4. Open the product details page.
5. Add the product to the shopping cart.
6. Continue the flow for the required products.
7. Navigate to the shopping cart.
8. Validate that the selected products exist in the cart.

The test is designed to work with dynamic product data instead of relying on fixed product names.

---

### Shopping Cart

File:

```text
tests/ui/cart.spec.ts
```

The cart tests validate the shopping cart behavior after products are added.

The scenario includes validations related to:

- Products added to the cart.
- Product information.
- Cart item quantity.
- Cart contents.
- Cart updates.

Reusable components such as `CartItem` are used to keep cart-related interactions maintainable.

---

# 2. API Testing

API tests are located in:

```text
tests/api/
```

### Retrieve Product Data Using API Requests

File:

```text
tests/api/products.spec.ts
```

The API tests retrieve product information directly through API requests.

The tests validate:

- API response status.
- Product response data.
- Response content.
- API response structure.
- Product information returned by the API.

Reusable API methods are implemented through the API service classes under:

```text
api/
```

---

# 3. API and UI Integration Testing

Integration tests are located in:

```text
tests/integration/
```

### Compare API Products with UI Products Using Filters

File:

```text
tests/integration/product-api-ui.spec.ts
```

This scenario connects API testing with UI testing.

The test:

1. Reads test parameters from:

```text
data/product-api-tests.json
```

2. Sends a product API request using the reusable `ProductApi` service.
3. Validates the expected HTTP status.
4. Validates the API response using a Zod schema.
5. Extracts product data from the API response.
6. Opens the application's home page.
7. Applies the corresponding UI filters.
8. Retrieves the product names displayed on the UI.
9. Retrieves the product names returned by the API.
10. Compares the API and UI product results.

The integration test supports parameters such as:

- Sorting.
- Category filtering.
- Brand-related filtering.
- Price range filtering.

The purpose of this test is to verify that the products displayed by the UI are consistent with the products returned by the API for the corresponding test criteria.

---

# API Response Validation

The project uses **Zod** to validate API response structures.

The schema is located at:

```text
schemas/ProductResponse.schema.ts
```

The API response is parsed before its data is used:

```ts
const apiResponse = ProductsResponseSchema.parse(body);
```

This provides an additional validation layer beyond checking the HTTP status code.

It helps detect unexpected API response structures and makes API/UI integration validation more reliable.

---

# Data-Driven Testing

The project uses JSON files to separate test data from test logic.

For example:

```text
data/product-api-tests.json
```

contains product API test scenarios and their parameters.

The integration tests iterate through the test data instead of creating a separate hard-coded test for every filter combination.

This approach makes it easier to:

- Add new test cases.
- Modify existing parameters.
- Reuse test logic.
- Reduce duplicated test code.
- Maintain test scenarios independently from implementation logic.

---

# Page Object Model

The project follows the **Page Object Model (POM)** design pattern.

Page-specific functionality is encapsulated inside dedicated classes.

Example:

```text
pages/
├── HomePage.ts
├── ProductPage.ts
├── CartPage.ts
├── NavigationBar.ts
└── SideBar.ts
```

This keeps test specifications focused on the testing flow rather than low-level locator implementation.

For example, tests can interact with functionality through methods such as:

```ts
homePage.sideBar.sortBy(...)
homePage.sideBar.selectCategory(...)
homePage.sideBar.setPriceRange(...)
```

instead of directly interacting with locators inside the test.

---

# Reusable API Services

API functionality is separated into reusable service classes.

```text
api/
├── ApiClient.ts
├── BrandApi.ts
├── CategoryApi.ts
└── ProductApi.ts
```

This architecture prevents API request logic from being duplicated across different test files.

For example, product requests can be handled through:

```ts
const productApi = new ProductApi(request);

const response = await productApi.getProducts(params);
```

This makes the API layer reusable by both API tests and integration tests.

---

# Playwright Fixtures

The project uses Playwright fixtures to provide reusable test dependencies.

The custom fixtures include:

- `homePage`
- `apiClient`

The fixtures initialize the required objects before they are used by tests.

This reduces repeated setup code and provides typed access to common testing resources.

---

# Installation

## Prerequisites

Before installing the project, make sure the following are installed:

- Node.js
- npm
- Git
- Playwright browsers
- Infisical CLI if environment secrets are required

Verify Node.js:

```cmd
node --version
```

Verify npm:

```cmd
npm --version
```

---

## Clone the Repository

Clone the repository:

```cmd
git clone <repository-url>
```

Navigate to the project directory:

```cmd
cd "Tool Shop - playwright"
```

---

## Install Dependencies

Run:

```cmd
npm install
```

Install Playwright browsers:

```cmd
npx playwright install
```

---

# Environment Variables and Secrets

Sensitive values should not be stored directly in the test source code.

The project uses **Infisical** to manage environment variables and secrets.

If Infisical is configured for the project, tests can be executed with:

```cmd
infisical run --env=dev -- npx playwright test
```

Make sure the required secrets and environment variables are configured before running the tests.

Do not commit passwords, API secrets, tokens, or other sensitive credentials to Git.

---

# Running Tests

## Run All Tests

```cmd
infisical run --env=dev -- npx playwright test
```

---

## Run Tests with List Reporter

```cmd
infisical run --env=dev -- npx playwright test --reporter=list
```

---

## Run Tests in Headed Mode

```cmd
infisical run --env=dev -- npx playwright test --headed
```

---

## Run Tests in UI Mode

```cmd
infisical run --env=dev -- npx playwright test --ui
```

---

## Run Tests in Debug Mode

```cmd
infisical run --env=dev -- npx playwright test --debug
```

---

# Running Specific Test Suites

## UI Tests

```cmd
infisical run --env=dev -- npx playwright test tests/ui
```

---

## API Tests

```cmd
infisical run --env=dev -- npx playwright test tests/api
```

---

## Integration Tests

```cmd
infisical run --env=dev -- npx playwright test tests/integration
```

---

## Run a Specific Test File

For example:

```cmd
infisical run --env=dev -- npx playwright test tests/ui/search.spec.ts
```

Or:

```cmd
infisical run --env=dev -- npx playwright test tests/api/products.spec.ts
```

---

# Test Reports

## Playwright HTML Report

After running the tests, the standard Playwright report can be opened with:

```cmd
npx playwright show-report
```

The report provides information about:

- Passed tests.
- Failed tests.
- Test duration.
- Errors.
- Screenshots.
- Videos.
- Traces when enabled.

---

## Spec-Doc Report

If the Spec-Doc reporter is configured and generates the following directory:

```text
spec-doc-report/
```

open the report with:

```cmd
start .\spec-doc-report\index.html
```

---

## Allure Report

If Allure results are generated:

```cmd
npx allure generate allure-results --clean -o allure-report
```

Then open the report:

```cmd
npx allure open allure-report
```

---

# Configuration

Playwright configuration is maintained in:

```text
playwright.config.ts
```

The configuration controls project-wide settings such as:

- Base URL.
- Browser projects.
- Test timeout.
- Retries.
- Workers.
- Reporters.
- Screenshots.
- Videos.
- Traces.

The project is configured to support browser-based automation with Playwright.

---

# Test Architecture

The project follows a layered automation architecture:

```text
                    Playwright Tests
                           │
             ┌─────────────┼─────────────┐
             │             │             │
            UI           API       Integration
             │             │             │
             ▼             ▼             ▼
         Page Objects   API Services   API + UI
             │             │             │
             └─────────────┼─────────────┘
                           │
                     Test Data / Schemas
                           │
                           ▼
                    Practice Software
                       Testing API
```

### UI Layer

Responsible for:

- Browser interactions.
- Product search.
- Product selection.
- Cart operations.
- UI assertions.

### API Layer

Responsible for:

- API requests.
- Product retrieval.
- Status validation.
- API response handling.

### Integration Layer

Responsible for:

- Combining API and UI validation.
- Applying the same filtering criteria.
- Comparing API and UI product results.

### Data Layer

Responsible for:

- Test parameters.
- Product-related data.
- Navigation data.
- Sidebar data.

### Schema Layer

Responsible for:

- Validating API response structures using Zod.

---

# Implemented Scenarios

| Area           | Scenario                                              | Location                                   |
| -------------- | ----------------------------------------------------- | ------------------------------------------ |
| UI             | Search for products using different search criteria   | `tests/ui/search.spec.ts`                  |
| UI             | Add and validate products in the shopping cart        | `tests/ui/cart.spec.ts`                    |
| API            | Retrieve product data using API requests              | `tests/api/products.spec.ts`               |
| Integration    | Compare API products with UI products using filters   | `tests/integration/product-api-ui.spec.ts` |
| API Validation | Validate product response structure using Zod         | `schemas/ProductResponse.schema.ts`        |
| Data-Driven    | Execute product API/UI scenarios using JSON test data | `data/product-api-tests.json`              |

---

# Design Principles

The project follows several automation best practices:

### Separation of Concerns

UI, API, integration, test data, and schemas are maintained in separate layers.

### Reusability

Common functionality is implemented through:

- Page Objects.
- Components.
- API service classes.
- Fixtures.
- Utility functions.

### Maintainability

Tests are written around reusable methods instead of directly depending on implementation details.

### Data-Driven Testing

Test parameters are stored separately from the test logic.

### API and UI Validation

API responses are validated independently and can also be compared with UI results through integration tests.

### Schema Validation

Zod schemas provide structural validation for API responses.

---

# Security

Sensitive information should never be committed to the repository.

The following should be excluded from version control where applicable:

```text
.env
.env.*
secrets
credentials
API tokens
passwords
```

Use Infisical or another secure secret-management solution for sensitive environment variables.

---

# References

### Playwright

Playwright Documentation:

https://playwright.dev/docs/intro

### Practice Software Testing

Demo Application:

https://practicesoftwaretesting.com/

### Practice Software Testing API

API Documentation:

https://api.practicesoftwaretesting.com/api/documentation

---

## 👩‍💻 Author

**Hanadi Al-Za’areer**

Software Engineering / QA Automation

ASAL Technologies
