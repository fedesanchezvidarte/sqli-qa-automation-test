import { Page, Locator, expect } from '@playwright/test';

export class WikipediaAutomationPage {
  readonly page: Page;
  readonly firstAutomationYearElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstAutomationYearElement = page.getByText('This was the earliest feedback-controlled mechanism');
  }

  async verifyFirstAutomationYear(expectedYear: string) {
    await expect(this.firstAutomationYearElement).toContainText(expectedYear);
  }
}