const puppeteer = require('puppeteer');
const { isGeneratorObject } = require('util/types');

// runs app
async function startApp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://theivyexeter.com/");
  await page.screenshot({path: "gecko.png"});
  await browser.close();
}

startApp();