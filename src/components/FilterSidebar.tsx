import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string) => void;
  onClearFilters: () => void;
  resultCount?: number;
  isMobile?: boolean;
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  resultCount,
  isMobile = false,
}: FilterSidebarProps) {
  const hasActiveFilters = Object.values(activeFilters).some((values) => values.length > 0);

  const containerClasses = isMobile
    ? 'bg-white rounded-lg shadow-lg p-4 max-h-[70vh] overflow-y-auto'
    : 'bg-white rounded-lg shadow-md p-6 sticky top-24';

  return (
    <aside className={containerClasses}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-neutral-600" />
          <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Result count */}
      {resultCount !== undefined && (
        <div className="mb-4 text-sm text-neutral-600">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </div>
      )}

      {/* Filter groups */}
      <div className="space-y-4">
        {filters.map((filterGroup) => (
          <Disclosure key={filterGroup.id} defaultOpen>
            {({ open }: { open: boolean }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between text-left">
                  <span className="text-sm font-medium text-neutral-900">
                    {filterGroup.label}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-neutral-500 transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </Disclosure.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="mt-3 space-y-2">
                    {filterGroup.options.map((option) => {
                      const isActive = activeFilters[filterGroup.id]?.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => onFilterChange(filterGroup.id, option.value)}
                            className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-neutral-700 group-hover:text-neutral-900 flex-1">
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="text-xs text-neutral-500">({option.count})</span>
                          )}
                        </label>
                      );
                    })}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-900 mb-3">Active filters</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([filterId, values]) =>
              values.map((value) => {
                const filterGroup = filters.find((f) => f.id === filterId);
                const option = filterGroup?.options.find((o) => o.value === value);
                if (!option) return null;
                return (
                  <button
                    key={`${filterId}-${value}`}
                    onClick={() => onFilterChange(filterId, value)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full hover:bg-primary-100 transition-colors"
                  >
                    <span>{option.label}</span>
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
