import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://www.aictig.org';
const SUPPORTED_LANGS = ['en', 'ar', 'sw', 'fr', 'ru', 'zh', 'pt'];

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  url?: string;
}

export default function Seo({
  title,
  description = 'African Institute for Cybersecurity & Tele-Informatics Governance - Research, policies, and publications on cybersecurity governance across Africa.',
  keywords = ['cybersecurity', 'Africa', 'policy', 'governance', 'research'],
  image = '/logo-aictig.png',
  type = 'website',
  url,
}: SeoProps) {
  const { t, i18n } = useTranslation('common');
  const { pathname } = useLocation();

  const siteName = t('siteFullName');
  const fullTitle = title ? `${title} | ${t('siteName')}` : siteName;
  const pageUrl = url || `${SITE_URL}${pathname}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    document.title = fullTitle;

    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));

    // Canonical URL
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:locale', langToLocale(i18n.language));

    // Twitter Card (uses name= per spec)
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absoluteImage);

    // hreflang alternate links
    updateHreflang(pageUrl);

    // JSON-LD WebPage (dynamic per page)
    updateJsonLd(fullTitle, description, pageUrl, absoluteImage, i18n.language);
  }, [fullTitle, description, keywords, image, type, pageUrl, absoluteImage, siteName, i18n.language]);

  return null;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Add <link rel="alternate" hreflang="..."> for each supported language + x-default */
function updateHreflang(pageUrl: string) {
  document.querySelectorAll('link[data-seo-hreflang]').forEach(el => el.remove());

  for (const lang of SUPPORTED_LANGS) {
    appendHreflang(lang, pageUrl);
  }
  appendHreflang('x-default', pageUrl);
}

function appendHreflang(hreflang: string, href: string) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'alternate');
  link.setAttribute('hreflang', hreflang);
  link.setAttribute('href', href);
  link.setAttribute('data-seo-hreflang', '');
  document.head.appendChild(link);
}

/** Inject / update a JSON-LD WebPage script for the current page */
function updateJsonLd(title: string, description: string, url: string, image: string, lang: string) {
  const id = 'seo-jsonld-webpage';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    image,
    inLanguage: lang,
  });
}

function langToLocale(lang: string): string {
  const map: Record<string, string> = {
    en: 'en_US', ar: 'ar_SA', sw: 'sw_KE',
    fr: 'fr_FR', ru: 'ru_RU', zh: 'zh_CN', pt: 'pt_PT',
  };
  return map[lang] || 'en_US';
}
