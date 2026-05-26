const ExcelJS = require("exceljs");
const { test, expect } = require("@playwright/test");

async function WriteExcelDemo(searchText, ChangeText,change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const workSheet = workbook.getWorksheet("Sheet1");

  const response = await ReadExcelDemo(workSheet, searchText);

  const cell = workSheet.getCell(
    response.row,
    response.column+ change.colChange,
  );
  cell.value = ChangeText;
  workbook.xlsx.writeFile(filePath);
}

async function ReadExcelDemo(workSheet, searchText) {
  let response = { row: 0, column: 0 };
  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        response.row = rowNumber;
        response.column = colNumber ;
      }
    });
  });

  return response;
}

//WriteExcelDemo("Pumkin",350,{rowChange:0, colChange:2}, "C:\\Users\\obula\\Downloads\\download.xlsx");

test("upload and download", async ({ page }) => {
    let searchText = "Mango";
    let changeText = '350';
    let filePath = "C:\\Users\\obula\\Downloads\\download.xlsx";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  await downloadPromise;
  await WriteExcelDemo(searchText, changeText,{rowChange: 0, colChange: 2}, filePath);

  await page.locator('#fileinput').click();
  await page.locator('#fileinput').setInputFiles(filePath);

  const rowlocator= await page.getByText(searchText);
  const desiredRow = await page.getByRole("row").filter({ has: rowlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toHaveText(changeText);

});

