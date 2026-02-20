import { type TimerPhase, PHASE_COLORS } from '../../types';

const PHASE_LABELS: Record<TimerPhase, string> = {
  idle: 'READY',
  prep: 'GET READY',
  work: 'WORK',
  rest: 'REST',
  blockRest: 'BLOCK REST',
  done: 'DONE!',
};

interface PhaseLabelProps {
  phase: TimerPhase;
}

export function PhaseLabel({ phase }: PhaseLabelProps) {
  const colors = PHASE_COLORS[phase];

  return (
    <div
      key={phase}
      className={`tracking-[0.35em] uppercase animate-fade-in-scale ${colors.text}`}
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(0.7rem, 2.5vmin, 1rem)',
      }}
    >
      {PHASE_LABELS[phase]}
    </div>
  );
}
