import { test } from '../fixtures';
import { Page } from '@playwright/test';
import { SEARCH_QUERY, EXPECTED_YEAR, SCREENSHOT_PATH } from '../constants';

async function handlePotentialCaptcha(page: Page) {
  const isCaptcha = await page.locator('text=detected unusual traffic').isVisible();
  if (isCaptcha) {
    await page.pause(); // Pause for manual CAPTCHA handling
  }
}

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Search for automation and verify Wikipedia details', async ({ googleHome, googleResults, wikipediaPage, page }) => {
  await googleHome.search(SEARCH_QUERY);

  // CAPTCHA manual handling
  await handlePotentialCaptcha(page);

  await googleResults.clickWikipediaLink();
  await wikipediaPage.verifyFirstAutomationYear(EXPECTED_YEAR);
  await wikipediaPage.firstAutomationYearElement.screenshot({ path: `${SCREENSHOT_PATH}firstAutomationYear.png` });
});