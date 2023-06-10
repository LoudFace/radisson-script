import * as echarts from 'echarts';

const monthlyChartWrapper = document.getElementById('monthChart');
const appRatingWrap = document.getElementById('appRating');
const roomBooked = document.getElementById('roomBookInstance');
const conversionChartWrap = document.getElementById('conversionChart');
const revChartWrap = document.getElementById('revenueChart');
/////////////////
//////////Barchart wrapper
const active = document.getElementById('activeUsers');

//Initialize monthly chart
const monthlyChart = echarts.init(monthlyChartWrapper);
const appRating = echarts.init(appRatingWrap);
const roomBookedInstance = echarts.init(roomBooked);
/////////////
//////////initialize bar chart
const activeInit = echarts.init(active);
const conversionChartWrapInit = echarts.init(conversionChartWrap);
const revInit = echarts.init(revChartWrap);

//////////////
//////////// Bar chart

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

///// App rating chart
export const appRatingChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yaxisPercent: 0,
  yaxisPercent2: 0
) {
  appRating.setOption({
    grid: {
      width: '90%',
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
        }; ">${instantPercent.data > 0 ? '+' : ''} ${instantPercent.data}% </span> YoY</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data > 0 ? '+' : ''} ${rfpbookings.data}% </span> YoY</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> <divstyle="display: flex; gap:10px;"> : ${params[0].data}rating ${percentInstant}</div></div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 2rem;" > <div> ${ic2} ${params[1].seriesName}</div><div style="display: flex; gap:5px;"> : ${params[1].data}rating ${percentRfp}</div> </div>`;

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

///// roomBookedChart
export const roomBookedChart = function (
  xAxis: 0,
  yAxis: 0,
  yAxis2: 0,
  yaxisPercent: 0,
  yaxisPercent2: 0
) {
  roomBookedInstance.setOption({
    grid: {
      width: '90%',
      left: 40,
    },
    color: ['#FAACA8', '#9EEDFE', 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'Radisson Playbook chart instance',
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

        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        const number1format = numberWithCommas(params[0].data);
        const number2format = numberWithCommas(params[1].data);

        const [, , instantPercent, rfpbookings] = params;
        console.log(instantPercent);
        const percentInstant = ` <span><span style="color: ${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        };"> ${instantPercent.data > 0 ? '+' : ''} ${instantPercent.data}% </span> MoM</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; "> ${rfpbookings.data > 0 ? '+' : ''} ${rfpbookings.data}% </span> MoM</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div><div style:"display:flex; gap:10px;"> : ${number1format} ${percentInstant}</div> </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${params[1].seriesName}</div><div style: "display:flex; gap:10px;"> : ${number2format} ${percentRfp} </div></div>`;

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
      // max: 0,
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
        minSpan: 10,
      },
    ],
  });
};
////////////////Active USers bar chart
export const actvieUserchart = function (xAxis: 0, bar1: 0, bar2: 0, changMoM: 0) {
  activeInit.setOption({
    color: ['#4D4D4D', '#1FA2FF', 'transparent'],
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLabel: {
        interval: 0,
        margin: 16,
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          width: 2,
          color: 'white',
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
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#333333',
      borderColor: '#333333',
      padding: 20,
      textStyle: {
        color: ' #CCCCCC',
        fontSize: 12,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'red',
        },
      },
      formatter: function (params) {
        //console.log(params);
        ////helper function
        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        const [prevUser, activeUser, percentChange] = params;

        const prevUserDataformat = numberWithCommas(prevUser.data);
        const activeUserDataformat = numberWithCommas(activeUser.data);

        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background-color:${prevUser.color}; display:inline-block; height: 12px; width:12px; margin-right: 5px; margin-bottom: -2px;"></span>`;

        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background: linear-gradient(90deg, #1FA2FF 0%, #12D8FA 50%, #A6FFCB 100%); display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<div style="display:flex; gap:4rem; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px;" > <span style=" text-align: left; color: white;  display: inline-block; width:100%;"> ${
          prevUser.axisValue
        }</span><span><span style="display:inline-block; color: ${
          percentChange.value > 0 ? '#17B96B' : '#FE4B36'
        }"> ${percentChange.value}% </span> MoM</span></div>`;

        const prevUsertoolTip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 4rem;"> <div style="width: 150px"> ${ic1} ${prevUser.seriesName}</div> : ${prevUserDataformat}</div>`;
        const activeUserTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 4rem;"> <div style="width: 150px"> ${ic2} ${activeUser.seriesName}</div> : ${activeUserDataformat}</div>`;

        return `${title}
                ${activeUserTooltip}
                ${prevUsertoolTip}`;
      },
    },
    grid: {
      // width: 3000,
      left: 60,
      right: '1%',
      bottom: '5%',
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
        margin: 10,
        fontStyle: 16,
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
      // max: 0,
    },
    series: [
      {
        ///Previous Active Users
        name: 'Previous active Users',
        data: bar1,
        type: 'bar',
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        },
        barWidth: 40,
        // emphasis: {
        //   focus: 'series',
        // },
      },
      {
        //Active users
        name: 'Current active users',
        data: bar2,
        type: 'bar',
        stack: 'active',
        barWidth: 40,
        // emphasis: {
        //   focus: 'series',
        // },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#A6FFCB' },
            { offset: 0.5, color: '#12D8FA' },
            { offset: 1, color: '#1FA2FF' },
          ]),
        },
      },
      {
        data: changMoM,
        name: 'changeMoM',
        type: 'bar',
        stack: 'active',

        label: {
          // colorChange: function (e) {
          //   const labeltext = e.data;
          //   return labeltext > 0 ? '#5DE91C' : `red`;
          // },
          show: true,
          position: 'top',
          //fontStyle: 'italic',
          fontSize: 16,
          // color: function (e) {
          //   const labeltext = e.data;
          //   return labeltext > 0 ? '#5DE91C' : `red`;
          // },
          color: '#5DE91C',
          fontWeight: 'normal',
          // formatter: function (e) {
          //   console.log(e);
          //   const labeltext = e.data;
          //   return labeltext > 0 ? `+${labeltext}%` : `${labeltext}%`;
          // },
        },
        barMinHeight: 10,
        color: 'transparent',
        // emphasis: {
        //   focus: 'series',
        // },
        barWidth: 40,
      },
    ],
  });
};
//////////////////Conversion Rate chart
export const convertRateChart = function (
  xAxis: 0,
  bar1: 0,
  bar2: 0,
  andChangeYoy: 0,
  iosChangeYoY: 0
) {
  conversionChartWrapInit.setOption({
    color: ['#4D4D4D', '#1FA2FF', 'transparent'],
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLabel: {
        interval: 0,
        margin: 16,
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          width: 2,
          color: 'white',
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
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#333333',
      borderColor: '#333333',
      padding: 20,
      textStyle: {
        color: ' #CCCCCC',
        fontSize: 12,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'red',
        },
      },
      formatter: function (params) {
        ////helper function
        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        const [android, ios, androidYoy, iosYoy] = params;
        //android, ios, androidYoy, iosYoy

        // const prevUserDataformat = numberWithCommas(prevUser.data);
        // const activeUserDataformat = numberWithCommas(activeUser.data);

        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background: linear-gradient(90deg, #0089A7 0%, #9EEDFE 100%); display:inline-block; height: 12px; width:12px; margin-right: 5px; margin-bottom: -2px;"></span>`;

        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background: linear-gradient(90deg, #C45953 0%, #F3A183 100%); display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<div style="display:flex; gap:1rem; justify-content:left; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px;" > <span style=" text-align: left; color: white;  display: inline-block;"> ${
          ios.axisValue
        }</span><span><span style="display:inline-block; color: ${
          androidYoy.value > 0 ? '#fff' : '#fff'
        }"> ${androidYoy.value}% </span> ${iosYoy.value}%</span></div>`;

        const androidPercent = ` <span><span style="color:${
          androidYoy.data > 0 ? '#17B96B' : '#FE4B36'
        }; "> ${androidYoy.value > 0 ? '+' : ''} ${androidYoy.value}% </span>YoY</span> `;

        const iosPercent = ` <span><span style="color:${
          androidYoy.data > 0 ? '#17B96B' : '#FE4B36'
        }; "> ${iosYoy.value > 0 ? '+' : ''} ${iosYoy.value}% </span>YoY</span> `;

        const androidTooltip = `<div style= "display: flex; align-items: gap:4rem; center; justify-content: space-between; gap: 4rem;"> <div> ${ic2} ${android.seriesName}</div><div style="display: flex; gap:10px;" > : ${android.data}%  ${androidPercent} </div></div> `;
        const iosTooltip = `<div style= "display: flex; align-items: gap:4rem; center; justify-content: space-between; gap: 4rem;"> <div> ${ic1} ${ios.seriesName}</div> <div style="display: flex; gap:10px;" > : ${ios.data}%  ${iosPercent} </div></div>`;

        return `${title}
                ${androidTooltip}
                ${iosTooltip}`;
      },
    },
    grid: {
      // width: 3000,
      left: 40,
      right: '1%',
      bottom: '8%',
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
        margin: 10,
        fontStyle: 16,
        formatter: function (value) {
          return `${value}%`;
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
      max: 5,
    },
    series: [
      {
        ///android conversion
        name: 'Android',
        data: bar1,
        type: 'bar',
        stack: 'active',
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#F3A183' },
            { offset: 1, color: '#C35953' },
          ]),
        },
        barWidth: 25,
        // emphasis: {
        //   focus: 'series',
        // },
      },
      {
        //iOS
        name: 'iOS',
        data: bar2,
        type: 'bar',

        stack: 'iosactive',
        barWidth: 25,
        // emphasis: {
        //   focus: 'series',
        // },
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#9EEDFE' },
            { offset: 1, color: '#0089A7' },
          ]),
        },
      },
      {
        data: andChangeYoy,
        name: 'androidYoY',
        type: 'bar',
        stack: 'active',
        color: 'transparent',
        // emphasis: {
        //   focus: 'series',
        // },
        barWidth: 40,
      },
      {
        data: iosChangeYoY,
        name: 'iosChangeYoy',
        type: 'bar',
        stack: 'iosactive',
        color: 'transparent',
        // emphasis: {
        //   focus: 'series',
        // },
        barWidth: 40,
      },
    ],
  });
};

