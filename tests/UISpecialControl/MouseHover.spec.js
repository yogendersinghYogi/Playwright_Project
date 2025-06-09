import { test, expect } from '@playwright/test';

test('Flipkart Login Page Mouse Hover', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.waitForLoadState('networkidle');
  await page.hover("//span[normalize-space()='Login']")
  await page.click("//li[normalize-space()='My Profile']");
  await expect(page.locator("//button[normalize-space()='Request OTP']")).toHaveText("Request OTP")
  await expect(page.locator("//button[normalize-space()='Request OTP']")).toBeVisible()
  await page.waitForTimeout(5000)
});