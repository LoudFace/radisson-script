export const getColumnData = function (nameOfField: string, records) {
  return records.map((rec) => rec.get(nameOfField));
};

export const getFields = function (rec) {
  const [lf] = rec.slice(-1);
  const lsField = lf.fields;
  return lsField;
};

export const changeToPercent = function (x) {
  return +(x * 100).toFixed(1);
};
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const twoDecimalNum = function (x: number) {
  const roundNum = +x.toFixed(1);
  const roundWithComa = numberWithCommas(roundNum);
  // console.log(roundWithComa);
  return roundWithComa;
};

export const FormatMillion = function (x) {
  return x / 1000000;
};
// const towDeci = function (x) {
//   return +x.toFixed(2);
// };

export const formatColumnsTOPercent = function (arr) {
  const formatedArr = arr
    .map((el) => {
      if (typeof el === 'object' || typeof el === 'undefined') el = 0;
      return el;
    })
    .map((el) => {
      return +(el * 100).toFixed(2);
    });
  return formatedArr;
};

export const pieSecondValue = function (x) {
  return 100 - x;
};

export const fixYaxis = function (
  scrollCont: HTMLElement,
  yAxisContainer: HTMLElement,
  color: string
) {
  scrollCont.scrollBy(scrollCont.scrollWidth, 0);
  scrollCont.style.zIndex = '10';
  scrollCont.addEventListener('scroll', function () {
    const pxScrolled = scrollCont.scrollLeft;
    if (pxScrolled > yAxisContainer.scrollWidth) {
      yAxisContainer.classList.add('show-y');
      yAxisContainer.style.backgroundColor = color;
    } else {
      yAxisContainer.classList.remove('show-y');
      yAxisContainer.style.backgroundColor = 'transparent';
    }
  });
};

// const tabEl = document.querySelectorAll('[db-element="tabEl"]') as NodeList;
// const tabCount = document.querySelectorAll('[db-element="tabcount"]');

// tabEl.forEach((tab, i) => {
//   tab.addEventListener('click', () => {
//     console.log(i, tabCount.textContent);
//   });
// });
