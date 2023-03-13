// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// tour guide system
import tourguideEN from './locales/en/tourguide.json';
import tourguideZH from './locales/zh/tourguide.json'
import floorplanEN from './locales/en/floorplan.json';
import floorplanZH from './locales/zh/floorplan.json'
import gameTicketEN from './locales/en/gameTicket.json';
import gameTicketZH from './locales/zh/gameTicket.json'
import tourguideEditorEN from './locales/en/tourguideEditor.json';
import tourguideEditorZH from './locales/zh/tourguideEditor.json'
import modalEN from './locales/en/modal.json';
import modalZH from './locales/zh/modal.json'

// ar treasure game
import arTreasureEN from './locales/en/arTreasure.json'
import arTreasureZH from './locales/zh/arTreasure.json'
import arTreasureEditorEN from './locales/en/arTreasureEditor.json'
import arTreasureEditorZH from './locales/zh/arTreasureEditor.json'

//login component
import loginPageEN from './locales/en/loginPage.json';
import loginPageZH from './locales/zh/loginPage.json';


let userLang = JSON.parse(window.localStorage.getItem('i18n-lang'))
const url = window.location.pathname

const setLang = (lang) => {
  window.localStorage.setItem('i18n-lang', JSON.stringify(lang))
  userLang = lang
}

// switch langauge base on url 
if(url.includes(`/eng/`) && userLang === "zh")
  setLang('en')
else if(url.includes(`/chi/`) && userLang === 'en')
  setLang('zh')
else
  setLang('en')

export const supportedLanguages = ["en", "zh"]

const resources = {
  en: {
    translation: {
      tourguide: tourguideEN,
      floorplan: floorplanEN,
      gameTicket: gameTicketEN,
      tourguideEditor: tourguideEditorEN,
      modal: modalEN, 
      arTreasure: arTreasureEN, 
      arTreasureEditor: arTreasureEditorEN,
      loginPage: loginPageEN
    }
  },
  zh: {
    translation: {  
      tourguide: tourguideZH,
      floorplan: floorplanZH,
      gameTicket: gameTicketZH,
      tourguideEditor: tourguideEditorZH, 
      modal: modalZH,
      arTreasure: arTreasureZH, 
      arTreasureEditorZH: arTreasureEditorZH,
      loginPage: loginPageZH
    }
  },
};

i18n.use(initReactI18next).init({
  resources,
  lang: 'en', // default
  fallbackLng: userLang, // user language 
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
