const {test,expect}= require('@playwright/test');


test('visual testing', async({page}) =>{


    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadButton = await page.locator("#downloadButton");
    await downloadButton.waitFor();
    expect(await page.screenshot()).toMatchSnapshot('upload-download.png');



});