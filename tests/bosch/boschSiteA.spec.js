const { test, expect } = require("@playwright/test");
const { boschAppCreds } = require("../../config");
const moment = require("moment");

const excel = require("exceljs");

//console.log(binAppCreds.host);

test("SiteAtest", async ({ page }) => {
  await page.goto(boschAppCreds.host + "/");

  // Go to boschAppCreds.host/user/login
  await page.goto(boschAppCreds.host + "/");

  // Click [placeholder="username"]
  await page.click('[placeholder="username"]');

  // Fill [placeholder="username"]
  await page.fill('[placeholder="username"]', boschAppCreds.username);

  // Click [placeholder="password"]
  await page.click('[placeholder="password"]');

  // Fill [placeholder="password"]
  await page.fill('[placeholder="password"]', boschAppCreds.password);

  // Click button:has-text("Login")
  await Promise.all([
    // page.waitForNavigation({ url: "boschAppCreds.host/dashboard" }),
    page.click('button:has-text("Login")'),
  ]);

  let workbook = new excel.Workbook();
  let worksheet;
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let date = new Date();
  var startDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  console.log("startDate", startDate);
  let cell1 = worksheet.getCell("B2");
  cell1.value = startDate;
  await page.waitForLoadState("networkidle");
  const url = await page.url();
  let value = "";
  if (url === `${boschAppCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);

  let cell = worksheet.getCell("E4");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F4");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F4");
    cell.value = "No";
  }

  const locator5 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/section[1]/section[1]/div[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[1]"
  );
  const locator5_innertext = await locator5.innerText();

  console.log("siteA", locator5_innertext);
  let cell5 = worksheet.getCell("G4");
  cell5.value = locator5_innertext;

  const locator = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/section[1]/section[1]/div[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[7]"
  );
  const locator_innertext = await locator.innerText();
  // console.log("SiteA/WingA refreshed at " + locator_innertext);
  await expect(locator).toContainText(locator_innertext);
  const words = locator_innertext.split(" ");
  //console.log(words[0]);
  //console.log(words[1]);

  if (locator_innertext === "a few seconds ago " || "a minute ago ") {
    console.log("SiteA/WingA Refreshed " + locator_innertext);
    let cell = worksheet.getCell("H4");
    cell.value = locator_innertext;
  } else if (words[0] < 10) {
    console.log("SiteA/WingA Application Refreshed " + locator_innertext);
    let cell = worksheet.getCell("H4");
    cell.value = locator_innertext;
  } else {
    console.log("SiteA/WingA Application failed to Refresh within 10 minutes");
    let cell = worksheet.getCell("H4");
    cell.value = "not updated";
  }
  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });
  // Click text=Bosch Admin
  await page.click("text=Bosch Admin");

  // Click text=Logout
  await page.click("text=Logout");

  // Close page
  await page.close();
});

test("SiteBtest", async ({ page }) => {
  // Go to boschAppCreds.host/
  await page.goto(boschAppCreds.host);

  // Go to boschAppCreds.host/user/login
  await page.goto(boschAppCreds.host);

  // Click [placeholder="username"]
  await page.click('[placeholder="username"]');

  // Fill [placeholder="username"]
  await page.fill('[placeholder="username"]', boschAppCreds.username);

  // Click [placeholder="password"]
  await page.click('[placeholder="password"]');

  // Fill [placeholder="password"]
  await page.fill('[placeholder="password"]', boschAppCreds.password);

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'boschAppCreds.host/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${boschAppCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E5");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F5");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F5");
    cell.value = "No";
  }

  const locator5 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/section[1]/section[1]/div[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[1]"
  );
  const locator5_innertext = await locator5.innerText();

  console.log("siteB", locator5_innertext);

  let cell5 = worksheet.getCell("G5");
  cell5.value = locator5_innertext;

  const locator = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/section[1]/section[1]/div[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[7]"
  );
  const locator_innertext = await locator.innerText();
  // console.log("SiteB/WingB refreshed at" + locator_innertext);
  //await expect(locator).toContainText(locator_innertext);

  await expect(locator).toContainText(locator_innertext);
  const words = locator_innertext.split(" ");
  //console.log(words[0]);
  //console.log(words[1]);

  if (locator_innertext === "a few seconds ago " || "a minute ago ") {
    console.log("SiteB/WingB Refreshed " + locator_innertext);
    let cell = worksheet.getCell("H5");
    cell.value = locator_innertext;
  } else if (words[0] < 10) {
    console.log("SiteA/WingA Application Refreshed " + locator_innertext);
    let cell = worksheet.getCell("H5");
    cell.value = locator_innertext;
  } else {
    console.log("SiteA/WingA Application failed to Refresh within 10 minutes");
    let cell = worksheet.getCell("H5");
    cell.value = "Not Updated";
  }

  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });

  // Click text=Bosch Admin
  await page.click("text=Bosch Admin");

  await page.waitForLoadState("networkidle");

  // Click text=Logout
  await page.click("text=Logout");
  await expect(page).toHaveURL(
    boschAppCreds.host +
      "/user/login?redirect=http%3A%2F%2Fiot2.hyperthings.in%3A6010%2Fdashboard"
  );

  // Close page
  await page.close();
});
