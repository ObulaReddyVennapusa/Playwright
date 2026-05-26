const {expect}= require('@playwright/test');

class OrderConfirmationPage{

constructor(page){

    this.page=page;
   this.confirmationMsg=  page.locator(".hero-primary");
   this.orderNumber=  page.locator("td label[class='ng-star-inserted']");
   this.ordersbtn=page.locator("button[routerlink*='myorders']");
}

async OrderConfirmationValidations(){


    const confirmationMsg= await this.confirmationMsg.textContent();
   await expect(confirmationMsg).toContain(" Thankyou for the order. ");

   const orderNumber=await this.orderNumber.textContent();
   console.log(orderNumber);
   
   const finalOrderNumber = orderNumber.split('|')[1].trim();
     console.log(finalOrderNumber);

     return finalOrderNumber;

}

async goToMyOrders(){

    await this.ordersbtn.click();
     await this.page.locator("tbody tr").first().waitFor();
}

}
module.exports={OrderConfirmationPage};