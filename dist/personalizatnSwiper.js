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
    const sliderWrapper = document.querySelector(".slide-component-wrap");
    const sliderControl = document.getElementById("myRange");
    if (!sliderControl || !sliderWrapper)
      return;
    console.log(sliderWrapper.scrollWidth);
    const handleMovement = function() {
      const valueP = -this.value * 24;
      console.log(valueP);
      sliderWrapper.style.transform = `translateX(${valueP}px)`;
    };
    sliderControl.addEventListener("change", handleMovement);
    sliderControl.addEventListener("mousemove", handleMovement);
  });
})();
//# sourceMappingURL=personalizatnSwiper.js.map
