import puppeteer from "puppeteer";
import { bhParse } from "./bhParse.js";

const mainURL =
  "https://www.eatright.org/food/nutrition/vegetarian-and-special-diets";

const urls = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(mainURL, { waitUntil: "networkidle0", timeout: 0 });
    const articleLinks = await page.evaluate(() => {
      let articles = Array.from(document.querySelectorAll(".itemList .item"));
      articles = articles.map((article) => {
        const path = article.childNodes[1].children[0].children[0];
        if (path !== undefined) {
          return {
            title: article.childNodes[3].firstElementChild.innerText,
            href: article.childNodes[1].children[0].href,
            img: article.childNodes[1].children[0].children[0].currentSrc,
          };
        } else {
          return undefined;
        }
      });
      return articles;
    });

    await browser.close();
    return articleLinks;
  } catch (error) {
    console.log(error);
  }
};

// const dataCrawler = async () => {
//   try {
//     const targetUrls = Promise.resolve(urls())
//     targetUrls.then((urls) => {
//       // passing the entire array of urls to bhParse instead of
//       // running a function on each individual array item
//       Promise.resolve(bhParse(urls)).then((response) =>
//         // do whatever you need with response
//         console.log('response: ', response)
//       )
//     })
//   } catch (error) {}
// }

// dataCrawler()
console.log(urls);
export { puppeteer };