export const revChart = function (xAxis: 0, bar1: 0, bar2: 0, andChangeYoy: 0, iosChangeYoY: 0) {
  revInit.setOption({
    color: ['#4D4D4D', '#1FA2FF', 'transparent'],
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLabel: {
        interval: 0,
        margin: 16,
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          width: 2,
          color: 'white',
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
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#333333',
      borderColor: '#333333',
      padding: 20,
      textStyle: {
        color: ' #CCCCCC',
        fontSize: 12,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'red',
        },
      },
      formatter: function (params) {
        console.log(params);
        ////helper function
        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        const [android, ios, androidYoy, iosYoy] = params;
        //android, ios, androidYoy, iosYoy

        // const prevUserDataformat = numberWithCommas(prevUser.data);
        // const activeUserDataformat = numberWithCommas(activeUser.data);

        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background: linear-gradient(90deg, #0089A7 0%, #9EEDFE 100%); display:inline-block; height: 12px; width:12px; margin-right: 5px; margin-bottom: -2px;"></span>`;

        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; text-align: left; background: linear-gradient(90deg, #C45953 0%, #F3A183 100%); display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;

        const title = `<div style="display:flex; gap:1rem; justify-content:left; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px;" > <span style=" text-align: left; color: white;  display: inline-block;"> ${
          ios.axisValue
        }</span><span><span style="display:inline-block; color: ${
          androidYoy.value > 0 ? '#fff' : '#fff'
        }"> ${androidYoy.value}% </span> ${iosYoy.value}%</span></div>`;

        const androidTooltip = `<div style= "display: flex; align-items: gap:4rem; center; justify-content: space-between; gap: 4rem;"> <div> ${ic2} ${android.seriesName}</div> : ${android.data}</div>`;
        const iosTooltip = `<div style= "display: flex; align-items: gap:4rem; center; justify-content: space-between; gap: 4rem;"> <div> ${ic1} ${ios.seriesName}</div> : ${ios.data}</div>`;

        return `${title}
                ${androidTooltip}
                ${iosTooltip}`;
      },
    },
    grid: {
      // width: 3000,
      left: 80,
      right: '1%',
      bottom: '8%',
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
        margin: 10,
        fontStyle: 16,
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
      max: 15000000,
    },
    series: [
      {
        ///android conversion
        name: 'android',
        data: bar1,
        type: 'bar',
        stack: 'active',
        itemStyle: {
          borderRadius: [0, 0, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#F3A183' },
            { offset: 1, color: '#C35953' },
          ]),
        },
        barWidth: 25,
        // emphasis: {
        //   focus: 'series',
        // },
      },
      {
        //iOS
        name: 'iOS',
        data: bar2,
        type: 'bar',

        stack: 'active',
        barWidth: 25,
        // emphasis: {
        //   focus: 'series',
        // },
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#9EEDFE' },
            { offset: 1, color: '#0089A7' },
          ]),
        },
      },
      {
        data: andChangeYoy,
        name: 'androidYoY',
        type: 'bar',
        stack: 'active',
        color: 'transparent',
        // emphasis: {
        //   focus: 'series',
        // },
        barWidth: 40,
      },
      {
        data: iosChangeYoY,
        name: 'iosChangeYoy',
        type: 'bar',
        stack: 'active',
        color: 'transparent',
        // emphasis: {
        //   focus: 'series',
        // },
        barWidth: 40,
      },
    ],
  });
};
