
class LoginPage {


constructor(page) {
    this.page=page;
    this.userName= page.locator('#userEmail');
    this.password= page.locator('#userPassword');
    this.submit = page.locator('[name="login"]');
}

async goTo(){

await this.page.goto('https://rahulshettyacademy.com/client');

}

async LoginToApp(userName, password){

    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.submit.click();
    await this.page.waitForLoadState('networkidle');
}


}

module.exports= {LoginPage};