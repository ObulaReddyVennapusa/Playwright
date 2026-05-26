
const base= require('@playwright/test');

 exports.customtest= base.test.extend(
 {

    testDataForOrder :{

    UserName : "kiran907@gmail.com",
    Password : "Test@123",
  productName : "ZARA COAT 3",
    cvv : "465",
   nameOnCard : "kiranReddy",
   coupoun : "rahulshettyacademy"

    }

})

  