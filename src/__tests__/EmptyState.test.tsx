import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../components/EmptyState';

describe('EmptyState Component', () => {
  it('renders title and description', () => {
    render(
      <EmptyState
        title="No results"
        description="Try adjusting your filters"
      />
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('renders without action button when not provided', () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here"
      />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here"
        actionLabel="Reload"
        onAction={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(
      <EmptyState
        title="Empty"
        description="Nothing here"
        icon={CustomIcon}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders default icon when not provided', () => {
    const { container } = render(
      <EmptyState
        title="Empty"
        description="Nothing here"
      />
    );
    // Check for InboxIcon class
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
