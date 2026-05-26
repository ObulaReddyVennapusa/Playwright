const {test,expect}= require('@playwright/test');

test('client app', async({page}) =>{
let email='kiran907@gmail.com';
await page.goto('https://rahulshettyacademy.com/client');
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill('Test@123');
await page.locator('[name="login"]').click();

await page.locator("button[routerlink*='myorders']").click();

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>
 route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a0217b8965c23b43b10dcf6" 

 })
);

await page.locator("button:has-text('View')").first().click();
await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

});