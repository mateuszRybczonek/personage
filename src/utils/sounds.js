import { Howl, Howler } from 'howler';
import { SOUNDS } from '@/consts';

Howler.volume(0.5);

export function preloadSound(soundKey, options) {
  if (!SOUNDS[soundKey]) throw new Error(`The sound "${soundKey}" has not been specified in constants`);

  return new Howl({
    src: [`/sounds/${SOUNDS[soundKey]}.mp3`],
    autoplay: false,
    ...options,
  });
}

const preloadedSounds = Object.keys(SOUNDS)
  .reduce((acc, soundKey) => {
    const sound = preloadSound(soundKey);
    return {
      ...acc,
      [soundKey]: sound,
    };
  }, {});

export function playSound(soundKey) {
  const audio = preloadedSounds[soundKey];
  if (!audio) throw new Error(`The sound "${soundKey}" does not exist, or hasn't been preloaded`);
  return audio.play();
}
