const { test, expect } = require("@playwright/test");
const { airQualityCreds } = require("../../config");
const excel = require("exceljs");
test("test", async ({ page }) => {
  await page.goto(airQualityCreds.host + "/");

  await page.goto(airQualityCreds.host + "/login");

  await page.click('input[type="username"]');

  await page.fill('input[type="username"]', airQualityCreds.username);

  await page.click('input[type="password"]');

  await page.fill('input[type="password"]', airQualityCreds.password);

  await Promise.all([
    page.waitForNavigation(/*{ url: `${airQualityCreds.host}/dashboard` }*/),
    page.click('button:has-text("Login")'),
  ]);
  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${airQualityCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E9");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F9");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F9");
    cell.value = "No";
  }

  await page.click('button:has-text("Sites")');

  await expect(page).toHaveURL(`${airQualityCreds.host}/sites`);

  // await page.click("text=Al Rayyan, Qatar");

  await page.click(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/button[1]"
  );

  await page.waitForLoadState("networkidle");
  const locator1 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext1 = await locator1.innerText();

  const locator10 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/button[1]"
  );
  const locator_innertext10 = await locator10.innerText();

  console.log(`${locator_innertext10} is ${locator_innertext1}`);

  await page.waitForLoadState("networkidle");
  const locator2 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext2 = await locator2.innerText();
  const locator11 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]"
  );
  const locator_query2 = await locator11.innerText();

  console.log(`${locator_query2} is ${locator_innertext2}`);

  let cell1 = worksheet.getCell("G9");
  cell1.value =
    `QEERI1 is ${locator_innertext1} ` +
    `${locator_query2} is ${locator_innertext2} `;

  await page.waitForLoadState("networkidle");

  const locator4 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext4 = await locator4.innerText();
  console.log("last updated time", locator_innertext4);

  let cell5 = worksheet.getCell("H9");
  cell5.value = locator_innertext4;

  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });

  await page.click('button:has-text("Welcome QEERI,")');
  await page.waitForLoadState("networkidle");
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL(`${airQualityCreds.host}/login`);

  await page.close;
});
