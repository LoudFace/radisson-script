//import 'dotenv/config';
//import fetch from 'node-fetch';
//import Webflow from 'webflow-api';
import Airtable from 'airtable';
import { changeToPercent, formatColumnsTOPercent, getColumnData } from 'src/helperFunction';

import { airtableUiData, renderTestimonial } from './appUi';
import {
  actvieUserchart,
  appMonthlyChart,
  appRatingChart,
  convertRateChart,
  revChart,
  roomBookedChart,
} from './newApppageChart';
//const webflowApi = process.env.API_KEY;

// const getColumnData = function (nameOfField: string, records) {
//   return records.map((rec) => rec.get(nameOfField));
// };

// const changeToPercent = function (x) {
//   return +(x * 100).toFixed(1);
// };s
/// formated column data with percent and change NaN and infinity to Zero
// const formatColumnsTOPercent = function (arr) {
//   const formatedArr = arr
//     .map((el) => {
//       if (typeof el === 'object' || typeof el === 'undefined') el = 0;
//       return el;
//     })
//     .map((el) => {
//       return +(el * 100).toFixed(2);
//     });
//   return formatedArr;
// };

const convertUnsetValueToZero = function (arr) {
  const formatedArr = arr.map((el) => {
    if (typeof el === 'object' || typeof el === 'undefined') el = 0;
    return el;
  });
  return formatedArr;
};
//format thousand with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const convertoSingleValue = function (itemarray) {
  const [a] = itemarray.slice(-1);
  return numberWithCommas(a);
};

