import Airtable from 'airtable';

import { changeToPercent, getColumnData, numberWithCommas } from './helperFunction';

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
  const bookNightCard = document.querySelector('[rd-element="booknight"]');
  const appDownloadCard = document.querySelector('[rd-element="appDownload"]');
  const enrollWebAppCard = document.querySelector('[rd-element="wepApp"]');
  if (!totalRevenueCard || !bookNightCard || !appDownloadCard || !enrollWebAppCard) return;

  const updateCardContent = function (
    cardcontainer: HTMLElement,
    bigData: string,
    wowData: number
  ) {
    cardcontainer.innerHTML = `<div class="text-style-18px text-color-white">App downloads in 2023</div><div id="appDownloads" class="text-style-3rem gradienttext">${bigData}</div><div><span class="green">+${wowData}%</span> vs Annual Target: 1.3m</div>`;
  };
  //
  //`<div class="text-style-18px text-color-white">App downloads in 2023</div><div id="appDownloads" class="text-style-3rem gradienttext">238,888</div><div><span class="green">+39.5%</span> &nbsp;vs Annual Target: 1.3m</div>`
  //////////////////////////////App Anual Target base on Airtable
  getTableRecords('tblCxvDHIID3Z8ncV').eachPage(function page(records) {
    const appDownloadPercent = getColumnData('Progress Percent', records).slice(-1);
    const [appTotalDownload] = getColumnData('Total downloads (Combined)', records).slice(-1);
    //const [month] = getColumnData('Month', records).slice(-1);
    const appTotalDownloadFormated = numberWithCommas(appTotalDownload);
    const appDownloadPercentformated = changeToPercent(appDownloadPercent);
    const [lastRecord] = records.slice(-1);
    //const totalDownloadYoy = lastRecord['Total Downloads (YoY)'];
    console.log(lastRecord.fields['Total Downloads (YoY)']);
    // console.log(totalDownloadYoy);
    console.log(lastRecord, 'laslas');

    // console.log(month);
    updateCardContent(appDownloadCard, appTotalDownloadFormated, appDownloadPercentformated);
  });
};
