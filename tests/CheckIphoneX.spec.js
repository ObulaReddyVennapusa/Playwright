const { test, expect } = require('@playwright/test');

// Robust helper: return first locator that exists from a list of selectors
async function firstMatchingLocator(page, selectors) {
  for (const sel of selectors) {
    const loc = page.locator(sel);
    if (await loc.count() > 0) return loc.first();
  }
  return null;
}

test('Login and verify iPhone X on shop page', async ({ page }) => {
  const loginUrl = 'https://rahulshettyacademy.com/loginpagePractise/';
  const expectedShopUrl = 'https://rahulshettyacademy.com/angularpractice/shop';

  await page.goto(loginUrl);

  const userLoc = await firstMatchingLocator(page, ['#username', "input[name='username']", '#userEmail']);
  const passLoc = await firstMatchingLocator(page, ['#password', "input[name='password']", '#userPassword']);
  const checkboxLoc = await firstMatchingLocator(page, ['input[type="checkbox"]', "input[name='remember']", "#terms"]);
  const signInLoc = await firstMatchingLocator(page, ["text=Sign In", "button[type='submit']", "input[type='submit']"]);

  if (!userLoc || !passLoc || !signInLoc) {
    throw new Error('Could not locate required login controls on the page');
  }

  await userLoc.fill('rahulshettyacademy');
  await passLoc.fill('Learning@830$3mK2');

  if (checkboxLoc) await checkboxLoc.check().catch(() => checkboxLoc.click());

  await Promise.all([
    page.waitForURL('**/angularpractice/shop', { timeout: 10000 }),
    signInLoc.click()
  ]);

  // Verify 'iphone X' is present on the shop page
  const productLocator = page.locator('text=iphone X');
  await expect(productLocator).toBeVisible({ timeout: 5000 });
});
