import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { preloadAudio } from './audioLoader';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import logo from './kuvat/logo.svg';
import './css/styles.css'

function TitleScreen() {
  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);
  let navigateTo = useNavigate();

  useEffect(() => {
    preloadAudio('/stealth.wav')
      .catch(error => console.error(error));

    setShowLogo(true);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  function handleClick() {
    navigateTo('/level');
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='titlescreen'>
      <div className={showLogo ? 'logoFadeIn' : ''}>
        <img style={{ margin: '13px 10px' }} src={logo} alt='Logo'></img>
        <img style={{ margin: '13px 10px', transform: 'scaleX(-1)' }} src={logo} alt='Logo'></img>
        <p style={{ margin: '0.2em' }}>Tiedustelijan<br></br>----kosto----</p>
        <img style={{ margin: '13px 10px', transform: 'scaleY(-1)' }} src={logo} alt='Logo'></img>
        <img style={{ margin: '13px 10px', transform: 'scale(-1, -1)' }} src={logo} alt='Logo'></img>
        <br></br>
      </div>
      <button
        onClick={handleClick}
        className={`titlescreen-button ${showButton ? 'buttonFadeIn' : 'hidden'}`}>
        Paina ⏎ Enter<br />
        aloittaaksesi pelin
      </button>

      <button
        onClick={handleClick}
        className={`titlescreen-button-mobile ${showButton ? 'buttonFadeIn' : 'hidden'}`}
        style={{ marginBottom: '20vh' }}>
        Aloita peli tästä
      </button>
    </div>
  );
}

export default TitleScreen