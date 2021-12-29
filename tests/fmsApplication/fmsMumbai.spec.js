const { test, expect } = require("@playwright/test");
const { fmsMumbaiCreds } = require("../../config");
const excel = require("exceljs");
test("test", async ({ page }) => {
  await page.goto(fmsMumbaiCreds.host + "/");

  await page.goto(fmsMumbaiCreds.host + "/login");

  await page.click('input[type="username"]');

  await page.fill('input[type="username"]', fmsMumbaiCreds.username);

  await page.click('input[type="password"]');

  await page.fill('input[type="password"]', fmsMumbaiCreds.password);

  await Promise.all([
    page.waitForNavigation(/*{ url:`${fmsMumbaiCreds.host}/dashboard` }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${fmsMumbaiCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E7");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F7");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F7");
    cell.value = "No";
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
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

  if (onlineDevice_innertext != 0) {
    let cell1 = worksheet.getCell("G7");
    cell1.value = onlineDevice_innertext + totalDevice_innertext;
    await page.click(
      "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]"
    );

    await expect(page).toHaveURL(
      `${fmsMumbaiCreds.host}/devicesStatus?status=online`
    );

    const lastupdatedTime = page.locator(
      "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[6]/div[1]/span[1]"
    );
    const lastupdatedTime_innertext = await lastupdatedTime.innerText();

    console.log("last updateddevices", lastupdatedTime_innertext);

    let cell2 = worksheet.getCell("H7");
    cell2.value = lastupdatedTime_innertext;

    workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
      console.log("sendmail");
    });

    await page.click('button:has-text("Welcome MCGM,")');

    await page.click('button[role="menuitem"]:has-text("logout")');
    await expect(page).toHaveURL(fmsMumbaiCreds.host + "/login");

    await page.close();
  } else {
    let cell1 = worksheet.getCell("G7");
    cell1.value = onlineDevice_innertext + totalDevice_innertext;

    let cell2 = worksheet.getCell("H7");
    cell2.value = "No active devices";

    workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
      console.log("sendmail");
    });

    await page.click('button:has-text("Welcome MCGM,")');

    await page.click('button[role="menuitem"]:has-text("logout")');
    await expect(page).toHaveURL(fmsMumbaiCreds.host + "/login");

    await page.close();
  }
});
