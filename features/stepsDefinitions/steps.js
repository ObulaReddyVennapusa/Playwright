const { When, Then, Given} = require('@cucumber/cucumber');
const { POManager } = require("../../PageObjects/POManager");
const {expect} = require('@playwright/test');
const playwright= require('@playwright/test');



Given('user login with the {string} and {string}',{timeout: 100*100}, async function (UserName, Password) {
          
 const browser= await playwright.chromium.launch({
       headless: false
 });


  const loginPage = this.poManger.getLoginPage();
  await loginPage.goTo();
  await loginPage.LoginToApp(UserName, Password);
         });

         When('user add the {string} to the cart', async function (productName) {
          const dashboardPage = this.poManger.getDashboardPage();
  await dashboardPage.SearchAndAddProductToCart(productName);
  await dashboardPage.GoToCart();
         });

         Then('verify the {string} on checkout', async function (productName) {
          const orderdetailsPage = this.poManger.getOrderdetailsPage();
  await orderdetailsPage.ValidatingProductInCheckout(productName);
  await orderdetailsPage.goToCheckouot();
         });

         Then('place the order by using {string},{string}, {string}', async function (cvv, nameOnCard, coupoun) {
            const checkoutPage = this.poManger.getCheckoutPage();
  await checkoutPage.personelInformation(cvv, nameOnCard, coupoun);
  await checkoutPage.selectCountry("ind", "India");
  await checkoutPage.submitOrder();
         });

         When('order placed and confirm on ordersPage', async function () {
          const orderConfirmationPage = this.poManger.getOrderConfirmationPage();
   this.finalOrderNumber = await orderConfirmationPage.OrderConfirmationValidations();
  await orderConfirmationPage.goToMyOrders();
         });

         Then('Verify order in the my ordersPage',async function () {
           const myOrdersPage = this.poManger.getMyOrdersPage();
  await myOrdersPage.ordersPageValidations(this.finalOrderNumber);
  await myOrdersPage.finalValidationOnClickingViewButtonInOrdersPage(this.finalOrderNumber);
         });
       
          Given('user login to ecommerce2 with the {string} and {string}', async function (Username, password) {
           
                 await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
                 await this.page.locator("#username").fill(Username);
                 //password
                 await this.page.locator("#password").fill(password);
                 await this.page.locator("#signInBtn").click();
         });

         Then('validate the error message', async function () {
       await this.page.locator("div.alert ").waitFor();
      const failureMsg= await this.page.locator("div.alert ").textContent();
      console.log(failureMsg);

         })