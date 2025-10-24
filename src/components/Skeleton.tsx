interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({ 
  variant = 'text', 
  width, 
  height, 
  className = '' 
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-neutral-200';
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  const formatSize = (size: string | number | undefined, defaultValue: string) => {
    if (typeof size === 'number') return `${size}px`;
    return size || defaultValue;
  };
  
  const style = {
    width: formatSize(width, variant === 'circular' ? '40px' : '100%'),
    height: formatSize(height, variant === 'circular' ? '40px' : variant === 'text' ? '1rem' : '200px'),
  };
  
  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={style} />;
}

// Named exports
export function CardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <Skeleton variant="rectangular" height="160px" />
      <Skeleton width="60%" />
      <Skeleton width="40%" />
      <div className="space-y-2">
        <Skeleton />
        <Skeleton width="90%" />
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? '70%' : '100%'} />
      ))}
    </div>
  );
}

// Legacy named exports for backward compatibility
export const SkeletonCard = CardSkeleton;
export const SkeletonText = TextSkeleton;
