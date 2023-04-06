import Chart from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Samuel');
  const ctx = document.querySelector('#graph1');
  const ctx2 = document.querySelector('#graph2');
  const ctx3 = document.querySelector('#graph3');
  if (!ctx || !ctx2 || !ctx3) return;

  const screenWidth = window.innerWidth;

  const testData = [
    {
      year: [51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      EERUT: [1.14, 0.49, 0.95, 2.19, 2.29, 1.22, 1.2, 1.17, 1.96, 1.86, 1.7, 1.2],
      NOB: [4.1, 4.92, 4.88, 5.56, 6.2, 8.69, 8.0, 7.11, 8.37, 9.01, 6.37, 8.15],
      UKIRWE: [24.36, 23.29, 27.65, 27.98, 26.64, 32.74, 30.45, 26.19, 26.71, 23.01, 24.2, 26.43],
      CESE: [9.43, 7.21, 10.28, 12.94, 11.61, 13.72, 0, 12.29, 12.19, 10.55, 10.05, 11.25],
      MEA: [11.28, 10.67, 10.28, 12.15, 11.91, 12.33, 12.33, 12.32, 12.3, 12.07, 11.77, 11.71],
      months: [
        "Jun '22",
        "Jul '22",
        "Aug '22",
        "Sept '22",
        "Oct '22",
        "Nov '22",
        "Jan '22",
        "Feb '23",
      ],
      RF: [3, 6, 17, 2, 10, 30, 50, 59],
      IB: [5, 3, 33, 12, 45, 20, 32, 40],
    },
  ];
  const { year } = testData[0];
  const { EERUT } = testData[0];
  const { NOB } = testData[0];
  const { UKIRWE } = testData[0];
  const { CESE } = testData[0];
  const { MEA } = testData[0];
  const { months } = testData[0];
  const { RF } = testData[0];
  const { IB } = testData[0];

  const testData2 = [
    {
      weeks: [52, 51, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      china: [2, 4, 5, 2, 7, 10, 11, 9, 2, 4, 6, 3],
      india: [5, 3, 3, 5, 6, 2, 7, 8, 3, 7, 8, 10],
      seap: [6, 6, 1, 10, 7, 3, 11, 7, 3, 5, 3, 4],
    },
  ];
  const { weeks } = testData2[0];
  const { china } = testData2[0];
  const { india } = testData2[0];
  const { seap } = testData2[0];

  //global Chart config

  //  Chart.defaults.elements.point.pointStyle = false;
  //Chart line
  Chart.defaults.elements.line.tension = 0.2;
  Chart.defaults.elements.point.radius = 1;

  Chart.defaults.datasets.line.borderWidth = 2;
  Chart.defaults.datasets.line.fill = true;
  Chart.defaults.elements.point.hoverRadius = 5;
  Chart.defaults.responsive = true;

  //Tooltip general line styling
  Chart.defaults.plugins.tooltip.padding = 20;
  Chart.defaults.plugins.tooltip.xAlign = 'center';
  Chart.defaults.plugins.tooltip.yAlign = 'bottom';
  Chart.defaults.plugins.tooltip.position = 'nearest';
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(242,242,242,0.3)';
  Chart.defaults.plugins.tooltip.caretPadding = 15;
  Chart.defaults.plugins.tooltip.caretSize = 15;
  Chart.defaults.plugins.tooltip.bodyAlign = 'left';
  Chart.defaults.plugins.tooltip.footerAlign = 'left';
  Chart.defaults.plugins.tooltip.titleMarginBottom = 20;
  Chart.defaults.plugins.tooltip.usePointStyle = true;

  //first chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: year, //x-axis name
      datasets: [
        {
          label: 'EERUT',
          borderColor: '#97D4C1',
          backgroundColor: 'rgba(218, 218,218, 0.18)',
        },
        {
          label: 'NOB',
          data: NOB,
          borderColor: '#C0EA5F',
          backgroundColor: 'rgba(192, 234, 95, 0.3)',
        },
        {
          label: 'UKIRWE',
          data: UKIRWE,
          borderColor: '#7C74EB',
          backgroundColor: 'rgba(124, 116, 235, .3)',
        },
        {
          label: 'CESE',
          data: CESE,
          borderColor: '#F65340',
          backgroundColor: 'rgba(246, 83, 64, 0.3)',
        },
        {
          label: 'MEA',
          data: MEA,
          borderColor: '#DADADA',
          backgroundColor: 'rgba(218, 218, 218, .3)',
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function (context) {
              const firstEl = context[0].label;
              return `Week ${firstEl}`;
            },
            label: function (context) {
              const { label } = context.dataset;
              return `${label}  : ${context.parsed.y}%  YTD`;
            },
          },
        },
        legend: {
          // name of chart shown on top
          display: false,
          labels: {
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
          text: 'Test Data Chart',
          font: {
            size: 20,
          },
        },
      },
      aspectRatio: 1.5,
      scales: {
        x: {
          ticks: {
            color: '#fff',
            font: {
              size: screenWidth > 800 ? 20 : 10,
            },
          },
          border: {
            display: true,
            width: 2,
            color: 'white',
          },
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: 'Week',
            color: '#fff',
            font: {
              size: screenWidth > 800 ? 15 : 10,
            },
          },
          beginAtZero: true,
        },
        y: {
          border: {
            display: true,
            width: 2,
            color: 'white',
          },
          grid: {
            display: true,
            color: 'rgba(218, 218,218, .50)',
            lineWidth: 0.2,
          },
          beginAtZero: true,
          ticks: {
            color: '#fff',
            font: {
              size: screenWidth > 800 ? 20 : 10, //y-axis label font size
            },
            callback: (value) => `${value}%`,
          },
        },
      },
    },
  }); // end of chart object

  //second chart
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: weeks, //x-axis name
      datasets: [
        {
          label: 'china',
          data: china,

          fill: true,
          tension: 0.2,
          borderColor: 'rgba(218, 218,218, .80)',
          backgroundColor: 'rgba(218, 218,218, 0.18)',
        },
        {
          label: 'india',
          data: india,

          fill: true,
          tension: 0.2,
          borderColor: 'rgba(180, 150,150, .80)',
          backgroundColor: 'rgba(180, 150,150, 0.18)',
        },
        {
          label: 'seap',
          data: seap,

          fill: true,
          tension: 0.2,
          borderColor: 'rgba(21, 210,210, .80)',
          backgroundColor: 'rgba(21, 210,210, 0.18)',
        },
      ],
    },
    options: {
      interaction: {
        mode: 'index',
      },
      plugins: {
        tooltip: {
          padding: 20,
          callbacks: {
            title: function (context) {
              const firstEl = context[0].label;
              return `Week ${firstEl}`;
            },
            label: function (context) {
              const { label } = context.dataset;
              return `${label}  : ${context.parsed.y}%  `;
            },
          },
        },
        legend: {
          // name of chart shown on top
          display: false,
          labels: {
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
          text: 'Test Data Chart 2',
          font: {
            size: 20,
          },
        },
      },
      aspectRatio: 1.5,
      scales: {
        x: {
          ticks: {
            font: {
              size: screenWidth > 800 ? 20 : 10,
            },
          },
          border: {
            display: true,
            width: 2,
            color: 'white',
          },
          grid: {
            display: false,
          },
          title: {
            display: true,
          },
          beginAtZero: true,
        },
        y: {
          min: -20,
          max: 100,
          border: {
            display: true,
            width: 2,
            color: 'white',
          },
          grid: {
            display: true,
            color: 'rgba(218, 218,218, .50)',
            lineWidth: 0.2,
          },
          beginAtZero: true,
          ticks: {
            font: {
              size: screenWidth > 800 ? 20 : 10,
            },
            callback: (value) => `${value}%`,
          },
        },
      },
    },
  }); // end of chart object

  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: months, //x-axis name
      datasets: [
        {
          label: 'Instant bookings',
          data: RF,
          fill: true,
          tension: 0.2,
          borderColor: '#79B7FF',
          backgroundColor: 'rgba(121, 183,255, 0.2)',
        },
        {
          label: 'RFP bookings',
          data: IB,
          fill: true,
          tension: 0.2,
          borderColor: '#F65340',
          backgroundColor: 'rgba(246, 83,64,0.2)',
        },
      ],
    },
    options: {
      interaction: {
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function (context) {
              const firstEl = context[0].label;
              return `${firstEl} 2022`;
            },
            label: function (context) {
              const { label } = context.dataset;
              return `${label}  : ${context.parsed.y}%  `;
            },
          },
        },
        legend: {
          // name of chart shown on top
          display: false,
          labels: {
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
          text: 'Test Data Chart',
          font: {
            size: 20,
          },
        },
      },
      aspectRatio: 1.5,
      scales: {
        x: {
          ticks: {
            font: {
              size: screenWidth > 800 ? 20 : 10,
            },
          },
          border: {
            display: true,
            width: 2,
            color: 'white',
          },
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: '',
          },
          beginAtZero: true,
        },
        y: {
          border: {
            display: true,
            width: 2,
            color: 'white',
          },
          grid: {
            display: true,
            color: 'rgba(218, 218,218, .50)',
            lineWidth: 0.2,
          },
          beginAtZero: true,
          ticks: {
            font: {
              size: screenWidth > 800 ? 20 : 10,
            },
            callback: (value: number) => `${value}`,
          },
        },
      },
    },
  }); // end of chartsss
});
