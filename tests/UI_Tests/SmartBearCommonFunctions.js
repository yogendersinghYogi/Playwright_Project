
const fs=require('fs');

export class LoginLogoutSmartBear {

  constructor(page) {
    this.page = page;
    this.InputUserName = this.page.getByLabel("Username:");
    this.InputPassword = this.page.getByLabel("Password:");
    this.LoginButton = this.page.locator("//input[@id='ctl00_MainContent_login_button']");
    this.Logout_O = this.page.getByRole('menuitem', { name: 'Logout' });
    this.Logout = this.page.locator("//a[text()='Logout']");
    this.icon = this.page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']");
  }

  async gotoURL() {
    await this.page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  }

  async LoginToApp(uname, pass) {
    await this.InputUserName.fill(uname);
    await this.InputPassword.fill(pass);
    await this.LoginButton.click();
  }


  async readExcelFile(filename,sheetname){

    var workbook = readFile(filename);
    var sheet_name_list = workbook.SheetNames;
    var records = utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheetname]]);
    return records;
  }

  async LogoutFromApp() {
    //await this.icon.click()
    await this.Logout.click()
  }
}

