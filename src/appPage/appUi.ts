//import { Webflow } from '@finsweet/ts-utils';
import Airtable from 'airtable';

import {
  changeToPercent,
  FormatMillion,
  getColumnData,
  getFields,
  numberWithCommas,
  twoDecimalNum,
} from '../helperFunction';
//import Webflow from 'webflow-api';

Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
const radissonAirtable = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');
const getTableRecords = function (tableId) {
  return radissonAirtable(tableId).select({
    view: 'Grid view',
  });
};
/////App Revenue + Conversion
const appRevConversion = 'tblQ0d7KckUDCVJrg';
const appheroTotalDownloads = document.querySelector(
  '[rd-element="downloads-2023"]'
) as HTMLElement;
const heroMonthlyActive = document.querySelector(
  '[rd-element="month-active-users"]'
) as HTMLElement;
const heroAppRating = document.querySelector('[rd-element="average-rating"]') as HTMLElement;
const appHeroAppRating = document.querySelector('[rd-element="total-rev"]') as HTMLElement;
const appHeroRoomnight = document.querySelector('[rd-element="roomnight-booked"]') as HTMLElement;
const appHeroConversionRate = document.querySelector(
  '[rd-element="conversion-rate"]'
) as HTMLElement;

const goodReviewsWrap = document.querySelector('[rd-element="good-reviews"]') as HTMLElement;
const badReviewsWrap = document.querySelector('[rd-element="bad-reviews"]') as HTMLElement;
const googleRatingWrap = document.querySelector('[rd-element="googlePercent"]') as HTMLElement;
const combinedRatingWrap = document.querySelector('[rd-element="combinedPercent"]') as HTMLElement;
const iosRatingWrap = document.querySelector('[rd-element="iosPercent"]') as HTMLElement;
const upliftvsMonth = document.querySelectorAll('[rd-element="upliftvs-month"]') as NodeList;

const updateAppRatingUi = function (htmlWrap: HTMLElement, data: number) {
  htmlWrap.innerHTML = `<div rd-element="googlePercent" class="text-style-16px white-text"><span class="${
    data > 0 ? 'green' : 'red'
  }">${data > 0 ? '+' : '-'}${data}%</span> uplift vs June 22</div>`;
};

const updateAppHEro = function (container: HTMLElement, data: string, cardText: string) {
  container.innerHTML = `<div class="text-style-3rem light-red-gradient">${data}</div><div class="gradienttext">${cardText}</div><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/647bc28b017a9563bc3fa61c_IconoirArrowRight%201.png" loading="lazy" width="24" alt="" class="image-47">`;
};

//
//console.log([goodReviewsWrap, badReviewsWrap]);

// const testimonialWrap = document.querySelector('[rd-element="testimonial-wrap"]');
// const testimonialWrapBadComment = document.querySelector('[rd-element="testimonial-badcomment"]');
// //console.log([testimonialWrap, testimonialWrapBadComment]);

///App rating
//<div rd-element="googlePercent" class="text-style-16px white-text"><span class="green">+6.94%</span> uplift vs Jun 22</div>

