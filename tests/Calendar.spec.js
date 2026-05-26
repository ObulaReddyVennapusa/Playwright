const{test, expect}= require('@playwright/test');

test('Calendar Test', async({page})=>{
const month="5";
const day="7";
const year="2028";
//calendar test ran successfully
const expectedList= [month, day, year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();

    await page.locator("//abbr[text()='"+day+"']").click();

    const list= await page.locator(".react-date-picker__inputGroup__input");

    for(let i =0; i<expectedList.length; i++){

       const value= await list.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
});