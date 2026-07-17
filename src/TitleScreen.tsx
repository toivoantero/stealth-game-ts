import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { preloadAudio } from './audioLoader';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import logo from './kuvat/logo.svg';
import './css/styles.css'

function TitleScreen() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  useBackgroundMusic('/intro.mp3', false, 0.4);

  useEffect(() => {
    Promise.all([
      preloadAudio('/stealth.wav'),
      preloadAudio('/theend.mp3')
    ]).catch(error =>
      console.error(error)
    );

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 6000);

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        navigate('/level')
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
    <div className='titlescreen'>
      <div>
        <div className='fade-in-logo-top'>
          <img style={{ margin: '13px 10px' }} src={logo} alt='Logo'></img>
          <img style={{ margin: '13px 10px', transform: 'scaleX(-1)' }} src={logo} alt='Logo'></img>
        </div>
        <p className='fade-in-logo-middle' style={{ margin: '0.2em' }}>Tiedustelijan<br></br>----kosto----</p>
        <div className='fade-in-logo-bottom'>
          <img style={{ margin: '13px 10px', transform: 'scaleY(-1)' }} src={logo} alt='Logo'></img>
          <img style={{ margin: '13px 10px', transform: 'scale(-1, -1)' }} src={logo} alt='Logo'></img>
        </div>
        <br></br>
      </div>
      <button
        onClick={() => navigate('/level')}
        className={`titlescreen-button ${showButton ? 'fade-in-start-button' : 'hidden'}`}>
        Paina ⏎ Enter<br />
        aloittaaksesi pelin
      </button>

      <button
        onClick={() => navigate('/level')}
        className={`titlescreen-button-mobile ${showButton ? 'fade-in-start-button' : 'hidden'}`}
        style={{ marginBottom: '20vh' }}>
        Aloita peli tästä
      </button>
    </div>
  );
}

export default TitleScreen