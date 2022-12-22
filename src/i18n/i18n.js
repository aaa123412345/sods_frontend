// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import useLocalStorage from '../hooks/useLocalStorage'

import tourguideEN from './locales/en/tourguide.json';
import tourguideZH from './locales/zh/tourguide.json'
import floorplanEN from './locales/en/floorplan.json';
import floorplanZH from './locales/zh/floorplan.json'
import gameTicketEN from './locales/en/gameTicket.json';
import gameTicketZH from './locales/zh/gameTicket.json'
import tourguideEditorEN from './locales/en/tourguideEditor.json';
import tourguideEditorZH from './locales/zh/tourguideEditor.json'


// const [langSession, setLangSession] = useLocalStorage('language', 'en')
// const userLang = langSession === 'en' ? "en" : "zh"

export const supportedLanguages = ["en", "zh"]

const resources = {
  en: {
    translation: {
      tourguide: tourguideEN,
      floorplan: floorplanEN,
      gameTicket: gameTicketEN,
      tourguideEditor: tourguideEditorEN
    }
  },
  zh: {
    translation: {  
      tourguide: tourguideZH,
      floorplan: floorplanZH,
      gameTicket: gameTicketZH,
      tourguideEditor: tourguideEditorZH
    }
  },
};

i18n.use(initReactI18next).init({
  resources,
  lang: 'en', // default
  fallbackLng: 'en', // when no lanuage choice can be provided (e.g. jp)
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
