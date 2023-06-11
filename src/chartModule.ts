import * as echarts from 'echarts';

const chartTest = document.getElementById('main');
const chartApac = document.getElementById('apacChart');
const overAllScore = document.getElementById('pieChart1');
const emeaPie = document.getElementById('pieChart2');
const apacPie = document.getElementById('pieChart3');
const appDownload2 = document.getElementById('appDownload');
const bookings = document.getElementById('bookingsChart');

// Create the echarts instance
const myChart = echarts.init(chartTest);
const apacChart = echarts.init(chartApac);
const overAllScoreChart = echarts.init(overAllScore);
const emeaPieChart = echarts.init(emeaPie);
const apacPieChart = echarts.init(apacPie);
const downloadPie = echarts.init(appDownload2);
const bookingsLine = echarts.init(bookings);
//const appDownloadChart = echarts.init(appDownload2);

//console.log(overAllScoreChart, emeaPieChart, apacPieChart);

//Draw pie chart
export const appDownloadPieChart = function (value1, value2) {
  downloadPie.setOption({
    // tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '95%'],
        animationDuration: 1500,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        data: [
          {
            value: value1,
            name: 'Overall',
            itemStyle: {
              borderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#9796F0',
                },
                {
                  offset: 1,
                  color: '#FBC7D4',
                },
              ]),
            },
            areaStyle: { opacity: 0.2, color: 'green' },
          },
          { value: value2, itemStyle: { color: 'transparent' } },
        ],
      },
    ],
  });
};

export const overAllScorePieChart = function (value1, value2) {
  overAllScoreChart.setOption({
    // tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '95%'],
        animationDuration: 2500,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        data: [
          {
            value: value1,
            name: 'Overall',
            itemStyle: {
              borderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#9E0059',
                },
                {
                  offset: 1,
                  color: '#E23597',
                },
              ]),
            },
            areaStyle: { opacity: 0.2, color: 'green' },
          },
          { value: value2, itemStyle: { color: 'transparent' } },
        ],
      },
    ],
  });
};

export const emeaScorePieChart = function (value1, value2) {
  emeaPieChart.setOption({
    // tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '95%'],
        avoidLabelOverlap: false,
        animationDuration: 2500,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },

        data: [
          {
            value: value1,
            name: 'Overall',
            itemStyle: {
              borderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#3A86FF',
                },
                {
                  offset: 1,
                  color: '#0E387B',
                },
              ]),
            },
            areaStyle: { opacity: 0.2, color: 'green' },
          },
          { value: value2, itemStyle: { color: 'transparent' } },
        ],
      },
    ],
  });
};

export const apacScorePieChart = function (value1, value2) {
  apacPieChart.setOption({
    // tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '95%'],
        avoidLabelOverlap: false,
        animationDuration: 2500,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },

        data: [
          {
            value: value1,
            name: 'Overall',
            itemStyle: {
              borderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#7A2EE4',
                },
                {
                  offset: 1,
                  color: '#A565FF',
                },
              ]),
            },
            areaStyle: { opacity: 0.2, color: 'green' },
          },
          { value: value2, itemStyle: { color: 'transparent' } },
        ],
      },
    ],
  });
};

