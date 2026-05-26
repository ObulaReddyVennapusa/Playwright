const { test, expect } = require("@playwright/test");
const { POManager } = require("../PageObjects/POManager");

 const testdata=JSON.parse(JSON.stringify(require('../utils/orderTestData.json')));

 for(const data of testdata){

test(`@Web client app ${data.productName}`, async ({ page }) => {
  const poManger = new POManager(page);

  const loginPage = poManger.getLoginPage();
  await loginPage.goTo();
  await loginPage.LoginToApp(data.UserName, data.Password);

  const dashboardPage = poManger.getDashboardPage();
  await dashboardPage.SearchAndAddProductToCart(data.productName);
  await dashboardPage.GoToCart();

  const orderdetailsPage = poManger.getOrderdetailsPage();
  await orderdetailsPage.ValidatingProductInCheckout(data.productName);
  await orderdetailsPage.goToCheckouot();

  const checkoutPage = poManger.getCheckoutPage();
  await checkoutPage.personelInformation(data.cvv, data.nameOnCard, data.coupoun);
  await checkoutPage.selectCountry("ind", "India");
  await checkoutPage.submitOrder();

  const orderConfirmationPage = poManger.getOrderConfirmationPage();
  let finalOrderNumber = await orderConfirmationPage.OrderConfirmationValidations();
  await orderConfirmationPage.goToMyOrders();

  const myOrdersPage = poManger.getMyOrdersPage();
  await myOrdersPage.ordersPageValidations(finalOrderNumber);
  await myOrdersPage.finalValidationOnClickingViewButtonInOrdersPage(finalOrderNumber);
});
 }
