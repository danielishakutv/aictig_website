import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryFlag from '../components/CountryFlag';
import Tag from '../components/Tag';
import PolicyCard from '../components/PolicyCard';
import { TextSkeleton } from '../components/Skeleton';
import type { Policy } from '../types';

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['repo', 'common']);
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [relatedPolicies, setRelatedPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/policies.json')
      .then((r) => r.json())
      .then((data: Policy[]) => {
        const found = data.find((p) => p.id === id);
        setPolicy(found || null);

        // Find related policies (same country or themes)
        if (found) {
          const related = data
            .filter(
              (p) =>
                p.id !== found.id &&
                (p.countryCode === found.countryCode ||
                  p.themes.some((theme) => found.themes.includes(theme)))
            )
            .slice(0, 3);
          setRelatedPolicies(related);
        }
      })
      .catch((err) => console.error('Failed to fetch policy:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom">
          <TextSkeleton lines={10} />
        </div>
      </main>
    );
  }

  if (!policy) {
    return (
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom text-center">
          <DocumentTextIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {t('common:notFound')}
          </h1>
          <p className="text-neutral-600 mb-6">
            The policy you're looking for doesn't exist.
          </p>
          <Link to="/repository" className="btn-primary">
            {t('common:backToRepository')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Seo
        title={policy.title}
        description={policy.summary}
        image={`/api/og-image?title=${encodeURIComponent(policy.title)}`}
      />
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom">
          <Breadcrumbs />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-md p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CountryFlag countryCode={policy.countryCode} size="lg" />
                    <div>
                      <p className="text-sm text-neutral-600">{policy.country}</p>
                      <p className="text-xs text-neutral-500">{policy.region}</p>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                    {policy.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {policy.themes.map((theme) => (
                      <Tag key={theme} variant="primary">
                        {theme}
                      </Tag>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    {t('repo:detail.summary')}
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">{policy.summary}</p>
                </section>

                {/* Key points */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    {t('repo:detail.keyPoints')}
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700">
                    <li>Establishes regulatory framework for {policy.type.toLowerCase()}</li>
                    <li>Addresses {policy.themes.join(', ').toLowerCase()} concerns</li>
                    <li>
                      Available in {policy.languages.length} language
                      {policy.languages.length > 1 ? 's' : ''}
                    </li>
                    <li>Published in {policy.year}</li>
                  </ul>
                </section>

                {/* Tags */}
                {policy.tags.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                      {t('repo:detail.tags')}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {policy.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  {t('repo:detail.metadata')}
                </h2>

                {/* Download button */}
                <a
                  href={policy.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full mb-6"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  {t('repo:detail.downloadPdf')}
                </a>

                {/* Metadata */}
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="flex items-center gap-2 text-neutral-600 mb-1">
                      <CalendarIcon className="w-4 h-4" />
                      {t('repo:detail.year')}
                    </dt>
                    <dd className="font-medium text-neutral-900">{policy.year}</dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-2 text-neutral-600 mb-1">
                      <DocumentTextIcon className="w-4 h-4" />
                      {t('repo:detail.type')}
                    </dt>
                    <dd className="font-medium text-neutral-900">{policy.type}</dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-2 text-neutral-600 mb-1">
                      <GlobeAltIcon className="w-4 h-4" />
                      {t('repo:detail.languages')}
                    </dt>
                    <dd className="font-medium text-neutral-900">
                      {policy.languages.map((lang) => lang.toUpperCase()).join(', ')}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-2 text-neutral-600 mb-1">
                      <TagIcon className="w-4 h-4" />
                      {t('repo:detail.themes')}
                    </dt>
                    <dd className="space-y-1">
                      {policy.themes.map((theme) => (
                        <div key={theme} className="text-neutral-900">
                          {theme}
                        </div>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Related policies */}
          {relatedPolicies.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {t('repo:detail.relatedDocuments')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPolicies.map((relatedPolicy) => (
                  <PolicyCard key={relatedPolicy.id} policy={relatedPolicy} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
