import { useAudioPlayer } from 'expo-audio';
import { assets } from '../assets/assets';

export const useSoundPlayer = () => {
  const player = useAudioPlayer();

const playSound = async (soundKey: keyof typeof assets.sounds) => {
  try {
    const soundAsset = assets.sounds[soundKey];
    if (!soundAsset) return;

    await player.replace(soundAsset);
    player.seekTo(0);
    await new Promise((resolve) => setTimeout(resolve, 50));
    await player.play();
  } catch (error) {
    console.warn('Error playing sound:', error);
  }
};

  return playSound;
};