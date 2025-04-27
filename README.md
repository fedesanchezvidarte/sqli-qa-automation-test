# SQLI Group - QA Automation Test

This project was developed to complete the SQLI Spain QAA Test [here](./SQLI%20Spain%20QAA%20Test.pdf).


Exercises included:
- Web automation using Playwright and TypeScript.
- API handling and data processing from the [Swagger PetStore API](https://petstore.swagger.io).

---

## Technologies Used

- Playwright
- TypeScript
- Node.js

---

## Structure

```bash
src/
├── api/          # API request handlers
├── constants/    # Global constants
├── fixtures/     # Playwright fixtures and user data
├── models/       # Business logic classes
├── pages/        # Page Object Models for web automation
└── tests/
    ├── api/      # API test cases
    └── ui/       # UI automation test cases
```

---

## Running the Tests

1. Install dependencies:

```bash
npm install
```

2. Run all tests:

```bash
npx playwright test
```

Tests are split between UI automation and API testing.

---