
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import  {OrderdetailsPage} from './OrderdetailsPage';
import {CheckoutPage} from './CheckoutPage'
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {MyOrdersPage} from './MyOrdersPage';

import{Page} from '@playwright/test';
export class POManager 
{

loginPage:LoginPage;
dashboardPage:DashboardPage;
OrderdetailsPage:OrderdetailsPage;
checkoutPage:CheckoutPage;
orderConfirmationPage:OrderConfirmationPage;
myOrdersPage:MyOrdersPage;  
page:Page;

    constructor(page:Page){

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