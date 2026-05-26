 const{test,expect}= require('@playwright/test');


class MyOrdersPage{


    constructor(page){
        this.page=page;
        this.orderDetails=page.locator("div.col-text");
    }

    async ordersPageValidations(finalOrderNumber){

           
            const rows= await this.page.locator("tbody tr");
            const countOfOrders= await rows.count();
  
    for(let i=0; i< countOfOrders; ++i){
const order= await rows.nth(i).locator("th").textContent();
if(order === finalOrderNumber){

    await rows.nth(i).locator("button").first().click();
    break;
    }
}
     
    }


    async finalValidationOnClickingViewButtonInOrdersPage(finalOrderNumber){
       
      const orderDetails= await this.orderDetails.textContent();
      expect(finalOrderNumber.includes(orderDetails)).toBeTruthy();
    }


}

module.exports={MyOrdersPage};