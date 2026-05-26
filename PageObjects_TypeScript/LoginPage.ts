import {Page,Locator} from '@playwright/test';

export class LoginPage {
page:Page;
userName:Locator;
password:Locator;
submit:Locator;

constructor(page:Page) {
    this.page=page;
    this.userName= page.locator('#userEmail');
    this.password= page.locator('#userPassword');
    this.submit = page.locator('[name="login"]');
}

async goTo(){

await this.page.goto('https://rahulshettyacademy.com/client');

}

async LoginToApp(userName:string, password: string){

    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.submit.click();
    await this.page.waitForLoadState('networkidle');
}


}

module.exports= {LoginPage};