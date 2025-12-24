import { useTranslation } from 'react-i18next';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    
    return pages;
  };
  
  const startItem = (currentPage - 1) * (itemsPerPage || 0) + 1;
  const endItem = Math.min(currentPage * (itemsPerPage || 0), totalItems || 0);
  
  if (totalPages <= 1) return null;
  
  return (
    <nav
      className="flex flex-col gap-4 border-t border-neutral-200 px-4 sm:px-0 pt-4"
      aria-label="Pagination"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary-300 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
          >
            {isRTL ? (
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            )}
            {t('actions.previous')}
          </button>

          <div className="hidden md:flex items-center gap-2">
            {getPageNumbers().map((page, index) => (
              <span key={index}>
                {page === '...' ? (
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-500">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition focus-ring ${
                      currentPage === page
                        ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </span>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary-300 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
          >
            {t('actions.next')}
            {isRTL ? (
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {itemsPerPage && totalItems && (
          <div className="text-sm text-neutral-700 md:ml-4">
            {t('pagination.showing')} {startItem}-{endItem} {t('pagination.of')} {totalItems} {t('pagination.results')}
          </div>
        )}
      </div>
    </nav>
  );
}
