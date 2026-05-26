const { test, expect, request } = require("@playwright/test");
const { APIutils } = require("../utils/APIutils");

const loginpayload = {
  userEmail: "kiran907@gmail.com",
  userPassword: "Test@123",
};

const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

let response;
let fakePayLoad= {data:[],message:"No Orders"};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiutils = new APIutils(apiContext, loginpayload);
  response = await apiutils.createOrder(orderPayload);
});

test("place order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a035e7c965c23b43b13c9bd",
   
    async route => {
 const responseBody= await page.request.fetch(route.request());
 let fakebody= JSON.stringify(fakePayLoad);
 route.fulfill({
    responseBody,
    fakebody,
});

    });

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a035e7c965c23b43b13c9bd");
  
 console.log(await page.locator(".mt-4").textContent());

});
