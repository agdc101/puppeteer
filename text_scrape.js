const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// runs app
async function startApp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://coingecko.com/");

  const coins = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("td.coin-name span.font-bold")).map(
      coin => coin.textContent
      );
  });

  await fs.writeFile("coin.txt", coins.join("\r"))

  await browser.close();
}

startApp();