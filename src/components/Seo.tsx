import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  url?: string;
}

/**
 * SEO component for setting page metadata
 * Supports Open Graph and Twitter Card meta tags
 */
export default function Seo({
  title,
  description = 'African Institute for Cybersecurity & Tele-Informatics Governance - Research, policies, and publications on cybersecurity governance across Africa.',
  keywords = ['cybersecurity', 'Africa', 'policy', 'governance', 'research'],
  image = '/logo-aictig.png',
  type = 'website',
  url,
}: SeoProps) {
  const { t } = useTranslation('common');
  
  const siteName = t('siteFullName');
  const fullTitle = title ? `${title} | ${t('siteName')}` : siteName;
  
  useEffect(() => {
    // Set title
    document.title = fullTitle;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Set keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));
    
    // Open Graph tags
    setMetaTag('og:title', fullTitle);
    setMetaTag('og:description', description);
    setMetaTag('og:type', type);
    setMetaTag('og:image', image);
    setMetaTag('og:site_name', siteName);
    
    if (url) {
      setMetaTag('og:url', url);
    }
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);
  }, [fullTitle, description, keywords, image, type, url, siteName]);
  
  return null;
}

function setMetaTag(property: string, content: string) {
  const isProperty = property.startsWith('og:') || property.startsWith('twitter:');
  const attr = isProperty ? 'property' : 'name';
  
  let meta = document.querySelector(`meta[${attr}="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
