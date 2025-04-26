import { test as base } from '@playwright/test';
import { GoogleHomePage } from './pages/GoogleHomePage';
import { GoogleResultsPage } from './pages/GoogleResultsPage';
import { WikipediaAutomationPage } from './pages/WikipediaAutomationPage';

// Extend base test
export const test = base.extend<{
  googleHome: GoogleHomePage;
  googleResults: GoogleResultsPage;
  wikipediaPage: WikipediaAutomationPage;
}>({
  googleHome: async ({ page }, use) => {
    const home = new GoogleHomePage(page);
    await home.navigate();
    await home.acceptCookiesIfPresent();
    await use(home);
  },
  googleResults: async ({ page }, use) => {
    await use(new GoogleResultsPage(page));
  },
  wikipediaPage: async ({ page }, use) => {
    await use(new WikipediaAutomationPage(page));
  },
});

export { expect } from '@playwright/test';
