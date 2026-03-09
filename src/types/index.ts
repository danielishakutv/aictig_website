// Types for demo data
export interface Policy {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  region: string;
  year: number;
  type: string;
  organization?: string; // For regional instruments: 'au', 'ecowas', 'sadc', etc.
  languages: string[];
  summary: string;
  themes: string[];
  fileUrl: string;
  tags: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  type: string;
  abstract: string;
  fileUrl: string;
  cover: string;
  tags: string[];
}

export interface Country {
  name: string;
  iso2: string;
  region: string;
}

export interface Theme {
  id: string;
  label: string;
  icon: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  author: string;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  caption: string;
  date: string;
  country: string;
}


