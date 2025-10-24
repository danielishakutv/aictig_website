// Get country flag emoji from ISO2 code
export function getCountryFlag(iso2: string): string {
  if (!iso2 || iso2.length !== 2) return '🌍';
  
  const codePoints = iso2
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
}

interface CountryFlagProps {
  countryCode: string;
  countryName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountryFlag({ countryCode, countryName, size = 'md' }: CountryFlagProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  return (
    <span
      className={`inline-block ${sizeClasses[size]}`}
      role="img"
      aria-label={countryName || countryCode}
      title={countryName || countryCode}
    >
      {getCountryFlag(countryCode)}
    </span>
  );
}
