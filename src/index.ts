import Chart from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Samuel');
  const ctx = document.querySelector('#graph1');
  const ctx2 = document.querySelector('#graph2');
  const ctx3 = document.querySelector('#graph3');
  if (!ctx || !ctx2 || !ctx3) return;

  const testData = [
    {
      year: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
      count1: [10, 15, 5, 12, 8, 11, 8],
      count2: [5, 15, 20, 4, 12, 16, 23],
      count3: [15, 10, 10, 20, 15, 5, 2],
      count4: [20, 15, 5, 8, 20, 4, 12],
      count5: [2, 18, 15, 22, 4, 10, 8],
    },
  ];
  const { year } = testData[0];
  const { count1 } = testData[0];
  const { count2 } = testData[0];
  const { count3 } = testData[0];
  const { count4 } = testData[0];
  const { count5 } = testData[0];

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

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: year, //x-axis name
      datasets: [
        {
          label: 'count1',
          data: count1,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(218, 218,218, .80)',
          backgroundColor: 'rgba(218, 218,218, 0.18)',
        },
        {
          label: 'count2',
          data: count2,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(180, 150,150, .80)',
          backgroundColor: 'rgba(180, 150,150, 0.18)',
        },
        {
          label: 'count3',
          data: count3,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(21, 210,210, .80)',
          backgroundColor: 'rgba(21, 210,210, 0.18)',
        },
        {
          label: 'count4',
          data: count4,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(21, 210,25, .80)',
          backgroundColor: 'rgba(21, 210,25, 0.18)',
        },
        {
          label: 'count5',
          data: count5,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(21, 134,210, .80)',
          backgroundColor: 'rgba(21, 134,210, 0.18)',
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
          usePointStyle: true,
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
              size: 20,
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
              size: 20,
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
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(218, 218,218, .80)',
          backgroundColor: 'rgba(218, 218,218, 0.18)',
        },
        {
          label: 'india',
          data: india,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(180, 150,150, .80)',
          backgroundColor: 'rgba(180, 150,150, 0.18)',
        },
        {
          label: 'seap',
          data: seap,
          borderWidth: 1,
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
          usePointStyle: true,
          callbacks: {
            title: () => 'Week',
            // label: function (context) {
            //   let label = context. || '';

            //   if (label) {
            //     label += ': ';
            //   }
            //   if (context.parsed.y !== null) {
            //     label += new Intl.NumberFormat('en-US', {
            //       style: 'currency',
            //       currency: 'USD',
            //     }).format(context.parsed.y);
            //   }
            //   return label;
            // },
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
              size: 20,
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
              size: 20,
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
      labels: year, //x-axis name
      datasets: [
        {
          label: 'count1',
          data: count1,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(21, 118,118, .80)',
          backgroundColor: 'rgba(21, 118,118, 0.18)',
        },
        {
          label: 'count2',
          data: count2,
          borderWidth: 1,
          fill: true,
          tension: 0.2,
          borderColor: 'rgba(200, 20,30, .80)',
          backgroundColor: 'rgba(200, 20,30, 0.18)',
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
          usePointStyle: true,
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
              size: 20,
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
              size: 20,
            },
            callback: (value: number) => `${value}%`,
          },
        },
      },
    },
  }); // end of chart ob
});
