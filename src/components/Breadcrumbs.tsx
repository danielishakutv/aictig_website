import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from URL if items not provided
  const breadcrumbs = items || (() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: index < pathSegments.length - 1 ? `/${pathSegments.slice(0, index + 1).join('/')}` : undefined,
    }));
  })();
  
  if (breadcrumbs.length === 0) return null;
  
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            to="/"
            className="text-neutral-500 hover:text-neutral-700 focus-ring rounded"
            aria-label="Home"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRightIcon className="h-4 w-4 text-neutral-400" aria-hidden="true" />
            {item.href && index < breadcrumbs.length - 1 ? (
              <Link
                to={item.href}
                className="text-neutral-500 hover:text-neutral-700 focus-ring rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-900 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
