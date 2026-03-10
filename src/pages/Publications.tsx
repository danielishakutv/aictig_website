import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Seo from '../components/Seo';
import PublicationCard from '../components/PublicationCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';
import { fetchPublications } from '../utils/graphql';
import type { Publication } from '../types';

const ITEMS_PER_PAGE = 12;

export default function Publications() {
  const { t } = useTranslation(['pubs', 'common']);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch publications from WordPress
  useEffect(() => {
    fetchPublications()
      .then((data) => setPublications(data))
      .catch((err) => console.error('Failed to fetch publications:', err))
      .finally(() => setLoading(false));
  }, []);

  // Get unique types and years
  const types = useMemo(() => {
    const uniqueTypes = Array.from(new Set(publications.map((p) => p.type)));
    return uniqueTypes.sort();
  }, [publications]);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(publications.map((p) => p.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, [publications]);

  // Filter publications
  const filteredPublications = useMemo(() => {
    let filtered = publications;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.abstract.toLowerCase().includes(query) ||
          pub.authors.some((author) => author.toLowerCase().includes(query)) ||
          pub.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((pub) => pub.type === typeFilter);
    }

    // Year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter((pub) => pub.year.toString() === yearFilter);
    }

    return filtered;
  }, [publications, searchQuery, typeFilter, yearFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const paginatedPublications = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPublications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPublications, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, yearFilter]);

  return (
    <>
      <Seo
        title={t('pubs:meta.title')}
        description={t('pubs:meta.description')}
      />
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              {t('pubs:title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl">
              {t('pubs:subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-6">
                <label htmlFor="search" className="sr-only">
                  {t('pubs:search.label')}
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    id="search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('pubs:search.placeholder')}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type filter */}
              <div className="md:col-span-3">
                <label htmlFor="type" className="sr-only">
                  {t('pubs:filters.type')}
                </label>
                <select
                  id="type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">{t('pubs:filters.allTypes')}</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year filter */}
              <div className="md:col-span-3">
                <label htmlFor="year" className="sr-only">
                  {t('pubs:filters.year')}
                </label>
                <select
                  id="year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">{t('pubs:filters.allYears')}</option>
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-neutral-600">
              {loading
                ? t('common:loading')
                : t('pubs:results', { count: filteredPublications.length })}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : filteredPublications.length === 0 ? (
            <EmptyState
              title={t('pubs:empty.title')}
              description={t('pubs:empty.description')}
              actionLabel={t('pubs:empty.action')}
              onAction={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setYearFilter('all');
              }}
            />
          ) : (
            <>
              {/* Publications grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedPublications.map((publication) => (
                  <PublicationCard key={publication.id} publication={publication} />
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
