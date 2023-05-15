window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('samuel');

  const sliderWrapper = document.querySelector('.slide-component-wrap');
  const sliderControl = document.getElementById('myRange');

  if (!sliderControl || !sliderWrapper) return;
  console.log(sliderWrapper.scrollWidth);
  //   const sliderWidth = sliderWrapper.scrollWidth;
  //   sliderControl.setAttribute('max', sliderWidth);
  // console.log(sliderControl);
  const handleMovement = function () {
    const valueP = -this.value * 24;
    console.log(valueP);
    sliderWrapper.style.transform = `translateX(${valueP}px)`;
  };

  sliderControl.addEventListener('change', handleMovement);
  sliderControl.addEventListener('mousemove', handleMovement);

  // const arrowDown = document.querySelector('.arrow-down-comp');
  // const arrowUp = document.querySelector('.up-arrow');
  // const laptopImg = document.querySelector('.laptop--image');
  // const textContent = document.querySelector('.text-content-wrapper');
  // if (!arrowDown || !arrowUp || !laptopImg || !textContent) return;

  // const defaultContent = function () {
  //   return `  <div class="text-content-wrapper"><div class="text-46">Home Hero Banner</div><div class="text-body-style">Highlight campaigns or destinations</div></div>`;
  // };
  // const fistContent = function () {
  //   return ` <div class="text-content-wrapper"><div class="text-46">Single destination widget</div><div class="text-body-style">Extra visibility for destinations or alternative hotels and campaigns</div></div>`;
  // };
  // const secondContent = function () {
  //   return ` <div class="text-content-wrapper"><div class="text-46">Popular destinations module</div><div class="text-body-style">Based on the most booked destinations per country or city (India)</div></div>`;
  // };

  // arrowUp.addEventListener('click', function () {
  //   if (laptopImg.classList.contains('moveup1')) {
  //     laptopImg.classList.remove('moveup1');
  //     arrowUp.style.borderColor = '';
  //     arrowDown.style.borderColor = '#fff';
  //     textContent.innerHTML = defaultContent();
  //   } else if (laptopImg.classList.contains('moveup2')) {
  //     laptopImg.classList.remove('moveup2');
  //     laptopImg.classList.add('moveup1');
  //     arrowDown.style.borderColor = '#fff';
  //     textContent.innerHTML = fistContent();
  //   }
  // });

  // arrowDown.addEventListener('click', function () {
  //   if (laptopImg.classList.contains('moveup2')) return;
  //   if (!laptopImg.classList.contains('moveup1')) {
  //     laptopImg.classList.add('moveup1');
  //     textContent.innerHTML = fistContent();
  //     arrowUp.style.borderColor = '#fff';
  //   } else if (laptopImg.classList.contains('moveup1')) {
  //     laptopImg.classList.remove('moveup1');
  //     laptopImg.classList.add('moveup2');
  //     arrowDown.style.borderColor = '#666';
  //     textContent.innerHTML = secondContent();
  //   }
  // });

  // `  <div class="text-content-wrapper"><div class="text-46">Home Hero Banner</div><div class="text-body-style">Highlight campaigns or destinations</div></div>
  // `;
  // classes to add moveup1, moveup2
  // const imageSwipe = new Swiper('.swiper', {
  //   grabCursor: true,
  //   effect: 'creative',
  //   speed: 500,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //   },
  //   creativeEffect: {
  //     prev: {
  //       //shadow: true,
  //       origin: 'left center',
  //       translate: ['100%', 0, 0],
  //       rotate: [0, 0, 0],
  //     },
  //     next: {
  //       origin: 'right center',
  //       translate: ['100%', 0, 0],
  //       rotate: [0, 0, 0],
  //     },
  //   },
  // });

  // const swiper = new Swiper('.app-imgwrapper', {
  //   effect: 'coverflow',
  //   grabCursor: true,
  //   freeMode: true,
  //   centeredSlides: true,
  //   slidesPerView: 'auto',
  //   navigation: {
  //     nextEl: '.next--btn',
  //     prevEl: '.prev--btn',
  //   },
  //   pagination: {
  //     el: '.app-img-slider-pagination',
  //     type: 'bullets',
  //   },
  //   enabled: true,
  //   coverflowEffect: {
  //     rotate: 10,
  //     stretch: 0,
  //     depth: 120,
  //     modifier: 1.5,
  //     slideShadows: false,
  //   },
  //   //loop: true,
  // });
});
//<script defer src="http://localhost:3000/personalizatnSwiper.js"></script>
