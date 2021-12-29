const { test, expect } = require("@playwright/test");
const { fmsBadalpurCreds } = require("../../config");
const excel = require("exceljs");
test("test", async ({ page }) => {
  await page.goto(fmsBadalpurCreds.host + "/");

  await page.click('input[type="username"]');

  await page.fill('input[type="username"]', fmsBadalpurCreds.username);

  await page.click('input[type="password"]');

  await page.fill('input[type="password"]', fmsBadalpurCreds.password);

  await Promise.all([
    page.waitForNavigation(/*{ url: `${fmsBadalpurCreds.host}/dashboard` }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");

  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${fmsBadalpurCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E6");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F6");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F6");
    cell.value = "No";
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const onlineDevice = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const onlineDevice_innertext = await onlineDevice.innerText();

  console.log("online devices", onlineDevice_innertext);
  const totalDevice = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]"
  );
  const totalDevice_innertext = await totalDevice.innerText();

  console.log("total devices", onlineDevice_innertext + totalDevice_innertext);
  let cell1 = worksheet.getCell("G6");
  cell1.value = onlineDevice_innertext + totalDevice_innertext;
  await page.click(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]"
  );

  await expect(page).toHaveURL(
    `${fmsBadalpurCreds.host}/devicesStatus?status=online`
  );

  const lastupdatedTime = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[6]/div[1]/span[1]"
  );
  const lastupdatedTime_innertext = await lastupdatedTime.innerText();

  console.log("last updateddevices", lastupdatedTime_innertext);

  let cell2 = worksheet.getCell("H6");
  cell2.value = lastupdatedTime_innertext;
  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });

  await page.click('button:has-text("Welcome KBMC,")');

  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL(fmsBadalpurCreds.host + "/login");

  await page.close();
});
