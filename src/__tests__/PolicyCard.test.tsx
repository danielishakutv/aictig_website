import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import type { Policy } from '../types';

const mockPolicy: Policy = {
  id: 'test-1',
  title: 'Cybersecurity Act 2023',
  country: 'Kenya',
  countryCode: 'KE',
  region: 'East Africa',
  year: 2023,
  type: 'Policy',
  languages: ['en', 'sw'],
  summary: 'A comprehensive cybersecurity policy for Kenya',
  themes: ['Data Protection', 'Cyber Crime'],
  fileUrl: '/files/test.pdf',
  tags: ['cybersecurity', 'data-protection'],
};

describe('PolicyCard Component', () => {
  it('renders policy title', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    expect(screen.getByText('Cybersecurity Act 2023')).toBeInTheDocument();
  });

  it('renders policy country', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    expect(screen.getByText('Kenya')).toBeInTheDocument();
  });

  it('renders policy year', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('renders policy summary', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    expect(
      screen.getByText('A comprehensive cybersecurity policy for Kenya')
    ).toBeInTheDocument();
  });

  it('renders download link', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href', '/files/test.pdf');
  });

  it('renders country flag', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    expect(screen.getByText('🇰🇪')).toBeInTheDocument();
  });

  it('renders themes as tags', () => {
    render(
      <BrowserRouter>
        <PolicyCard policy={mockPolicy} />
      </BrowserRouter>
    );
    expect(screen.getByText('Data Protection')).toBeInTheDocument();
    expect(screen.getByText('Cyber Crime')).toBeInTheDocument();
  });
});
