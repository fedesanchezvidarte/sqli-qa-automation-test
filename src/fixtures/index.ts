import { test as base } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';
import { GoogleResultsPage } from '../pages/GoogleResultsPage';
import { WikipediaAutomationPage } from '../pages/WikipediaAutomationPage';

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

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

export const newUser: User = {
  id: 0,
  username: 'testuserqa',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  password: 'password123',
  phone: '1234567890',
  userStatus: 1,
};

export { expect } from '@playwright/test';