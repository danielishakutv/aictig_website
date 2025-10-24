import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  it('renders current page and total pages', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('enables both buttons on middle page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
    const prevButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('calls onPageChange with correct page when clicking next', () => {
    let page = 1;
    const handlePageChange = (newPage: number) => {
      page = newPage;
    };
    render(
      <Pagination currentPage={page} totalPages={5} onPageChange={handlePageChange} />
    );
    
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);
    
    expect(page).toBe(2);
  });

  it('calls onPageChange with correct page when clicking previous', () => {
    let page = 3;
    const handlePageChange = (newPage: number) => {
      page = newPage;
    };
    render(
      <Pagination currentPage={page} totalPages={5} onPageChange={handlePageChange} />
    );
    
    const prevButton = screen.getByLabelText('Previous page');
    fireEvent.click(prevButton);
    
    expect(page).toBe(2);
  });

  it('highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
    const currentPageButton = screen.getByRole('button', { name: 'Page 3 (current)' });
    expect(currentPageButton).toHaveClass('bg-primary-600');
  });

  it('renders ellipsis for large page counts', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });
});
