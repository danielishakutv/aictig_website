import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './i18n';
import { UiProvider } from './context/UiContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import { trackPageView } from './utils/analytics';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
const Repository = lazy(() => import('./pages/Repository'));
const PolicyDetail = lazy(() => import('./pages/PolicyDetail'));
const Publications = lazy(() => import('./pages/Publications'));
const PublicationDetail = lazy(() => import('./pages/PublicationDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const About = lazy(() => import('./pages/About'));
const Expert = lazy(() => import('./pages/Expert'));
const FocusAreas = lazy(() => import('./pages/FocusAreas'));
const Consultancy = lazy(() => import('./pages/Consultancy'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname, pathname);
  }, [pathname]);
  
  return null;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-neutral-600">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div id="main-content" className="flex-grow">
        <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experts/:id" element={<Expert />} />
            <Route path="/focus-areas" element={<FocusAreas />} />
            <Route path="/repository/:id" element={<PolicyDetail />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/repository/:id" element={<PolicyDetail />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publications/:slug" element={<PublicationDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/:page" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
      <Toast />
    </div>
  );
}

function NotFound() {
  return (
    <main className="container-custom py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-8">Page not found</p>
        <a href="/" className="btn-primary">
          Go Home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UiProvider>
        <ScrollToTop />
        <AppRoutes />
      </UiProvider>
    </BrowserRouter>
  );
}
