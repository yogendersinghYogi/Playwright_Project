import { test, expect } from '@playwright/test';


test.describe('Login scenarios valid/invalid', () => {
  
  
test('Invalid login test', async ({ page }) => {
  await page.goto('https://brillio91-dev-ed.develop.my.salesforce.com/');
  await expect(page).toHaveTitle(/Login | Salesforce/);
  await page.getByRole('textbox', { name: 'Username' }).fill('yogendersingh500@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('ThisIsSpartaThisIsSparta');
  await page.getByRole('button', { name: 'Log In' }).click({timeout : 5000});
 // await expect(page.getByRole('form', {name: 'login'})).toBeEnabled();
  const locator = page.locator('//div[@class="loginError" and @aria-live="polite"]');
 await expect(locator).toHaveText(/Please check your username and password. If you still can't log in, contact your Salesforce administrator./)
});

test('Valid login test @smoke', async ({ page }) => {
  await page.goto('https://brillio347-dev-ed.develop.my.salesforce.com');
  await expect(page).toHaveTitle(/Login | Salesforce/);
  await page.getByRole('textbox', { name: 'Username' }).fill('yogendersingh500@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('DaisyYogi@1045');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForTimeout(10000);
  await page.getByRole('tab', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'App Launcher' }).click();
  //await page.getByRole('combobox', { name: 'Search apps and items...' }).click();
  await page.getByRole('combobox', { name: 'Search apps and items...' }).fill('sales');
  await page.getByRole('option', { name: 'Sales', exact: true }).click();
  await expect(page.getByTitle('Sales')).toBeVisible();
  await expect(page.locator('one-appnav')).toContainText('Sales');
  await expect(page.locator('#dashboard-0FKWU0000006HWu4AM-0')).toMatchAriaSnapshot(`- text: ANALYTICS FOR MANUFACTURING`);
});


});