const appRatingID = 'tbl0ZgnAdMNsehqqF';
export const airtableUiData = function () {
  getTableRecords(appRatingID).eachPage(function page(records) {
    // records._findRecordById('recrUKWjVqz7zioUD', function (err, record) {
    //   console.log(record);
    // });
    // console.log(records);

    const [lastRollData] = records.slice(-1);
    const lastRollDataField = lastRollData.fields;
    const androidYoy = lastRollDataField['Android (YoY)'];
    const iosYoy = lastRollDataField['iOS (YoY)'];
    const combinedYoy = lastRollDataField['Combined uplift YoY'];

    const andYoyFormat = changeToPercent(androidYoy);
    const iosYoyFormat = changeToPercent(iosYoy);
    const combinedYoyFormat = changeToPercent(combinedYoy);
    //console.log(combinedYoyFormat);

    const [refTableId] = lastRollDataField['Previous Year'] as string;

    let month: string;
    radissonAirtable(appRatingID)._findRecordById(refTableId, function (err, rec) {
      const refField = rec?.fields;
      month = refField['Month'] as string;
      // console.log(month);
      upliftvsMonth.forEach((el) => {
        el.textContent = `${month}`;
      });
    });
    updateAppRatingUi(googleRatingWrap, andYoyFormat);
    updateAppRatingUi(combinedRatingWrap, combinedYoyFormat);
    updateAppRatingUi(iosRatingWrap, iosYoyFormat);
  });

  //app anual Target
  const totalRoomsWrap = document.querySelector('[rd-element="appHero-totalroom"]') as HTMLElement;
  const appTargetID = 'tblCxvDHIID3Z8ncV';
  getTableRecords(appTargetID).eachPage(function page(records) {
    const appTargetFields = getFields(records);
    const totalRoomnight = appTargetFields['Total downloads (Combined)'];
    const totalRoomnightFormat = numberWithCommas(totalRoomnight);
    totalRoomsWrap.textContent = `${totalRoomnightFormat}`;
  });

  getTableRecords(appRevConversion).eachPage(function page(records) {
    const [lastRole] = records.slice(-1);
    const lastRoleField = lastRole.fields;
    const lastroleitem = lastRoleField['Combined Active Users'];
    const lastroleitemFormat = numberWithCommas(lastroleitem) as string;

    const activeUSerText = 'monthly active users';
    updateAppHEro(heroMonthlyActive, lastroleitemFormat, activeUSerText);
    //console.log(lastroleitemFormat);
  });

  const combinedRevMonth = document.querySelector('[rd-element="combineRevMonth"]') as HTMLElement;
  const combinedRevWrap = document.querySelector('[rd-element="combineRevApp"]') as HTMLElement;

  if (!combinedRevWrap) return;

  getTableRecords('tblW36AI9FXg7LcoD').eachPage(function page(records) {
    const [lastRole] = records.slice(-1);
    const lastRoleField = lastRole.fields;
    const refTableId = lastRoleField['Previous Year'] as string;
    const combinedRev = lastRoleField['Combined Revenue'];

    const combinedFormat = FormatMillion(combinedRev);
    const combinedFixed = twoDecimalNum(combinedFormat);
    //console.log(combinedFormat);

    radissonAirtable(appRatingID)._findRecordById(refTableId, function (err, rec) {
      const refField = rec?.fields;
      const cmonth = refField['Month'] as string;
      combinedRevMonth.textContent = `${cmonth}`;
    });
    combinedRevWrap.textContent = `${combinedFixed} M`;
    //console.log(records._findRecordById(appRatingID));
    // radiChartbase('tblmHpKNJXxgTyM1p')._findRecordById('recrUKWjVqz7zioUD', function (err, record) {
    //   console.log(record?.get('Month'));
    // });
    // ); code for linked columns
    // console.log(brands, launchDate, ratingSCore);
  });
};

export const renderTestimonial = function () {
  console.log('testi laode');
  if (!goodReviewsWrap || !badReviewsWrap) return;
  getTableRecords('tblLkbATwP3Os0oF7').eachPage(function page(records) {
    // const lastItem = records.slice(-1);
    const highReview = records.filter((record) => record.fields['Rating'] === 5);
    const lowRev = records.filter((record) => record.fields['Rating'] < 5);

    const html = highReview
      .map((el) => {
        return `<div class="test-wrap"><div class="testimonial-icon-wrap"><div class="testimonial-phonetype"><img src="${el.fields['Device icon']}" loading="lazy" width="32" alt="" class="image-49"></div><div class="testimonial-star-rating"><img src="${el.fields['starSVG']}" loading="lazy" width="116" alt="" class="image-50"></div></div><div class="testimonial-text-wrap"><div>${el.fields['Review']}☺️</div></div><img src="${el.fields['FlagLink']}" loading="lazy" width="40" alt="" class="testimonial--flag"></div>`;
      })
      .join('');

    const secondHtml = lowRev
      .map((el) => {
        return `<div class="test-wrap"><div class="testimonial-icon-wrap"><div class="testimonial-phonetype"><img src="${el.fields['Device icon']}" loading="lazy" width="32" alt="" class="image-49"></div><div class="testimonial-star-rating"><img src="${el.fields['starSVG']}" loading="lazy" width="116" alt="" class="image-50"></div></div><div class="testimonial-text-wrap"><div>${el.fields['Review']}☺️</div></div><img src="${el.fields['FlagLink']}" loading="lazy" width="40" alt="" class="testimonial--flag"></div>`;
      })
      .join('');

    //console.log(html);
    goodReviewsWrap.innerHTML = html;
    badReviewsWrap.innerHTML = secondHtml;
    // console.log(...html);
  });
};

// const htmlMarkup = `<div class="test-wrap"><div class="testimonial-icon-wrap"><div class="testimonial-phonetype"><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6480f3ed487d3d80466d4135_fluent_app-store-24-filled.png" loading="lazy" width="32" alt="" class="image-49"></div><div class="testimonial-star-rating"><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6488cdab418be98909195f18_Frame%201000002766%20(1).png" loading="lazy" width="116" alt="" class="image-50"></div></div><div class="testimonial-text-wrap"><div>Great app! Very easy to use, logged in automaticallv with mv member details and I got a much better deal using it than anywhere else online! ☺️</div></div><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6488cf40646e7274f0777429_Frame%201000001756%20(1).png" loading="lazy" width="40" alt="" class="testimonial--flag"></div>`;
