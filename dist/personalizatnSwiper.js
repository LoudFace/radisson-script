"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:${3e3}/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/personalizatnSwiper.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("samuel");
    new Swiper(".image-swiper-wrap", {
      grabCursor: true,
      effect: "creative",
      pagination: {
        el: ".cnt-pagination",
        type: "bullets"
      },
      navigation: {
        nextEl: ".next-btn",
        prevEl: ".prev-btn"
      },
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-100%", 0, -1]
        },
        next: {
          translate: ["100%", 0, -1]
        }
      }
    });
  });
})();
//# sourceMappingURL=personalizatnSwiper.js.map
