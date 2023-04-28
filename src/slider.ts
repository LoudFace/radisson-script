import '@splidejs/splide/css';

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const carouselImg = document.getElementById('splideImg');

console.log(carouselImg);

export function imageCarousel() {
  if (!carouselImg) return;
  new Splide(carouselImg, {
    // Desktop on down
    perPage: 4,
    perMove: 1,
    //focus: window.innerWidth > 800 ? 'center' : '', // 0 = left and 'center' = center
    type: 'loop', // 'loop' or 'slide'
    //gap: window.innerWidth > 800 ? '4.6875em' : '', // space between slides
    speed: 1500, // transition speed in miliseconds
    pagination: false,
    arrows: false,
    //dragAngleThreshold: 30, // default is 30
    autoWidth: true, // for cards with differing widths
    //waitForTransition: false,
    //updateOnMove: true,
    //autoplay: true,
    autoScroll: { speed: 1 },
    //trimSpace: false, // true removes empty space from end of list
    breakpoints: {
      991: {
        // Tablet
        perPage: 4,
      },
      479: {
        // Mobile Portrait
        perPage: 2,
      },
    },
  }).mount({ AutoScroll });
}
