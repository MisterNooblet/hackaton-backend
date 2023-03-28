import puppeteer from "puppeteer";
const run = async () => {
  let objCounter = 0;
  let infoArr = [];
  let dishArr = [];
  let finalArr = [];
  let countryName;
  const browser = await puppeteer.launch();

  //Tips Page
  const TipsPage = await browser.newPage();
  await TipsPage.goto(
    "https://worldtravelers.org/travel-tips-tipping-guide.asp"
  );
  const TipsHtml = await TipsPage.content();
  const TipsText = await TipsPage.evaluate(() => document.body.innerText);
  const TipsCountriesArray = await TipsPage.evaluate(() =>
    Array.from(
      document.querySelectorAll(".bcolorcccccc>tbody>tr>td>span"),
      (e) => e.innerText
    )
  );
  for (let info of TipsCountriesArray) {
    if (objCounter % 4 === 0 && objCounter !== 0) {
      infoArr = [
        ...infoArr,
        { country: info, tip: TipsCountriesArray[objCounter + 1] },
      ];
    }
    objCounter++;
  }
  //Traditional Dish Page
  const DishPage = await browser.newPage();
  await DishPage.goto("https://en.wikipedia.org/wiki/National_dish#By_country");
  const DishHtml = await DishPage.content();
  const DishText = await DishPage.evaluate(() => document.body.innerText);

  const DishCountriesArray = await DishPage.evaluate(() =>
    Array.from(
      document.querySelectorAll("#mw-content-text .thumb.tright ~ ul > li"),
      (e) => e.innerText
    )
  );

  DishCountriesArray.forEach((el) => dishArr.push(el.innerText));

  for (let dishTradition of DishCountriesArray) {
    countryName = dishTradition.split(":");
    //let foods = countryName[1].split(",");
    finalArr = [...finalArr, { country: countryName[0], food: countryName[1] }];
  }

  await browser.close();
  console.log(`finalArr:`, finalArr);
  console.log(`infoArr`, infoArr);
  // console.log(`countryName:${countryName}`);
  //console.log(DishCountriesArray[1]);
};
export default run;
