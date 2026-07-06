import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  test('renders hero and search input', () => {
    render(<Home />);
    expect(screen.getByText(/Find your next favorite book/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search for a book, author, or genre/i)).toBeInTheDocument();
  });

  test('shows suggestion when typing a matching query', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Search for a book, author, or genre/i);
    fireEvent.change(input, { target: { value: 'atomic' } });
    const matches = screen.getAllByText(/Atomic Habits/i);
    // ensure a suggestion result exists (one match is the card, one is the suggestion)
    const hasSuggestion = matches.some((node) =>
      node.className && String(node.className).includes('suggestionTitle')
    );
    expect(hasSuggestion).toBe(true);
  });
});
