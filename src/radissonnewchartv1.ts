import Airtable, { Record } from 'airtable';

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
window.Webflow ||= [];
window.Webflow.push(() => {
  //format thousand with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  //Pie chart second Number function
  const pieSecondValue = function (x) {
    return 100 - x;
  };

  console.log(pieSecondValue(50));
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

  //  console.log(dataEnrollContainer, dataDownloadsContainer, dataRoomContainer, dataRevContainer);

  // dataDownloadsContainer.innerHTML = `<div id="dataEnrollWeb" class="data--card w-node-_5f0a5e8d-8b6e-ee41-62f3-883791714490-bc5f1a51"><div class="text-style bold-text ligth--text-grad">Total Enrollments Web & App</div><div class="text-value-style text-size--3rem bluegradient">${totalDownloads}</div><div class="text-card-style bold-text"><span class="green-text">+64.9 </span>uplift vs Feb 2022</div></div>`;

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
      //function calling the chart on the pageLoad
      chartOnlineShareEmea(weeksData, eerutData, nobData, ukrwData, ceseData, meaData);

      const chinaData = records
        .map((record) => record.get('CN OS'))
        .map((x) => (x * 100).toFixed(2));

      const indiaData = records
        .map((record) => record.get('IN OS'))
        .map((x) => (x * 100).toFixed(2));

      const seapData = records
        .map((record) => record.get('SEAP OS'))
        .map((x) => (x * 100).toFixed(2));
      //function calling the chart on the pageLoad
      chartOnlineShareApac(weeksData, chinaData, indiaData, seapData);
    });

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

      bookingsLineChart(weeksData, rfBookingsData, instantBookingData);
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

      //UI update
      overallScore.textContent = `${overallData}%`;
      //overall pie chart
      //function calling the chart on the pageLoad
      overAllScorePieChart(overallData, pieValue2);

      // EMEA pie chart
      const [emeaData] = records
        .map((record) => record.get('Image Quality: EMEA'))
        .filter((rec) => rec !== undefined)
        .map((rec) => rec * 100)
        .slice(-1);
      const emeaPieValue2 = 100 - emeaData;
      //UI update
      emeaScore.textContent = `${emeaData}%`;
      //pie chart function
      //function calling the chart on the pageLoad
      emeaScorePieChart(emeaData, emeaPieValue2);

      // APAC pie chart
      const [apacData] = records
        .map((record) => record.get('Image Quality: APAC'))
        .filter((rec) => rec !== undefined)
        .map((rec) => rec * 100)
        .slice(-1);
      const apacPieValue2 = 100 - apacData;
      //update UI
      apacScore.textContent = `${apacData}%`;
      //function calling the chart on the pageLoad
      apacScorePieChart(apacData, apacPieValue2);
    });

  radiChartbase('tblCxvDHIID3Z8ncV')
    .select({ view: 'Grid view' })
    .eachPage(function page(records) {
      const [downloadsData] = records
        .map((record) => record.get('Progress Percent'))
        .filter((rec) => rec !== undefined)
        .map((rec) => Math.floor(rec * 100))
        .slice(-1);
      const secondValue = pieSecondValue(downloadsData);
      downloadScore.textContent = `${downloadsData}%`;
      appDownloadPieChart(downloadsData, secondValue);
    });
  // airtable token: patoll3eGTrzISDDg.fa7abddfdd64020bc6e145425a6c43ed16529a8cf956e4b929e4f9b14bfd3ca3
  //API token : keyAk5slAmWBfaIoz
});

// <script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/radissonnewchartv1.js'> </script>