const {LoginPage}=require('./LoginPage');
const {DashboardPage}=require('./DashboardPage');
const {OrderdetailsPage}=require('./OrderdetailsPage');
const{CheckoutPage}= require('./CheckoutPage');
const{OrderConfirmationPage}= require('./OrderConfirmationPage');
const{MyOrdersPage}= require('./MyOrdersPage');
class POManager 
{

    constructor(page){

        this.page=page;
         this.loginPage= new LoginPage(page);
          this.dashboardPage= new DashboardPage(page);
        this.OrderdetailsPage=  new OrderdetailsPage(page);
        this.checkoutPage=new CheckoutPage(page);
      this.orderConfirmationPage=  new OrderConfirmationPage(page);
      this.myOrdersPage= new MyOrdersPage(page);
    }


getLoginPage(){

    return this.loginPage;
}

getDashboardPage(){

   return this.dashboardPage;
}

getOrderdetailsPage(){
    return this.OrderdetailsPage;
}

getCheckoutPage(){
    return this.checkoutPage;
}

getOrderConfirmationPage(){
    return this.orderConfirmationPage;
}
getMyOrdersPage(){
   return this.myOrdersPage;
}

}

module.exports={POManager}