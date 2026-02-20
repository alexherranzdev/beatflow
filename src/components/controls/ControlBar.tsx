import clsx from 'clsx';
import { type TimerPhase } from '../../types';

interface ControlBarProps {
  phase: TimerPhase;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export function ControlBar({ phase, isPaused, onStart, onPause, onResume, onStop }: ControlBarProps) {
  const isIdle = phase === 'idle';
  const isDone = phase === 'done';
  const isActive = !isIdle && !isDone;

  const btnBase = 'font-black tracking-widest uppercase transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer';
  // Fluid vertical padding: snug on small landscape screens, generous on portrait
  const btnPad = 'py-[clamp(0.65rem,2.5vh,1.1rem)] rounded-2xl';

  return (
    <div className="flex gap-3 items-center mt-8 w-full" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
      {(isIdle || isDone) && (
        <button
          onClick={onStart}
          className={clsx(
            btnBase, btnPad,
            'flex-1 text-[clamp(0.9rem,2.5vmin,1.1rem)]',
            'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/40',
            'focus:ring-red-400'
          )}
        >
          {isDone ? 'Start Again' : 'Start'}
        </button>
      )}

      {isActive && !isPaused && (
        <button
          onClick={onPause}
          className={clsx(
            btnBase, btnPad,
            'flex-1 text-[clamp(0.9rem,2.5vmin,1.1rem)]',
            'bg-yellow-600 hover:bg-yellow-500 shadow-lg shadow-yellow-900/40',
            'focus:ring-yellow-400'
          )}
        >
          Pause
        </button>
      )}

      {isActive && isPaused && (
        <button
          onClick={onResume}
          className={clsx(
            btnBase, btnPad,
            'flex-1 text-[clamp(0.9rem,2.5vmin,1.1rem)]',
            'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/40',
            'focus:ring-emerald-400'
          )}
        >
          Resume
        </button>
      )}

      {isActive && (
        <button
          onClick={onStop}
          className={clsx(
            btnBase, btnPad,
            'px-6 text-[clamp(0.9rem,2.5vmin,1.1rem)]',
            'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white',
            'focus:ring-gray-500'
          )}
        >
          Stop
        </button>
      )}
    </div>
  );
}
