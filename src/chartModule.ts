import * as echarts from 'echarts';

const chartTest = document.getElementById('main');
const chartApac = document.getElementById('apacChart');
const overAllScore = document.getElementById('pieChart1');
const emeaPie = document.getElementById('pieChart2');
const apacPie = document.getElementById('pieChart3');
const appDownload2 = document.getElementById('appDownload');
const bookings = document.getElementById('bookingsChart');
console.log(appDownload2);

// if (!chartTest || !chartApac || !overAllScore || !emeaPie || !apacPie || !appDownload) {
//   return;
// }
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
  yAxis5: 0
) {
  myChart.setOption({
    grid: {},
    color: ['#DADADA', '#C0EA5F', '#F65340', '#7C74EB', '#9EEDFE'],
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
    ],
  });
};
////////second Chart APAC
export const chartOnlineShareApac = function (xAxis: 0, yAxis: 0, yAxis2: 0, yAxis3: 0) {
  apacChart.setOption({
    grid: {},
    color: ['#C0EA5F', '#7C74EB', '#DADADA'],
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
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic3 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[2].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;
        const spacing = `<span style=" display: inline-block; width:10px;" ></span>`;
        const percentincrease1 = ` <span><span style="color:#F65340; ">-17.34%</span> Wow</span> `;
        const percentincrease2 = ` <span><span style="color:#F65340; ">-19.23%</span> Wow</span> `;
        const percentincrease3 = ` <span><span style="color:#F65340; ">-16.40%</span> Wow</span> `;

        return `${title} <br />
                ${ic1} ${params[0].seriesName} ${spacing} : ${params[0].data}%  ${spacing}  ${percentincrease1} <br/>  
                ${ic2} ${params[1].seriesName} ${spacing}  : ${params[1].data}% ${spacing}  ${percentincrease2} <br/>
                ${ic3} ${params[2].seriesName} ${spacing}  : ${params[2].data}% ${spacing}  ${percentincrease3}  `;
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
    ],
  });
};

//third chart  rfp bookings and instant bookings
export const bookingsLineChart = function (xAxis: 0, yAxis: 0, yAxis2: 0, yAxis3: 0) {
  bookingsLine.setOption({
    grid: {},
    color: ['#C0EA5F', '#7C74EB', '#DADADA'],
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
        console.log(params);
        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<span style=" text-align: left; color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;
        const spacing = `<span style=" display: inline-block; width:10px;" ></span>`;
        const percentincrease1 = ` <span><span style="color:#5DE91C; ">+157.80%</span> Wow</span> `;
        const percentincrease2 = ` <span><span style="color:#F65340; ">-32.50%</span> Wow</span> `;

        return `${title} <br />
                ${ic1} ${params[0].seriesName} ${spacing} : ${params[0].data}% ${spacing}  ${percentincrease1} <br/>  
                ${ic2}${params[1].seriesName} ${spacing} : ${params[1].data}% ${spacing}  ${percentincrease2}`;
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
      // max: 50,
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
    ],
  });
};
