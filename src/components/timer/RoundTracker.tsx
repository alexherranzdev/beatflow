import clsx from 'clsx';
import { type TimerPhase, PHASE_COLORS } from '../../types';

interface RoundTrackerProps {
  currentRound: number;
  totalRounds: number;
  currentBlock: number;
  totalBlocks: number;
  phase: TimerPhase;
}

export function RoundTracker({
  currentRound,
  totalRounds,
  currentBlock,
  totalBlocks,
  phase,
}: RoundTrackerProps) {
  const colors = PHASE_COLORS[phase];
  const isActive = phase !== 'idle' && phase !== 'done';

  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      {/* Block indicator */}
      {totalBlocks > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Block</span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalBlocks }, (_, i) => (
              <div
                key={i}
                className={clsx(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i < currentBlock - 1
                    ? 'bg-gray-600'
                    : i === currentBlock - 1
                    ? `bg-current ${colors.text}`
                    : 'bg-gray-800 border border-gray-700'
                )}
              />
            ))}
          </div>
          <span className={`text-xs font-bold ${colors.text}`}>
            {currentBlock}/{totalBlocks}
          </span>
        </div>
      )}

      {/* Round dots */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Round</span>
        <div className="flex gap-1.5">
          {Array.from({ length: totalRounds }, (_, i) => (
            <div
              key={i}
              className={clsx(
                'w-3 h-3 rounded-full transition-all duration-300',
                i < currentRound - 1
                  ? 'bg-gray-600 scale-75'
                  : i === currentRound - 1
                  ? `scale-110 shadow-lg`
                  : 'bg-gray-800 border border-gray-700'
              )}
              style={i === currentRound - 1 ? { backgroundColor: colors.hex } : undefined}
            />
          ))}
        </div>
        <span className={`text-xs font-bold ${colors.text}`}>
          {currentRound > 0 ? `${currentRound}/${totalRounds}` : '–'}
        </span>
      </div>
    </div>
  );
}
