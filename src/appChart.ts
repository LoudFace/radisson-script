import * as echarts from 'echarts';

const appChartContainer = document.getElementById('appChartPerf');
const appPiechartContainer = document.getElementById('appPie');

const appIos = document.getElementById('appChartIos');
const appAnd = document.getElementById('appChartAnd');
console.log(appIos, appAnd);
console.log(appChartContainer);

//if (!appChartContainer || !appPiechartContainer) return;

//  chart instance init
const appDownloadchartInit = echarts.init(appChartContainer);
const appPieInit = echarts.init(appPiechartContainer);
const appIosInit = echarts.init(appIos);
const appAndInit = echarts.init(appAnd);

// pie chart
export const appDownloadPieChart = function (value1, value2) {
  appPieInit.setOption({
    // tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '95%'],
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

// Andriod chart
export const appAndInitChart = function (xAxis: 0, yAxis: 0, yAxis2: 0) {
  appAndInit.setOption({
    grid: {
      width: '90%',
    },
    color: ['#dadada', 'transparent'],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      backgroundColor: '#333333',
      borderColor: '#333333',
      padding: 20,
      textStyle: {
        color: '#CCCCCC',
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
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;
        //const spacing = `<span style=" display: inline-block; width:10px;" ></span>`;
        const percentincrease1 = ` <span><span style="color:${
          params[1].data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${params[1].data}% </span> MoM</span> `;

        const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        return `${title} <br />
                    ${formatedTooltip}<br/>
                 `;
      },
    },
    xAxis: {
      type: 'category',
      //boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: 'white',
          width: 2,
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: 'white',
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
        formatter: function (value) {
          const num = value / 1000;
          return `${num}k`;
        },
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
      //max: 400,
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
              color: '#DADADA',
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
        type: 'line',
        data: yAxis2,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
        minSpan: 20,
      },
    ],
  });
};

// appIOS chart
export const appIosChart = function (xAxis: 0, yAxis: 0, yAxis2: 0) {
  appIosInit.setOption({
    grid: {},
    color: ['#9EEDFE', 'transparent'],
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
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;
        const percentincrease1 = ` <span><span style="color:${
          params[1].data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${params[1].data}% </span> MoM</span> `;

        const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        return `${title} <br/>
                    ${formatedTooltip} <br/>
                 `;
      },
    },
    xAxis: {
      type: 'category',
      //boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: 'white',
          width: 2,
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: 'white',
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
        formatter: function (value) {
          const num = value / 1000;
          return `${num}k`;
        },
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
      //max: 400,
    },
    series: [
      {
        name: 'iOS',
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
              color: '#9EEDFE',
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
        type: 'line',
        data: yAxis2,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
        minSpan: 20,
      },
    ],
  });
};

//line chart Downloads
export const downLoadChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yAxis3: 0,
  yAxis4: 0,
  yAxis5: 0,
  andInfo: 0,
  iosInfo: 0,
  totalPercent: 0,
  campPercent: 0,
  organicPercent: 0
) {
  appDownloadchartInit.setOption({
    grid: {
      width: '100%',
      left: '5%',
      //height: '80%',
    },
    color: [
      '#DADADA',
      '#9EEDFE',
      '#7C74EB',
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
        //console.log(params);

        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic3 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[2].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic4 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[3].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic5 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[4].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;
        const formatedNumParam = params.map((el) => numberWithCommas(el.data));
        console.log(formatedNumParam);

        const percentAndroid = ` <span><span style="color:${
          formatedNumParam[5] > 0 ? '#17B96B' : '#FE4B36'
        }; ">${formatedNumParam[5]}% </span> MoM</span> `;

        const percentiOs = ` <span><span style="color:${
          formatedNumParam[6] > 0 ? '#17B96B' : '#FE4B36'
        }; ">${formatedNumParam[6]}% </span> MoM</span> `;

        const percent3 = ` <span><span style="color:${
          formatedNumParam[7] > 0 ? '#17B96B' : '#FE4B36'
        }; ">${formatedNumParam[7]}% </span> MoM</span> `;

        const percent4 = ` <span><span style="color:${
          formatedNumParam[8] > 0 ? '#17B96B' : '#FE4B36'
        }; ">${formatedNumParam[8]}% </span> MoM</span> `;

        const percent5 = ` <span><span style="color:${
          formatedNumParam[9] > 0 ? '#17B96B' : '#FE4B36'
        }; ">${formatedNumParam[9]}% </span> MoM</span> `;

        const formatedTooltip1 = `  <div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;" > <div> ${ic1} ${params[0].seriesName}</div> <div style= "display: flex; align-items: center; gap: 23px"> : ${formatedNumParam[0]} ${percentAndroid} </div> </div> `;

        const formatedTooltip2 = `  <div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;" > <div> ${ic2} ${params[1].seriesName}</div> <div style= "display: flex; align-items: center; gap: 23px"> : ${formatedNumParam[1]} ${percentiOs} </div> </div> `;

        const formatedTooltip3 = `  <div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;" > <div> ${ic3} ${params[2].seriesName}</div> <div style= "display: flex; align-items: center; gap: 23px"> : ${formatedNumParam[2]} ${percent3} </div> </div> `;

        const formatedTooltip4 = `  <div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;" > <div> ${ic4} ${params[3].seriesName}</div> <div style= "display: flex; align-items: center; gap: 23px"> : ${formatedNumParam[3]} ${percent4} </div> </div> `;

        const formatedTooltip5 = `  <div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;" > <div> ${ic5} ${params[4].seriesName}</div> <div style= "display: flex; align-items: center; gap: 23px"> : ${formatedNumParam[4]} ${percent5} </div> </div> `;

        return `${title} <br />
                    ${formatedTooltip1}
                    ${formatedTooltip2}
                    ${formatedTooltip3}
                    ${formatedTooltip4}
                    ${formatedTooltip5}`;
      },
    },
    xAxis: {
      type: 'category',
      //boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: 'white',
          width: 2,
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: 'white',
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
      //max: 400,
    },
    series: [
      {
        name: 'Andriod',
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
        name: 'Total downloads',
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
        data: yAxis3,
      },
      {
        name: 'Organic downloads only',
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
        name: 'Campaigns downloads',
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
        name: 'percentInfo',
        type: 'line',
        showSymbol: false,
        data: andInfo,
      },
      {
        name: 'percentInfo',
        type: 'line',
        showSymbol: false,
        data: iosInfo,
      },
      {
        name: 'percentInfo',
        type: 'line',
        showSymbol: false,
        data: totalPercent,
      },
      {
        name: 'percentInfo',
        type: 'line',
        showSymbol: false,
        data: campPercent,
      },
      {
        name: 'percentInfo',
        type: 'line',
        showSymbol: false,
        data: organicPercent,
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
        minSpan: 20,
        height: 15,
        bottom: '4%',
        dataBackground: {
          areaStyle: {
            color: 'transparent',
          },
        },
      },
    ],
  });
};
