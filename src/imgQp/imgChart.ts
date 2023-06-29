import * as echarts from 'echarts';

export const imgPieChart = function (
  chartWrap: HTMLElement,
  color: Array<string>,
  data: Array<number>
) {
  const pieChart = echarts.init(chartWrap);
  //const value2 = 70;
  const [color1, color2] = color;
  const [data1, data2] = data;
  // console.log(pieChart);

  pieChart.setOption({
    tooltip: {},
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
            value: data1,
            name: '',
            itemStyle: {
              borderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: color1,
                },
                {
                  offset: 1,
                  color: color2,
                },
              ]),
            },
            //areaStyle: { opacity: 0.2, color: 'green' },
          },
          { value: data2, itemStyle: { color: 'transparent' } },
        ],
      },
    ],
  });
};

////line Chart

export const hotelLineChart = function (
  chartWrap: HTMLElement,
  color: Array<string>,
  data: Array<number>
) {
  const lineChart = echarts.init(chartWrap);
  const [color1, color2, color3] = color;
  const [month, rdhotel, expedia, bookings] = data;

  lineChart.setOption({
    grid: {
      width: '95%',
      left: 35,
      //height: '80%',
    },
    color: [color1, color2, color3, 'transparent', 'transparent', 'transparent'],
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
        const [rdhote, expedia, bookings] = params;

        const rdIconImgUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc66e494f0743a50b9cc5_Frame%201000001839.png';
        const expeIconUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc89ebe08a2c5f2a6da19_Group%201000001833.png';
        const bookingsIconUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc89ff47775a036f50b58_Booking-Symbol.png';
        const renderLabelBox = function (imgUrl: string, data: object) {
          return `<span data-tooltip="minimum" style="border-radius:2px; background-color:${data.color}; display:flex; align-items:center; justify-content:center; height: 18px; width:18px; margin-right: 5px;"> <img src="${imgUrl}"> </span>`;
        };

        const ic1 = renderLabelBox(rdIconImgUrl, rdhote);
        const ic2 = renderLabelBox(expeIconUrl, expedia);
        const ic3 = renderLabelBox(bookingsIconUrl, bookings);

        const title = `<span style=" color: white; border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        // const wowPercentStyle = function (item) {
        //   return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
        //     item.data > 0 ? '+' : ''
        //   }${item.data}%</span> Wow</span> `;
        // };
        // const chinaWoWPercent = wowPercentStyle(chinaWow);
        // const inWOWPercent = wowPercentStyle(inWOW);
        // const seapWoWPercent = wowPercentStyle(seapWoW);

        const formatedToopTiprdhotel = ` <div style="display:flex; align-items:center;  gap: 3rem; margin-bottom: 5px;"> <div style="display:flex; justify-content:center;" >${ic1} ${rdhote.seriesName}</div>: ${rdhote.data} </div>`;

        const formatedToopTipExpedia = ` <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 5px; "> <div style="display:flex; justify-content:center;"> ${ic2} ${expedia.seriesName}</div>: ${expedia.data}</div>`;

        const formatedToopTipBookings = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem; "> <div style="display:flex; justify-content:center;"> ${ic3} ${bookings.seriesName}</div>: ${bookings.data}  </div>`;
        return `${title} <br />
                ${formatedToopTiprdhotel}
                ${formatedToopTipExpedia}
                ${formatedToopTipBookings}`;
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
      data: month,
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
      //   axisLabel: {
      //     formatter: '{value}%',
      //     color: 'white',
      //   },
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
      min: 80,
      max: 105,
    },
    series: [
      {
        name: 'Radisson hotels',
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
              color: color1,
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: rdhotel,
      },
      {
        name: 'Expedia',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color2,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: expedia,
      },
      {
        name: 'Booking.com',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color3,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: bookings,
      },
      //   {
      //     name: 'chinaWow',
      //     type: 'line',
      //     showSymbol: false,
      //     data: yWow1,
      //   },
      //   {
      //     name: 'inWOW',
      //     type: 'line',
      //     showSymbol: false,
      //     data: yWoW2,
      //   },
      //   {
      //     name: 'seapWoW',
      //     type: 'line',
      //     showSymbol: false,
      //     data: yWoW3,
      //   },
    ],
  });
};
