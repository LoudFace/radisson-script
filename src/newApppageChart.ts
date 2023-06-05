import * as echarts from 'echarts';

const monthlyChartWrapper = document.getElementById('monthChart');
const appRatingWrap = document.getElementById('appRating');

//Initialize monthly chart
const monthlyChart = echarts.init(monthlyChartWrapper);
const appRating = echarts.init(appRatingWrap);

/////Monthly Downloads chart
export const appMonthlyChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yAxis3: 0,
  yAxis4: 0,
  yAxis5: 0,
  yWoW1: 0,
  yWoW2: 0,
  yWoW3: 0,
  yWoW4: 0,
  yWoW5: 0
) {
  monthlyChart.setOption({
    grid: {
      width: '90%',
      left: 40,
      //height: '80%',
    },
    color: [
      '#7C74EB',
      '#9EEDFE',
      '#FAACA8',
      '#C0EA5F',
      '#FBD881',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
    ],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      backgroundColor: '#333333',
      borderColor: '#333333',
      padding: 20,
      textStyle: {
        color: ' #CCCCCC',
        fontSize: 10,
      },
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#333333',
        },
      },
      formatter: function (params) {
        const [eerut, nob, ukirwe, cese, mea, eerutWow, nobWow, ukiWow, ceseWow, meaWow] = params;
        const renderLabel = function (item) {
          return `<span data-tooltip="minimum" style="border-radius:2px; background-color:${item.color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        };
        const ic1 = renderLabel(eerut);
        const ic2 = renderLabel(nob);
        const ic3 = renderLabel(ukirwe);
        const ic4 = renderLabel(cese);
        const ic5 = renderLabel(mea);
        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${eerut.name} </span>`;
        /////tooltip styling functions
        const wowPercentStyle = function (item) {
          return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
            item.data > 0 ? '+' : ''
          }${item.data}%</span> MoM</span> `;
        };
        const eerutPercent = wowPercentStyle(eerutWow);
        const nobPercent = wowPercentStyle(nobWow);
        const ukiPercent = wowPercentStyle(ukiWow);
        const cesePercent = wowPercentStyle(ceseWow);
        const meaPercent = wowPercentStyle(meaWow);

        const formatedTooltipEerut = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic1}${eerut.seriesName}</div>: ${eerut.data}% ${eerutPercent} </div>`;
        const formatedTooltipNob = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic2}${nob.seriesName}</div>: ${nob.data}% ${nobPercent} </div>`;
        const formatedTooltipUki = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic3}${ukirwe.seriesName}</div>: ${ukirwe.data}% ${ukiPercent} </div>`;
        const formatedTooltipCese = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic4}${cese.seriesName}</div>: ${cese.data}% ${cesePercent} </div>`;
        const formatedTooltipMea = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic5}${mea.seriesName}</div>: ${mea.data}% ${meaPercent} </div>`;
        return `${title} <br />
                 ${formatedTooltipEerut}
                ${formatedTooltipNob}
                ${formatedTooltipUki}
                ${formatedTooltipCese}
                ${formatedTooltipMea}  `;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: 'white',
          width: 2,
        },
      },
      axisLabel: {
        color: 'white',
        padding: [10, 0, 0, 0],
        // interval: 0,
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: '#262626',
        },
      },
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          const num = value / 1000;
          return `${num}k`;
        },
      },
      axisLine: {
        show: true,
        color: 'white',
        width: 2,
        lineStyle: {
          color: 'white',
          width: 2,
          cap: 'round',
        },
      },
      min: 0,
      //max: 50,
    },
    series: [
      {
        name: 'Total Downloads',
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7C74EB',
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        //  symbol: 'rect',
        data: yAxis,
      },
      {
        name: 'iOS',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#9EEDFE',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis2,
      },
      {
        name: 'Android',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FAACA8',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis3,
      },
      {
        name: 'Organic downloads',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#C0EA5F',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis4,
      },
      {
        name: 'Compaign downloads',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FBD881',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis5,
      },
      {
        name: 'eerutWow',
        type: 'line',
        showSymbol: false,
        data: yWoW1,
      },
      {
        name: 'nobWow',
        type: 'line',
        showSymbol: false,
        data: yWoW2,
      },
      {
        name: 'ukrWow',
        type: 'line',
        showSymbol: false,
        data: yWoW3,
      },
      {
        name: 'ceseWow',
        type: 'line',
        showSymbol: false,
        data: yWoW4,
      },
      {
        name: 'meaWow',
        type: 'line',
        showSymbol: false,
        data: yWoW5,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 5,
        end: 100,
        minSpan: 20,
      },
    ],
  });
};

/////
export const appRatingChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yaxisPercent: 0,
  yaxisPercent2: 0
) {
  appRating.setOption({
    grid: {
      width: '80%',
      left: 40,
    },
    color: ['#FAACA8', '#9EEDFE', 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#333333',
      borderColor: '#333333',
      padding: 20,
      textStyle: {
        color: ' #CCCCCC',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'red',
        },
      },
      formatter: function (params) {
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const title = `<span style=" text-align: left; color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const [, , instantPercent, rfpbookings] = params;
        const percentInstant = ` <span><span style="color:${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${instantPercent.data}% </span> YoY</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data}% </span> YoY</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} rating ${percentInstant} </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${params[1].seriesName}</div> : ${params[1].data} rating  ${percentRfp} </div>`;

        return `${title} <br />
                 ${formatedTooltip}  
                  ${formatedTooltipRfp}`;
      },
    },
    xAxis: {
      // gridIndex: 1,

      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: 'white',
          width: 2,
        },
      },
      axisLabel: {
        color: 'white',
        //interval: 1,
        padding: [10, 0, 0, 0],
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: '#262626',
        },
      },
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        color: 'white',
      },
      axisLine: {
        show: true,
        color: 'white',
        width: 2,
        lineStyle: {
          color: 'white',
          width: 2,
          cap: 'round',
        },
      },
      min: 3.8,
      max: 5,
    },
    series: [
      {
        name: 'Android',
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FAACA8',
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: yAxis,
      },
      {
        name: 'iOs',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#9EEDFE',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis2,
      },
      {
        name: 'androidPercent',
        type: 'line',
        showSymbol: false,
        data: yaxisPercent,
      },
      {
        name: 'iosPercent',
        type: 'scatter',
        showSymbol: false,
        data: yaxisPercent2,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 5,
        end: 100,
        minSpan: 20,
      },
    ],
  });
};
