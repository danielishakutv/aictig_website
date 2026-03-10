import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import Seo from '../components/Seo';
import PolicyCard from '../components/PolicyCard';
import PublicationCard from '../components/PublicationCard';
import { SkeletonCard } from '../components/Skeleton';
import { fetchAllDocuments, fetchPublications, fetchNewsArticles } from '../utils/graphql';
import { Policy, Publication, NewsArticle } from '../types';

/* ── Lightweight localStorage cache (stale-while-revalidate) ──── */
const CACHE_KEY = 'aictig_home_v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes — after this, background refresh

interface HomeCache {
  ts: number;
  policies: Policy[];
  publications: Publication[];
  news: NewsArticle[];
  totalPolicies: number;
  totalPublications: number;
}

function readCache(): HomeCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as HomeCache;
  } catch {
    return null;
  }
}

function writeCache(data: HomeCache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch { /* quota exceeded — ignore */ }
}

export default function Home() {
  const { t } = useTranslation(['home', 'common']);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [totalPublications, setTotalPublications] = useState(0);

  const applyData = useCallback(
    (policiesData: Policy[], pubsData: Publication[], newsData: NewsArticle[]) => {
      setTotalPolicies(policiesData.length);
      setTotalPublications(pubsData.length);
      setPolicies(policiesData.slice(0, 3));
      setPublications(pubsData.slice(0, 3));
      setNews(newsData.slice(0, 3));

      writeCache({
        ts: Date.now(),
        policies: policiesData.slice(0, 3),
        publications: pubsData.slice(0, 3),
        news: newsData.slice(0, 3),
        totalPolicies: policiesData.length,
        totalPublications: pubsData.length,
      });
    },
    [],
  );
  
  useEffect(() => {
    const cached = readCache();

    // Instantly hydrate from cache if available
    if (cached) {
      setPolicies(cached.policies);
      setPublications(cached.publications);
      setNews(cached.news);
      setTotalPolicies(cached.totalPolicies);
      setTotalPublications(cached.totalPublications);
      setLoading(false);

      // If cache is fresh, skip network request
      if (Date.now() - cached.ts < CACHE_TTL) return;
    }

    // Fetch fresh data (foreground if no cache, background if stale)
    Promise.all([
      fetchAllDocuments(),
      fetchPublications(),
      fetchNewsArticles(),
    ])
      .then(([policiesData, pubsData, newsData]) => {
        applyData(policiesData, pubsData, newsData);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
      })
      .finally(() => setLoading(false));
  }, [applyData]);
  
  return (
    <>
      <Seo
        title={t('common:navigation.home')}
        description="African Institute for Cybersecurity & Tele-Informatics Governance - Advancing cybersecurity governance across Africa through research, policy analysis, and regional cooperation."
        keywords={['cybersecurity', 'Africa', 'ICT governance', 'policy repository', 'digital transformation', 'data protection', 'AICTiG']}
      />
      
      <main>
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

        {/* Latest News */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t('latestNews.title', 'Latest News')}</h2>
              <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('latestNews.viewAll', 'View All News')} →
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
                news.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow block"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="225"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                        <CalendarIcon className="w-4 h-4" />
                        <time dateTime={article.date}>
                          {dayjs(article.date).format('MMM D, YYYY')}
                        </time>
                      </div>
                      <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))
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
                <div className="text-4xl font-bold mb-2">{totalPolicies || '—'}</div>
                <div className="text-primary-100">{t('stats.policies')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">7</div>
                <div className="text-primary-100">{t('stats.languages')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{totalPublications || '—'}</div>
                <div className="text-primary-100">{t('stats.publications')}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
