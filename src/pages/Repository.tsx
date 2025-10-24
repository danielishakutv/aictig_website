import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Seo from '../components/Seo';
import FilterSidebar from '../components/FilterSidebar';
import PolicyCard from '../components/PolicyCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';
import type { Policy, Country, Theme } from '../types';

const ITEMS_PER_PAGE = 9;

export default function Repository() {
  const { t } = useTranslation(['repo', 'common']);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    country: [],
    sector: [],
    year: [],
    language: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  useEffect(() => {
    Promise.all([
      fetch('/data/policies.json').then((r) => r.json()),
      fetch('/data/countries.json').then((r) => r.json()),
      fetch('/data/themes.json').then((r) => r.json()),
    ])
      .then(([policiesData, countriesData, themesData]) => {
        setPolicies(policiesData);
        setCountries(countriesData);
        setThemes(themesData);
      })
      .catch((err) => console.error('Failed to fetch data:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter policies
  const filteredPolicies = useMemo(() => {
    let filtered = policies;

    // Search filter
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

    // Country filter
    if (activeFilters.country.length > 0) {
      filtered = filtered.filter((policy) =>
        activeFilters.country.includes(policy.countryCode)
      );
    }

    // Sector filter (themes)
    if (activeFilters.sector.length > 0) {
      filtered = filtered.filter((policy) =>
        policy.themes.some((theme) => activeFilters.sector.includes(theme))
      );
    }

    // Year filter
    if (activeFilters.year.length > 0) {
      filtered = filtered.filter((policy) =>
        activeFilters.year.includes(policy.year.toString())
      );
    }

    // Language filter
    if (activeFilters.language.length > 0) {
      filtered = filtered.filter((policy) =>
        policy.languages.some((lang) => activeFilters.language.includes(lang))
      );
    }

    return filtered;
  }, [policies, searchQuery, activeFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE);
  const paginatedPolicies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPolicies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPolicies, currentPage]);

  // Build filter options
  const filterGroups = useMemo(() => {
    if (loading) return [];

    // Get unique years and sort descending
    const years = Array.from(new Set(policies.map((p) => p.year)))
      .sort((a, b) => b - a)
      .map((year) => ({
        label: year.toString(),
        value: year.toString(),
        count: policies.filter((p) => p.year === year).length,
      }));

    // Get unique languages
    const languagesSet = new Set<string>();
    policies.forEach((p) => p.languages.forEach((lang) => languagesSet.add(lang)));
    const languages = Array.from(languagesSet)
      .sort()
      .map((lang) => ({
        label: lang.toUpperCase(),
        value: lang,
        count: policies.filter((p) => p.languages.includes(lang)).length,
      }));

    return [
      {
        id: 'country',
        label: t('repo:filters.country'),
        options: countries.map((country) => ({
          label: country.name,
          value: country.iso2,
          count: policies.filter((p) => p.countryCode === country.iso2).length,
        })),
      },
      {
        id: 'sector',
        label: t('repo:filters.sector'),
        options: themes.map((theme) => ({
          label: theme.label,
          value: theme.id,
          count: policies.filter((p) => p.themes.includes(theme.id)).length,
        })),
      },
      {
        id: 'year',
        label: t('repo:filters.year'),
        options: years,
      },
      {
        id: 'language',
        label: t('repo:filters.language'),
        options: languages,
      },
    ];
  }, [policies, countries, themes, loading, t]);

  // Handle filter change
  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      const isActive = current.includes(value);
      return {
        ...prev,
        [filterId]: isActive
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
    setCurrentPage(1); // Reset to first page
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({
      country: [],
      sector: [],
      year: [],
      language: [],
    });
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <>
      <Seo
        title={t('repo:meta.title')}
        description={t('repo:meta.description')}
      />
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              {t('repo:title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl">
              {t('repo:subtitle')}
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl">
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

          {/* Layout with sidebar and content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
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

            {/* Content */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  {/* Results grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedPolicies.map((policy) => (
                      <PolicyCard key={policy.id} policy={policy} />
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
          </div>
        </div>
      </main>
    </>
  );
}
