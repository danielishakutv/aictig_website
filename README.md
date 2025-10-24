# AICTiG - Multilingual Research Website

> African Institute for Cybersecurity & Tele-Informatics Governance

A comprehensive, multilingual frontend application for showcasing cybersecurity policies, research publications, and news across Africa. Built with React, TypeScript, and Tailwind CSS with support for 7 languages including RTL (Arabic).

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

## 📋 Project Structure

```
/src
  /assets/              # Static assets (logo, images)
  /components/          # Reusable UI components
    Header.tsx
    Footer.tsx
    LanguageSwitcher.tsx
    SearchInput.tsx
    FilterSidebar.tsx
    PolicyCard.tsx
    PublicationCard.tsx
    Tag.tsx
    Pagination.tsx
    Breadcrumbs.tsx
    Skeleton.tsx
    Toast.tsx
    Markdown.tsx
    CountryFlag.tsx
    EmptyState.tsx
    Seo.tsx
  /pages/              # Page components
    Home.tsx
    Repository.tsx
    PolicyDetail.tsx
    Publications.tsx
    Gallery.tsx
    News.tsx
    NewsDetail.tsx
    About.tsx
    Contact.tsx
    Legal.tsx
  /i18n/               # Internationalization
    index.ts
    /locales/
      /en/             # English translations
      /ar/             # Arabic (RTL)
      /sw/             # Swahili
      /fr/             # French
      /ru/             # Russian
      /zh/             # Chinese
      /pt/             # Portuguese
  /context/            # React Context providers
    UiContext.tsx
  /hooks/              # Custom React hooks
  /utils/              # Utility functions
    analytics.ts
    countries.ts
    seo.ts
  /types/              # TypeScript type definitions
    index.ts
  /test/               # Test utilities
  main.tsx
  App.tsx
  index.css

/public
  /data/               # Demo JSON data
    policies.json
    publications.json
    countries.json
    themes.json
    news.json
    gallery.json
  /content/            # Static markdown content
    privacy.md
    terms.md
```

## 🌍 Internationalization (i18n)

### Supported Languages

- **en** - English
- **ar** - Arabic (RTL support)
- **sw** - Swahili
- **fr** - French
- **ru** - Russian
- **zh** - Chinese
- **pt** - Portuguese

### Adding a New Language

1. Create translation files in `/src/i18n/locales/{lang-code}/`:
   - `common.json`
   - `home.json`
   - `repo.json`
   - `pubs.json`
   - `news.json`
   - `about.json`
   - `contact.json`

2. Add language to `/src/i18n/index.ts`:
```typescript
import commonXX from './locales/xx/common.json';
// ... other namespaces

const resources = {
  // ... existing languages
  xx: {
    common: commonXX,
    // ... other namespaces
  },
};
```

3. Add language option to `/src/components/LanguageSwitcher.tsx`:
```typescript
const languages = [
  // ... existing languages
  { code: 'xx', name: 'Language Name', nativeName: 'Native Name' },
];
```

### RTL Support

Arabic language automatically enables RTL mode. The system:
- Sets `dir="rtl"` on the HTML element
- Mirrors layouts using Tailwind CSS
- Adjusts padding and margins appropriately

To add RTL support for additional languages, update the condition in `/src/i18n/index.ts`:

```typescript
document.documentElement.setAttribute('dir', ['ar', 'he'].includes(lng) ? 'rtl' : 'ltr');
```

## 📊 Demo Data

All data is stored as JSON files in `/public/data/`. Each file contains demo content with realistic data.

### Data Files

- **policies.json** - Cybersecurity policies and regulations
- **publications.json** - Research papers and reports
- **countries.json** - African countries with ISO codes
- **themes.json** - Policy themes and categories
- **news.json** - News articles and updates
- **gallery.json** - Event photos and captions

### Adding New Data Items

#### Add a Policy

Edit `/public/data/policies.json`:

```json
{
  "id": "pol-XXX",
  "title": "Policy Title",
  "country": "Country Name",
  "countryCode": "XX",
  "region": "Region",
  "year": 2025,
  "type": "Policy|Regulation|Law|Strategy|Framework",
  "languages": ["en", "fr"],
  "summary": "Brief summary...",
  "themes": ["Theme1", "Theme2"],
  "fileUrl": "/files/policies/pol-XXX.pdf",
  "tags": ["tag1", "tag2"]
}
```

#### Add a Publication

Edit `/public/data/publications.json`:

```json
{
  "id": "pub-XXX",
  "title": "Publication Title",
  "authors": ["Author 1", "Author 2"],
  "year": 2025,
  "type": "Brief|Report|Paper|White Paper",
  "abstract": "Abstract text...",
  "fileUrl": "/files/publications/pub-XXX.pdf",
  "cover": "/images/covers/pub-XXX.jpg",
  "tags": ["tag1", "tag2"]
}
```

