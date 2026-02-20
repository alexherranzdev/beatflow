import { useReducer, useEffect, useRef, useCallback } from 'react';
import { type TimerConfig, type TimerPhase, type TimerState } from '../types';

type TimerAction =
  | { type: 'START'; config: TimerConfig }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' }
  | { type: 'TICK' }
  | { type: 'ADVANCE_PHASE'; config: TimerConfig };

function advancePhase(state: TimerState, config: TimerConfig): TimerState {
  const { phase, currentRound, currentBlock } = state;

  if (phase === 'prep') {
    return {
      ...state,
      phase: 'work',
      timeLeft: config.workTime,
      totalTime: config.workTime,
      currentRound: 1,
      currentBlock: 1,
    };
  }

  if (phase === 'work') {
    const isLastRound = currentRound >= config.rounds;
    const isLastBlock = currentBlock >= config.blocks;

    if (!isLastRound) {
      // More rounds in this block → rest
      return {
        ...state,
        phase: 'rest',
        timeLeft: config.restTime,
        totalTime: config.restTime,
      };
    } else if (!isLastBlock) {
      // Last round of block, more blocks → blockRest
      return {
        ...state,
        phase: 'blockRest',
        timeLeft: config.blockRestTime,
        totalTime: config.blockRestTime,
      };
    } else {
      // Last round of last block → done
      return {
        ...state,
        phase: 'done',
        timeLeft: 0,
        totalTime: 0,
        isPaused: false,
      };
    }
  }

  if (phase === 'rest') {
    return {
      ...state,
      phase: 'work',
      timeLeft: config.workTime,
      totalTime: config.workTime,
      currentRound: currentRound + 1,
    };
  }

  if (phase === 'blockRest') {
    return {
      ...state,
      phase: 'work',
      timeLeft: config.workTime,
      totalTime: config.workTime,
      currentRound: 1,
      currentBlock: currentBlock + 1,
    };
  }

  return state;
}

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START':
      return {
        phase: 'prep',
        currentRound: 0,
        currentBlock: 1,
        timeLeft: action.config.prepTime,
        totalTime: action.config.prepTime,
        isPaused: false,
      };

    case 'PAUSE':
      return { ...state, isPaused: true };

    case 'RESUME':
      return { ...state, isPaused: false };

    case 'STOP':
      return {
        phase: 'idle',
        currentRound: 0,
        currentBlock: 1,
        timeLeft: 0,
        totalTime: 0,
        isPaused: false,
      };

    case 'TICK':
      return { ...state, timeLeft: state.timeLeft - 1 };

    case 'ADVANCE_PHASE':
      return advancePhase(state, action.config);

    default:
      return state;
  }
}

const initialState: TimerState = {
  phase: 'idle',
  currentRound: 0,
  currentBlock: 1,
  timeLeft: 0,
  totalTime: 0,
  isPaused: false,
};

interface UseTimerOptions {
  onPhaseChange?: (phase: TimerPhase, round: number, block: number) => void;
  onCountdown?: (secondsLeft: number) => void;
}

export function useTimer(config: TimerConfig, options: UseTimerOptions = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const configRef = useRef(config);
  const optionsRef = useRef(options);
  const prevPhaseRef = useRef<TimerPhase>('idle');

  useEffect(() => { configRef.current = config; }, [config]);
  useEffect(() => { optionsRef.current = options; }, [options]);

  // Fire onPhaseChange when phase transitions
  useEffect(() => {
    if (state.phase !== prevPhaseRef.current) {
      if (state.phase !== 'idle') {
        optionsRef.current.onPhaseChange?.(state.phase, state.currentRound, state.currentBlock);
      }
      prevPhaseRef.current = state.phase;
    }
  }, [state.phase, state.currentRound, state.currentBlock]);

  // Main tick interval
  useEffect(() => {
    if (state.phase === 'idle' || state.phase === 'done' || state.isPaused) return;

    const interval = setInterval(() => {
      const currentState = state; // captured in closure

      if (currentState.timeLeft <= 1) {
        dispatch({ type: 'ADVANCE_PHASE', config: configRef.current });
      } else {
        dispatch({ type: 'TICK' });

        // Countdown beep at 3, 2, 1
        const newTimeLeft = currentState.timeLeft - 1;
        if (newTimeLeft <= 3 && newTimeLeft >= 1) {
          optionsRef.current.onCountdown?.(newTimeLeft);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.phase, state.isPaused, state.timeLeft]);

  const start = useCallback(() => {
    dispatch({ type: 'START', config: configRef.current });
  }, []);

  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const stop = useCallback(() => dispatch({ type: 'STOP' }), []);

  const isActive = state.phase !== 'idle' && state.phase !== 'done';

  return { state, start, pause, resume, stop, isActive };
}
