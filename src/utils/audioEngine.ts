let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  gainValue: number = 0.3,
  type: OscillatorType = 'sine'
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playWorkSound(ctx: AudioContext): void {
  const t = ctx.currentTime;
  playTone(ctx, 880, t, 0.15, 0.4, 'square');
  playTone(ctx, 1100, t + 0.18, 0.2, 0.4, 'square');
}

export function playRestSound(ctx: AudioContext): void {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(660, t);
  osc.frequency.linearRampToValueAtTime(440, t + 0.5);
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  osc.start(t);
  osc.stop(t + 0.55);
}

export function playBlockRestSound(ctx: AudioContext): void {
  const t = ctx.currentTime;
  [880, 660, 440].forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.2, 0.15, 0.35, 'triangle');
  });
}

export function playDoneSound(ctx: AudioContext): void {
  // C5-E5-G5-C6 arpeggio
  const notes = [523.25, 659.25, 783.99, 1046.5];
  const t = ctx.currentTime;
  notes.forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.15, 0.3, 0.4, 'sine');
  });
}

export function playPrepSound(ctx: AudioContext): void {
  const t = ctx.currentTime;
  playTone(ctx, 440, t, 0.2, 0.25, 'sine');
}

export function playCountdownBeep(ctx: AudioContext, secondsLeft: number): void {
  const t = ctx.currentTime;
  const freq = secondsLeft === 1 ? 1200 : 880;
  playTone(ctx, freq, t, 0.1, 0.3, 'square');
}
