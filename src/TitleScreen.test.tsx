import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import TitleScreen from './TitleScreen';

test('TitleScreen renderöi logot ja napit', () => {
  render(
    <MemoryRouter>
      <TitleScreen />
    </MemoryRouter>
  );
  expect(screen.getAllByAltText('Logo').length).toBeGreaterThan(0);
  expect(screen.getByText(/aloittaaksesi pelin/i)).toBeInTheDocument();
});