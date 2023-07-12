import Airtable from 'airtable';
import { number } from 'echarts';

import {
  changeToPercent,
  FormatMillion,
  getColumnData,
  getFields,
  numberWithCommas,
  twoDecimalNum,
} from '../helperFunction';

Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });

const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');
export const getTableRecords = function (tableId) {
  return radiChartbase(tableId).select({
    view: 'Grid view',
  });
};

export const homeUiUpdate = function () {
  //New UI updates on Home page
  ///////////updating UI interface for homepage
  const totalRevenueCard = document.querySelector('[rd-element="totalRevenue"]');
  const bookNightCard = document.querySelector('[rd-element="booknight"]') as HTMLElement;
  const appDownloadCard = document.querySelector('[rd-element="appDownload"]') as HTMLElement;
  const enrollWebAppCard = document.querySelector('[rd-element="wepApp"]') as HTMLElement;
  const totalRevYoy = document.querySelector('[rd-element="revUplift"]') as HTMLElement;
  const totalRevCard = document.querySelector('[rd-element="totalRev"]');
  if (
    !totalRevenueCard ||
    !bookNightCard ||
    !appDownloadCard ||
    !enrollWebAppCard ||
    !totalRevCard ||
    !totalRevYoy
  )
    return;

  ////monthly online performance card content.
  const updateCardContent = function (
    cardcontainer: HTMLElement,
    bigData: string,
    wowData: number
  ) {
    cardcontainer.innerHTML = `<div class="text-style-18px text-color-white">App downloads in 2023</div><div id="appDownloads" class="text-style-3rem gradienttext">${bigData}</div><div><span class="green">+${wowData}%</span> uplift vs <span rd-element="upliftHome">June 22</span></div>`;
  };

  const updateCardContentUplift = function (
    cardcontainer: HTMLElement,
    bigData: string,
    wowData: number,
    cardText: string
  ) {
    cardcontainer.innerHTML = `<div class="text-style-18px text-color-white">${cardText}</div><div id="appEnroll" class="text-style-3rem gradienttext">${bigData}</div><div><span class="green">+${wowData}%</span> uplift YoY</div>`;
  };

  //<div><span class="green">+39.5%</span> &nbsp;uplift vs <span rd-element="upliftHome">June 22</span></div>
  //
  //`<div class="text-style-18px text-color-white">App downloads in 2023</div><div id="appDownloads" class="text-style-3rem gradienttext">238,888</div><div><span class="green">+39.5%</span> &nbsp;vs Annual Target: 1.3m</div>`

  //<div class="text-style-18px text-color-white">Enrollment through web <br>&amp; app</div><div id="appEnroll" class="text-style-3rem gradienttext">88,501</div><div><span class="green">+65.9%</span> uplift YoY</div>
  //////////////////////////////App Anual Target base on Airtable
  getTableRecords('tblCxvDHIID3Z8ncV').eachPage(function page(records) {
    const appDownloadPercent = getColumnData('Progress Percent', records).slice(-1);
    const [appTotalDownload] = getColumnData('Total downloads (Combined)', records).slice(-1);
    //const [month] = getColumnData('Month', records).slice(-1);
    const appTotalDownloadFormated = numberWithCommas(appTotalDownload);
    const appDownloadPercentformated = changeToPercent(appDownloadPercent);
    const [lastRecord] = records.slice(-1);
    //console.log(appTotalDownloadFormated);

    updateCardContent(appDownloadCard, appTotalDownloadFormated, appDownloadPercentformated);
  });

  //rev + room night + loyalty monthly table ID
  const revYoyID = 'tblRyuOYcUeH3hT7g';
  //main page KPIs table ID
  const mainKpi = 'tbl8Ye0eoBXdPGyL5';

  ////main App KPI
  const mainAppId = 'tbldsHsl0iIwJQECd';

  const updateCardPercent = function (htmlWrap: HTMLElement, data: number) {
    htmlWrap.innerHTML = `<div rd-element="revUplift"><span class="${data > 0 ? 'green' : 'red'}">${
      data > 0 ? '+' : '-'
    }${data}%</span> uplift YoY</div>`;
  };
  /////Main page KPIs
  const upliftWrap = document.querySelector('[rd-element="upliftHome"]') as HTMLElement;
  console.log(upliftWrap);

  getTableRecords(mainAppId).eachPage(function page(records) {
    console.log(records);

    const mainAppFields = getFields(records);
    const refTableId = mainAppFields['Previous Year'];

    radiChartbase(mainAppId)._findRecordById(refTableId, function (err, rec) {
      const refField = rec?.fields;
      const month = refField['Month'] as string;
      console.log(month);
      upliftWrap.textContent = `${month}`;
    });
    console.log(mainAppFields);
  });

  getTableRecords(mainKpi).eachPage(function page(records) {
    const [lastRecord] = records.slice(-1);
    const lastRecordField = lastRecord.fields;
    const totalRevGenerated = lastRecordField['Total Revenue Generated'] as number;
    console.log(totalRevGenerated);

    const totalRevForm = FormatMillion(totalRevGenerated);
    const formatTotalRev = twoDecimalNum(totalRevForm);
    console.log(formatTotalRev);
    totalRevCard.textContent = `${formatTotalRev}M €`;
  });
  ////update Uplift YoY percent
  getTableRecords(revYoyID).eachPage(function page(records) {
    const [lastRoleRecord] = records.slice(-1);
    const lastRecordFields = lastRoleRecord.fields;
    const RevenueYoy = lastRecordFields['Revenue (YoY)'];
    const rnYoy = lastRecordFields['RN (YoY)'];
    const totalRn = lastRecordFields['Total Room Nights'] as number;
    const enrolTotal = lastRecordFields['Total Enrolments'] as number;
    const enrolYoy = lastRecordFields['Enrolments (YoY)'];
    console.log(enrolTotal);
    //const prevYearMonth = lastRecordFields['Previous Year'];
    //console.log(records.(prevYearMonth));
    // console.log(prevYearMonth);
    const totalRnFormat = twoDecimalNum(totalRn);
    const rnYoyPercent = changeToPercent(rnYoy);
    const totalEnrolFormat = twoDecimalNum(enrolTotal);
    const enrolYoyPercent = changeToPercent(enrolYoy);

    const enrolyoyHtml = document.querySelector('[rd-element="enrolYoy"]') as HTMLElement;
    const enrolNumberhtml = document.querySelector('[rd-element="enrol-numer"]') as HTMLElement;

    enrolNumberhtml.textContent = `${totalEnrolFormat}`;
    enrolyoyHtml.textContent = `+${enrolYoyPercent}%`;

    const bookNighText = `Booked room nights`;
    const enrolText = `Enrollment through web<br> & app`;
    updateCardContentUplift(bookNightCard, totalRnFormat, rnYoyPercent, bookNighText);
    //updateCardContentUplift(enrollWebAppCard, totalEnrolFormat, enrolYoyPercent, enrolText);

    console.log(totalRnFormat);
    const revFormated = changeToPercent(RevenueYoy) as number;
    updateCardPercent(totalRevYoy, revFormated);
  });
};

//<div rd-element="revUplift"><span class="green">+71.7%</span> uplift YoY</div>
