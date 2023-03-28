import puppeteer from "puppeteer";

const scrapeData = async () => {

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
        { name: info, tip: TipsCountriesArray[objCounter + 1].split('%').join('').split('-')[0].replace(/[^0-9]/g, '').slice(0, 10) },
      ];
    }
    objCounter++;
  }

  //Traditional Dish Page
  const DishPage = await browser.newPage();

  await DishPage.goto("https://en.wikipedia.org/wiki/National_dish#By_country");

  const DishCountriesArray = await DishPage.evaluate(() =>
    Array.from(
      document.querySelectorAll("#mw-content-text .thumb.tright ~ ul > li"),
      (e) => e.innerText
    )
  );

  DishCountriesArray.forEach((el) => dishArr.push(el.innerText));

  for (let dishTradition of DishCountriesArray) {
    countryName = dishTradition.split(":");


    finalArr = [...finalArr, { name: countryName[0], cuisines: fixDishText(countryName[1]) }];
  }

  const result = finalArr.reduce((acc, val) => {
    let objWithTip = val
    let countryWithTip = infoArr.find(({ name }) => name === val.name)
    if (countryWithTip && countryWithTip.tip * 1 !== NaN && val.cuisines !== null) {
      objWithTip = { ...val, tip: countryWithTip.tip * 1 }
      acc.push(objWithTip)
    } else if (val.cuisines !== null) {
      objWithTip = { ...val, tip: 0 }
      acc.push(objWithTip)
    }
    return acc
  }, [])

  await browser.close();


  return result
};

const fixDishText = (string) => {
  if (string) {
    let result = string.split(/,\s*/).map(s => s.replace(/\[[^\]]*\]\s*/g, ''))
    return result
  }
  return null
}

export default scrapeData;