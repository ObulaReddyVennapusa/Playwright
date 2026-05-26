const{expect}= require('@playwright/test');


class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cvv = page.locator("div[class='field small'] input");
    this.cardName = page.locator("div[class='field'] input");
    this.coupon = page.locator("[name='coupon']");
    this.applyCouponBtn = page.locator("div button");
    this.couponTextOnSuccess = page.locator(".mt-1.ng-star-inserted");

    this.CountryInput = page.locator("[placeholder*='Country']");
    this.dropdownWaiting = page.locator("[class*='ta-results'] ");
    this.dropdown = page.locator("[class*='ta-results'] button");

    this.placeOrder = page.locator(".action__submit");
  }

  async personelInformation(cvv,nameOnCard,coupoun) {
    await this.cvv.first().fill(cvv);

    await this.cardName.last().fill(nameOnCard);
    //rahulshettyacademy --coupoun code
    await this.coupon.fill(coupoun);
    await this.page.locator("div button").click();
    await this.couponTextOnSuccess.waitFor();
    const coupounText = await this.couponTextOnSuccess.textContent();
    await console.log(coupounText);
    await expect(coupounText).toContain("* Coupon Applied");
  }


async selectCountry(searchText,selectCountry){

    await this.CountryInput.pressSequentially(searchText ,{delay:100});

await this.dropdownWaiting.waitFor();

const dropDown =await this.dropdown;

let countOfDropDown= await dropDown.count();

for(let i=0; i<countOfDropDown; ++i){

   const country= await dropDown.nth(i).textContent();
   if(country.trim() === selectCountry){
    await dropDown.nth(i).click();
    break;
   }
}

}


async submitOrder(){

    await this.placeOrder.click();
    await this.page.locator('.hero-primary').waitFor();
}



}

module.exports={CheckoutPage};
