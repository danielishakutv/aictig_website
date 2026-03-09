import { Link } from 'react-router-dom';
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';
import Tag from './Tag';
import CountryFlag from './CountryFlag';
import { Policy } from '../types';

interface PolicyCardProps {
  policy: Policy;
}

export default function PolicyCard({ policy }: PolicyCardProps) {
  return (
    <article className="card p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <CountryFlag countryCode={policy.countryCode} countryName={policy.country} />
          <div>
            <h3 className="font-semibold text-neutral-900 line-clamp-2">
              <Link
                to={`/repository/${policy.id}`}
                className="hover:text-primary-600 focus-ring rounded"
              >
                {policy.title}
              </Link>
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              {policy.country} • {policy.year}
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-neutral-700 line-clamp-3 mb-4">{policy.summary}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {policy.themes.slice(0, 3).map((theme) => (
          <Tag key={theme} label={theme} variant="primary" />
        ))}
        {policy.themes.length > 3 && (
          <Tag label={`+${policy.themes.length - 3}`} variant="default" />
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <Tag label={policy.type} variant="default" size="sm" />
          <span>•</span>
          <span>{policy.languages.join(', ').toUpperCase()}</span>
        </div>
        <div className="flex space-x-2">
          {policy.fileUrl && (
            <a
              href={policy.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium focus-ring rounded px-2 py-1"
              title="Preview document"
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              Preview
            </a>
          )}
          {policy.fileUrl && (
            <a
              href={policy.fileUrl}
              download
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium px-2 py-1"
              title="Download document"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
              PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
