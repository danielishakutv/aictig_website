import { Link } from 'react-router-dom';
import Tag from './Tag';
import { Publication } from '../types';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Link
      to={`/publications/${publication.slug}`}
      className="card overflow-hidden hover:shadow-xl transition-shadow block"
    >
      <article>
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

          <p className="text-sm text-neutral-600">
            {publication.authors.join(', ')} &bull; {publication.year}
          </p>
        </div>
      </article>
    </Link>
  );
}
