const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// runs app to scrape text.
async function startApp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://coingecko.com/");

  const coinPrices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".td-price span[data-target='price.price']")).map(
      coin => coin.textContent
    );
  });

  const coinNames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("td.coin-name span.font-bold")).map(
      coin => coin.textContent
    );
  });

  //combine and arrange arrays into price list.
  // adjust listLength variable for different list lengths.
  let x = [];
  const listLength = 10;

  for (let j = 0; j < listLength; j++) {
    x += [coinNames[j] + coinPrices[j] + '\n'];
  }

  await fs.writeFile("coin-prices.txt", x)
  await browser.close();
}

startApp();