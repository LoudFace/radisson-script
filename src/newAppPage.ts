//import 'dotenv/config';
//import fetch from 'node-fetch';
//import Webflow from 'webflow-api';
import Airtable from 'airtable';

import { appMonthlyChart, appRatingChart } from './newApppageChart';
//const webflowApi = process.env.API_KEY;

const getColumnData = function (nameOfField: string, records) {
  return records.map((rec) => rec.get(nameOfField));
};
const changeToPercent = function (x) {
  return +(x * 100).toFixed(1);
};
/// formated column data with percent and change NaN and infinity to Zero
const formatColumnsTOPercent = function (arr) {
  const formatedArr = arr
    .map((el) => {
      if (typeof el === 'object') el = 0;
      return el;
    })
    .map((el) => {
      return +(el * 100).toFixed(2);
    });
  return formatedArr;
};
//format thousand with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('samuel');
  Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
  const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');
  //getting table Records data
  const getTableRecords = function (tableId) {
    return radiChartbase(tableId).select({
      view: 'Grid view',
    });
  };

  //////////////////////////airtable variables

  const tableMonthlyDownload = 'tblhxgDITpzlU0Nu4';

  getTableRecords(tableMonthlyDownload).eachPage(function page(records) {
    console.log(records);
    const months = getColumnData('Month', records);
    const totalDownloads = getColumnData('Total downloads', records);
    const iOs = getColumnData('iOS', records);
    const android = getColumnData('Android', records);
    const organiceDownloads = getColumnData('Organic downloads', records);
    const compaignDownloads = getColumnData('Campaign downloads', records);

    ///////////////////////WoW data fetch
    const totalDownloadsMom = getColumnData('Total Downloads (MoM)', records);
    const iOsMom = getColumnData('iOS DL (MoM)', records);
    const androidMom = getColumnData('Android DL (MoM)', records);
    const organiceDownloadsMom = getColumnData('Organic Downloads (MoM)', records);
    const compaignDownloadsMom = getColumnData('Campaign Downloads (MoM)', records);

    ////////////Forma MoM data to percent and remove any NaN or Object present
    const totalDownloadsFormated = formatColumnsTOPercent(totalDownloadsMom);
    const iOsMomFormated = formatColumnsTOPercent(iOsMom);
    const androidMomFormated = formatColumnsTOPercent(androidMom);
    const organiceDownloadsMomFormated = formatColumnsTOPercent(organiceDownloadsMom);
    const compaignDownloadsMomFormated = formatColumnsTOPercent(compaignDownloadsMom);
    console.log(iOsMomFormated);
    ///////////////////Ploting the chart passing Data to the function created in the newApppageChart.ts
    appMonthlyChart(
      months,
      totalDownloads,
      iOs,
      android,
      organiceDownloads,
      compaignDownloads,
      totalDownloadsFormated,
      iOsMomFormated,
      androidMomFormated,
      organiceDownloadsMomFormated,
      compaignDownloadsMomFormated
    );
    //getting the last item of the arrays

    const convertoSingleValue = function (itemarray) {
      const [a] = itemarray.slice(-1);
      return numberWithCommas(a);
    };

    const tDownload = convertoSingleValue(totalDownloads);
    const iOsLatest = convertoSingleValue(iOs);
    const androidLatest = convertoSingleValue(android);
    const organiceDownloadsLatest = convertoSingleValue(organiceDownloads);
    const compaignDownloadsLatest = convertoSingleValue(compaignDownloads);

    const [tDownloadWoW] = totalDownloadsFormated.slice(-1);
    const [iOsLatestMoM] = iOsMomFormated.slice(-1);
    const [androidMomLatest] = androidMomFormated.slice(-1);
    const [organicMomLatest] = organiceDownloadsMomFormated.slice(-1);
    const [compaignMomLatest] = compaignDownloadsMomFormated.slice(-1);
    console.log(compaignDownloadsLatest);
    // ////////////Update the UI of the label on the page
    const totalDownloadsKeyWrap = document.querySelector('[rd-element="totalDownloadsKey"]');
    const iosKeyWrap = document.querySelector('[rd-element="iosKey"]');
    const androidKeyWrap = document.querySelector('[rd-element="androidKey"]');
    const organicKeyWrap = document.querySelector('[rd-element="organicKey"]');
    const campaignKeyWrap = document.querySelector('[rd-element="compaignKey"]');

    const updateKey = function (contWrap, amount, Wowvalue) {
      contWrap.innerHTML = `<div class="key--percent-value ligth--text-grad">${amount}</div><div class="key--percent"><span class="key__span--text ${
        Wowvalue > 0 ? 'green' : 'red'
      }"> ${Wowvalue}% </span>MoM</div>`;
    };
    updateKey(totalDownloadsKeyWrap, tDownload, tDownloadWoW);
    updateKey(iosKeyWrap, iOsLatest, iOsLatestMoM);
    updateKey(androidKeyWrap, androidLatest, androidMomLatest);
    updateKey(organicKeyWrap, organiceDownloadsLatest, organicMomLatest);
    updateKey(campaignKeyWrap, compaignDownloadsLatest, compaignMomLatest);
  });
  ///////////
  ////////App Rating Chart and Data

  const tableNameId = 'tbl0ZgnAdMNsehqqF';
  getTableRecords(tableNameId).eachPage(function page(records) {
    const months = getColumnData('Month', records);
    const android = getColumnData('Android', records);
    const ios = getColumnData('iOS', records);

    /////Getting the YoY data for the ratings

    const androidYoY = getColumnData('Android (YoY)', records);
    const iosYoy = getColumnData('iOS (YoY)', records);

    const androidYoYFormated = formatColumnsTOPercent(androidYoY);
    const iosYoyFormated = formatColumnsTOPercent(iosYoy);
    /////////passing Data to the imported function
    appRatingChart(months, android, ios, androidYoYFormated, iosYoyFormated);

    //////// UI update
    const [iosYoyLatest] = iosYoyFormated.slice(-1);
    const [androidYoyLatest] = androidYoYFormated.slice(-1);
    const iosWrap = (document.querySelector('[rd-element="iosData"]').textContent = iosYoyLatest);
    const androidWrap = (document.querySelector('[rd-element="androidData"]').textContent =
      androidYoyLatest);
  });

  //Working method Querry
  //const API_KEY = 'f647046cc46a758c81c2af41f9c649d938597ca0385a10256a084a5d0ca5fd0f';
  // const url = `https://api.webflow.com/collections/647a48349d710f24028849ca/items?access_token=${API_KEY}`;
  // const options = { method: 'GET', headers: { accept: 'application/json' } };
  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error('error:' + err));
});
