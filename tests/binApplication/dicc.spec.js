const { test, expect } = require("@playwright/test");
const { diccCreds } = require("../../config");
const excel = require("exceljs");
test("test", async ({ page }) => {
  // Go to `${diccCreds.host}/7002/`
  await page.goto(diccCreds.host + "/");

  // Go to `${diccCreds.host}/dashboard`

  // Go to `${diccCreds.host}/login`
  await page.goto(diccCreds.host + "/login");

  // Click input[type="username"]
  await page.click('input[type="username"]');

  // Fill input[type="username"]
  await page.fill('input[type="username"]', diccCreds.username);

  // Click input[type="password"]
  await page.click('input[type="password"]');

  // Fill input[type="password"]
  await page.fill('input[type="password"]', diccCreds.password);

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: `${diccCreds.host}/dashboard` }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${diccCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E10");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F10");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F10");
    cell.value = "No";
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const locator = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext = await locator.innerText();

  console.log("Devices online are " + locator_innertext);

  const locatora = page.locator(
    "//body//div[@id='root']//div[@class='auth-content dark']//div//div//div//div//div[1]//div[1]//div[1]//div[1]//div[1]//div[1]//span[2]"
  );

  const locator_innertexta = await locatora.innerText();

  console.log(" Total Devices  are " + locator_innertext + locator_innertexta);
  let cell2 = worksheet.getCell("G10");
  cell2.value = locator_innertext + locator_innertexta;
  await page.click('button:has-text("Devices")');

  await expect(page).toHaveURL(`${diccCreds.host}/devices`);

  const locatora2 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[9]"
  );

  const locator_innertextb = await locatora2.innerText();

  console.log("lastupdated at " + locator_innertextb);

  let cell1 = worksheet.getCell("H10");
  cell1.value = locator_innertextb;

  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });
  // Click button:has-text("Welcome Admin DSCL,")
  await page.click('button:has-text("Welcome Admin DSCL,")');

  // Click button[role="menuitem"]:has-text("logout")
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL(diccCreds.host + "/login");

  // Close page
  await page.close();
});
