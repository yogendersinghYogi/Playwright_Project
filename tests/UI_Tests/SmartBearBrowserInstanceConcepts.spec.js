// @ts-check
import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';


//using browser instead of page as we will be using single beowser instance to execuete cases in sequence
// (have dependent test cases), fully parallel has to be false
test.describe('End to End case for smart bear software @smartBear', () => {
  
  let page;
  let username;

    const URL='http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx';

    test.beforeAll(async ({ browser }) => {

        page=await browser.newPage();
        await page.goto(URL);
        //await page.waitForURL(URL);

        await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
        await page.getByRole('textbox', { name: 'Password:' }).fill('test');
        await page.getByRole('button', { name: 'Login' }).click();
    });


    test('Create order', async() => {
        //   await page.getByRole('link', { name: 'Order' }).nth(1).click();

        await expect(page.getByRole('heading', { name: 'Web Orders' })).toBeVisible();
        await page.getByRole('link', { name: 'Order', exact: true }).click();
        await page.getByLabel('Product:*').selectOption('FamilyAlbum');
        await page.getByRole('textbox', { name: 'Quantity:*' }).fill('12');
        await page.getByRole('textbox', { name: 'Price per unit:' }).fill('10');
        await page.getByRole('textbox', { name: 'Discount:' }).fill('20');
        await page.getByRole('textbox', { name: 'Total:' }).click();
        await page.getByRole('button', { name: 'Calculate' }).click();
        username = 'Yogi' + new Date().getTime();
        //const username1= 'Yogi' +  Date().now();

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
        //await expect(page.getByRole('cell', { name: username, exact: true })).toBeVisible();

        const userrow = page.locator('table tr').filter({ has: page.locator('td') }).filter({ hasText: username });

        await expect(page.locator('#ctl00_MainContent_orderGrid').filter({ hasText: username })).toHaveText(username, { timeout: 5000 });

        //clikcin on edit button on row
        await page.locator('#ctl00_MainContent_orderGrid tr', {
            has: page.locator('td', { hasText: username })
        }).locator('input[alt="edit"]').click();

        //verifying updated city
        const updateUserRow = page.locator('#ctl00_MainContent_orderGrid tr').filter({ has: page.locator('td', { hasText: username }) });

        await expect(updateUserRow.locator('td', { hasText: 'US' })).toHaveText('US', { timeout: 5000 });

    });

     test('Update Order', async () => {
    // Update the Order details
 
    await page.locator("//td[normalize-space()='" + username + "']//following-sibling::td/input").click();
    await page.waitForTimeout(3000)
    await page.locator('#ctl00_MainContent_fmwOrder_TextBox3').clear()
    await page.locator('#ctl00_MainContent_fmwOrder_TextBox3').fill('Delhi');
    await page.locator("#ctl00_MainContent_fmwOrder_UpdateButton").click()
 
    //Verify that City value change to Delhi
    await expect(page.locator("//td[normalize-space()='" + username + "']//following-sibling::td[text()='Delhi']")).toHaveText("Delhi")
  });
 
  test('Delete Order', async () => {
    // Delete the Order and Verify that Order got deleted
 
    await page.locator("//td[normalize-space()='" + username + "']//preceding-sibling::td/input").click();
    await page.locator("#ctl00_MainContent_btnDelete").click()
    // Verify that user got deleted
 
    await expect(page.locator('#ctl00_MainContent_orderGrid')).not.toContainText(username);
 
  });
    test.afterAll('Logout from app', async () => {
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL(/.*Login\.aspx/)
    });





});

