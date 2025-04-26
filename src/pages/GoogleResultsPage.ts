import { Page, Locator } from '@playwright/test';

export class GoogleResultsPage {
  readonly page: Page;
  readonly wikipediaLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wikipediaLink = page.getByRole('link', { name: 'Wikipedia', exact: true });
  }

  async clickWikipediaLink() {
    await this.page.waitForSelector('#search');
    await this.wikipediaLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}