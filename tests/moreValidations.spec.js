const {test,expect}= require ('@playwright/test');

test('UI validations', async({browser})=>{
 const context = await browser.newContext();
    const page= await context.newPage();
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//isVisible, isHidden,
await page.locator("#displayed-text").isVisible();
await page.locator("#hide-textbox").click();
await page.locator("#displayed-text").isHidden();

//handling alerts

page.on('dialog', dialog => dialog.accept()); 
// this has to be written without await as it is an event listener and not a promise

await page.locator("#alertbtn").click();

//mouse hover

await page.locator("#mousehover").hover();


//frames

const framePage = page.frameLocator("#courses-iframe");

await framePage.locator("li a[href='lifetime-access']:visible").click();

const count=await framePage.locator(".text h2").textContent();
const courseCount = count.split(" ")[1];
console.log(courseCount);

const [newpage] = await Promise.all([
context.waitForEvent('page'),
page.locator("#opentab").click()
]);
await newpage.waitForLoadState();
const title =await newpage.title();
console.log(title); 
});