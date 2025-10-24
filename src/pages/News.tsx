import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Seo from '../components/Seo';
import Tag from '../components/Tag';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';
import type { NewsArticle } from '../types';

dayjs.extend(relativeTime);

const ITEMS_PER_PAGE = 9;

export default function News() {
  const { t } = useTranslation(['news', 'common']);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/data/news.json')
      .then((r) => r.json())
      .then((data) => {
        // Sort by date descending
        const sorted = data.sort(
          (a: NewsArticle, b: NewsArticle) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setArticles(sorted);
      })
      .catch((err) => console.error('Failed to fetch news:', err))
      .finally(() => setLoading(false));
  }, []);

  // Pagination
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, currentPage]);

  return (
    <>
      <Seo
        title={t('news:meta.title')}
        description={t('news:meta.description')}
      />
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              {t('news:title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl">
              {t('news:subtitle')}
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <EmptyState
              title={t('news:empty.title')}
              description={t('news:empty.description')}
            />
          ) : (
            <>
              {/* Featured article (first one) */}
              {currentPage === 1 && paginatedArticles.length > 0 && (
                <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-[16/9] lg:aspect-auto">
                      <img
                        src={paginatedArticles[0].image}
                        alt={`Featured news: ${paginatedArticles[0].title}`}
                        loading="eager"
                        decoding="async"
                        width="800"
                        height="450"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                        <CalendarIcon className="w-4 h-4" />
                        <time dateTime={paginatedArticles[0].date}>
                          {dayjs(paginatedArticles[0].date).format('MMMM D, YYYY')}
                        </time>
                        <span>•</span>
                        <ClockIcon className="w-4 h-4" />
                        <span>{dayjs(paginatedArticles[0].date).fromNow()}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                        {paginatedArticles[0].title}
                      </h2>
                      <p className="text-neutral-700 mb-4 line-clamp-3">
                        {paginatedArticles[0].excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paginatedArticles[0].tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} variant="primary">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <Link
                        to={`/news/${paginatedArticles[0].slug}`}
                        className="btn-primary self-start"
                      >
                        {t('news:readMore')}
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Articles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedArticles
                  .slice(currentPage === 1 ? 1 : 0)
                  .map((article) => (
                    <article
                      key={article.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <Link to={`/news/${article.slug}`}>
                        <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
                          <img
                            src={article.image}
                            alt={`News article: ${article.title}`}
                            loading="lazy"
                            decoding="async"
                            width="400"
                            height="225"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                          <CalendarIcon className="w-4 h-4" />
                          <time dateTime={article.date}>
                            {dayjs(article.date).format('MMM D, YYYY')}
                          </time>
                        </div>
                        <Link to={`/news/${article.slug}`}>
                          <h3 className="text-xl font-semibold text-neutral-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-neutral-700 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                        <Link
                          to={`/news/${article.slug}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          {t('news:readMore')} →
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
