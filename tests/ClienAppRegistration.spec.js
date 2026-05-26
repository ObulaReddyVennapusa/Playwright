const{test,expect}= require('@playwright/test');

test('first programme', async({page}) =>{
let email='kiran907@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('[class*="text-reset"]').click();
    await page.locator('#firstName').fill('kiran');
await page.locator('#lastName').fill('Reddy');
await page.locator('[formcontrolname="userEmail"]').fill(email);
await page.locator('#userMobile').fill('9876543210');
await page.locator('#userPassword').fill('Test@123');
await page.locator('[formcontrolname="confirmPassword"]').fill('Test@123');
await page.locator('[type="checkbox"]').check();
await page.locator('[value="Register"]').click();

await page.locator('.btn.btn-primary').click();
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill('Test@123');
await page.locator('[name="login"]').click();

});
