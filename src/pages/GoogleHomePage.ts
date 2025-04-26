import { Page, Locator } from '@playwright/test';
import { GOOGLE_HOME_URL } from '../constants';

export class GoogleHomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly cookiesHeader: Locator;
  readonly cookiesLanguageButton: Locator;
  readonly acceptCookiesButtonEN: Locator;
  readonly languagesOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTitle('Search');
    this.cookiesHeader = page.locator('#uMousc');
    this.cookiesLanguageButton = page.locator('#vc3jof');
    this.acceptCookiesButtonEN = page.getByRole('button', { name: 'Accept all' });
    this.languagesOptions = page.getByRole('menuitem');
  }

  async navigate() {
    await this.page.goto(GOOGLE_HOME_URL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Accept cookies if the cookies banner is present (ENGLISH LANGUAGE)
  async acceptCookiesIfPresent() {
    if (await this.cookiesHeader.isVisible()) {
      await this.cookiesLanguageButton.click();
      await this.languagesOptions.filter({ hasText: 'English' }).first().click();
      await this.acceptCookiesButtonEN.click();
    }
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
  }
}