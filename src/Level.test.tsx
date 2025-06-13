import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Level from './Level';

test('renders level', () => {
  render(
    <MemoryRouter>
      <Level />
    </MemoryRouter>
  );

  // Tarkista, että jokin elementti renderöityy oikein
expect(screen.getAllByRole("img", { name: /co|content/i }).length).toBeGreaterThan(0);
});