## 🎨 Customization

### Brand Colors

Colors are defined in `tailwind.config.js`. Current palette:

- **Primary**: `#0A5BD3` (Blue)
- **Accent**: `#15A34A` (Green)
- **Warning**: `#F59E0B` (Orange)
- **Danger**: `#EF4444` (Red)
- **Neutral**: Grays from `#F8FAFC` to `#0F172A`

To change:
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#YOUR_COLOR',
        // ... define shades 50-900
      },
    },
  },
},
```

### Logo

Replace `/public/logo-aictig.png` with your logo. The Header component includes a fallback SVG if the image is not found.

### Fonts

Default font is Inter (loaded from Google Fonts in `index.css`). To change:

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
},
```

## 🔌 API Integration

The app is currently frontend-only with demo JSON data. To integrate with a real API:

### 1. Create API Service

```typescript
// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.aictig.org';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const policiesAPI = {
  getAll: (params) => api.get('/policies', { params }),
  getById: (id) => api.get(`/policies/${id}`),
  search: (query) => api.get('/policies/search', { params: { q: query } }),
};

export const publicationsAPI = {
  getAll: (params) => api.get('/publications', { params }),
  getById: (id) => api.get(`/publications/${id}`),
};

export default api;
```

### 2. Update Components

Replace `fetch('/data/policies.json')` with API calls:

```typescript
// Before
fetch('/data/policies.json').then((r) => r.json())

// After
import { policiesAPI } from '../services/api';
policiesAPI.getAll({ page: 1, limit: 10 })
  .then((response) => response.data)
```

### 3. Environment Variables

Create `.env` files:

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.aictig.org
```

## 📝 Adding New Pages

### 1. Create Page Component

```typescript
// src/pages/YourPage.tsx
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';

export default function YourPage() {
  const { t } = useTranslation('yourNamespace');
  
  return (
    <>
      <Seo title={t('pageTitle')} description={t('pageDescription')} />
      <main className="container-custom py-16">
        <h1>{t('heading')}</h1>
        {/* Your content */}
      </main>
    </>
  );
}
```

### 2. Add Route

```typescript
// src/App.tsx
import YourPage from './pages/YourPage';

<Routes>
  {/* ...existing routes */}
  <Route path="/your-page" element={<YourPage />} />
</Routes>
```

### 3. Add Navigation Link

```typescript
// src/components/Header.tsx
const navigation = [
  // ...existing items
  { name: t('navigation.yourPage'), href: '/your-page' },
];
```

### 4. Add Translations

```json
// src/i18n/locales/en/common.json
{
  "navigation": {
    "yourPage": "Your Page"
  }
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
// src/components/__tests__/YourComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import YourComponent from '../YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## ♿ Accessibility

The app follows WCAG 2.1 AA standards:

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Skip-to-content link
- Focus indicators (`.focus-ring` class)
- Alt text for images
- Sufficient color contrast

### Testing Accessibility

```bash
# Use browser dev tools
# - Chrome: Lighthouse
# - Firefox: Accessibility Inspector

# Or use axe-core
npm install --save-dev @axe-core/react
```

## 📱 Responsive Design

Breakpoints (Tailwind CSS):

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

Test on:
- Mobile: 360px - 428px
- Tablet: 768px - 1024px
- Desktop: 1280px+

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output in `/dist` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json:
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

npm run deploy
```

### Environment Variables

Remember to set environment variables in your deployment platform:

- `VITE_API_URL` - API base URL
- `VITE_GA_ID` - Google Analytics ID (when implemented)

## 🔍 SEO

The `Seo` component handles:
- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs

Example usage:

```typescript
<Seo 
  title="Page Title"
  description="Page description for search engines"
  keywords={['keyword1', 'keyword2']}
  image="/path/to/og-image.jpg"
/>
```

## 📈 Analytics

Analytics are stubbed in `/src/utils/analytics.ts`. To implement:

### Google Analytics

```typescript
// src/utils/analytics.ts
export function trackPageView(pageName: string, path: string) {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
    });
  }
}
```

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Contributing

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive commit messages

### Component Guidelines

- One component per file
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Add proper TypeScript types

## 📄 License

© 2025 African Institute for Cybersecurity & Tele-Informatics Governance. All rights reserved.

## 🆘 Support

For questions or issues:
- Email: info@aictig.org
- GitHub Issues: [Create an issue](https://github.com/aictig/frontend/issues)

---

**Built with** ❤️ **for digital governance across Africa**
