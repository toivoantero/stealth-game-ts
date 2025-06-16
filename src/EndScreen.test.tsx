import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import EndScreen from './EndScreen';

jest.useFakeTimers();

test('EndScreen näyttää napin 3 sekunnin jälkeen', () => {
  render(
    <MemoryRouter>
      <EndScreen />
    </MemoryRouter>
  );
  expect(screen.queryByText(/uusi peli/i)).not.toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(screen.getAllByText(/uusi peli/i).length).toBeGreaterThan(0);
});