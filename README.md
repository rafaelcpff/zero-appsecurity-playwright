# Zero App - Playwright + TypeScript Smoke tests

E2E smoke tests for [Zero App](http://zero.webappsecurity.com/index.html) using Playwright and TS.

## Setup

```bash
npm install
npx playwright install
```

## Run tests

- **All tests:** `npm test`
- **Report:** `npm run report` (after a run)

## Smoke test scope

| # | Area | Description |
|---|------|-------------|
| 1 | **Navigation** | Home -> Online Banking -> Feedback; navigation is visible and usable on each page. |
| 2 | **Responsive** | Home, Online Banking, Feedback at iPhone, Android, tablet, desktop viewports. |
| 3 | **Feedback validation** | Empty required fields and invalid email formats do not successfully submit. |

## Structure

- **`pages/`** - Page objects: UI structure and low-level actions (locators, click).
- **`steps/`** - Step definition layer: business logic and user flows. Tests call steps.
- **tests/`** - Test layer: assertions mainly. Uses steps to perform most of the actions, then asserts on state.
- `playwright.config.ts` - Base URL, browsers, timeouts.

Base URL: `http://zero.webappsecurity.com/`