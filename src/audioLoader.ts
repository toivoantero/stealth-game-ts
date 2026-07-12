const cachedBuffers = new Map<string, AudioBuffer>();
const loadingPromises = new Map<string, Promise<AudioBuffer>>();

export async function preloadAudio(
    audioFile: string
): Promise<AudioBuffer> {
    const cached = cachedBuffers.get(audioFile);

    if (cached) {
        return cached;
    }

    const loading = loadingPromises.get(audioFile);

    if (loading) {
        return loading;
    }

    const AudioContextClass =
        window.AudioContext ||
        (window as any).webkitAudioContext;

    const audioCtx = new AudioContextClass();

    const promise = fetch(audioFile)
        .then(response => response.arrayBuffer())
        .then(buffer => audioCtx.decodeAudioData(buffer))
        .then(audioBuffer => {
            cachedBuffers.set(audioFile, audioBuffer);
            loadingPromises.delete(audioFile);

            return audioBuffer;
        });

    loadingPromises.set(audioFile, promise);

    return promise;
}

export function getCachedAudio(
    audioFile: string
) {
    return cachedBuffers.get(audioFile);
}