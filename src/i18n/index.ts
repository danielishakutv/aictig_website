import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import commonEN from './locales/en/common.json';
import homeEN from './locales/en/home.json';
import repoEN from './locales/en/repo.json';
import pubsEN from './locales/en/pubs.json';
import newsEN from './locales/en/news.json';
import aboutEN from './locales/en/about.json';
import contactEN from './locales/en/contact.json';

import commonAR from './locales/ar/common.json';
import homeAR from './locales/ar/home.json';
import repoAR from './locales/ar/repo.json';
import pubsAR from './locales/ar/pubs.json';
import newsAR from './locales/ar/news.json';
import aboutAR from './locales/ar/about.json';
import contactAR from './locales/ar/contact.json';

import commonSW from './locales/sw/common.json';
import homeSW from './locales/sw/home.json';
import repoSW from './locales/sw/repo.json';
import pubsSW from './locales/sw/pubs.json';
import newsSW from './locales/sw/news.json';
import aboutSW from './locales/sw/about.json';
import contactSW from './locales/sw/contact.json';

import commonFR from './locales/fr/common.json';
import homeFR from './locales/fr/home.json';
import repoFR from './locales/fr/repo.json';
import pubsFR from './locales/fr/pubs.json';
import newsFR from './locales/fr/news.json';
import aboutFR from './locales/fr/about.json';
import contactFR from './locales/fr/contact.json';

import commonRU from './locales/ru/common.json';
import homeRU from './locales/ru/home.json';
import repoRU from './locales/ru/repo.json';
import pubsRU from './locales/ru/pubs.json';
import newsRU from './locales/ru/news.json';
import aboutRU from './locales/ru/about.json';
import contactRU from './locales/ru/contact.json';

import commonZH from './locales/zh/common.json';
import homeZH from './locales/zh/home.json';
import repoZH from './locales/zh/repo.json';
import pubsZH from './locales/zh/pubs.json';
import newsZH from './locales/zh/news.json';
import aboutZH from './locales/zh/about.json';
import contactZH from './locales/zh/contact.json';

import commonPT from './locales/pt/common.json';
import homePT from './locales/pt/home.json';
import repoPT from './locales/pt/repo.json';
import pubsPT from './locales/pt/pubs.json';
import newsPT from './locales/pt/news.json';
import aboutPT from './locales/pt/about.json';
import contactPT from './locales/pt/contact.json';

const resources = {
  en: {
    common: commonEN,
    home: homeEN,
    repo: repoEN,
    pubs: pubsEN,
    news: newsEN,
    about: aboutEN,
    contact: contactEN,
  },
  ar: {
    common: commonAR,
    home: homeAR,
    repo: repoAR,
    pubs: pubsAR,
    news: newsAR,
    about: aboutAR,
    contact: contactAR,
  },
  sw: {
    common: commonSW,
    home: homeSW,
    repo: repoSW,
    pubs: pubsSW,
    news: newsSW,
    about: aboutSW,
    contact: contactSW,
  },
  fr: {
    common: commonFR,
    home: homeFR,
    repo: repoFR,
    pubs: pubsFR,
    news: newsFR,
    about: aboutFR,
    contact: contactFR,
  },
  ru: {
    common: commonRU,
    home: homeRU,
    repo: repoRU,
    pubs: pubsRU,
    news: newsRU,
    about: aboutRU,
    contact: contactRU,
  },
  zh: {
    common: commonZH,
    home: homeZH,
    repo: repoZH,
    pubs: pubsZH,
    news: newsZH,
    about: aboutZH,
    contact: contactZH,
  },
  pt: {
    common: commonPT,
    home: homePT,
    repo: repoPT,
    pubs: pubsPT,
    news: newsPT,
    about: aboutPT,
    contact: contactPT,
  },
};

// Get stored language or detect from browser
const getInitialLanguage = (): string => {
  const stored = localStorage.getItem('aictig-language');
  if (stored && ['en', 'ar', 'sw', 'fr', 'ru', 'zh', 'pt'].includes(stored)) {
    return stored;
  }
  
  // Detect from browser
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'ar', 'sw', 'fr', 'ru', 'zh', 'pt'].includes(browserLang)) {
    return browserLang;
  }
  
  return 'en'; // Default to English
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'repo', 'pubs', 'news', 'about', 'contact'],
    interpolation: {
      escapeValue: false,
    },
  });

// Update HTML dir attribute based on language
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('aictig-language', lng);
  document.documentElement.setAttribute('lang', lng);
  document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
});

// Set initial dir
document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');

export default i18n;
