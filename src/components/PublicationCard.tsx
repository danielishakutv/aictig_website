import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Tag from './Tag';
import { Publication } from '../types';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const { t } = useTranslation('pubs');
  
  return (
    <article className="card overflow-hidden">
      <div className="aspect-video bg-neutral-200 relative">
        <img
          src={publication.cover}
          alt={`Cover image for ${publication.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="400"
          height="225"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E2E8F0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%23475569" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute top-3 right-3">
          <Tag label={publication.type} variant="primary" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-2">
          {publication.title}
        </h3>
        
        <p className="text-sm text-neutral-600 mb-2">
          {publication.authors.join(', ')} • {publication.year}
        </p>
        
        <p className="text-sm text-neutral-700 line-clamp-3 mb-4">{publication.abstract}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="default" size="sm" />
          ))}
        </div>
        
        <div className="flex space-x-2 pt-4 border-t border-neutral-200">
          <Link
            to={`/publications/${publication.id}`}
            className="flex-1 btn-secondary text-center"
          >
            {t('card.readMore')}
          </Link>
          <button
            disabled
            className="btn-secondary inline-flex items-center cursor-not-allowed opacity-50"
            title="Download functionality coming soon"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
            {t('card.download')}
          </button>
        </div>
      </div>
    </article>
  );
}
