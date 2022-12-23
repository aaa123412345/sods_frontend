// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

const userLang = JSON.parse(window.localStorage.getItem('i18n-lang')) === "zh" ? 'zh' : 'en'

export const supportedLanguages = ["en", "zh"]

const resources = {
  en: {
    translation: {
      tourguide: tourguideEN,
      floorplan: floorplanEN,
      gameTicket: gameTicketEN,
      tourguideEditor: tourguideEditorEN,
      modal: modalEN
    }
  },
  zh: {
    translation: {  
      tourguide: tourguideZH,
      floorplan: floorplanZH,
      gameTicket: gameTicketZH,
      tourguideEditor: tourguideEditorZH, 
      modal: modalZH
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
