import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('renders navigation links with href anchors', () => {
    render(<Navbar />);

    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks[0]).toHaveAttribute('href', '#about');

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    expect(contactLinks[0]).toHaveAttribute('href', '#contact');

    expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument();
  });
});
