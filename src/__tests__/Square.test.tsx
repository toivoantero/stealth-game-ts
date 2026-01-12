import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Square from '../Square';
import character from './kuvat/character.png';
import userEvent from '@testing-library/user-event';

test('Square shows the character image', () => {
  render(<Square
    indicesOfShadows={{}}
    value={character}
    index={0}
    onSquareClick={() => {}}
    characterNearGoal={false}
    spotlight={[]}
    characterDirection="scaleX(1)"
  />);
  expect(screen.getAllByAltText('content').length).toBeGreaterThan(0);
});

test('Square calls onSquareClick when the square is clicked', async () => {
  const handleClick = jest.fn();
  render(<Square
    indicesOfShadows={{}}
    value={character}
    index={0}
    onSquareClick={handleClick}
    characterNearGoal={false}
    spotlight={[]}
    characterDirection="scaleX(1)"
  />);
  await userEvent.click(screen.getByTestId('character'));
  expect(handleClick).toHaveBeenCalled();
});
