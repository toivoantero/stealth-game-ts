import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Square from './Square';
import character from './kuvat/character.png';

test('asettaa oikean taustavärin kun value on character', () => {
  const { container } = render(
    <Square
      indicesOfShadows={{}}
      value={character}
      index={0}
      onSquareClick={() => {}}
      characterNearGoal={false}
      spotlight={[]}
      characterDirection=""
    />
  );

  const squareDiv = container.querySelector('.square');
  expect(squareDiv).toHaveStyle('background-color: rgba(217, 255, 0, 0.7)');
});
