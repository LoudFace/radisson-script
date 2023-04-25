import Airtable, { Record } from 'airtable';

import { appDownloadPieChart, downLoadChart } from './appChart.js';

window.Webflow ||= [];
window.Webflow.push(() => {
  const MILLION_DIVISION = 1000000;

  const appSect = document.querySelector('.graph-tab-wrapper');
  const totalAppCount = document.querySelector('.app__download-num');
  const targetValue = document.querySelector('.target--num');

  //UI elements changes
  const revGenerated = document.getElementById('revGenerated');
  const totalDownloads = document.getElementById('totalDownload');
  const roomNight = document.getElementById('roomNight');
  const conversionRate = document.getElementById('conversionRate');
  const comParison = document.querySelectorAll('.comparison');
  const revYoy = document.getElementById('revYoY');
  const conversionYoy = document.getElementById('conversionYoY');
  const downloadsYoy = document.getElementById('downloadsYoY');

  if (
    !appSect ||
    !totalAppCount ||
    !targetValue ||
    !revGenerated ||
    !totalDownloads ||
    !roomNight ||
    !conversionRate ||
    !comParison ||
    !revYoy ||
    !conversionYoy ||
    !downloadsYoy
  )
    return;

  const pieSecondValue = function (x) {
    return 100 - x;
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const downLoadYaxis = function (nameOfField: string, records) {
    return records.map((rec) => rec.get(nameOfField));
  };

  const getColumnData = function (nameOfField: string, records) {
    return records.map((rec) => rec.get(nameOfField));
  };

  Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
  const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');

  radiChartbase('tblhxgDITpzlU0Nu4') // monthly downloads table
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records) {
        // This function (`page`) will get called for each page of records.
        const monthDataX = records
          .map((record) => record.get('Month'))
          .filter((rec) => rec !== '0');

        const androidData = downLoadYaxis('Android', records);
        const iOsData = downLoadYaxis('iOS', records);
        const totalDownloadData = downLoadYaxis('Total downloads', records);
        const compaignDownloadData = downLoadYaxis('Campaigns downloads', records);
        const organicDownloadsData = downLoadYaxis('Organic downloads only', records);

        const androidDataWow = downLoadYaxis('Android DL (MoM)', records);
        console.log(androidDataWow);

        downLoadChart(
          monthDataX,
          androidData,
          iOsData,
          totalDownloadData,
          compaignDownloadData,
          organicDownloadsData
        );
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  radiChartbase('tblCxvDHIID3Z8ncV') //APP Anual Target
    .select({
      view: 'Grid view',
    })
    .eachPage(function page(records) {
      const [appDownloads] = records
        .map((record) => record.get('Progress Percent'))
        .slice(-1)
        .map((rec) => Math.round(rec * 100));
      const pieSecondV = pieSecondValue(appDownloads);

      const [totalAppDownloads] = records
        .map((record) => record.get('Total downloads (Combined)'))
        .slice(-1);

      const formatedNum = numberWithCommas(totalAppDownloads);
      totalAppCount.textContent = `${formatedNum}`;

      const [annalTarget] = records.map((record) => record.get('Annual Target')).slice(-1);
      const formatedValue = function (x) {
        const dividedV = x / MILLION_DIVISION;
        return `${dividedV}m`;
      };
      const value = formatedValue(annalTarget);
      ///UI component update
      targetValue.textContent = value;

      //Scroll into view
      const callFunction = function (entries) {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            appDownloadPieChart(appDownloads, pieSecondV);
          }
        });
      };
      const callOptions = {
        threshold: 0.6,
      };
      const appOberver = new IntersectionObserver(callFunction, callOptions);
      appOberver.observe(appSect);
    });

  radiChartbase('tbldsHsl0iIwJQECd') // main App KPIs
    .select({
      view: 'Grid view',
    })
    .eachPage(function page(records) {
      const [revenueYoy] = records
        .map((record) => record.get('Revenue (YoY)'))
        .map((el) => {
          if (typeof el === 'object') {
            return 0;
          }
          return el;
        })
        .slice(-1)
        .map((el) => Math.round(el * 100));
      revYoy.textContent = `+${revenueYoy}% `;

      const lastYearComp = records
        .map((record) => record.get('Last Year Comparison'))
        .filter((rec) => rec !== undefined);
      console.log(lastYearComp);

      const [revGen] = records
        .map((record) => record.get('Revenue Generated'))
        .slice(-1)
        .map((el) => {
          return (el / MILLION_DIVISION).toFixed(1);
        });
      const formatedRev = revGen.replace('.', ',');
      revGenerated.textContent = `${formatedRev}M €`; // 13,3M €

      const [[totalDownloadNum]] = records.map((record) => record.get('Total Downloads')).slice(-1);
      const downString = numberWithCommas(totalDownloadNum);
      totalDownloads.textContent = `${downString}`;

      const [downLoadYoy] = records
        .map((record) => record.get('Total Downloads (YoY)'))
        .map((el) => {
          if (typeof el === 'object') return 0;
          return el;
        })
        .slice(-1)
        .map((el) => {
          return +(el * 100).toFixed(1);
        });
      downloadsYoy.textContent = `${downLoadYoy}% `;

      const [roomNightNum] = records
        .map((record) => record.get('Room night Share'))
        .slice(-1)
        .map((el) => {
          return +(el * 100).toFixed(2);
        });
      roomNight.textContent = `${roomNightNum}%`;

      const [conversionNum] = records
        .map((record) => record.get('Conversion rate'))
        .slice(-1)
        .map((el) => el * 100);

      conversionRate.textContent = `${conversionNum}%`;

      const [conversionNumYoy] = records
        .map((record) => record.get('Conversion (YoY)'))
        .map((el) => {
          if (typeof el === 'object') {
            return 0;
          }
          return el;
        })
        .map((el) => {
          return +(el * 100).toFixed(2);
        })
        .slice(-1);
      conversionYoy.textContent = `${conversionNumYoy}% `;
    });

  // radiChartbase('tblmHpKNJXxgTyM1p')
  //   .select({ view: 'Grid view' })
  //   .eachPage(function page(records) {
  //     console.log(records);
  //     const brands = getColumnData('Brand', records);
  //     const launchDate = getColumnData('Launch Date', records);
  //     const ratingSCore = getColumnData('Rating score (out of 5)', records);

  // radiChartbase('tblmHpKNJXxgTyM1p')._findRecordById(
  //   'recrUKWjVqz7zioUD',
  //   function (err, record) {
  //     console.log(record?.get('Month'));
  //   }
  // ); code for linked columns
  //console.log(brands, launchDate, ratingSCore);
  //});

  // console.log(
  //   revGenerated,
  //   totalDownloads,
  //   roomNight,
  //   conversionRate,
  //   comParison,
  //   revYoy,
  //   conversionYoy
  // );
});
