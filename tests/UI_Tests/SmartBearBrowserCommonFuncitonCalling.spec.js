// @ts-check
import { test, expect } from '@playwright/test';
import { LoginLogoutSmartBear } from './SmartBearCommonFunctions';


//using browser instead of page as we will be using single beowser instance to execuete cases in sequence
// (have dependent test cases), fully parallel has to be false
test.describe('End to End case for smart bear software @smartBear', () => {
  
  let commonbearPage;
  const username='Tester';
  const pwd='Test';

    test.beforeEach(async ({ page }) => {

        commonbearPage= new LoginLogoutSmartBear(page);
        await commonbearPage.gotoURL();
        //await page.waitForURL(URL);
        await commonbearPage.LoginToApp(username,pwd);
    });


    test('Create order', async() => {
        //   await page.getByRole('link', { name: 'Order' }).nth(1).click();

        await expect(commonbearPage.getByRole('heading', { name: 'Web Orders' })).toBeVisible();
        await commonbearPage.getByRole('link', { name: 'Order', exact: true }).click();
        await commonbearPage.getByLabel('Product:*').selectOption('FamilyAlbum');
        await commonbearPage.getByRole('textbox', { name: 'Quantity:*' }).fill('12');
        await commonbearPage.getByRole('textbox', { name: 'Price per unit:' }).fill('10');
        await commonbearPage.getByRole('textbox', { name: 'Discount:' }).fill('20');
        await commonbearPage.getByRole('textbox', { name: 'Total:' }).click();
        await commonbearPage.getByRole('button', { name: 'Calculate' }).click();
        const Name = 'Yogi' + new Date().getTime();
        //const username1= 'Yogi' +  Date().now();

        await commonbearPage.getByRole('textbox', { name: 'Customer name:*' }).fill(username);
        await commonbearPage.getByRole('textbox', { name: 'Street:*' }).fill('US');
        await commonbearPage.getByRole('textbox', { name: 'City:*' }).fill('NY');
        await commonbearPage.getByRole('textbox', { name: 'State:' }).fill('UK');
        await commonbearPage.getByRole('textbox', { name: 'Zip:*' }).fill('12345');
        await commonbearPage.getByText('Visa').click();
        await commonbearPage.getByRole('textbox', { name: 'Card Nr:*' }).fill('1234567789');
        await commonbearPage.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill('12/12');
        await commonbearPage.getByRole('link', { name: 'Process' }).click();
        await commonbearPage.getByRole('link', { name: 'View all orders' }).click();
        //await expect(page.getByRole('cell', { name: username, exact: true })).toBeVisible();

        const userrow = commonbearPage.locator('table tr').filter({ has: commonbearPage.locator('td') }).filter({ hasText: username });

        await expect(commonbearPage.locator('#ctl00_MainContent_orderGrid').filter({ hasText: username })).toHaveText(username, { timeout: 5000 });

        //clikcin on edit button on row
        await commonbearPage.locator('#ctl00_MainContent_orderGrid tr', {
            has: commonbearPage.locator('td', { hasText: username })
        }).locator('input[alt="edit"]').click();

        //verifying updated city
        const updateUserRow = commonbearPage.locator('#ctl00_MainContent_orderGrid tr').filter({ has: commonbearPage.locator('td', { hasText: username }) });

        await expect(updateUserRow.locator('td', { hasText: 'US' })).toHaveText('US', { timeout: 5000 });

    });

     test('Update Order', async () => {
    // Update the Order details
 
    await commonbearPage.locator("//td[normalize-space()='" + username + "']//following-sibling::td/input").click();
    await commonbearPage.waitForTimeout(3000)
    await commonbearPage.locator('#ctl00_MainContent_fmwOrder_TextBox3').clear()
    await commonbearPage.locator('#ctl00_MainContent_fmwOrder_TextBox3').fill('Delhi');
    await commonbearPage.locator("#ctl00_MainContent_fmwOrder_UpdateButton").click()
 
    //Verify that City value change to Delhi
    await expect(commonbearPage.locator("//td[normalize-space()='" + username + "']//following-sibling::td[text()='Delhi']")).toHaveText("Delhi")
  });
 
  test('Delete Order', async () => {
    // Delete the Order and Verify that Order got deleted
 
    await commonbearPage.locator("//td[normalize-space()='" + username + "']//preceding-sibling::td/input").click();
    await commonbearPage.locator("#ctl00_MainContent_btnDelete").click()
    // Verify that user got deleted
 
    await expect(commonbearPage.locator('#ctl00_MainContent_orderGrid')).not.toContainText(username);
 
  });
    test.afterAll('Logout from app', async () => {
        await commonbearPage.LogoutFromApp();
    });





});

