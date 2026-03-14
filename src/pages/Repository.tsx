import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon, XMarkIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import Seo from '../components/Seo';
import FilterSidebar from '../components/FilterSidebar';
import PolicyCard from '../components/PolicyCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';
import { fetchAllDocuments } from '../utils/graphql';
import type { Policy } from '../types';

const ITEMS_PER_PAGE = 9;

export default function Repository() {
  const { t } = useTranslation(['repo', 'common']);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    level: [],
    organization: [],
    country: [],
    sector: [],
    year: [],
    language: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeFilterCount = useMemo(
    () => Object.values(activeFilters).reduce((acc, values) => acc + values.length, 0),
    [activeFilters]
  );

  // Fetch documents from WordPress GraphQL backend
  useEffect(() => {
    fetchAllDocuments()
      .then((docs) => setPolicies(docs))
      .catch((err) => console.error('Failed to fetch documents:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter policies
  const filteredPolicies = useMemo(() => {
    let filtered = policies;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (policy) =>
          policy.title.toLowerCase().includes(query) ||
          policy.summary.toLowerCase().includes(query) ||
          policy.country.toLowerCase().includes(query) ||
          policy.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (activeFilters.level.length > 0) {
      filtered = filtered.filter((policy) => activeFilters.level.includes(policy.level));
    }

    if (activeFilters.organization.length > 0) {
      filtered = filtered.filter(
        (policy) => policy.organizationKey && activeFilters.organization.includes(policy.organizationKey)
      );
    }

    if (activeFilters.country.length > 0) {
      filtered = filtered.filter((policy) => activeFilters.country.includes(policy.countryCode));
    }

    if (activeFilters.sector.length > 0) {
      filtered = filtered.filter((policy) => policy.themes.some((theme) => activeFilters.sector.includes(theme)));
    }

    if (activeFilters.year.length > 0) {
      filtered = filtered.filter((policy) => activeFilters.year.includes(policy.year.toString()));
    }

    if (activeFilters.language.length > 0) {
      filtered = filtered.filter((policy) => policy.languages.some((lang) => activeFilters.language.includes(lang)));
    }

    return filtered;
  }, [policies, searchQuery, activeFilters]);

  const totalPages = Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE);
  const paginatedPolicies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPolicies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPolicies, currentPage]);

  const filterGroups = useMemo(() => {
    if (loading) return [];

    // Build document-level counts
    const levelMap = new Map<string, number>();
    policies.forEach((p) => {
      levelMap.set(p.level, (levelMap.get(p.level) || 0) + 1);
    });
    const LEVEL_LABELS: Record<string, string> = {
      national: t('repo:filters.levelNational', { defaultValue: 'National' }),
      regional: t('repo:filters.levelRegional', { defaultValue: 'Regional' }),
      continental: t('repo:filters.levelContinental', { defaultValue: 'Continental' }),
      international: t('repo:filters.levelInternational', { defaultValue: 'International' }),
    };
    const LEVEL_ORDER = ['national', 'regional', 'continental', 'international'];

    // Build organization options
    const orgMap = new Map<string, { label: string; count: number }>();
    policies.forEach((p) => {
      if (p.organizationKey && p.organization) {
        const existing = orgMap.get(p.organizationKey);
        if (existing) existing.count++;
        else orgMap.set(p.organizationKey, { label: p.organization, count: 1 });
      }
    });

    // Build country options from the data itself
    const countryMap = new Map<string, { name: string; count: number }>();
    policies.forEach((p) => {
      if (p.countryCode && p.country) {
        const existing = countryMap.get(p.countryCode);
        if (existing) existing.count++;
        else countryMap.set(p.countryCode, { name: p.country, count: 1 });
      }
    });

    // Build theme/sector options from the data
    const themeMap = new Map<string, number>();
    policies.forEach((p) => {
      p.themes.forEach((theme) => themeMap.set(theme, (themeMap.get(theme) || 0) + 1));
    });

    // Years
    const years = Array.from(new Set(policies.map((p) => p.year)))
      .sort((a, b) => b - a)
      .map((year) => ({
        label: year.toString(),
        value: year.toString(),
        count: policies.filter((p) => p.year === year).length,
      }));

    // Languages
    const langMap = new Map<string, number>();
    policies.forEach((p) => {
      p.languages.forEach((lang) => langMap.set(lang, (langMap.get(lang) || 0) + 1));
    });

    return [
      {
        id: 'level',
        label: t('repo:filters.level', { defaultValue: 'Document Level' }),
        options: LEVEL_ORDER
          .filter((lvl) => levelMap.has(lvl))
          .map((lvl) => ({
            label: LEVEL_LABELS[lvl] || lvl,
            value: lvl,
            count: levelMap.get(lvl) || 0,
          })),
      },
      {
        id: 'organization',
        label: t('repo:filters.organization'),
        options: Array.from(orgMap.entries())
          .sort(([, a], [, b]) => a.label.localeCompare(b.label))
          .map(([key, { label, count }]) => ({ label, value: key, count })),
      },
      {
        id: 'country',
        label: t('repo:filters.country'),
        options: Array.from(countryMap.entries())
          .sort(([, a], [, b]) => a.name.localeCompare(b.name))
          .map(([code, { name, count }]) => ({ label: name, value: code, count })),
      },
      {
        id: 'sector',
        label: t('repo:filters.sector'),
        options: Array.from(themeMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([theme, count]) => ({ label: theme, value: theme, count })),
      },
      {
        id: 'year',
        label: t('repo:filters.year'),
        options: years,
      },
      {
        id: 'language',
        label: t('repo:filters.language'),
        options: Array.from(langMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([lang, count]) => ({ label: lang.toUpperCase(), value: lang, count })),
      },
    ];
  }, [policies, loading, t]);

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      const isActive = current.includes(value);
      return {
        ...prev,
        [filterId]: isActive ? current.filter((v) => v !== value) : [...current, value],
      };
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilters({
      level: [],
      organization: [],
      country: [],
      sector: [],
      year: [],
      language: [],
    });
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <>
      <Seo title={t('repo:meta.title')} description={t('repo:meta.description')} />
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">{t('repo:title')}</h1>
            <p className="text-lg text-neutral-600 max-w-3xl">{t('repo:subtitle')}</p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
            <form onSubmit={handleSearch} className="w-full md:max-w-2xl">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('repo:search.placeholder')}
                  className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="hidden md:flex items-center rounded-lg border border-neutral-300 bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                  aria-label="Grid view"
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                  aria-label="List view"
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm transition hover:border-primary-400 hover:text-primary-700"
                >
                  {t('repo:filters.title', { defaultValue: 'Filters' })}
                  {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="hidden lg:col-span-1 lg:block">
              {!loading && (
                <FilterSidebar
                  filters={filterGroups}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  resultCount={filteredPolicies.length}
                />
              )}
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredPolicies.length === 0 ? (
                <EmptyState
                  title={t('repo:empty.title')}
                  description={t('repo:empty.description')}
                  actionLabel={t('repo:empty.action')}
                  onAction={handleClearFilters}
                />
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {paginatedPolicies.map((policy) => (
                        <PolicyCard key={policy.id} policy={policy} variant="grid" />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mb-8">
                      {paginatedPolicies.map((policy) => (
                        <PolicyCard key={policy.id} policy={policy} variant="list" />
                      ))}
                    </div>
                  )}

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
          </div>

          {isMobileFiltersOpen && !loading && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="w-full max-w-xl" onClick={() => setIsMobileFiltersOpen(false)}>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                    <h3 className="text-base font-semibold text-neutral-900">
                      {t('repo:filters.title', { defaultValue: 'Filters' })}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="rounded-md p-1 text-neutral-500 transition hover:text-neutral-800"
                      aria-label={t('common:actions.close', { defaultValue: 'Close' })}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <FilterSidebar
                    filters={filterGroups}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    resultCount={filteredPolicies.length}
                    isMobile
                  />

                  <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleClearFilters();
                        setIsMobileFiltersOpen(false);
                      }}
                      className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary-400 hover:text-primary-700"
                    >
                      {t('repo:filters.clear', { defaultValue: 'Clear all' })}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
                    >
                      {t('repo:filters.apply', { defaultValue: 'Apply' })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
