import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  onAction?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ 
  title, 
  description, 
  icon: Icon, 
  actionLabel,
  onAction,
  action 
}: EmptyStateProps) {
  const { t } = useTranslation('common');
  
  // Support both new props and old action object
  const finalAction = action || (actionLabel && onAction ? { label: actionLabel, onClick: onAction } : undefined);
  
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className="h-12 w-12 text-neutral-400" />
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-neutral-900">
        {title || t('errors.noResults')}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
      {finalAction && (
        <div className="mt-6">
          <button onClick={finalAction.onClick} className="btn-primary">
            {finalAction.label}
          </button>
        </div>
      )}
    </div>
  );
}
