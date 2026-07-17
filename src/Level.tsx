import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlarmSound } from './hooks/useAlarmSound';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import Square from './Square';
import './css/styles.css'
import character from './kuvat/character.png';
import spiderweb from './kuvat/spiderweb.png';
import obstacle from './kuvat/laatikko.png';
import stairs from './kuvat/portaat.png';
import lamp from './kuvat/lamppu.png'
import lamp_bg from './kuvat/lamppu_tausta.png'

function Level() {
  const { playAlarm, stopAlarm } = useAlarmSound();

  const {
    setVolume,
    fadeOut
  } = useBackgroundMusic('/stealth.wav');

  const light = 'rgba(255,255,190,1';
  const levelSize = 10;
  const startSquare = 51;
  const goalSquare = 48;
  const obstacleLocations = [33, 52, 65, 66];
  const shadowLocations = {
    32: "west",
    51: "west",
    64: "west",
    74: "southwest",
    75: "southwest",
    76: "south"
  };
  const lampLocation = { upLeft: 17, upRight: 18, downLeft: 27, downRight: 28 };
  const [characterDirection, setCharacterDirection] = useState('right');
  const [squares, setSquares] = useState(Array(levelSize * levelSize).fill(null));
  const [currentLocation, setCurrentLocation] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState<number | null>(1);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const navigate = useNavigate();

  const spotlight = currentSpotlightIndex === null
    ? [null, null, null, null]
    : Array.from({ length: 4 }, (_, idx) => (idx === currentSpotlightIndex ? light : null));

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameOver || currentLocation === null) return;
    let nextLocation: number = 0;
    if (event.key === 'ArrowUp') {
      nextLocation = currentLocation - levelSize;
    } else if (event.key === 'ArrowDown') {
      nextLocation = currentLocation + levelSize;
    } else if (event.key === 'ArrowLeft') {
      nextLocation = currentLocation - 1;
      setCharacterDirection('scaleX(-1)');
    } else if (event.key === 'ArrowRight') {
      nextLocation = currentLocation + 1;
      setCharacterDirection('scaleX(1)');
    }
    updateLevel(nextLocation);
  }, [gameOver, currentLocation]);

  function handleClick(input: number) {
    if (gameOver || currentLocation === null) return;

    if (input === currentLocation - 1) {
      setCharacterDirection('scaleX(-1)');
    } else if (input === currentLocation + 1) {
      setCharacterDirection('scaleX(1)');
    }

    updateLevel(input);
  }

  function initializeLevel() {
    const initialSquares = Array(levelSize * levelSize).fill(null);

    const indicesSpiderweb = [
      ...Array.from({ length: 20 }, (_, i) => i),
      ...Array.from({ length: 20 }, (_, i) => 80 + i)
    ];
    indicesSpiderweb.forEach(index => {
      initialSquares[index] = spiderweb;
    });

    obstacleLocations.forEach(index => {
      initialSquares[index] = obstacle;
    });

    paintRadius(initialSquares, startSquare);
    initialSquares[goalSquare] = stairs;
    initialSquares[startSquare] = character;

    setSquares(initialSquares);
    setCurrentLocation(startSquare);
    setCurrentSpotlightIndex(null);
    setGameOver(false);
    setLevelCompleted(false);

    setVolume(0.5);

    stopAlarm();
  }

  // Päivittää pelilaudan sisällön, vaikkapa hahmon sijainnin
  function updateLevel(nextLocation: number): void {
    if (gameOver || currentLocation === null) return;

    const nextSquares = squares.slice().map((value: string | number | null) => value === 'moveRadius' ? null : value);

    if (
      squares[nextLocation] === character ||
      squares[nextLocation] === spiderweb ||
      squares[nextLocation] === obstacle
    ) {
      return;
    }

    const validMoves: number[] = currentLocation % levelSize === 0
      ? [currentLocation + 1, currentLocation + levelSize, currentLocation - levelSize]
      : (currentLocation + 1) % levelSize === 0
        ? [currentLocation - 1, currentLocation + levelSize, currentLocation - levelSize]
        : [currentLocation + 1, currentLocation - 1, currentLocation + levelSize, currentLocation - levelSize];

    if (!validMoves.includes(nextLocation)) {
      return;
    }

    paintRadius(nextSquares, nextLocation);
    nextSquares[nextLocation] = character;
    setSquares(nextSquares);
    setCurrentLocation(nextLocation);

    if (nextLocation === goalSquare) {
      setLevelCompleted(true);
      handleGameEnd();
    }
  }

  function handleGameEnd() {
    stopAlarm();
    fadeOut(2.5);
    setTimeout(() => {
      navigate('/endscreen');
    }, 3000);
  }

  // Merkkaa hahmon liikkumavaran eli mahdolliset siirrot
  function paintRadius(nextSquares: (string | number | null)[], nextLocation: number) {
    // Valitsee pelihahmon sijaintia ympäröivät ruudut niiden merkkaamista varten
    let neighbourIndices = [];
    if (nextLocation % levelSize === 0) {
      neighbourIndices = [nextLocation + 1, nextLocation + levelSize, nextLocation - levelSize];
    } else if ((nextLocation + 1) % levelSize === 0) {
      neighbourIndices = [nextLocation - 1, nextLocation + levelSize, nextLocation - levelSize];
    } else {
      neighbourIndices = [nextLocation + 1, nextLocation - 1, nextLocation + levelSize, nextLocation - levelSize];
    }

    // Merkkaa hahmon mahdolliset siirrot pelilaudalle
    neighbourIndices.forEach(neighbour => {
      if (neighbour >= 0
        && neighbour < squares.length
        && squares[neighbour] !== spiderweb
        && squares[neighbour] !== obstacle
        && squares[neighbour] !== stairs
        && nextSquares[neighbour] !== spiderweb
        && nextSquares[neighbour] !== obstacle
        && nextSquares[neighbour] !== stairs) {
        nextSquares[neighbour] = 'moveRadius';
      }
    });
  }

  // Tarkistaa osuuko valokeila pelihahmoon ja mikäli osuu, lopettaa pelisuorituksen
  function spotlightOnCharacter() {
    if (gameOver || levelCompleted || currentLocation === null) return;

    const lightedAreaWhole = Array.from({ length: levelSize * levelSize }, (_, index) => index)
      .filter(value => value >= 20)
      .filter(value => value <= 79);

    let lightedAreaLeft: number[] = [];
    let lightedAreaRight: number[] = [];

    if (lampLocation.downLeft % 10 >= 0) {
      const excludeNumbers = Array.from(
        { length: 10 - (lampLocation.downLeft % 10) - 1 },
        (_, i) => lampLocation.downLeft % 10 + 1 + i
      );
      lightedAreaLeft = lightedAreaWhole.filter((value) => !excludeNumbers.includes(value % 10));
    }

    if (lampLocation.downRight % 10 >= 1) {
      const excludeNumbers = Array.from(
        { length: lampLocation.downRight % 10 },
        (_, i) => i
      );
      lightedAreaRight = lightedAreaWhole.filter((value) => !excludeNumbers.includes(value % 10));
    }

    const safeFromLight = [
      {
        outsideBeamzone: lightedAreaLeft,
        behindObstacle: shadowLocations,
        goalSquare
      },
      {
        outsideBeamzone: lightedAreaRight,
        behindObstacle: shadowLocations,
        goalSquare
      }
    ];

    safeFromLight.forEach((config, index) => {
      if (
        spotlight[index] === light &&
        !(
          config.outsideBeamzone.includes(currentLocation) ||
          currentLocation in config.behindObstacle ||
          config.goalSquare === currentLocation
        )
      ) {
        setGameOver(true);
        setVolume(0.25);
        playAlarm();
      }
    });
  }

  function spotlightOnOff() {
    setCurrentSpotlightIndex(prevIndex => {
      if (prevIndex === null) return 0;
      return (prevIndex + 1) % 4;
    });
  }

  const graphicsManager = {
    reorderSpotlightToDivs: () => {
      let [firstlight, secondlight, thirdlight, fourthlight] = [0, 1, 2, 3];
      let [firstDiv, secondDiv, thirdDiv, fourthDiv] = [thirdlight, fourthlight, secondlight, firstlight];
      return [firstDiv, secondDiv, thirdDiv, fourthDiv];
    },

    spinSpotlight: () => {
      if (spotlight[0]) {
        return 'scaleX(-1)';
      } else if (spotlight[1]) {
        return 'scaleX(1)';
      } else if (spotlight[2]) {
        return 'scaleY(-1)';
      } else if (spotlight[3]) {
        return 'scale(-1, -1)';
      } else {
        return 'scaleX(-1)';
      }
    },

    indicesOfShadows: (index: number) => {
      let indices = shadowLocations;
      return index in indices ? indices : {};
    },

    characterNearGoal: () => {
      return (
        squares[goalSquare - 1] === character ||
        squares[goalSquare - levelSize] === character ||
        squares[goalSquare + 1] === character ||
        squares[goalSquare + levelSize] === character
      );
    }
  };

  useEffect(() => {
    spotlightOnCharacter();
  }, [spotlight, squares]);

  // Määrittää valokeilan näkymisen aikamääreet, eli miten kauan se näkyy
  useEffect(() => {
    if (gameOver || levelCompleted) return;

    const interval = setInterval(() => {
      spotlightOnOff();
    }, 3000);

    return () => clearInterval(interval);
  }, [gameOver, levelCompleted]);

  useEffect(() => {
    initializeLevel();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, gameOver]);

  return (
    <div className='background'>
      <div className='boardgrid' data-testid="boardgrid">
        <div className='superficial-graphics'>
          <div className='spotlight-all'>
            {graphicsManager.reorderSpotlightToDivs().map((value, index) => (
              <div
                key={index}
                className='spotlight-angle'
                style={{ backgroundColor: spotlight[value] || undefined }}
              >
              </div>
            ))}
          </div>
        </div>
        {squares.map((value, index) => (
          <Square
            key={index}
            indicesOfShadows={graphicsManager.indicesOfShadows(index)}
            value={value}
            index={index}
            onSquareClick={() => handleClick(index)}
            characterNearGoal={graphicsManager.characterNearGoal()}
            spotlight={spotlight}
            characterDirection={characterDirection}
            goalSquare={goalSquare}
          />
        ))}
      </div>
      <div className='superficial-graphics'>
        <div className='spotlight-all'>
          <div className='spotlight-angle'></div>
          <div className='spotlight-angle'>
            {/* Tämä lamp_bg johtuu vain siitä, etten ole vielä viitsinyt
            korjata lampun png-kuvaa oikeaan sävyyn...  */}
            <img className='lamp' src={lamp_bg} style={{
              transform: graphicsManager.spinSpotlight()
            }} />
            <img className='lamp' src={lamp} style={{
              opacity: '0.7',
              transform: graphicsManager.spinSpotlight()
            }} />
          </div>
          <div className='spotlight-angle'></div>
          <div className='spotlight-angle'></div>
        </div>
      </div>
      {(gameOver) && (
        <div className='superficial-graphics'>
          <div className='alarm-message'>
            <p>
              Hälytys!<br></br>Sinut on löydetty!
            </p>
            <button
              onClick={initializeLevel}
              className='alarm-button'>
              Yritä uudestaan</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Level