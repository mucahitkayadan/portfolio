import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-hot-toast', () => ({
  Toaster: () => null,
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('../components/canvas/Earth', () => ({
  default: () => <div data-testid="earth-canvas" />,
}));

import Contact from '../components/Contact';

describe('Contact', () => {
  it('requires all fields before submitting', async () => {
    const { toast } = await import('react-hot-toast');

    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(toast.error).toHaveBeenCalled();
  });
});
