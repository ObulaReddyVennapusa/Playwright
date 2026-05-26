import {test,expect,Locator,Page} from '@playwright/test';

export class OrderdetailsPage{
page:Page;
checkout:Locator;

    constructor(page: Page){
        this.page =page;
         this.checkout= page.locator("text=Checkout")
    }


    async ValidatingProductInCheckout(productName:String){

        await this.page.locator("div li").first().waitFor();
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
    }

    async goToCheckouot(){

        await this.checkout.click();
    }

}

module.exports={OrderdetailsPage};