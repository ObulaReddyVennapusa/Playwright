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

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiutils = new APIutils(apiContext, loginpayload);
  response = await apiutils.createOrder(orderPayload);
});

test("@API place order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody tr").first().waitFor();
  const rows = await page.locator("tbody tr");
  const countOfOrders = await rows.count();

  for (let i = 0; i < countOfOrders; ++i) {
    const order = await rows.nth(i).locator("th").textContent();
    if (order === response.finalOrderNumber) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderDetails = await page.locator(".col-text").textContent();
  expect(response.finalOrderNumber.includes(orderDetails)).toBeTruthy();
});
