import { test, expect, Page} from "@playwright/test";
import { POManager } from "../PageObjects_TypeScript/POManager";
import {customtest} from '../utils_TypeScript/test-data';

customtest("@Web client app using customTest fixture", async ({ page,testDataForOrder }) => {
  const poManger = new POManager(page);

  const loginPage = poManger.getLoginPage();
  await loginPage.goTo();
  await loginPage.LoginToApp(testDataForOrder.UserName, testDataForOrder.Password);

  const dashboardPage = poManger.getDashboardPage();
  await dashboardPage.SearchAndAddProductToCart(testDataForOrder.productName);
  await dashboardPage.GoToCart();

  const orderdetailsPage = poManger.getOrderdetailsPage();
  await orderdetailsPage.ValidatingProductInCheckout(testDataForOrder.productName);
  await orderdetailsPage.goToCheckouot();

  const checkoutPage = poManger.getCheckoutPage();
  await checkoutPage.personelInformation(testDataForOrder.cvv, testDataForOrder.nameOnCard, testDataForOrder.coupoun);
  await checkoutPage.selectCountry("ind", "India");
  await checkoutPage.submitOrder();

  const orderConfirmationPage = poManger.getOrderConfirmationPage();
  let finalOrderNumber = await orderConfirmationPage.OrderConfirmationValidations();
  await orderConfirmationPage.goToMyOrders();

  const myOrdersPage = poManger.getMyOrdersPage();
  await myOrdersPage.ordersPageValidations(finalOrderNumber);
  await myOrdersPage.finalValidationOnClickingViewButtonInOrdersPage(finalOrderNumber);
});
 
