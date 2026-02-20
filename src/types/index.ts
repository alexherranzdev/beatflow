export interface TimerConfig {
  workTime: number;       // seconds (e.g. 180)
  restTime: number;       // seconds (e.g. 60)
  rounds: number;         // rounds per block (e.g. 3)
  blocks: number;         // number of blocks (e.g. 2)
  blockRestTime: number;  // seconds of rest between blocks
  prepTime: number;       // seconds of "Get ready!" (5-10)
}

export type TimerPhase = 'idle' | 'prep' | 'work' | 'rest' | 'blockRest' | 'done';

export interface TimerState {
  phase: TimerPhase;
  currentRound: number;
  currentBlock: number;
  timeLeft: number;
  totalTime: number;
  isPaused: boolean;
}

export interface FavoriteSession {
  id: string;
  name: string;
  config: TimerConfig;
  createdAt: number;
}

export type PhaseColors = {
  [K in TimerPhase]: {
    text: string;
    ring: string;
    bg: string;
    hex: string;
  };
};

export const PHASE_COLORS: PhaseColors = {
  idle:      { text: 'text-slate-400',   ring: 'stroke-slate-500',   bg: 'bg-slate-800',   hex: '#64748b' },
  prep:      { text: 'text-yellow-400',  ring: 'stroke-yellow-400',  bg: 'bg-yellow-900',  hex: '#facc15' },
  work:      { text: 'text-red-400',     ring: 'stroke-red-500',     bg: 'bg-red-900',     hex: '#ef4444' },
  rest:      { text: 'text-emerald-400', ring: 'stroke-emerald-400', bg: 'bg-emerald-900', hex: '#34d399' },
  blockRest: { text: 'text-blue-400',    ring: 'stroke-blue-400',    bg: 'bg-blue-900',    hex: '#60a5fa' },
  done:      { text: 'text-purple-400',  ring: 'stroke-purple-400',  bg: 'bg-purple-900',  hex: '#c084fc' },
};

export const DEFAULT_CONFIG: TimerConfig = {
  workTime: 180,
  restTime: 60,
  rounds: 3,
  blocks: 2,
  blockRestTime: 120,
  prepTime: 10,
};
