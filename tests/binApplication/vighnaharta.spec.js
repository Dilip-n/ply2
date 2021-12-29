const { test, expect } = require("@playwright/test");
const { vignaharthaCreds } = require("../../config");
const excel = require("exceljs");
test("test", async ({ page }) => {
  // Go to vignaharthaCreds.host
  await page.goto(vignaharthaCreds.host + "/");

  // Go to vignaharthaCreds.host/dashboard

  // Go to vignaharthaCreds.host/login
  await page.goto(vignaharthaCreds.host + "/login");

  // Click input[type="username"]
  await page.click('input[type="username"]');

  // Fill input[type="username"]
  await page.fill('input[type="username"]', vignaharthaCreds.username);

  // Click input[type="password"]
  await page.click('input[type="password"]');

  // Fill input[type="password"]
  await page.fill('input[type="password"]', vignaharthaCreds.password);

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'vignaharthaCreds.host/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${vignaharthaCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E8");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F8");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F8");
    cell.value = "No";
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const locator = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext = await locator.innerText();
  console.log("Devices online are " + locator_innertext);

  const locator1 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]"
  );
  const locator_innertext1 = await locator1.innerText();
  console.log("Total Devices  are " + locator_innertext + locator_innertext1);
  let cell1 = worksheet.getCell("G8");
  cell1.value = locator_innertext + locator_innertext1;
  await page.click('button:has-text("Devices")');

  await expect(page).toHaveURL(`${vignaharthaCreds.host}/devices`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const locator2 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[10]"
  );
  const locator_innertext2 = await locator2.innerText();
  console.log("last updated at " + locator_innertext2);

  let cell2 = worksheet.getCell("H8");
  cell2.value = locator_innertext2;

  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });

  await page.waitForLoadState("networkidle");
  // Click button:has-text("Welcome Demo BTS 3,")
  await page.click('button:has-text("Welcome Demo BTS 3,")');

  await page.waitForLoadState("networkidle");
  // Click button[role="menuitem"]:has-text("logout")
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL(vignaharthaCreds.host + "/login");

  await page.waitForLoadState("networkidle");
  // Close page
  await page.close();
});
