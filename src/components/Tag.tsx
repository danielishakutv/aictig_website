interface TagProps {
  label?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'warning';
  size?: 'sm' | 'md';
}

export default function Tag({ label, children, variant = 'default', size = 'sm' }: TagProps) {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-800',
    primary: 'bg-primary-100 text-primary-800',
    accent: 'bg-accent-100 text-accent-800',
    warning: 'bg-warning-100 text-warning-800',
  };
  
  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {children || label}
    </span>
  );
}
