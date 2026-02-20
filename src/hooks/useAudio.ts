import { useCallback, useRef } from 'react';
import { type TimerPhase } from '../types';
import {
  getAudioContext,
  playWorkSound,
  playRestSound,
  playBlockRestSound,
  playDoneSound,
  playPrepSound,
  playCountdownBeep,
} from '../utils/audioEngine';
import { speak, cancelSpeech } from '../utils/speechEngine';

export function useAudio() {
  const audioInitialized = useRef(false);

  const initAudio = useCallback(() => {
    if (!audioInitialized.current) {
      getAudioContext();
      audioInitialized.current = true;
    }
  }, []);

  const handlePhaseChange = useCallback((phase: TimerPhase, round: number, _block: number) => {
    const ctx = getAudioContext();

    switch (phase) {
      case 'prep':
        playPrepSound(ctx);
        speak('Get ready!');
        break;
      case 'work':
        playWorkSound(ctx);
        speak(`Round ${round}! Work!`);
        break;
      case 'rest':
        playRestSound(ctx);
        speak('Rest!');
        break;
      case 'blockRest':
        playBlockRestSound(ctx);
        speak('Block rest! Good work!');
        break;
      case 'done':
        playDoneSound(ctx);
        speak('Session complete!');
        break;
    }
  }, []);

  const handleCountdown = useCallback((secondsLeft: number) => {
    const ctx = getAudioContext();
    playCountdownBeep(ctx, secondsLeft);
  }, []);

  const cleanup = useCallback(() => {
    cancelSpeech();
  }, []);

  return { initAudio, handlePhaseChange, handleCountdown, cleanup };
}
