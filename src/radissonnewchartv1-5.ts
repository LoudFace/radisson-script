import Airtable, { Record } from 'airtable';

//import { getColumnData } from './appPageContentv1-2';
//import { callback } from 'chart.js/dist/helpers/helpers.core';
//import * as echarts from 'echarts';
import {
  apacScorePieChart,
  appDownloadPieChart,
  bookingsLineChart,
  chartOnlineShareApac,
  chartOnlineShareEmea,
  emeaScorePieChart,
  overAllScorePieChart,
} from './chartModule';
import { imageCarousel } from './slider';
window.Webflow ||= [];
window.Webflow.push(() => {
  ///helpers function
  //////
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
  //Pie chart second Number function
  const pieSecondValue = function (x) {
    return 100 - x;
  };
  ////////
  // section scroll into view
  const hotelAppSect = document.querySelector('.hotel-app--section');
  const imageQualitySection = document.querySelector('.image-quality--section');
  if (!imageQualitySection || !hotelAppSect) return;

  Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
  const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');
  radiChartbase('Monthly Downloads')
    .select({
      // Selecting the first 3 records in Grid view:
      //maxRecords: 3,
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        const monthData = records.map((record) => record.get('Month'));
        const androidPer = records.map((record) => record.get('Android Percentage (MoM)'));

        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  //// UI update from airtable
  const dataRevContainer = document.getElementById('dataRevCard');
  const dataRoomContainer = document.getElementById('dataRoomBook');
  const dataDownloadsContainer = document.getElementById('dataDownloads');
  const dataEnrollContainer = document.getElementById('dataEnrollWeb');
  const overallScore = document.querySelector('.overall__score--number');
  const emeaScore = document.querySelector('.emea__score--number');
  const apacScore = document.querySelector('.apac__score--number');
  const downloadScore = document.getElementById('downloadPercent');
  //dataRevCard dataRoomBook dataDownloads dataEnrollWeb
  if (
    !dataRevContainer ||
    !dataRoomContainer ||
    !dataDownloadsContainer ||
    !dataEnrollContainer ||
    !overallScore ||
    !emeaScore ||
    !apacScore ||
    !downloadScore
  )
    return;
  //let totalDownloads;
  radiChartbase('tbl8Ye0eoBXdPGyL5') //table ID
    .select({ view: 'Grid view' })
    .eachPage(function page(records) {
      const [totalDownloads] = records.map((record) => record.get('Total downloads'));
      const formatedNum = numberWithCommas(totalDownloads);
      dataEnrollContainer.innerHTML = `<div id="dataEnrollWeb" class="data--card w-node-_5f0a5e8d-8b6e-ee41-62f3-883791714490-bc5f1a51"><div class="text-style bold-text ligth--text-grad">Total Enrollments Web & App</div><div class="text-value-style text-size--3rem bluegradient">${formatedNum}</div><div class="text-card-style bold-text"><span class="green-text">+64.9 </span>uplift vs Feb 2022</div></div>`;
    });
  ////////
  radiChartbase('tblLNvYTvvUXvs0K7')
    .select({
      view: 'Grid view',
    })
    .eachPage(function page(records) {
      // console.log(records);
      const weeksData = records
        .map((record) => record.get('x-axis(weeks)'))
        .filter((rec) => rec !== undefined);

      const eerutData = records
        .map((record) => record.get('EERUT'))
        .map((eerut) => Math.floor(eerut * 100));

      const nobData = records
        .map((record) => record.get('NOB'))
        .map((nob) => Math.floor(nob * 100));

      const ukrwData = records
        .map((record) => record.get('UKIREWE'))
        .map((ukrw) => Math.floor(ukrw * 100));

      const ceseData = records
        .map((record) => record.get('CESE'))
        .map((cese) => Math.floor(cese * 100));

      const meaData = records
        .map((record) => record.get('MEA OS'))
        .map((mea) => Math.floor(mea * 100));
      const eerutWow = getColumnData('EERUT (WoW)', records);
      const nobWow = getColumnData('NOB (WoW)', records);
      const ukrWow = getColumnData('UKIRWE (WoW)', records);
      const ceseWow = getColumnData('CESE (WoW)', records);
      const meaWow = getColumnData('MEA (WoW)', records);
      const eerutWowFormated = formatColumnsTOPercent(eerutWow);
      const nobWowFormated = formatColumnsTOPercent(nobWow);
      const ukrWowFormated = formatColumnsTOPercent(ukrWow);
      const ceseWowFormated = formatColumnsTOPercent(ceseWow);
      const meaWowFormated = formatColumnsTOPercent(meaWow);
      //////
      ///UI UPDATES
      const eerutKey = document.getElementById('eerutKey');
      const nobKey = document.getElementById('nobKey');
      const ukrwKey = document.getElementById('ukrwKey');
      const ceseKey = document.getElementById('ceseKey');
      const meaKey = document.getElementById('meaKey');
      if (!eerutData || !nobKey || !ukrwKey || !ceseKey || !meaKey) return;
      //getting the last data for eerut,nob, ukr, cese, mea
      const [recentEerutData] = eerutData.slice(-1);
      const [recentNobData] = nobData.slice(-1);
      const [recentUkrData] = ukrwData.slice(-1);
      const [recentCeseData] = ceseData.slice(-1);
      const [recentMeaData] = meaData.slice(-1);
      //getting the last WoW data for eerut nob ukrw cese and mea
      const [eerutWowRecentData] = eerutWowFormated.slice(-1);
      const [nobWowRecentData] = nobWowFormated.slice(-1);
      const [ukrwWowRecentdata] = ukrWowFormated.slice(-1);
      const [ceseWowRecentData] = ceseWowFormated.slice(-1);
      const [meaWowRecentData] = meaWowFormated.slice(-1);
      ///////////
      eerutKey.innerHTML = `<div id="eerutKey" class="key__percent--container"><div class="key--percent-value ligth--text-grad">${recentEerutData}%</div><div class="key--percent"><span class="key__span--text ${
        eerutWowRecentData > 0 ? 'green' : 'red'
      }">${eerutWowRecentData}% </span>WoW</div></div>`;

      nobKey.innerHTML = `<div id="nobKey" class="key__percent--container"><div class="key--percent-value ligth--text-grad">${recentNobData}%</div><div class="key--percent"><span class="key__span--text ${
        nobWowRecentData > 0 ? 'green' : 'red'
      }">${nobWowRecentData}% </span>WoW</div></div>`;

      ukrwKey.innerHTML = `<div id="nobKey" class="key__percent--container"><div class="key--percent-value ligth--text-grad">${recentUkrData}%</div><div class="key--percent"><span class="key__span--text ${
        ukrwWowRecentdata > 0 ? 'green' : 'red'
      }">${ukrwWowRecentdata}% </span>WoW</div></div>`;

      ceseKey.innerHTML = `<div id="nobKey" class="key__percent--container"><div class="key--percent-value ligth--text-grad">${recentCeseData}%</div><div class="key--percent"><span class="key__span--text ${
        ceseWowRecentData > 0 ? 'green' : 'red'
      }">${ceseWowRecentData}% </span>WoW</div></div>`;

      meaKey.innerHTML = `<div id="nobKey" class="key__percent--container"><div class="key--percent-value ligth--text-grad">${recentMeaData}%</div><div class="key--percent"><span class="key__span--text ${
        meaWowRecentData > 0 ? 'green' : 'red'
      }">${meaWowRecentData}% </span>WoW</div></div>`;
      /////////
      //function calling the chart on the pageLoad
      chartOnlineShareEmea(
        weeksData,
        eerutData,
        nobData,
        ukrwData,
        ceseData,
        meaData,
        eerutWowFormated,
        nobWowFormated,
        ukrWowFormated,
        ceseWowFormated,
        meaWowFormated
      );
      //////
      ///UI UPDATES
      ////////// APAC table update
      const apacReport = document.querySelector('.apac_report-time');
      const chinaKeyWrap = document.getElementById('chinaKeyWrap');
      const inKeys = document.getElementById('inKeys');
      const seapKey = document.getElementById('seapKey');
      const emeaReportTime = document.querySelector('.emea_report-time');

      if (!apacReport || !chinaKeyWrap || !inKeys || !seapKey || !emeaReportTime) return;
      const [apacWeekData] = getColumnData('Week', records)
        .filter((el) => el !== undefined)
        .slice(-1);

      apacReport.textContent = `${apacWeekData}`;
      emeaReportTime.textContent = `${apacWeekData}`;

      const chinaData = records
        .map((record) => record.get('CN OS'))
        .map((x) => (x * 100).toFixed(2));

      const indiaData = records
        .map((record) => record.get('IN OS'))
        .map((x) => (x * 100).toFixed(2));

      const seapData = records
        .map((record) => record.get('SEAP OS'))
        .map((x) => (x * 100).toFixed(2));

      const chinaWoW = getColumnData('CN (WoW)', records);
      const inWOW = getColumnData('IN (WoW)', records);
      const seapWoW = getColumnData('SEAP (WoW)', records);
      const chinaWoWFormated2 = formatColumnsTOPercent(chinaWoW);
      const inWOWFormated = formatColumnsTOPercent(inWOW);
      const seapWoWFormated = formatColumnsTOPercent(seapWoW);
      const [chinaWowRecentValue] = chinaWoWFormated2.slice(-1);
      const [inWowRecentformatedValue] = inWOWFormated.slice(-1);
      const [seapWowRecentValue] = seapWoWFormated.slice(-1);
      const [recentChinaData] = chinaData.filter((el) => el !== 'NaN').slice(-1);
      const [recentIndiaData] = indiaData.filter((el) => el !== 'NaN').slice(-1);
      const [recentseapData] = seapData.filter((el) => el !== 'NaN').slice(-1);

      const chinaStringUpdate = `<div id="chinaKeyWrap" class="key__percent--container"><div id="chinaPercent" class="key--percent-value ligth--text-grad">${recentChinaData}%</div><div class="key--percent white-text"><span id="chinaWow" class="key__span--text ${
        chinaWowRecentValue > 0 ? 'green' : 'red'
      }">${chinaWowRecentValue}%</span> WoW</div></div>`;

      const inHtmlUpdate = `<div id="inKeys" class="key__percent--container"><div id="inPercent" class="key--percent-value ligth--text-grad">${recentIndiaData}%</div><div class="key--percent white-text"><span id="inWow" class="key__span--text ${
        inWowRecentformatedValue > 0 ? 'green' : 'red'
      }">${inWowRecentformatedValue}% </span> WoW</div></div>`;

      const seapHtmlUpdate = `<div id="seapKey" class="key__percent--container"><div id="seapPercent" class="key--percent-value ligth--text-grad">${recentseapData}%</div><div class="key--percent white-text"><span id="seapWow" class="key__span--text ${
        seapWowRecentValue > 0 ? 'green' : 'red'
      }">${seapWowRecentValue}%</span> WoW</div></div>`;

      chinaKeyWrap.innerHTML = chinaStringUpdate;
      inKeys.innerHTML = inHtmlUpdate;
      seapKey.innerHTML = seapHtmlUpdate;
      // <div id="seapKey" class="key__percent--container"><div id="seapPercent" class="key--percent-value ligth--text-grad">15.46%</div><div class="key--percent white-text"><span id="seapWow" class="key__span--text red">-16.40%</span> WoW</div></div>
      // <div id="seapPercent" class="key--percent-value ligth--text-grad">15.46%</div>
      //function calling the chart on the pageLoad

      chartOnlineShareApac(
        weeksData,
        chinaData,
        indiaData,
        seapData,
        chinaWoWFormated2,
        inWOWFormated,
        seapWoWFormated
      );
    });

  ///////
  ///////OMBT PERFORMANCE TABLE

  radiChartbase('tbl4ueTwB1q5I84F0')
    .select({ view: 'Grid view' })
    .eachPage(function page(records) {
      const weeksData = records
        .map((record) => record.get('x-axis(week)'))
        .filter((rec) => rec !== undefined);
      const rfBookingsData = records
        .map((record) => record.get('RFP Bookings'))
        .filter((rec) => rec !== undefined);

      const instantBookingData = records
        .map((record) => record.get('Instant Bookings'))
        .filter((rec) => rec !== undefined);

      const instantPercent = getColumnData('Instant Bookings (WoW)', records).map(
        (el) => +(el * 100).toFixed(2)
      );

      const rfpPercentdata = getColumnData('RFP Bookings (WoW)', records).map(
        (el) => +(el * 100).toFixed(2)
      );
      console.log(rfpPercentdata);

      bookingsLineChart(
        weeksData,
        instantBookingData,
        rfBookingsData,
        instantPercent,
        rfpPercentdata
      );
    });

  //pie chart
  radiChartbase('tbl8Ye0eoBXdPGyL5')
    .select({ view: 'Grid view' })
    .eachPage(function page(records) {
      const [overallData] = records
        .map((record) => record.get('Image Quality: Overall Score'))
        .filter((rec) => rec !== undefined)
        .map((rec) => rec * 100)
        .slice(-1);
      const pieValue2 = 100 - overallData;

      // EMEA pie chart
      const [emeaData] = records
        .map((record) => record.get('Image Quality: EMEA'))
        .filter((rec) => rec !== undefined)
        .map((rec) => rec * 100)
        .slice(-1);
      const emeaPieValue2 = 100 - emeaData;

      // APAC pie chart
      const [apacData] = records
        .map((record) => record.get('Image Quality: APAC'))
        .filter((rec) => rec !== undefined)
        .map((rec) => rec * 100)
        .slice(-1);
      const apacPieValue2 = 100 - apacData;

      ///Load Chart when scrolled inview
      function callbackFunction(entries) {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            overallScore.textContent = `${overallData}%`;
            overAllScorePieChart(overallData, pieValue2);

            apacScore.textContent = `${apacData}%`;
            apacScorePieChart(apacData, apacPieValue2);

            emeaScore.textContent = `${emeaData}%`;
            emeaScorePieChart(emeaData, emeaPieValue2);
          }
        });
      }
      const callbackOptions = {
        threshold: 0.6,
      };
      const observer = new IntersectionObserver(callbackFunction, callbackOptions);
      observer.observe(imageQualitySection);

      //// e
    });
  ///// Pie Chart
  radiChartbase('tblCxvDHIID3Z8ncV')
    .select({ view: 'Grid view' })
    .eachPage(function page(records) {
      const [downloadsData] = records
        .map((record) => record.get('Progress Percent'))
        .filter((rec) => rec !== undefined)
        .map((rec) => Math.floor(rec * 100))
        .slice(-1);
      const secondValue = pieSecondValue(downloadsData);

      const pieintoView = function (entries) {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            downloadScore.textContent = `${downloadsData}%`;
            appDownloadPieChart(downloadsData, secondValue);
          }
        });
      };

      const options = {
        threshold: 0.6,
      };

      const newObserve = new IntersectionObserver(pieintoView, options);
      newObserve.observe(hotelAppSect);
    });
  // airtable token: patoll3eGTrzISDDg.fa7abddfdd64020bc6e145425a6c43ed16529a8cf956e4b929e4f9b14bfd3ca3
  //API token : keyAk5slAmWBfaIoz

  //Night mode switch
  const pageBody = document.querySelector<HTMLElement>('body');
  const pageWrapper = document.querySelector('.page-wrapper');
  const darkModeCont = document.querySelector<HTMLElement>('.dark-mode-container');
  const lightModeCont = document.querySelector<HTMLElement>('.light-mode-container');
  const toggleBtn = document.querySelector<HTMLElement>('.tooglebtn-container');
  const logoImg = document.querySelector<HTMLImageElement>('.lognav--img');
  const footerLogoimg = document.querySelector<HTMLImageElement>('.footer--logo-img');

  let clicked = true;
  if (
    !pageBody ||
    !darkModeCont ||
    !lightModeCont ||
    !toggleBtn ||
    !pageWrapper ||
    !logoImg ||
    !footerLogoimg
  )
    return;

  // const switchToLightMode = function () {
  //   darkModeCont.style.backgroundColor = 'transparent';
  //   lightModeCont.style.backgroundColor = '#f8f8f8';
  //   pageBody.style.color = '#6666';
  //   pageBody.style.backgroundColor = '#fff';
  //   pageWrapper.classList.add('lightmode');
  //   logoImg.src =
  //     'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6444365d3896b516cde647f7_hotel-Radisson-logo%201.svg';
  // };
  //load page with device mode
  // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  //   switchToLightMode();
  //   clicked = !clicked;
  //

  const handleMode = function () {
    if (clicked) {
      darkModeCont.style.backgroundColor = 'transparent';
      lightModeCont.style.backgroundColor = '#f8f8f8';
      pageBody.style.color = '#666';
      pageBody.style.backgroundColor = '#fff';
      pageWrapper.classList.add('lightmode');
      footerLogoimg.src =
        'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6444365d3896b516cde647f7_hotel-Radisson-logo%201.svg';
      logoImg.src =
        'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6444365d3896b516cde647f7_hotel-Radisson-logo%201.svg';
    } else {
      darkModeCont.style.backgroundColor = '#f8f8f8';
      lightModeCont.style.backgroundColor = 'transparent';
      pageBody.style.color = '#999999';
      pageBody.style.backgroundColor = '#0d0d0d';
      pageWrapper.classList.remove('lightmode');
      logoImg.src =
        'https://assets.website-files.com/63ee41b9862db4b9345f1a50/640c5fed09bfca3196634b09_hotel-Radisson-logo%201.svg';
      footerLogoimg.src =
        'https://assets.website-files.com/63ee41b9862db4b9345f1a50/640c5fed09bfca3196634b09_hotel-Radisson-logo%201.svg';
    }
    clicked = !clicked;
  };
  toggleBtn.addEventListener('click', handleMode);
  imageCarousel();
});

// <script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/radissonnewchartv1-1.js'> </script>

//<script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/appPageContent.js'> </script>
// https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/appPageContent.js

//<script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/radissonnewchartv1-5.js'> </script>
//<script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/radissonnewchartv1-4.css'> </script>
// <script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/radissonnewchartv1-5.js'> </script>
