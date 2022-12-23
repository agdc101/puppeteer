const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// runs app to scrape text.
async function startApp() {
  console.log('hello world');
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