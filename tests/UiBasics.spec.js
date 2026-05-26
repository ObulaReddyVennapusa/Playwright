const{test,expect}= require('@playwright/test');

test('first programme', async({page}) =>{
const UserName= page.locator('#username');
const submit= page.locator('[type="submit"]');
const cardTitles= page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await UserName.fill('kiran');
    await page.locator('#password').fill('Learning@830$3mK2');
    await submit.click();

   console.log(await page.locator('[style*="block"]').textContent());

   await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

   await UserName.fill('');
   await UserName.fill('rahulshettyacademy');
   await submit.click();

   console.log(await cardTitles.first().textContent());
   //console.log(await cardTitles.nth(1).textContent());

   console.log(await cardTitles.allTextContents());



});


test('UI validations', async({page})=>{
const UserName= page.locator('#username');
const submit= page.locator('[type="submit"]');
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await UserName.fill('rahulshettyacademy');
await page.locator('#password').fill('Learning@830$3mK2');

await page.locator('select.form-control').selectOption('teach');

await page.locator('.radiotextsty').last().check();
await page.locator('#okayBtn').click();
await expect(  page.locator('.radiotextsty').last()).toBeChecked();

await page.locator('[type="checkbox"]').check();
await expect( page.locator('[type="checkbox"]')).toBeChecked();
await page.locator('[type="checkbox"]').uncheck();
 expect(await page.locator('[type="checkbox"]').isChecked()).toBeFalsy();
await expect(page.locator("[href*=documents-request]")).toHaveAttribute('class','blinkingText');


});


test('window handling', async({browser})=>{

    const context = await browser.newContext();
    const page= await context.newPage();
const UserName= page.locator('#username');
const blinkingText=page.locator("[href*=documents-request]");
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    blinkingText.click()
])
  
const text=await newPage.locator(".red").textContent();

const splitText=text.split('@')[1];
const domain=splitText.split(' ')[0];
//console.log(domain);
await page.locator('#username').fill(domain);
console.log(await page.locator('#username').inputValue());



});
