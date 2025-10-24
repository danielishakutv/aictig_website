import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tag from '../components/Tag';

describe('Tag Component', () => {
  it('renders with default variant', () => {
    render(<Tag label="Test Tag" />);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('renders with primary variant', () => {
    render(<Tag label="Primary" variant="primary" />);
    const tag = screen.getByText('Primary');
    expect(tag).toHaveClass('bg-primary-100');
  });

  it('renders with accent variant', () => {
    render(<Tag label="Accent" variant="accent" />);
    const tag = screen.getByText('Accent');
    expect(tag).toHaveClass('bg-accent-100');
  });

  it('renders with warning variant', () => {
    render(<Tag label="Warning" variant="warning" />);
    const tag = screen.getByText('Warning');
    expect(tag).toHaveClass('bg-warning-100');
  });

  it('renders with small size', () => {
    render(<Tag label="Small" size="sm" />);
    const tag = screen.getByText('Small');
    expect(tag).toHaveClass('text-xs');
  });

  it('renders with medium size', () => {
    render(<Tag label="Medium" size="md" />);
    const tag = screen.getByText('Medium');
    expect(tag).toHaveClass('text-sm');
  });
});