const convertToPercent = (x) => +(x * 100).toFixed(2);

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
    // console.log(records);
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
    console.log(months);
    // console.log(iOsMomFormated);
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
    // console.log(compaignDownloadsLatest);
    // ////////////Update the UI of the label on the page
    const totalDownloadsKeyWrap = document.querySelector('[rd-element="totalDownloadsKey"]');
    const iosKeyWrap = document.querySelector('[rd-element="iosKey"]');
    const androidKeyWrap = document.querySelector('[rd-element="androidKey"]');
    const organicKeyWrap = document.querySelector('[rd-element="organicKey"]');
    const campaignKeyWrap = document.querySelector('[rd-element="compaignKey"]');
    const currentMonth = document.querySelector('[rd-element="currentMonth"]') as HTMLElement;

    const [lastRole] = records.slice(-1);
    const monthData = lastRole.fields['Month Full'];
    currentMonth.innerHTML = `${monthData}`;

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

    //////// UI update for the
    const [iosYoyLatest] = iosYoyFormated.slice(-1);
    const [androidYoyLatest] = androidYoYFormated.slice(-1);
    const iosWrap = (document.querySelector('[rd-element="iosData"]').textContent = iosYoyLatest);
    const androidWrap = (document.querySelector('[rd-element="androidData"]').textContent =
      androidYoyLatest);
  });

  /////////////Room night Chart
  /// Room Nights iOS Android
  const revenueTable = 'tblT1C7g9L0pJGYT5';
  getTableRecords(revenueTable).eachPage(function page(records) {
    const months = getColumnData('Month', records);
    const androidRns = getColumnData('Android RNs', records);
    const iosRns = getColumnData('iOS RNs', records);

    //////get MoM data
    const androidRnsMoM = getColumnData('Android RNs (MoM)', records);
    const iosRnsMoM = getColumnData('iOS RNs (MoM)', records);
    const androidRnsMoMFormated = formatColumnsTOPercent(androidRnsMoM);
    const iosRnsMoMFormated = formatColumnsTOPercent(iosRnsMoM);
    //console.log(androidRnsMoMFormated, iosRnsMoMFormated);

    roomBookedChart(months, androidRns, iosRns, androidRnsMoMFormated, iosRnsMoMFormated);

    ////Update the UI Keys
    const [androidMomFormatedLatest] = androidRnsMoMFormated.slice(-1);
    const [iosRnsMoMFormatedLatest] = iosRnsMoMFormated.slice(-1);

    const iosRnsLatest = convertoSingleValue(iosRns);
    const androidRnsLatest = convertoSingleValue(androidRns);
    const [lastMonthRec] = records.slice(-1);
    const lastMonth = lastMonthRec.fields['Month Full'];

    const androidWrap = document.querySelector('[rd-element="androidRoomnight"]');
    const iosWrap = document.querySelector('[rd-element="iosRoomnight"]');
    const roomNightMonth = document.querySelector('[rd-element="booknight-currentMonth"]');
    if (!roomNightMonth) return;

    const updateKey = function (contWrap, amount, Wowvalue) {
      contWrap.innerHTML = `<div class="bookings-number-text ligth--text-grad">${amount}</div><div class="key--percent"><span class="key__span--text ${
        Wowvalue > 0 ? 'green' : 'red'
      }"> ${Wowvalue > 0 ? '+' : ''}${Wowvalue}% </span>MoM</div>`;
    };
    roomNightMonth.innerHTML = `${lastMonth}`;
    updateKey(iosWrap, iosRnsLatest, iosRnsMoMFormatedLatest);
    updateKey(androidWrap, androidRnsLatest, androidMomFormatedLatest);
  });

  /////////////////
  //////////Bar chart
  ////Active users Benchmark tabele
  const activeTableId = 'tblBB9s2JT4wbCYAP';
  getTableRecords(activeTableId).eachPage(function page(records) {
    //const month = [];
    // getTableRecords('tblQ0d7KckUDCVJrg').eachPage(function page(newrecors) {
    //   const [lastRoleItem] = newrecors.slice(-1);
    //   const lastMmonth = lastRoleItem.fields['Month'];
    //   month.push(lastMmonth);
    // });
    const date = new Date();
    const month = date.getMonth();
    console.log(month, 'this');
    const brands = getColumnData('Brands', records);
    const currentMonthUsers = getColumnData('Current Month Active Users', records);
    const prevMonthUsers = getColumnData('Prev Month Active Users', records);
    const changeMoM = getColumnData('Change MoM', records);
    const changeMoMFormated = formatColumnsTOPercent(changeMoM);
    console.log(changeMoMFormated);
    actvieUserchart(brands, prevMonthUsers, currentMonthUsers, changeMoMFormated);
  });

  /////////
  ////////fix the y-axis to the chart
  // const scrollContainer = document.querySelector('[rd-element="scrollcontainer"]');
  // const yAxisWrap = document.querySelector('[rd-element="y-axiswrap"]');
  // console.log(scrollContainer);
  // if (!scrollContainer || !yAxisWrap) return;
  // scrollContainer.addEventListener('scroll', function (e) {
  //   const pxScrolled = scrollContainer.scrollLeft;
  //   if (pxScrolled > 89) {
  //     yAxisWrap.classList.add('show-y');
  //     yAxisWrap.style.backgroundColor = '#121214';
  //   } else {
  //     yAxisWrap.classList.remove('show-y');
  //     yAxisWrap.style.backgroundColor = '#0d0d0d';
  //   }
  // });

  ////////
  ////// Conversion rate and revenue genrated Bar chart
  /////Table name App Revenue + Conversion
  const revTableId = 'tblW36AI9FXg7LcoD';
  getTableRecords(revTableId).eachPage(function page(records) {
    const month = getColumnData('Month', records);
    const androidConversion = getColumnData('Android Conversion', records);
    const iosConversion = getColumnData('iOS Conversion', records);
    const androidconversionYoy = getColumnData('Android Conversion (YoY)', records);
    const iosConverionYoy = getColumnData('iOS Conversion (YoY)', records);
    const combinedConversionYoY = getColumnData('Combined Conversion', records);

    //console.log(combinedConversionYoY);
    //console.log(iosConversion);
    ///////////////
    ///////////Revenu values
    const androidRev = getColumnData('Android Revenue', records);
    const iosRev = getColumnData('iOS Revenue', records);
    const androidRevYoy = getColumnData('Prev Android Rev (YoY)', records);
    const iosRevYoy = getColumnData('Prev iOS Rev (YoY)', records);
    const combinedRevenue = getColumnData('Combined Revenue', records);
    const androidRevFormated = convertUnsetValueToZero(androidRev);
    const iosRevFormated = convertUnsetValueToZero(iosRev);
    console.log(androidRevFormated);
    //console.log(iosRevFormated, 'thisnew');
    ///////
    const combinedConversionFormated = formatColumnsTOPercent(combinedConversionYoY);
    const androidConversionFormated = formatColumnsTOPercent(androidConversion);
    const iosConversionFormated = formatColumnsTOPercent(iosConversion);
    const androidconversionYoyFormated = formatColumnsTOPercent(androidconversionYoy);
    const iosConverionYoyFormated = formatColumnsTOPercent(iosConverionYoy);
    const androidRevYoyFormated = formatColumnsTOPercent(androidRevYoy);
    const iosRevYoyFormated = formatColumnsTOPercent(iosRevYoy);
    console.log(combinedConversionFormated);
    //  const combinesRevFormated =  formatColumnsTOPercent
    // console.log(iosConversionFormated, 'this');
    //////////Pass data to chart function
    convertRateChart(
      month,
      androidConversionFormated,
      iosConversionFormated,
      androidconversionYoyFormated,
      iosConverionYoyFormated,
      combinedConversionFormated
    );
    revChart(
      month,
      androidRevFormated,
      iosRevFormated,
      androidRevYoyFormated,
      iosRevYoyFormated,
      combinedRevenue
    );
    ///////////////////
    ////////Update the UI of the key
    const androidWrapCon = document.querySelector('[rd-element="androidKey-conversion"]');
    const iosWrapCon = document.querySelector('[rd-element="iosKey-conversion"]');
    const androidWrapRev = document.querySelector('[rd-element="androidkey-rev"]');
    const iosWrapRev = document.querySelector('[rd-element="iosKey-rev"]');
    const revConMonth = document.querySelectorAll('[rd-element="revmonth"]');

    console.log(revConMonth);
    const [lastMonth] = month.slice(-1);
    // eslint-disable-next-line no-return-assign
    revConMonth.forEach((el) => (el.innerHTML = `${lastMonth}`));
    /////Latest items from the array
    const [androidLatestConValue] = androidConversionFormated.slice(-1);
    const [iOsLatestConValue] = iosConversionFormated.slice(-1);
    const [androidYoYlatestConValue] = androidconversionYoyFormated.slice(-1);
    const [iosYoyLatestValue] = iosConverionYoyFormated.slice(-1);

    const [androidRevLatestValue] = androidRevFormated.slice(-1);
    const [iosRevLatestValue] = iosRevFormated.slice(-1);
    const [androidRevYoyLatest] = androidRevYoyFormated.slice(-1);
    const [iosRevYoyLatest] = iosRevYoyFormated.splice(-1);

    const androidLatestFormat = numberWithCommas(androidRevLatestValue);
    const iosLatestFormat = numberWithCommas(iosRevLatestValue);

    //console.log(iosRevLatestValue);

    const updateUiConvertRate = function (container, value, percentChange) {
      container.innerHTML = `<div id="totalDownloads" class="key--percent-value ligth--text-grad">${value}%</div><div class="key--percent"><span class="key__span--text ${
        percentChange > 0 ? 'green' : 'red'
      }"> ${[percentChange > 0 ? '+' : '']}${percentChange}% </span>YoY</div>`;
    };

    const updateRevUi = function (container, value, percentChange) {
      container.innerHTML = `<div id="totalDownloads" class="key--percent-value ligth--text-grad">€ ${value}</div><div class="key--percent"><span class="key__span--text ${
        percentChange > 0 ? 'green' : 'red'
      }"> ${[percentChange > 0 ? '+' : '']}${percentChange}% </span>YoY</div>`;
    };
    updateUiConvertRate(androidWrapCon, androidLatestConValue, androidYoYlatestConValue);
    updateUiConvertRate(iosWrapCon, iOsLatestConValue, iosYoyLatestValue);
    updateRevUi(androidWrapRev, androidLatestFormat, androidRevYoyLatest);
    updateRevUi(iosWrapRev, iosLatestFormat, iosRevYoyLatest);
  });

  ////////fix the y-axis to the chart conversion Bar chart
  const barScrollContainer = document.querySelector('[rd-element="bar-scroll-wrap"]');
  const barYAxisWrap = document.querySelector('[rd-element="barY-axiswrap"]');

  ///////Revenue chart scroll containers
  const scrollContainer = document.querySelector('[rd-element="scrollcontainer"]');
  const yAxisWrap = document.querySelector('[rd-element="y-axiswrap"]');
  const monthlySCroll = document.querySelector('[rd-element="month-scroll"]');
  const monthYWrap = document.querySelector('[rd-element="month-ywrap"]');
  const revScrollwrap = document.querySelector('[rd-element="revBar-scrollwrap"]');
  const revYaxisWrap = document.querySelector('[rd-element="revbar-Y-wrap"]');
  const rmNightYwrap = document.querySelector('[rd-element="room-yWrap"]');
  const roomScroll = document.querySelector('[rd-element="room-night-scroll"]');
  const appratingScroll = document.querySelector('[rd-element="appScroll"]');
  const appRatingYwrap = document.querySelector('[rd-element="app-ywrap"]');
  const chartCOlor = '#0d0d0d';
  const appcolor = '#121213';
  console.log(monthYWrap);
  console.log(monthlySCroll);
  // console.log(scrollContainer); //////CONVERT THIS TO A FUNCTION
  if (!barScrollContainer || !barYAxisWrap) return;

  ///////////////FUnctiont that fix the y-axis .
  const fixYaxis = function (scrollCont, yAxisContainer, color) {
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
  //////////////////Calling function to fix chart Y-axis
  fixYaxis(scrollContainer, yAxisWrap, chartCOlor);
  fixYaxis(barScrollContainer, barYAxisWrap, chartCOlor);
  fixYaxis(revScrollwrap, revYaxisWrap, chartCOlor);
  fixYaxis(monthlySCroll, monthYWrap, appcolor);
  fixYaxis(roomScroll, rmNightYwrap, chartCOlor);
  fixYaxis(appratingScroll, appRatingYwrap, chartCOlor);

  /////////////////
  /////////////App Reviews UI update tabel name = App Reviews and Ratings
  const appReviewTableid = 'tblI1hnEh9PoFsu0Y';
  getTableRecords(appReviewTableid).eachPage(function page(records) {
    const [appReviewsRecords] = records.slice(-1);
    const appInfo = appReviewsRecords.fields;

    const iosReviews = appInfo['iOS Reviews'];
    const androidReviews = appInfo['Android Reviews'];
    const iosRating = appInfo['iOS Ratings'];
    const androidRating = appInfo['Android Ratings'];
    const combineReviews = appInfo['Combined Reviews'];
    const combineRating = appInfo['Combined Ratings'];

    const androidAppreviewWrap = document.querySelector('[rd-element="appreviews-android"]');
    const combinesReviewWrap = document.querySelector('[rd-element="appreviews-combined"]');
    const iosReviewsWrap = document.querySelector('[rd-element="appreviews-ios"]');

    const updataAppreviewsUI = function (container, reviews, rating) {
      const ratingFormated = numberWithCommas(rating);
      const reviewsFormated = numberWithCommas(reviews);
      container.innerHTML = `<div class="text-style-normal-20px grey">${reviewsFormated} reviews</div><div class="text-style-normal-20px grey">${ratingFormated} ratings</div>`;
    };
    updataAppreviewsUI(androidAppreviewWrap, androidReviews, androidRating);
    updataAppreviewsUI(combinesReviewWrap, combineReviews, combineRating);
    updataAppreviewsUI(iosReviewsWrap, iosReviews, iosRating);

    /////Syntax to find an ELement in airtable array
    // eslint-disable-next-line no-return-assign
    // const userId = records.find((el) => (el.fields.id = '"recVgHJEZaIhFA4WX"'));
  });
  ////////////////
  //////////APP hero UI update
  //table name: App Annual Target
  const appTargetId = 'tblCxvDHIID3Z8ncV';
  getTableRecords(appTargetId).eachPage(function page(records) {
    // console.log(records);
    const [lastROle] = records.slice(-1);
    const appAt = lastROle.fields;
    //console.log(appAt);
    const projectedTaget = appAt['Projected Target'];
    const progressPercent = appAt['Progress Percent'];
    const month = appAt.Month;
    const annualTarget = appAt['Annual Target'];
    const totalDownloadsCombined = appAt['Total downloads (Combined)'];
    const progressPercentFormat = convertToPercent(progressPercent);
    const projectedTagetFormat = convertToPercent(projectedTaget);
    console.log(totalDownloadsCombined);
    const tdownloadsFormat = numberWithCommas(totalDownloadsCombined);
    /////Update the UI
    const appDownloadInfoWrap = document.querySelector('[rd-element="appDownload-info"]');
    const toolTipDownload = document.querySelector('[rd-element="download-num"]');
    const currentDownload = document.querySelector('[rd-element="current-download"]');
    const downloadRange = document.querySelector('[rd-element="download-range"]') as HTMLElement;
    if (!appDownloadInfoWrap || !currentDownload || !toolTipDownload || !downloadRange) return;
    console.log(progressPercentFormat);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dateOb = new Date();
    const monthIndex = dateOb.getMonth();
    const monthPercent = (monthIndex / months.length) * 100;

    downloadRange.style.width = `${monthPercent}%`;
    toolTipDownload.textContent = tdownloadsFormat;
    currentDownload.textContent = tdownloadsFormat;
    appDownloadInfoWrap.innerHTML = `<div class="estimated_downloads-col"><div class="estimated_downloads-wrap"><div rd-element="achieved" class="text-style-24px-bold gradienttext">${progressPercentFormat}%</div><div class="text-style-16px white-text">Achieved to date</div></div><div class="estimated_downloads-wrap"><div rd-element="projected-target" class="text-style-24px-bold gradienttext">${projectedTagetFormat}%</div><div class="text-style-16px white-text">Projected target year to date</div></div></div><div class="app_target-wrap"><div rd-element="download-target" class="text-style-32px bold-text gradienttext">1.3 M</div><div class="text-style-14px-medium">Downloads target for 2023</div></div>`;
  });

  ////////////APP Reviews
  // const reviewID = 'tblLkbATwP3Os0oF7';
  // getTableRecords(reviewID).eachPage(function page(records) {
  //   const reviewFields = records.map((el) => el.fields);
  //   console.log(reviewFields);

  //  // Working method Querry
  //   const API_KEY = 'f647046cc46a758c81c2af41f9c649d938597ca0385a10256a084a5d0ca5fd0f';
  //  // const url = `https://api.webflow.com/collections/647a48349d710f24028849ca/items?access_token=${API_KEY}`;
  //   const options = { method: 'GET', headers: { accept: 'application/json' } };
  //   fetch(url, options)
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.error('error:' + err));

  renderTestimonial();
  airtableUiData();
  //Working method Querry
  //const API_KEY = 'f647046cc46a758c81c2af41f9c649d938597ca0385a10256a084a5d0ca5fd0f';
  // const url = `https://api.webflow.com/collections/647a48349d710f24028849ca/items?access_token=${API_KEY}`;
  // const options = { method: 'GET', headers: { accept: 'application/json' } };
  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error('error:' + err));
});
