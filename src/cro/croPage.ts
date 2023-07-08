import Airtable from 'airtable';
import { numberWithCommas } from 'src/helperFunction';

Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');
//getting table Records function
const getTableRecords = function (tableId: string) {
  return radiChartbase(tableId).select({
    view: 'Grid view',
  });
};

window.Webflow ||= [];
window.Webflow.push(() => {
  ////html Element
  const allRevGene = document.querySelector('[rd-element="allrev-generated"]') as HTMLElement;
  const abTestWrap = document.querySelector('[rd-element="abtest"]') as HTMLElement;

  ///function UI Content

  const updateCroCard = function (htmlWrap: HTMLElement, data: unknown, cardText: string) {
    htmlWrap.innerHTML = `<div class="text-style-3rem gradienttext">${data}</div><div class="text-block-22">${cardText}</div>`;
  };

  getTableRecords('tbllZXWji4qm6uw8O').eachPage(function page(records) {
    const [lastRole] = records.slice(-1);
    // const monthYear = lastRole.fields['Month Year'];
    const abTest = lastRole.fields['A/B Tests launched (YTD)'];
    const internalRev = lastRole.fields['Internal Revenue Generated'];
    const internalRevFomated = numberWithCommas(internalRev);
    const interRevHtmlFormat = `${internalRevFomated}M €` as unknown;
    const firstCardText = `in incremental revenue`;
    const secondCardText = `A/B tests launched`;
    // 3,800,000,000
    updateCroCard(allRevGene, interRevHtmlFormat, firstCardText);
    updateCroCard(abTestWrap, abTest, secondCardText);
  });

  /////////////Monthly insight UI update

  const firstInsightWrap = document.querySelector(
    '[rd-element="first-insight-wrap"]'
  ) as HTMLElement;
  const secondInsightWrap = document.querySelector(
    '[rd-element="second-insight-wrap"]'
  ) as HTMLElement;

  const secondInsightImgWrap = document.querySelector(
    '[rd-element="second-insight-img"]'
  ) as HTMLImageElement;

  const firsInsightVideo = document.querySelector(
    '[rd-element="insight-video"]'
  ) as HTMLVideoElement;
  console.log(firsInsightVideo.src);

  const updateInsightUi = function (htmlWrap: HTMLElement, data: object) {
    htmlWrap.innerHTML = `<div rd-element="second-isight-title" class="section__col--text appgradient--1">${data['Title']}</div><p rd-element="second-insight-text" class="text-style-normal-20px">${data['Description']}</p>`;
  };

  getTableRecords('tblMWway8z6o9gJqS').eachPage(function page(records) {
    const [firstInsight, secondInsight] = records;
    const firstInsightField = firstInsight.fields;
    const secondInsightFields = secondInsight.fields;

    const firstInsightVid = firstInsightField['Supporting media'] as string;
    const secondInsightImg = secondInsightFields['Supporting media'] as string;

    firsInsightVideo.src = firstInsightVid;
    secondInsightImgWrap.src = secondInsightImg;
    secondInsightImgWrap.srcset = secondInsightImg;
    secondInsightImgWrap.style.display = 'block';
    updateInsightUi(firstInsightWrap, firstInsightField);
    updateInsightUi(secondInsightWrap, secondInsightFields);
  });

  ////CRO A/B test stories

  //A/B UI elements
  const firstTestWrap = document.querySelector('[rd-element="first-testStory"]') as HTMLElement;
  const secondTestWrap = document.querySelector('[rd-element="second-testStory"]') as HTMLElement;
  //console.log(firstTestWrap);

  const updateTestUI = function (htmlWrap: HTMLElement, data) {
    htmlWrap.innerHTML = `<div class="ab-col-1"><div class="text-style-2rem second__text-grad">${data['Name of Test']}</div><div>${data['Date of Launch']}</div><div class="ab-list-wrap"><div class="ab-list-item-wrap"><div class="ab-dot"></div><div class="list-text-wrap"><div class="text-style-20px-bold">Objective</div><div class="text-style-normal-20px">${data['Objective']}</div></div></div><div class="ab-list-item-wrap"><div class="ab-dot"></div><div class="list-text-wrap"><div class="text-style-20px-bold">Traffic allocation</div><div class="text-style-normal-20px">${data['Traffic allocation']}</div></div></div><div class="ab-list-item-wrap"><div class="ab-dot"></div><div class="list-text-wrap"><div class="text-style-20px-bold">Performance</div><div class="text-style-normal-20px">${data['Performance']}</div></div></div></div></div><div class="ab-col2"><div class="w-layout-vflex ab-test-flx"><div class="ab-card-wrap"><div class="div-block-184"><img class="img-full" src="${data['Control Image']}" loading="lazy" width="480" sizes="(max-width: 479px) 74vw, (max-width: 767px) 43vw, (max-width: 991px) 40vw, (max-width: 1919px) 34vw, 480px" srcset="${data['Control Image']} 500w, https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6498ce141b1c8ad36543f8d0_image%2077-min-p-800.png 800w, https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6498ce141b1c8ad36543f8d0_image%2077-min.png 960w" alt=""></div><div class="ab-cad-btn">Control</div></div><div class="ab-card-wrap"><div class="div-block-184"><img class="img-full" src="${data['Variant Image']}" loading="lazy" width="480" sizes="(max-width: 479px) 74vw, (max-width: 767px) 43vw, (max-width: 991px) 40vw, (max-width: 1919px) 34vw, 480px" srcset="${data['Variant Image']} 500w, https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6498ce941b1c8ad365442c46_image%2078-min-p-800.png 800w, ${data['Variant Image']} 960w" alt=""></div><div class="ab-cad-btn">Variant</div></div></div><div class="right-ab-icon w-embed"><svg width="2.6rem" height="22rem" viewBox="0 0 42 351" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 350H29C35.6274 350 41 344.627 41 338V13C41 6.37258 35.6274 1 29 1H1" stroke="url(#paint0_linear_6491_25077)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="8 8"></path>
    <defs>
    <linearGradient id="paint0_linear_6491_25077" x1="21" y1="350" x2="21" y2="1" gradientUnits="userSpaceOnUse">
    <stop stop-color="#C1CFDE"></stop>
    <stop offset="1" stop-color="#29343D"></stop>
    </linearGradient>
    </defs>
    </svg></div><div class="left-ab-icon w-embed"><svg width="2.6rem" height="22rem" viewBox="0 0 42 351" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41 1H13C6.37258 1 1 6.37258 1 13V338C1 344.627 6.37258 350 13 350H41" stroke="url(#paint0_linear_6491_25076)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="8 8"></path>
    <defs>
    <linearGradient id="paint0_linear_6491_25076" x1="21" y1="1" x2="21" y2="350" gradientUnits="userSpaceOnUse">
    <stop stop-color="#C1CFDE"></stop>
    <stop offset="1" stop-color="#29343D"></stop>
    </linearGradient>
    </defs>
    </svg></div></div>`;
  };

  getTableRecords('tblD8qZgTqghUBIj6').eachPage(function page(records) {
    //console.log(records);
    const [abFirstRecord, abSecondRecord] = records;
    const abFirstFields = abFirstRecord.fields;
    const abSecondFields = abSecondRecord.fields;
    //console.log(abFirstFields['Objective']);
    //console.log(abSecondFields);
    updateTestUI(firstTestWrap, abFirstFields);
    updateTestUI(secondTestWrap, abSecondFields);
  });
});
