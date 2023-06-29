import { fixYaxis } from 'src/helperFunction';

const hotelYwrap = document.querySelector('[rd-element="hotel-yscroll"]') as HTMLElement;
const hotelYaxisWrap = document.querySelector('[rd-element="hotel-ywrap"]') as HTMLElement;
console.log(hotelYaxisWrap);
export const imgPageUI = function () {
  if (!hotelYaxisWrap || !hotelYwrap) return;
  fixYaxis(hotelYwrap, hotelYaxisWrap, '#0d0d0d');
  console.log('from image UI');
};
