import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Skeleton, { CardSkeleton, TextSkeleton } from '../components/Skeleton';

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('renders text variant by default', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('renders circular variant', () => {
      const { container } = render(<Skeleton variant="circular" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('rounded-full');
    });

    it('renders rectangular variant', () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('rounded-lg');
    });

    it('applies custom width and height', () => {
      const { container } = render(<Skeleton width={200} height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe('200px');
      expect(skeleton.style.height).toBe('100px');
    });
  });

  describe('CardSkeleton', () => {
    it('renders card skeleton structure', () => {
      const { container } = render(<CardSkeleton />);
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('TextSkeleton', () => {
    it('renders default 3 lines', () => {
      const { container } = render(<TextSkeleton />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(3);
    });

    it('renders custom number of lines', () => {
      const { container } = render(<TextSkeleton lines={5} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(5);
    });

    it('renders specified number of lines', () => {
      const { container } = render(<TextSkeleton lines={10} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(10);
    });
  });
});
