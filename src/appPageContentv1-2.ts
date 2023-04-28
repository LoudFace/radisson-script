import Airtable, { Record } from 'airtable';

import { appAndInitChart, appDownloadPieChart, appIosChart, downLoadChart } from './appChart.js';

window.Webflow ||= [];
window.Webflow.push(() => {
  const MILLION_DIVISION = 1000000;

  const appSect = document.querySelector('.graph-tab-wrapper');
  const totalAppCount = document.querySelectorAll('.app__download-num');
  const targetValue = document.querySelector('.target--num');
  const iOsBtn = document.getElementById('iosTab');
  const appTargetPerc = document.querySelectorAll('.content--heading');
  console.log(appTargetPerc);

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
    !iOsBtn ||
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

  const getTableRecords = function (tableId) {
    return radiChartbase(tableId).select({
      view: 'Grid view',
    });
  };

  Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
  const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');

  // getTableRecords('tblhxgDITpzlU0Nu4').eachPage(function page(records) {
  //   console.log(records);
  // });

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
      totalAppCount.forEach((el) => (el.textContent = `${formatedNum}`));

      const [annalTarget] = records.map((record) => record.get('Annual Target')).slice(-1);
      const formatedValue = function (x) {
        const dividedV = x / MILLION_DIVISION;
        return `${dividedV}m`;
      };
      const value = formatedValue(annalTarget);

      //Scroll into vieww
      const callFunction = function (entries) {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            appDownloadPieChart(appDownloads, pieSecondV);
            //Update the UI
            ///UI component update
            targetValue.textContent = value;
            appTargetPerc.forEach((el) => (el.textContent = `${appDownloads}%`));
          }
        });
      };
      const callOptions = {
        threshold: 0.6,
      };
      const appOberver = new IntersectionObserver(callFunction, callOptions);
      appOberver.observe(appSect);
    });
  ////HERO SECTION UI UPDATE
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

  const parentContainer = document.getElementById('parentContainer');

  radiChartbase('tblmHpKNJXxgTyM1p')
    .select({
      // maxRecords: 12,
      view: 'Grid view',
    })
    .eachPage(function page(records) {
      console.log(records);
      records.slice(5).forEach((el) => {
        const element = `<div class="month__rating--container"><div class="app__data--container" style=" height: ${
          el.fields['Rating score (out of 5)'] * 40
        }px; " ><div class="data--container"><img src="${
          el.fields['Brandlogo']
        }" loading="lazy" width="61.5" alt=""><div class="app--rating-num">${
          el.fields['Rating score (out of 5)']
        }</div></div></div><div class="app__month--text">${el.fields['Launch Date']}</div></div>`;
        console.log(el.fields['Rating score (out of 5)']);
        parentContainer.insertAdjacentHTML('beforeend', element);
        // parentContainer.innerHTML = element;
      });
      // const brands = getColumnData('Brand', records);
      // const launchDate = getColumnData('Launch Date', records);
      // const ratingSCore = getColumnData('Rating score (out of 5)', records);

      // radiChartbase('tblmHpKNJXxgTyM1p')._findRecordById(
      //   'recrUKWjVqz7zioUD',
      //   function (err, record) {
      //     console.log(record?.get('Month'));
      //   }
      // ); code for linked columns
      //console.log(brands, launchDate, ratingSCore);
      //});
    });

  radiChartbase('tblT1C7g9L0pJGYT5')
    .select({
      view: 'Grid view',
    })
    .eachPage(function page(records) {
      console.log(records);

      const iosData = getColumnData('iOS RNs', records);
      console.log(iosData);
      const xAxis = getColumnData('Month', records);
      const iosDataMoM = getColumnData('iOS RNs (MoM)', records);
      const andData = getColumnData('Android RNs', records);
      const andDataMoM = getColumnData('Android RNs (MoM)', records);
      console.log(andData);
      const correctedAndData = andDataMoM
        .map((el) => {
          if (typeof el === 'object') el = 0;
          return el;
        })
        .map((el) => Math.round(el * 100));

      console.log(correctedAndData);
      // const removeNaNandInfinityValue = function (data:ar) {
      //   data.map((el) => {
      //     if (typeof el === 'object') el = 0;
      //     return el;
      //   });
      // };
      // const correctedData = removeNaNandInfinityValue(iosDataMoM);
      const correctedData = iosDataMoM
        .map((el) => {
          if (typeof el === 'object') el = 0;
          return el;
        })
        .map((el) => Math.round(el * 100));
      //console.log(correctedData);

      const newData = correctedData.map((el) => {
        if (el === 0) el = '-';
        return el;
      });
      //console.log(newData);
      //Scroll into view
      const callFunction = function (entries) {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            appIosChart(xAxis, iosData, newData);

            appAndInitChart(xAxis, andData, correctedAndData);
          }
        });
      };
      const callOptions = {
        threshold: 0.6,
      };

      const sectionObserver = new IntersectionObserver(callFunction, callOptions);
      sectionObserver.observe(appSect);

      // iOsPieSecondValue = pieSecondValue()
    });

  /// testimonial UI update
  const testiWrapper1 = document.getElementById('testiWrapper1');
  const testiWrapper2 = document.getElementById('testiWrapper2');
  const testiWrapper3 = document.getElementById('testiWrapper3');
  const testiWrapper4 = document.getElementById('testiWrapper4');

  getTableRecords('tblLkbATwP3Os0oF7').eachPage(function page(records) {
    const updateTestiUi = function (data, testiwrapperID) {
      testiwrapperID.innerHTML = `<div class="testimonial-flx-wrapper"><div class="test-image-wrapper"><img loading="lazy" width="240" src="${data.fields['Image URL (IcePortal)']}" id="testiImage1" alt="" class="testi-img"></div><div class="rating-container"><img src="https://assets.website-files.com/63ee41b9862db4b9345f1a50/640e31d12f96962207a18fdf_Review.svg" loading="lazy" id="testiStarRating1" alt=""><div id="testiContent1" class="text-style">${data.fields['Review']}</div></div><img src="${data.fields['FlagLink']}" loading="lazy" width="52" height="52" id="testiFlag1" alt="" class="country--flag"></div>`;
    };
    updateTestiUi(records[0], testiWrapper1);
    updateTestiUi(records[1], testiWrapper2);
    updateTestiUi(records[2], testiWrapper3);
    updateTestiUi(records[3], testiWrapper4);
  });
});

//<script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/appPageContentv1.js'> </script>

// <script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/appPageContentv1-2.js'> </script>

// <div class="testimonial-flx-wrapper"><div class="test-image-wrapper"><img loading="lazy" width="240" src="https://assets.website-files.com/63ee41b9862db4b9345f1a50/643ea53e2793f42c0cb4f44b_BG.png" id="testiImage1" alt="" class="testi-img"></div><div class="rating-container"><img src="https://assets.website-files.com/63ee41b9862db4b9345f1a50/640e31d12f96962207a18fdf_Review.svg" loading="lazy" id="testiStarRating1" alt=""><div id="testiContent1" class="text-style">Feugiat faucibus amet rhoncus felis neque orci magna ac. Lacus a bibendum leo quam risus dui laoreet lacus sagittis. Nam gravida enim pellentesque quis eu in est.</div></div><img src="https://assets.website-files.com/63ee41b9862db4b9345f1a50/643ea2571829124442e529e1_Frame%201000001756.png" loading="lazy" width="52" height="52" id="testiFlag1" alt="" class="country--flag"></div>
