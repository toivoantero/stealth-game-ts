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
  const { setVolume } = useBackgroundMusic('/intro.mp3', false);

  useEffect(() => {
    setVolume(0.4);
  }, []);

  useEffect(() => {
    Promise.all([
      preloadAudio('/stealth.wav'),
      preloadAudio('/theend.mp3')
    ]).catch(error =>
      console.error(error)
    );

    setShowLogo(true);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 8000);

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
      <div>
        <div className={showLogo ? 'logoTopFadeIn' : ''}>
          <img style={{ margin: '13px 10px' }} src={logo} alt='Logo'></img>
          <img style={{ margin: '13px 10px', transform: 'scaleX(-1)' }} src={logo} alt='Logo'></img>
        </div>
        <p className={showLogo ? 'logoMiddleFadeIn' : ''} style={{ margin: '0.2em' }}>Tiedustelijan<br></br>----kosto----</p>
        <div className={showLogo ? 'logoBottomFadeIn' : ''}>
          <img style={{ margin: '13px 10px', transform: 'scaleY(-1)' }} src={logo} alt='Logo'></img>
          <img style={{ margin: '13px 10px', transform: 'scale(-1, -1)' }} src={logo} alt='Logo'></img>
        </div>
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