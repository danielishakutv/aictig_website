import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CalendarIcon,
  ShareIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import Tag from '../components/Tag';
import { useToast } from '../context/UiContext';
import { TextSkeleton } from '../components/Skeleton';
import { fetchNewsArticleBySlug, fetchNewsArticles } from '../utils/graphql';
import type { NewsArticle } from '../types';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(['news', 'common']);
  const { showToast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Fetch the single article and related articles in parallel
    Promise.all([
      fetchNewsArticleBySlug(slug),
      fetchNewsArticles(),
    ])
      .then(([found, allArticles]) => {
        setArticle(found);

        // Find related articles by tags
        if (found) {
          const related = allArticles
            .filter(
              (a) =>
                a.slug !== found.slug &&
                a.tags.some((tag) => found.tags.includes(tag))
            )
            .slice(0, 3);
          setRelatedArticles(related);
        }
      })
      .catch((err) => console.error('Failed to fetch article:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(t('news:shareCopied'), 'success');
    }
  };

  if (loading) {
    return (
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom max-w-4xl">
          <TextSkeleton lines={15} />
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {t('common:notFound')}
          </h1>
          <p className="text-neutral-600 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/news" className="btn-primary">
            {t('common:backToNews')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        image={article.image}
      />
      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />

          {/* Back button */}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 mt-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t('news:backToNews')}
          </Link>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Featured image */}
            <div className="aspect-[21/9] overflow-hidden bg-neutral-200">
              <img
                src={article.image}
                alt={`Featured image for ${article.title}`}
                loading="eager"
                decoding="async"
                width="1200"
                height="514"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-6">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <time dateTime={article.date}>
                    {dayjs(article.date).format('MMMM D, YYYY')}
                  </time>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  <ShareIcon className="w-4 h-4" />
                  {t('news:share')}
                </button>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-neutral-900 mb-6">
                {article.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <Tag key={tag} variant="primary">
                    {tag}
                  </Tag>
                ))}
              </div>

              {/* Excerpt */}
              <p className="text-xl text-neutral-700 leading-relaxed mb-8 font-medium">
                {article.excerpt}
              </p>

              {/* Body */}
              <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
                {article.body.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {t('news:relatedArticles')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <article
                    key={relatedArticle.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <Link to={`/news/${relatedArticle.slug}`}>
                      <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
                        <img
                          src={relatedArticle.image}
                          alt={`Related article: ${relatedArticle.title}`}
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="225"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={`/news/${relatedArticle.slug}`}>
                        <h3 className="font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
