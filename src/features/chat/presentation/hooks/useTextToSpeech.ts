import * as Speech from 'expo-speech';
import { useCallback } from 'react';

export const useTextToSpeech = () => {
  const speak = useCallback((text: string, language: string = 'es-ES') => {
    Speech.speak(text, {
      language: language,
      pitch: 1.0,
      rate: 1.0,
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
  }, []);

  const isSpeaking = useCallback(async () => {
    return await Speech.isSpeakingAsync();
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
  };
};
