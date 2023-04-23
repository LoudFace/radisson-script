const pageBody = document.querySelector<HTMLElement>('body');
const pageWrapper = document.querySelector('.page-wrapper');
const darkModeCont = document.querySelector<HTMLElement>('.dark-mode-container');
const lightModeCont = document.querySelector<HTMLElement>('.light-mode-container');
export const toggleBtn = document.querySelector<HTMLElement>('.tooglebtn-container');
const logoImg = document.querySelector<HTMLImageElement>('.lognav--img');
let clicked = true;
if (!pageBody || !darkModeCont || !lightModeCont || !toggleBtn || !pageWrapper || !logoImg) return;

export const switchToLightMode = function () {
  darkModeCont.style.backgroundColor = 'transparent';
  lightModeCont.style.backgroundColor = '#f8f8f8';
  pageBody.style.color = '#6666';
  pageBody.style.backgroundColor = '#fff';
  pageWrapper.classList.add('lightmode');
  logoImg.src =
    'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/6444365d3896b516cde647f7_hotel-Radisson-logo%201.svg';
};

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  switchToLightMode();
  clicked = !clicked;
}

export const handleMode = function () {
  if (clicked) {
    darkModeCont.style.backgroundColor = 'transparent';
    lightModeCont.style.backgroundColor = '#f8f8f8';
    pageBody.style.color = '#6666';
    pageBody.style.backgroundColor = '#fff';
    pageWrapper.classList.add('lightmode');
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
  }
  clicked = !clicked;
};
toggleBtn.addEventListener('click', handleMode);
