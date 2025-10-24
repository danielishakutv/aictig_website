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
      className="flex items-center justify-between border-t border-neutral-200 px-4 sm:px-0 py-4"
      aria-label="Pagination"
    >
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
        >
          {isRTL ? (
            <ChevronRightIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          )}
          {t('actions.previous')}
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {getPageNumbers().map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-neutral-500">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium focus-ring ${
                  currentPage === page
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </span>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
        >
          {t('actions.next')}
          {isRTL ? (
            <ChevronLeftIcon className="ml-3 h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {itemsPerPage && totalItems && (
        <div className="text-sm text-neutral-700 mt-4 md:mt-0 md:ml-4">
          {t('pagination.showing')} {startItem}-{endItem} {t('pagination.of')} {totalItems} {t('pagination.results')}
        </div>
      )}
    </nav>
  );
}
