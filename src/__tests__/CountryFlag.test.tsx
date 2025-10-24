import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountryFlag from '../components/CountryFlag';

describe('CountryFlag Component', () => {
  it('renders flag for valid ISO2 code', () => {
    render(<CountryFlag countryCode="KE" />);
    expect(screen.getByText('🇰🇪')).toBeInTheDocument();
  });

  it('renders Nigeria flag', () => {
    render(<CountryFlag countryCode="NG" />);
    expect(screen.getByText('🇳🇬')).toBeInTheDocument();
  });

  it('renders South Africa flag', () => {
    render(<CountryFlag countryCode="ZA" />);
    expect(screen.getByText('🇿🇦')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<CountryFlag countryCode="GH" size="sm" />);
    const span = container.querySelector('span');
    expect(span).toHaveClass('text-base');
  });

  it('renders with medium size', () => {
    const { container } = render(<CountryFlag countryCode="GH" size="md" />);
    const span = container.querySelector('span');
    expect(span).toHaveClass('text-2xl');
  });

  it('renders with large size', () => {
    const { container } = render(<CountryFlag countryCode="GH" size="lg" />);
    const span = container.querySelector('span');
    expect(span).toHaveClass('text-4xl');
  });

  it('handles lowercase country codes', () => {
    render(<CountryFlag countryCode="et" />);
    expect(screen.getByText('🇪🇹')).toBeInTheDocument();
  });
});
