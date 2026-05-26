const {test,expect}= require('@playwright/test');

test('client app', async({page}) =>{
let email='kiran907@gmail.com';
const products= page.locator('.card-body');
await page.goto('https://rahulshettyacademy.com/client');
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill('Test@123');
await page.locator('[name="login"]').click();
const productNames = await page.locator('.card-body b');
//await page.waitForLoadState('networkidle'); // Wait for the network to be idle after login
await productNames.first().waitFor(); // Wait for the product names to be available 
//line 12 will be not working sometimes, So as other option we can use line 13

let ListOfProducts= await productNames.allTextContents();
console.log(ListOfProducts);
let count= await products.count();

for(let i=0; i<count; ++i){

   let requiredProduct=await products.nth(i).locator("b").textContent();
    if(requiredProduct === 'ZARA COAT 3'){
await products.nth(i).locator('text= Add To Cart').click();
break;
    }
}

await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
await expect(page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible();

await page.locator("text=Checkout").click();

await page.locator("div[class='field small'] input").first().fill("476");

await page.locator("div[class='field'] input").last().fill("KiranReddy");
await page.locator("[name='coupon']").fill("rahulshettyacademy");
await page.locator("div button").click();
await page.locator(".mt-1.ng-star-inserted").waitFor();
const coupounText= await page.locator(".mt-1.ng-star-inserted").textContent();
await console.log(coupounText);
await expect(coupounText).toContain("* Coupon Applied");

await page.locator("[placeholder*='Country']").pressSequentially('ind' ,{delay:100});

await page.locator("[class*='ta-results'] ").waitFor();

const dropDown =await page.locator("[class*='ta-results'] button");

let countOfDropDown= await dropDown.count();

for(let i=0; i<countOfDropDown; ++i){

   const country= await dropDown.nth(i).textContent();
   if(country === ' India'){
    await dropDown.nth(i).click();
    break;
   }



}
   await page.locator(".action__submit").click();
const confirmationMsg= await page.locator(".hero-primary").textContent();
   await expect(confirmationMsg).toContain(" Thankyou for the order. ");

   const orderNumber=await page.locator("td label[class='ng-star-inserted']").textContent();
   console.log(orderNumber);
   
   const finalOrderNumber=orderNumber.split('|')[1].trim();
     console.log(finalOrderNumber);
   await page.locator("button[routerlink*='myorders']").click();

   await page.locator("tbody tr").first().waitFor();
  const rows=await page.locator("tbody tr");
    const countOfOrders= await rows.count();
  
    for(let i=0; i< countOfOrders; ++i){
const order= await rows.nth(i).locator("th").textContent();
if(order === finalOrderNumber){

    await rows.nth(i).locator("button").first().click();
    break;
    }
}
const orderDetails= await page.locator(".col-text").textContent();
expect(finalOrderNumber.includes(orderDetails)).toBeTruthy();
});