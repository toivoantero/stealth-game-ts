import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import end from './kuvat/end.jpg';
import './css/styles.css';

function EndScreen() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  useBackgroundMusic('/theend.mp3', false, 0.3);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showButton) {
        navigate('/level')
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showButton]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className='endscreen fade-in-endscreen'
      style={{ backgroundImage: `url(${end})` }}
    >
      <div className='endscreen-content'>
        <p style={{ margin: 0, padding: '20px 0', fontSize: '50px', color: 'white' }}>Loppu</p>
        {showButton && (
          <div>
            <button
              onClick={() => navigate('/level')}
              className='fade-in-start-button endscreen-button'>
              Uusi peli?<br></br>Paina ⏎ Enter</button>
            <button
              onClick={() => navigate('/level')}
              className='fade-in-start-button endscreen-button-mobile'>
              Uusi peli?</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EndScreen;