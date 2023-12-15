import Airtable, { Record } from 'airtable';
import { getColumnData, pieSecondValue } from 'src/helperFunction';

import { imgPageUI } from './imageUI';
import { hotelLineChart, imgPieChart } from './imgChart';
window.Webflow ||= [];
window.Webflow.push(() => {
  ///////image content quality scores chart wrapper
  const pieEmea = document.querySelector('[rd-element="emea"]') as HTMLElement;
  const imgPieWrap = document.querySelector('[rd-element="imgpiechart"]') as HTMLElement;
  const pieApac = document.querySelector('[rd-element="apac"]') as HTMLElement;
  const meImage = document.querySelector('[rd-element="me-imagescore"]') as HTMLElement;

  const activeProp = document.querySelector('[rd-element="activeprop"]') as HTMLElement;
  const percentScore = document.querySelector('[rd-element="percentValue"]') as HTMLElement;
  const percentEmea = document.querySelector('[rd-element="emea-percentValue"]') as HTMLElement;
  const percentApac = document.querySelector('[rd-element="apac-percentValue"]') as HTMLElement;
  const mePercent = document.querySelector('[rd-element="mepercent"]') as HTMLElement;

  const hotelImgaeWrap = document.querySelector('[rd-element="hotelchart"]') as HTMLElement;

  if (
    !imgPieWrap ||
    !activeProp ||
    !percentScore ||
    !pieEmea ||
    !pieApac ||
    !hotelImgaeWrap ||
    !meImage
  )
    return;
  ////handling UI updates on page
  imgPageUI();
  /////////Airtable API Config
  Airtable.configure({ apiKey: 'keyAk5slAmWBfaIoz' });
  const radiChartbase = new Airtable({ apiKey: 'keyAk5slAmWBfaIoz' }).base('appRQPFdsg8bGEHBO');
  //getting table Records function
  const getTableRecords = function (tableId: string) {
    return radiChartbase(tableId).select({
      view: 'Grid view',
    });
  };

  const imageQuaTableId = 'tblmC8Nrz9KepbrI4';
  const apacColor = ['#E53935', '#E35D5B'];
  const emeaColor = ['#0052D4', '#6FB1FC'];
  const overalColor = ['#9E0059', '#E23597'];
  const meColor = ['#8E2DE2', '#4A00E0'];

  getTableRecords(imageQuaTableId).eachPage(function page(records) {
    const [getLastRole] = records.slice(-1);
    const overAllscore = getLastRole.fields['Overall Score'] as number;
    const activeScore = getLastRole.fields['Overall Score Active'] as number;
    const emeaScore = getLastRole.fields['EMEA Overall Score'] as number;
    const apacScore = getLastRole.fields['APAC Overall Score'] as number;
    const meScore = getLastRole.fields['M&E Score'] as number;
    const meScoreSecondvalue = pieSecondValue(meScore);
    const emeaSecondValue = pieSecondValue(emeaScore);
    const apacSecondValue = pieSecondValue(apacScore);
    const overAllsecondValue = pieSecondValue(overAllscore);

    const overPieData = [overAllscore, overAllsecondValue] as Array<number>;
    const emeaPieData = [emeaScore, emeaSecondValue] as Array<number>;
    const apacPieData = [apacScore, apacSecondValue] as Array<number>;
    const meImageData = [meScore, meScoreSecondvalue] as Array<number>;

    ////imported pichart function
    imgPieChart(pieEmea, emeaColor, emeaPieData);
    imgPieChart(imgPieWrap, overalColor, overPieData);
    imgPieChart(pieApac, apacColor, apacPieData);
    imgPieChart(meImage, meColor, meImageData);

    //console.log(overAllscore);

    const changePercentValueUI = function (
      percentWrap: HTMLElement,
      activeWrap: HTMLElement,
      percentValue: number,
      activeNum: number
    ) {
      percentWrap.textContent = `${percentValue}%`;
      activeWrap.textContent = `${activeNum}`;
    };

    changePercentValueUI(percentScore, activeProp, overAllscore, activeScore);
    percentEmea.textContent = `${emeaScore}%`;
    percentApac.textContent = `${apacScore}%`;
    mePercent.textContent = `${meScore}%`;
  });

  ////image quality scores benchmark
  const imageBenId = 'tbl0yB8Gvd71zGiED';
  const chartColor = ['#C1E963', '#7C74EB', '#DCDFE5'];
  getTableRecords(imageBenId).eachPage(function page(records) {
    //console.log(records);
    const month = getColumnData('Month Year', records);
    const rhgData = getColumnData('RHG', records);
    const expediaData = getColumnData('Expedia', records);
    const bookingData = getColumnData('Booking', records);

    const lineChartData = [month, rhgData, expediaData, bookingData];
    hotelLineChart(hotelImgaeWrap, chartColor, lineChartData);
  });
});
