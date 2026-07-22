import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import endGif from './kuvat/end.gif';
import endStatic from './kuvat/end_static.jpg';
import './css/styles.css';

function EndScreen() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [gifOpacity, setGifOpacity] = useState(1);
  useBackgroundMusic('/theend.mp3', false, 0.3);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showButton) {
        navigate('/level');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showButton, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGifOpacity(0);
    }, 28000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className='endscreen fade-in-endscreen'
      style={{ position: 'relative', overflow: 'hidden' }}
    >

      <div
        className="endscreen-bg"
        style={{ backgroundImage: `url(${endStatic})` }}
      />

      <div
        className="endscreen-bg"
        style={{
          backgroundImage: `url(${endGif})`,
          opacity: gifOpacity,
          transition: 'opacity 1s ease-in-out',
          pointerEvents: gifOpacity === 0 ? 'none' : 'auto'
        }}
      />

      <div className="endscreen-credits">
        <div style={{ marginBottom: '30px' }}>
          <p style={{ margin: '15px 0', lineHeight: '2' }}>
            ohjelmointi<br />& grafiikka<br />& musiikki
          </p>
          <p style={{ margin: '20px 0', fontWeight: 'bold' }}>
            MARKUS LIIMATAINEN
          </p>
        </div>
      </div>

      <div
        className='endscreen-content'
        style={{ position: 'relative', zIndex: 3 }}
      >
        {showButton && (
          <>
            <p className='fade-in-theend endscreen-theend'>
              Loppu
            </p>
            <div>
              <button
                onClick={() => navigate('/level')}
                className='fade-in-theend endscreen-button'
              >
                Uusi peli?<br />Paina ⏎ Enter
              </button>
              <button
                onClick={() => navigate('/level')}
                className='fade-in-theend endscreen-button-mobile'
              >
                Uusi peli?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EndScreen;
