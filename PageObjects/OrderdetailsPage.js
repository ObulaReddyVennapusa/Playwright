const {test,expect}= require('@playwright/test');

class OrderdetailsPage{

    constructor(page){
        this.page =page;
         this.checkout= page.locator("text=Checkout")
    }


    async ValidatingProductInCheckout(productName){

        await this.page.locator("div li").first().waitFor();
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
    }

    async goToCheckouot(){

        await this.checkout.click();
    }

}

module.exports={OrderdetailsPage};