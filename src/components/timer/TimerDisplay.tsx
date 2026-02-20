import { type TimerState, type TimerConfig, PHASE_COLORS } from '../../types';
import { formatTime } from '../../utils/formatTime';
import { ProgressRing } from './ProgressRing';
import { PhaseLabel } from './PhaseLabel';
import { RoundTracker } from './RoundTracker';

interface TimerDisplayProps {
  state: TimerState;
  config: TimerConfig;
}

export function TimerDisplay({ state, config }: TimerDisplayProps) {
  const { phase, timeLeft, totalTime, currentRound, currentBlock, isPaused } = state;
  const colors = PHASE_COLORS[phase];

  const progress = totalTime > 0 ? timeLeft / totalTime : 1;
  const timeStr = phase === 'idle' ? formatTime(config.workTime) : formatTime(timeLeft);

  return (
    <div className="flex flex-col items-center gap-3 w-full mx-auto">
      <PhaseLabel phase={phase} />

      {/* Ring + time
          Container: min(70vw, 70vh, 340px)
          — 70vw  : fills nicely on portrait mobile
          — 70vh  : caps size on landscape so ring never overflows vertically
          — 340px : upper limit on large screens
          Font: clamp(2rem, 14vmin, 5rem)
          — vmin references the SMALLER viewport axis, so it naturally
            shrinks on landscape (height-constrained) vs portrait (width-constrained)
          — At 5rem = 80px: "00:00" ≈ 5 × 0.6 × 80 = 240px < inner circle ~320px ✓
      */}
      <div
        className="relative aspect-square flex items-center justify-center"
        style={{ width: 'min(70vw, 70vh, 340px)' }}
      >
        <ProgressRing
          progress={progress}
          color={colors.hex}
          strokeWidth={10}
        />

        {/* Text is positioned absolutely centered, with padding to stay well inside the stroke */}
        <div className="absolute inset-[14%] flex flex-col items-center justify-center z-10">
          <span
            className={`font-mono font-black tabular-nums leading-none transition-colors duration-500 ${colors.text}`}
            style={{ fontSize: 'clamp(2rem, 14vmin, 5rem)' }}
          >
            {timeStr}
          </span>

          {isPaused && (
            <span
              className="font-bold tracking-widest text-yellow-400/80 uppercase animate-pulse mt-1"
              style={{ fontSize: 'clamp(0.55rem, 1.8vmin, 0.75rem)', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Paused
            </span>
          )}
        </div>
      </div>

      <RoundTracker
        currentRound={currentRound}
        totalRounds={config.rounds}
        currentBlock={currentBlock}
        totalBlocks={config.blocks}
        phase={phase}
      />
    </div>
  );
}
