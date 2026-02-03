import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import PolicyCard from '../components/PolicyCard';
import PublicationCard from '../components/PublicationCard';
import { SkeletonCard } from '../components/Skeleton';
import { Policy, Publication } from '../types';

export default function Home() {
  const { t } = useTranslation(['home', 'common']);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load demo data
    Promise.all([
      fetch('/data/policies.json').then((r) => r.json()),
      fetch('/data/publications.json').then((r) => r.json()),
    ])
      .then(([policiesData, pubsData]) => {
        setPolicies(policiesData.slice(0, 3));
        setPublications(pubsData.slice(0, 3));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      <Seo title={t('common:navigation.home')} />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary-500 to-secondary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 md:whitespace-pre-line">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/repository" className="btn-accent">
                  {t('hero.cta.repository')}
                </Link>
                <Link to="/news" className="btn-secondary bg-white text-primary-600 hover:bg-primary-50">
                  {t('hero.cta.updates')}
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.repository.title')}</h3>
                <p className="text-neutral-600">{t('features.repository.description')}</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.multilingual.title')}</h3>
                <p className="text-neutral-600">{t('features.multilingual.description')}</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.openAccess.title')}</h3>
                <p className="text-neutral-600">{t('features.openAccess.description')}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Publications */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t('latestPublications.title')}</h2>
              <Link to="/publications" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('latestPublications.viewAll')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                publications.map((pub) => <PublicationCard key={pub.id} publication={pub} />)
              )}
            </div>
          </div>
        </section>
        
        {/* Recent Policies */}
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t('recentPolicies.title')}</h2>
              <Link to="/repository" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('recentPolicies.viewAll')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                policies.map((policy) => <PolicyCard key={policy.id} policy={policy} />)
              )}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-primary-100">{t('stats.countries')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-primary-100">{t('stats.policies')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">7</div>
                <div className="text-primary-100">{t('stats.languages')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-100">{t('stats.publications')}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
