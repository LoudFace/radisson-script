import Airtable from 'airtable';
import { fixYaxis } from 'src/helperFunction';

const airtableToken =
  'patdwE10W5YOIwOla.4a633223c06422d5a54fdcc94b427170221e267365c08a0e0f9a894cffad3904';

Airtable.configure({ apiKey: airtableToken });
const radiChartbase = new Airtable({ apiKey: airtableToken }).base('appRQPFdsg8bGEHBO');
//getting table Records function
const getTableRecords = function (tableId: string) {
  return radiChartbase(tableId).select({
    view: 'Grid view',
  });
};

const imageQuaTableId = 'tblmC8Nrz9KepbrI4';

const hotelYwrap = document.querySelector('[rd-element="hotel-yscroll"]') as HTMLElement;
const hotelYaxisWrap = document.querySelector('[rd-element="hotel-ywrap"]') as HTMLElement;

/////chart label wrapper
//function to update label
const updatelabel = function (wraps, data) {
  wraps.forEach(function (wrap) {
    wrap.innerHTML = `${data}`;
  });
};

const metaScoreWrap = document.querySelectorAll('[rd-element="metaScore"]') as NodeList;
const eeruScoreWrap = document.querySelectorAll('[rd-element="eeruScore"]') as NodeList;
const nobaScoreWrap = document.querySelectorAll('[rd-element="nobaScore"]') as NodeList;
const ukirSCoreWrap = document.querySelectorAll('[rd-element="ukirScore"]') as NodeList;
const ceseScoreWrap = document.querySelectorAll('[rd-element="ceseScore"]') as NodeList;
const chinaScoreWrap = document.querySelectorAll('[rd-element="chinaScore"]') as NodeList;
const seapScoreWrap = document.querySelectorAll('[rd-element="seapScore"]') as NodeList;
const saScoreWrap = document.querySelectorAll('[rd-element="saScore"]') as NodeList;

const overallImgscoreWrap = document.querySelector(
  '[rd-element="hero-overall-img"]'
) as HTMLElement;
//console.log(overallImgscoreWrap);

//console.log(saScore);

export const imgPageUI = function () {
  if (!hotelYaxisWrap || !hotelYwrap) return;
  fixYaxis(hotelYwrap, hotelYaxisWrap, '#0d0d0d');

  getTableRecords(imageQuaTableId).eachPage(function page(records) {
    const [getLastRole] = records.slice(-1);
    const overAllscore = getLastRole.fields['Overall Score'] as number;
    const activeScore = getLastRole.fields['Overall Score Active'] as number;
    const emeaScore = getLastRole.fields['EMEA Overall Score'] as number;
    const apacScore = getLastRole.fields['APAC Overall Score'] as number;
    const meScore = getLastRole.fields['M&E Score'] as number;
    //change made
    const metaScore = getLastRole.fields['Middle East, Africa & Turkey Overall Score'] as number;
    //change made

    const ceseScore = getLastRole.fields['CESE & Baltics Overall Score'] as number;
    const ukirScore = getLastRole.fields['Mediterranean Overall Score'] as number;
    const nobaScore = getLastRole.fields['Nordics & Benelux, UK & Ireland Overall Score'] as number; // name change made
    const eeruScore = getLastRole.fields['Russia Overall Score'] as number;
    const chinaScore = getLastRole.fields['CHINA Overall Score'] as number;
    const saScore = getLastRole.fields['South Asia Overall Score'] as number;
    const seapScore = getLastRole.fields['SEAP Overall Score'] as number;
    overallImgscoreWrap.innerHTML = `${overAllscore}`;
    updatelabel(metaScoreWrap, metaScore);
    updatelabel(eeruScoreWrap, eeruScore);
    updatelabel(nobaScoreWrap, nobaScore);
    updatelabel(ukirSCoreWrap, ukirScore);
    updatelabel(ceseScoreWrap, ceseScore);
    updatelabel(chinaScoreWrap, chinaScore);
    updatelabel(seapScoreWrap, seapScore);
    updatelabel(saScoreWrap, saScore);
  });
};
