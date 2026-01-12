import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Level from '../Level';

test('The level is shown in the beginning', () => {
  render(
    <MemoryRouter>
      <Level />
    </MemoryRouter>
  );
  expect(screen.getByTestId('boardgrid')).toBeInTheDocument();
});
