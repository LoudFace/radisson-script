import * as echarts from 'echarts';

const appChartContainer = document.getElementById('appChartPerf');
const appPiechartContainer = document.getElementById('appPie');
console.log(appChartContainer);

//if (!appChartContainer || !appPiechartContainer) return;

//  chart instance init
const appDownloadchartInit = echarts.init(appChartContainer);
const appPieInit = echarts.init(appPiechartContainer);

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

//line chart
export const downLoadChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yAxis3: 0,
  yAxis4: 0,
  yAxis5: 0
) {
  appDownloadchartInit.setOption({
    grid: {},
    color: ['#DADADA', '#9EEDFE', '#7C74EB', '#C0EA5F', '#FBD881'],
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
      //   formatter: function (params) {
      //     console.log(params);
      //     const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

      //     const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

      //     const percentincrease1 = ` <span><span style="color:#17B96B; ">+21.76%</span> Wow</span> `;

      //     const spacing = `<span style=" display: inline-block; width:10px;" ></span>`;

      //     return `${title} <br />
      //     ${ic1} ${params[0].seriesName} ${spacing} : ${params[0].data}%  ${spacing}  ${percentincrease1} <br/>

      //     `;
      //   },

      formatter: function (params) {
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic3 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[2].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic4 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[3].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic5 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[4].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;
        const spacing = `<span style=" display: inline-block; width:10px;" ></span>`;
        const percentincrease1 = ` <span><span style="color:#17B96B; ">+21.76%</span> Wow</span> `;
        const percentincrease2 = ` <span><span style="color:#17B96B; ">+18.06%</span> Wow</span> `;
        const percentincrease3 = ` <span><span style="color:#17B96B; ">+19.33%</span> Wow</span> `;
        const percentincrease4 = ` <span><span style="color:#17B96B; ">+9.90%</span> Wow</span> `;
        const percentincrease5 = ` <span><span style="color:#17B96B; ">+6.60%</span> Wow</span> `;

        return `${title} <br />
                    ${ic1} ${params[0].seriesName} ${spacing} : ${params[0].data}%  ${spacing}  ${percentincrease1} <br/>
                    ${ic2} ${params[1].seriesName} ${spacing}  : ${params[1].data}% ${spacing}  ${percentincrease2} <br/>
                    ${ic3} ${params[2].seriesName} ${spacing}  : ${params[2].data}% ${spacing}  ${percentincrease3} <br/>
                    ${ic4} ${params[3].seriesName} ${spacing}  : ${params[3].data}%  ${spacing}  ${percentincrease4}<br/>
                    ${ic5} ${params[4].seriesName} ${spacing}  : ${params[4].data}% ${spacing}  ${percentincrease5}  `;
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
      // min: 0,
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
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
      },
      //   {
      //     show: true,
      //     xAxisIndex: [0, 1],
      //     type: 'slider',
      //     top: '85%',
      //     start: 98,
      //     end: 100,
      //   },
    ],
  });
};
