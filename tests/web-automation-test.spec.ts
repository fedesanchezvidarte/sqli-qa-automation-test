import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to Google
    await page.goto("https://www.google.com/");

    // Accept cookies if the prompt appears
    const cookiesLenguageButton = page.locator('#vc3jof');
    const acceptCookiesButtonEN = page.locator('button:has-text("Accept all")');
    const acceptCookiesButtonES = page.locator('button:has-text("Aceptar todo")');
    const englishOption = page.getByRole('menuitem', { name: '‪English‬' });

    if (await acceptCookiesButtonES.isVisible() || await acceptCookiesButtonEN.isVisible()) {
        await cookiesLenguageButton.click();
        await englishOption.click();
        await acceptCookiesButtonEN.click();
    }
});

test.afterEach(async ({ page }) => {
    await page.close();
});

// CAPTCHA manual handling
test("Search for 'automation' and verify Wikipedia details", async ({ page }) => {
    // Search for the word "automation"
    await page.getByTitle("Search").fill("Automation");
    await page.keyboard.press('Enter');

    // CAPTCHA manual handling 
    page.pause();

    // Wait for search results to load
    await page.waitForSelector("#search");

    // Find the Wikipedia link in the search results
    const wikipediaLink = page.getByRole('link', { name: 'Wikipedia', exact: true })
    await wikipediaLink.click();

    // Wait for the Wikipedia page to load
    await page.waitForLoadState('domcontentloaded');

    // Extract the year of the first automatic process
    const expectedYear = "270";
    const firstAutomationYearElement = page.locator("text=This was the earliest feedback-controlled mechanism");
    const firstAutomationYearText = await firstAutomationYearElement.textContent();

    // Assert that the year is correct
    expect(firstAutomationYearText).not.toBeNull();
    expect(firstAutomationYearText).toContain(expectedYear);
    console.log("Year of the first automatic process:", firstAutomationYearText);

    // Take a screenshot of the Wikipedia page
    await firstAutomationYearElement.screenshot({ path: 'screenshots/wikipedia-automation-element.png' });
    //await page.screenshot({ path: '../test-results/screenshots/wikipedia-automation-element.png', fullPage: true });
});