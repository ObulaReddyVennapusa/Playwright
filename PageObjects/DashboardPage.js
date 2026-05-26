class DashboardPage{

constructor(page){

    this.page=page;
    this.products= page.locator('.card-body');
    this.productNames =  page.locator('.card-body b');
    this.cartButton =  page.locator("[routerlink*='cart']");

}

async SearchAndAddProductToCart(productName){

let ListOfProducts= await this.productNames.allTextContents();
console.log(ListOfProducts);
let count= await this.products.count();

for(let i=0; i<count; ++i){

   let requiredProduct=await this.products.nth(i).locator("b").textContent();
    if(requiredProduct === productName){
await this.products.nth(i).locator('text= Add To Cart').click();
break;
    }
}


}

async GoToCart(){
    await this.cartButton.click();
}

}

module.exports={DashboardPage};