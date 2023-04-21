import Chart from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Samuel');

  function images() {
    const imageslide = document.querySelector('.splide');

    new Splide(imageslide, {
      //autoHeight: 'true',
      type: 'loop',
      updateOnMove: true,
      perPage: window.innerWidth > 800 ? 3 : 1,
      focus: window.innerWidth > 800 ? 'center' : '',
      breakpoints: {
        991: {
          // Tablet
          perPage: 3,
        },
        767: {
          // Mobile Landscape
          perPage: 3,
        },
        479: {
          // Mobile Portrait
          perPage: 1,
        },
      },
    }).mount();
  }
  images();
});

// <script defer src='https://cdn.jsdelivr.net/gh/LoudFace/radisson-script/dist/radissonchartv1.js'> </script>
