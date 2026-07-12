import { useEffect, useRef } from 'react';

export function useAlarmSound() {
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const alarmAudio = new Audio('/alarm.wav');

    alarmAudio.loop = false;
    alarmAudio.preload = 'auto';
    alarmAudio.volume = 0.1;

    alarmAudioRef.current = alarmAudio;

    return () => {
      alarmAudio.pause();
    };
  }, []);

  function playAlarm() {
    const alarm = alarmAudioRef.current;
    if (!alarm) return;

    alarm.currentTime = 0;

    alarm.play().catch(error => {
      if (
        !(error instanceof DOMException &&
          error.name === 'AbortError')
      ) {
        console.error(error);
      }
    });
  }

  function stopAlarm() {
    const alarm = alarmAudioRef.current;
    if (!alarm) return;

    alarm.pause();
    alarm.currentTime = 0;
  }

  return {
    playAlarm,
    stopAlarm
  };
}