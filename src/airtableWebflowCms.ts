//import { Webflow } from '@finsweet/ts-utils';
import Airtable from 'airtable';
//import Webflow from 'webflow-api';

Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
const radissonAirtable = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');

const getTableRecords = function (tableId) {
  return radissonAirtable(tableId).select({
    view: 'Grid view',
  });
};

const goodReviewsWrap = document.querySelector('[rd-element="good-reviews"]');
const badReviewsWrap = document.querySelector('[rd-element="bad-reviews"]');
console.log([goodReviewsWrap, badReviewsWrap]);

const testimonialWrap = document.querySelector('[rd-element="testimonial-wrap"]');
const testimonialWrapBadComment = document.querySelector('[rd-element="testimonial-badcomment"]');
console.log([testimonialWrap, testimonialWrapBadComment]);

export const renderTestimonial = function () {
  console.log('testi laode');
  if (!goodReviewsWrap || !badReviewsWrap) return;
  getTableRecords('tblLkbATwP3Os0oF7').eachPage(function page(records) {
    console.log(records);
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

    console.log(html);
    goodReviewsWrap.innerHTML = html;
    badReviewsWrap.innerHTML = secondHtml;
    // console.log(...html);

    // });
    // highReview.forEach((el) => {
    //   goodReviewsWrap?.innerHTML = `
    //   <div class="test-wrap"><div class="testimonial-icon-wrap"><div class="testimonial-phonetype"><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6480f3ed487d3d80466d4135_fluent_app-store-24-filled.png" loading="lazy" width="32" alt="" class="image-49"></div><div class="testimonial-star-rating"><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6488cdab418be98909195f18_Frame%201000002766%20(1).png" loading="lazy" width="116" alt="" class="image-50"></div></div><div class="testimonial-text-wrap"><div>Great app! Very easy to use, logged in automaticallv with mv member details and I got a much better deal using it than anywhere else online! ☺️</div></div><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6488cf40646e7274f0777429_Frame%201000001756%20(1).png" loading="lazy" width="40" alt="" class="testimonial--flag"></div>`;
  });
};

// const htmlMarkup = `<div class="test-wrap"><div class="testimonial-icon-wrap"><div class="testimonial-phonetype"><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6480f3ed487d3d80466d4135_fluent_app-store-24-filled.png" loading="lazy" width="32" alt="" class="image-49"></div><div class="testimonial-star-rating"><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6488cdab418be98909195f18_Frame%201000002766%20(1).png" loading="lazy" width="116" alt="" class="image-50"></div></div><div class="testimonial-text-wrap"><div>Great app! Very easy to use, logged in automaticallv with mv member details and I got a much better deal using it than anywhere else online! ☺️</div></div><img src="https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6488cf40646e7274f0777429_Frame%201000001756%20(1).png" loading="lazy" width="40" alt="" class="testimonial--flag"></div>`;
