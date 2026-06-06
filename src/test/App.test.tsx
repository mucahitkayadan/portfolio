import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from '../App';

vi.mock('../components/canvas/Computers', () => ({
  default: () => <div data-testid="computers-canvas" />,
}));

vi.mock('../components/canvas/Stars', () => ({
  default: () => <div data-testid="stars-canvas" />,
}));

vi.mock('../components/canvas/Earth', () => ({
  default: () => <div data-testid="earth-canvas" />,
}));

vi.mock('../components/ChatBot', () => ({
  default: () => <div data-testid="chatbot" />,
}));

describe('App', () => {
  it('renders navbar and hero content', () => {
    render(<App />);

    expect(screen.getByText(/Muja Kayadan/)).toBeInTheDocument();
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to content/i })).toBeInTheDocument();
  });
});
