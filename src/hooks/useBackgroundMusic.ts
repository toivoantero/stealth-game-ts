import { useEffect, useRef } from 'react';
import {
    preloadAudio,
    getCachedAudio
} from '../audioLoader';

export function useBackgroundMusic(audioFile: string) {
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {

        const startMusic = (audioBuffer: AudioBuffer) => {
            const source = audioCtx.createBufferSource();

            source.buffer = audioBuffer;
            source.loop = true;

            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            source.start();

            audioSourceRef.current = source;
        };
        let cancelled = false;

        const AudioContextClass =
            window.AudioContext ||
            (window as any).webkitAudioContext;

        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.5;

        gainNodeRef.current = gainNode;

        const cached = getCachedAudio(audioFile);

        if (cached) {
            startMusic(cached);
        } else {
            preloadAudio(audioFile)
                .then(audioBuffer => {
                    if (cancelled) return;

                    startMusic(audioBuffer);
                })
                .catch(error =>
                    console.error(
                        'Virhe musiikin latauksessa:',
                        error
                    )
                );
        }

        return () => {
            cancelled = true;

            try {
                audioSourceRef.current?.stop();
            } catch { }

            audioContextRef.current?.close().catch(() => { });
        };
    }, [audioFile]);

    function setVolume(volume: number) {
        const gainNode = gainNodeRef.current;
        if (!gainNode) return;

        gainNode.gain.value = volume;
    }

    function fadeOut(duration = 1.5) {
        const audioCtx = audioContextRef.current;
        const gainNode = gainNodeRef.current;

        if (!audioCtx || !gainNode) return;

        const now = audioCtx.currentTime;

        gainNode.gain.cancelScheduledValues(now);

        gainNode.gain.setValueAtTime(
            gainNode.gain.value,
            now
        );

        gainNode.gain.linearRampToValueAtTime(
            0,
            now + duration
        );
    }

    return {
        setVolume,
        fadeOut
    };
}