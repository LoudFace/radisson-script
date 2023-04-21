import Airtable, { Record } from 'airtable';

//import * as echarts from 'echarts';
import {
  apacScorePieChart,
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
  //dataRevCard dataRoomBook dataDownloads dataEnrollWeb

  if (
    !dataRevContainer ||
    !dataRoomContainer ||
    !dataDownloadsContainer ||
    !dataEnrollContainer ||
    !overallScore ||
    !emeaScore ||
    !apacScore
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
      console.log(records);
      const weeksData = records
        .map((record) => record.get('x-axis(weeks)'))
        .filter((rec) => rec !== undefined);
      console.log(weeksData);
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

      chartOnlineShareApac(weeksData, chinaData, indiaData, seapData);
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

      apacScorePieChart(apacData, apacPieValue2);
    });

  // // Create the echarts instance
  // const myChart = echarts.init(chartTest);
  // // Draw the chart
  // const chartDraw = function (xAxis, yAxis, yAxis2, yAxis3: 0, yAxis4: 0, yAxis5: 0) {
  //   myChart.setOption({
  //     grid: {},
  //     color: ['#DADADA', '#C0EA5F', '#F65340', '#7C74EB', '#9EEDFE'],
  //     title: {
  //       show: false,
  //       text: 'ECharts Getting Started Example',
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         label: {
  //           backgroundColor: 'red',
  //         },
  //       },
  //     },
  //     xAxis: {
  //       // gridIndex: 1,

  //       type: 'category',
  //       boundaryGap: false,
  //       axisLine: {
  //         //show: true,
  //         onZero: false,
  //         show: true,

  //         lineStyle: {
  //           color: 'white',
  //           width: 2,
  //         },
  //       },
  //       axisLabel: {
  //         color: 'white',
  //       },
  //       data: xAxis,
  //     },
  //     yAxis: {
  //       splitLine: {
  //         show: true,
  //         lineStyle: {
  //           width: 0.5,
  //           color: '#262626',
  //         },
  //       },
  //       type: 'value',
  //       axisLabel: {
  //         formatter: '{value}%',
  //         color: 'white',
  //       },
  //       axisLine: {
  //         show: true,
  //         color: 'white',
  //         width: 2,
  //         lineStyle: {
  //           color: 'white',
  //           width: 2,
  //           cap: 'round',
  //         },
  //       },
  //       min: 0,
  //       max: 50,
  //     },
  //     series: [
  //       {
  //         name: 'EERUT',
  //         type: 'line',
  //         lineStyle: {
  //           //width: 0.5,
  //           // color: 'red',
  //         },
  //         areaStyle: {
  //           opacity: 0.8,
  //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //             {
  //               offset: 0,
  //               color: '#DADADA',
  //             },
  //             {
  //               offset: 0.6,
  //               color: 'transparent',
  //             },
  //           ]),
  //         },
  //         showSymbol: false,
  //         data: yAxis,
  //       },
  //       {
  //         name: 'NOB',
  //         type: 'line',
  //         showSymbol: false,
  //         areaStyle: {
  //           opacity: 0.2,
  //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //             {
  //               offset: 0,
  //               color: '#C0EA5F',
  //             },
  //             {
  //               offset: 1,
  //               color: 'transparent',
  //             },
  //           ]),
  //         },
  //         data: yAxis2,
  //       },
  //       {
  //         name: 'UKIRWE',
  //         type: 'line',
  //         showSymbol: false,
  //         areaStyle: {
  //           opacity: 0.2,
  //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //             {
  //               offset: 0,
  //               color: '#F65340',
  //             },
  //             {
  //               offset: 1,
  //               color: 'transparent',
  //             },
  //           ]),
  //         },
  //         data: yAxis3,
  //       },
  //       {
  //         name: 'CESE',
  //         type: 'line',
  //         showSymbol: false,
  //         areaStyle: {
  //           opacity: 0.2,
  //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //             {
  //               offset: 0,
  //               color: '#7C74EB',
  //             },
  //             {
  //               offset: 1,
  //               color: 'transparent',
  //             },
  //           ]),
  //         },
  //         data: yAxis4,
  //       },
  //       {
  //         name: 'MEA',
  //         type: 'line',
  //         showSymbol: false,
  //         areaStyle: {
  //           opacity: 0.2,
  //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //             {
  //               offset: 0,
  //               color: '#9EEDFE',
  //             },
  //             {
  //               offset: 1,
  //               color: 'transparent',
  //             },
  //           ]),
  //         },
  //         data: yAxis5,
  //       },
  //     ],
  //   });
  // };
});

// airtable token: patoll3eGTrzISDDg.fa7abddfdd64020bc6e145425a6c43ed16529a8cf956e4b929e4f9b14bfd3ca3
//API token : keyAk5slAmWBfaIoz
