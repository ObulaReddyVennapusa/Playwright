const {test,expect}= require('@playwright/test');


test('first programme', async({browser}) =>{

    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());


});

test('using page context', async({page})=>{

await page.goto('https://google.com');
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});