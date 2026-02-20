export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export function parseTimeInput(value: string): number {
  const parts = value.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10) || 0;
    const secs = parseInt(parts[1], 10) || 0;
    return minutes * 60 + Math.min(59, secs);
  }
  return parseInt(value, 10) || 0;
}
