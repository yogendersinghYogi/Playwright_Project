// @ts-check
import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

test.describe('End to End case for smart bear software @smartBear', () => {
  

  test.beforeEach(async({page})=>{ 
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Password:' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
})
test('Go to Order Page', async ({ page }) => {
    await page.getByRole('link', { name: 'Order' }).nth(1).click();

  });

  test('Go to View All Order Page', async ({ page }) => {
    await page.getByRole('link', { name: 'View all orders' }).click();

  });
  test('order submission', async({page})=>{
 
  await expect(page.getByRole('heading', { name: 'Web Orders' })).toBeVisible();
  await page.getByRole('link', { name: 'Order', exact: true }).click();
   await page.getByLabel('Product:*').selectOption('FamilyAlbum');
  await page.getByRole('textbox', { name: 'Quantity:*' }).fill('12');
  await page.getByRole('textbox', { name: 'Price per unit:' }).fill('10');
  await page.getByRole('textbox', { name: 'Discount:' }).fill('20');
  await page.getByRole('textbox', { name: 'Total:' }).click();
  await page.getByRole('button', { name: 'Calculate' }).click();
  const username= 'Yogi' + Math.random() * 10000;
  //const username= 'Yogi' + date
  await page.getByRole('textbox', { name: 'Customer name:*' }).fill(username);
  await page.getByRole('textbox', { name: 'Street:*' }).fill('US');
  await page.getByRole('textbox', { name: 'City:*' }).fill('NY');
  await page.getByRole('textbox', { name: 'State:' }).fill('UK');
  await page.getByRole('textbox', { name: 'Zip:*' }).fill('12345');
  await page.getByText('Visa').click();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).fill('1234567789');
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill('12/12');
  await page.getByRole('link', { name: 'Process' }).click();
  await page.getByRole('link', { name: 'View all orders' }).click();
  await expect(page.getByRole('cell', { name: username, exact: true })).toBeVisible();
  });

  test.afterEach('Logout from app', async ({ page }) => {
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx")
  });


});




