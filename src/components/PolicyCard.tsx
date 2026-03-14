import { Link } from 'react-router-dom';
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';
import Tag from './Tag';
import CountryFlag from './CountryFlag';
import { Policy } from '../types';
import { trackDownload, trackPreview } from '../utils/analytics';

interface PolicyCardProps {
  policy: Policy;
  variant?: 'grid' | 'list';
}

export default function PolicyCard({ policy, variant = 'grid' }: PolicyCardProps) {
  if (variant === 'list') {
    return (
      <article className="card flex flex-col sm:flex-row sm:items-center gap-4 p-4 overflow-hidden">
        {/* Left: flag + title block */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <CountryFlag countryCode={policy.countryCode} countryName={policy.country} />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-neutral-900 text-sm leading-snug">
              <Link
                to={`/repository/${policy.id}`}
                className="hover:text-primary-600 focus-ring rounded"
              >
                {policy.title}
              </Link>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5 truncate">
              {policy.organization || policy.country} &bull; {policy.year}
            </p>
          </div>
        </div>

        {/* Center: theme tags */}
        <div className="hidden md:flex flex-wrap gap-1.5 shrink-0">
          {policy.themes.slice(0, 2).map((theme) => (
            <Tag key={theme} label={theme} variant="primary" size="sm" />
          ))}
          {policy.themes.length > 2 && (
            <Tag label={`+${policy.themes.length - 2}`} variant="default" size="sm" />
          )}
        </div>

        {/* Right: metadata + actions */}
        <div className="flex items-center gap-3 flex-shrink-0 sm:ml-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Tag label={policy.type} variant="default" size="sm" />
            <span className="text-neutral-300">&middot;</span>
            <span className="uppercase">{policy.languages.join(', ')}</span>
          </div>
          {policy.fileUrl && (
            <div className="flex items-center gap-1">
              <a
                href={policy.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 rounded px-1.5 py-1 hover:bg-primary-50 transition-colors"
                title="Preview document"
                onClick={() => trackPreview(policy.title)}
              >
                <EyeIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </a>
              <a
                href={policy.fileUrl}
                download
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 rounded px-1.5 py-1 hover:bg-primary-50 transition-colors"
                title="Download PDF"
                onClick={() => trackDownload(policy.title, policy.fileUrl)}
              >
                <ArrowDownTrayIcon className="h-3.5 w-3.5" />
                <span>PDF</span>
              </a>
            </div>
          )}
        </div>
      </article>
    );
  }

  // Grid variant (default)
  return (
    <article className="card flex flex-col h-full overflow-hidden">
      {/* Header: flag + title + subtitle */}
      <div className="flex items-start gap-3 p-5 pb-0">
        <CountryFlag countryCode={policy.countryCode} countryName={policy.country} />
        <div className="min-w-0">
          <h3 className="font-semibold text-neutral-900 line-clamp-2 text-sm leading-snug">
            <Link
              to={`/repository/${policy.id}`}
              className="hover:text-primary-600 focus-ring rounded"
            >
              {policy.title}
            </Link>
          </h3>
          <p className="text-xs text-neutral-500 mt-1 truncate">
            {policy.organization || policy.country} &bull; {policy.year}
          </p>
        </div>
      </div>

      {/* Body: summary + theme tags — grows to fill available space */}
      <div className="flex-1 px-5 pt-3">
        {policy.summary && (
          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">{policy.summary}</p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {policy.themes.slice(0, 2).map((theme) => (
            <Tag key={theme} label={theme} variant="primary" size="sm" />
          ))}
          {policy.themes.length > 2 && (
            <Tag label={`+${policy.themes.length - 2}`} variant="default" size="sm" />
          )}
        </div>
      </div>

      {/* Footer: metadata + actions — always pinned to bottom */}
      <div className="mt-auto border-t border-neutral-100 px-5 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 min-w-0">
            <Tag label={policy.type} variant="default" size="sm" />
            <span className="text-neutral-300">&middot;</span>
            <span className="uppercase truncate">{policy.languages.join(', ')}</span>
          </div>
          {policy.fileUrl && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <a
                href={policy.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 rounded px-1.5 py-1 hover:bg-primary-50 transition-colors"
                title="Preview document"
                onClick={() => trackPreview(policy.title)}
              >
                <EyeIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </a>
              <a
                href={policy.fileUrl}
                download
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 rounded px-1.5 py-1 hover:bg-primary-50 transition-colors"
                title="Download PDF"
                onClick={() => trackDownload(policy.title, policy.fileUrl)}
              >
                <ArrowDownTrayIcon className="h-3.5 w-3.5" />
                <span>PDF</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
