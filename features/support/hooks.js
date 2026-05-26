const { After, Before, BeforeStep, AfterStep, Status} = require("@cucumber/cucumber");
const playwright= require('@playwright/test');
const { POManager } = require("../../PageObjects/POManager");
const path = require("node:path");

Before(async function(){

    const browser = await playwright.chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
     this.page = await context.newPage();
    this.poManger = new POManager(this.page);

});

After(function(){

    console.log("I wil execute Last");
});

BeforeStep(function(){

});

AfterStep(async function({result}){
    if(result.status == Status.FAILED){

        await this.page.screenshot({path: 'failure_Screenshot.png'});
    }

});
