const {test,expect}= require('@playwright/test');

test('@Web client app', async({page}) =>{
let email='kiran907@gmail.com';
const products= page.locator('.card-body');
await page.goto('https://rahulshettyacademy.com/client');
await page.getByPlaceholder('email@example.com').fill(email);
await page.getByPlaceholder('enter your passsword').fill('Test@123');
await page.getByRole("button", {name: "Login"}).click();
const productNames = await page.locator('.card-body b');
await productNames.first().waitFor(); 

await page.locator('.card-body').filter({hasText: "ZARA COAT 3"}).getByRole("button", {name : "Add To Cart"}).click();

await page.getByRole("listitem").getByRole("button", {name : "Cart"}).click();
await page.locator("div li").first().waitFor();
await page.getByText('ZARA COAT 3').isVisible();

await page.getByRole("button", {name :"Checkout"}).click();

await page.locator("div[class='field small'] input").first().fill("476");

await page.locator("div[class='field'] input").last().fill("KiranReddy");
await page.locator("[name='coupon']").fill("rahulshettyacademy");
await page.locator("div button").click();
await page.locator(".mt-1.ng-star-inserted").waitFor();
const coupounText= await page.locator(".mt-1.ng-star-inserted").textContent();
await console.log(coupounText);
await expect(coupounText).toContain("* Coupon Applied");

await page.getByPlaceholder("Select Country").pressSequentially('ind' ,{delay:100});

await page.getByRole("button", {name: "India"}).nth(1).click();

   await page.getByText("PLACE ORDER").click();

   await page.getByText("Thankyou for the order.").isVisible();

  
});