// Draw the chart Online shares by EMEA
export const chartOnlineShareEmea = function (
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
  myChart.setOption({
    grid: {
      width: '90%',
      left: 40,
      //height: '80%',
    },
    color: [
      '#DADADA',
      '#C0EA5F',
      '#F65340',
      '#7C74EB',
      '#9EEDFE',
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
          }${item.data}%</span> Wow</span> `;
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
        formatter: '{value}%',
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
      min: 0,
      max: 50,
    },
    series: [
      {
        name: 'EERUT',
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
              color: '#DADADA',
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
        name: 'NOB',
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
        data: yAxis2,
      },
      {
        name: 'UKIRWE',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#F65340',
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
        name: 'CESE',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7C74EB',
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
        name: 'MEA',
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
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 5,
    //     end: 100,
    //     minSpan: 20,
    //   },
    // ],
  });
};
////////second Chart APAC
export const chartOnlineShareApac = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yAxis3: 0,
  yWow1: 0,
  yWoW2: 0,
  yWoW3: 0
) {
  apacChart.setOption({
    grid: {
      width: '90%',
      left: 35,
      //height: '80%',
    },
    color: ['#C0EA5F', '#7C74EB', '#DADADA', 'transparent', 'transparent', 'transparent'],
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
        const [, , , chinaWow, inWOW, seapWoW] = params;
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic3 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[2].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const wowPercentStyle = function (item) {
          return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
            item.data > 0 ? '+' : ''
          }${item.data}%</span> Wow</span> `;
        };
        const chinaWoWPercent = wowPercentStyle(chinaWow);
        const inWOWPercent = wowPercentStyle(inWOW);
        const seapWoWPercent = wowPercentStyle(seapWoW);

        const formatedToopTipChina = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem;"> <div>${ic1} ${params[0].seriesName}</div>: ${params[0].data}% ${chinaWoWPercent}  </div>`;
        const formatedToopTipIN = ` <div style="display:flex; align-items:center; justify-content:space-between; "> <div>${ic2} ${params[1].seriesName}</div>: ${params[1].data}% ${inWOWPercent}  </div>`;
        const formatedToopTipSeap = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem;"> <div>${ic3} ${params[2].seriesName}</div>: ${params[2].data}% ${seapWoWPercent}  </div>`;
        return `${title} <br />
                ${formatedToopTipChina}
                ${formatedToopTipIN}
               ${formatedToopTipSeap}  `;
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
        formatter: '{value}%',
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
      min: -10,
      max: 50,
    },
    series: [
      {
        name: 'China',
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
              color: '#C0EA5F',
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
        name: 'South Asia',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7C74EB',
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
        name: 'SEAP',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#DADADA',
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
        name: 'chinaWow',
        type: 'line',
        showSymbol: false,
        data: yWow1,
      },
      {
        name: 'inWOW',
        type: 'line',
        showSymbol: false,
        data: yWoW2,
      },
      {
        name: 'seapWoW',
        type: 'line',
        showSymbol: false,
        data: yWoW3,
      },
    ],
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 5,
    //     end: 100,
    //     minSpan: 20,
    //   },
    // ],
  });
};

// const scrollbar = apacChart.createSlider({
//   id: 'scrollbar',
//   x: 'right',
//   y: 'bottom',
//   width: 200,
//   height: 20,
//   min: 0,
//   max: 100,
//   value: 50,
//   onChange: function (value) {
//     // Update the chart's xAxis with the new value
//     apacChart.setOption({
//       xAxis: {
//         min: value,
//         max: value + 100,
//       },
//     });
//   },
// });

//third chart  rfp bookings and instant bookings
export const bookingsLineChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  instatPercent: 0,
  rfpPercent: 0
) {
  bookingsLine.setOption({
    grid: {
      width: '80%',
      left: 40,
    },
    color: ['#C0EA5F', '#7C74EB', 'transparent', 'transparent'],
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
        }; ">${instantPercent.data}% </span> WoW</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data}% </span> WoW</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data}% ${percentInstant} </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${params[1].seriesName}</div> : ${params[1].data}%  ${percentRfp} </div>`;

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
        formatter: '{value}%',
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
      min: 10,
      max: 200,
    },
    series: [
      {
        name: 'Instant bookings',
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
              color: '#C0EA5F',
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
        name: 'RFP bookings',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7C74EB',
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
        name: 'instantPercent',
        type: 'line',
        showSymbol: false,
        data: instatPercent,
      },
      {
        name: 'rfpPercent',
        type: 'scatter',
        showSymbol: false,
        data: rfpPercent,
      },
    ],
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 5,
    //     end: 100,
    //     minSpan: 20,
    //   },
    // ],
  });
};
