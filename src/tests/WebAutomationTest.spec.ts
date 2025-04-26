import { test } from '../fixtures';
import { SEARCH_QUERY, EXPECTED_YEAR, SCREENSHOT_PATH } from '../constants';

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Search for automation and verify Wikipedia details', async ({ googleHome, googleResults, wikipediaPage, page }) => {
  await googleHome.search(SEARCH_QUERY);

  // CAPTCHA manual handling
  page.pause();

  await googleResults.clickWikipediaLink();
  await wikipediaPage.verifyFirstAutomationYear(EXPECTED_YEAR);
  await wikipediaPage.firstAutomationYearElement.screenshot({ path: `${SCREENSHOT_PATH}firstAutomationYear.png` });
});