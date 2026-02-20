interface ProgressRingProps {
  progress: number;   // 0–1, where 1 is full
  color: string;      // stroke color hex
  strokeWidth?: number;
}

// Uses a fixed 100×100 viewBox so the SVG scales with its CSS container.
// strokeWidth is expressed in the same coordinate space (out of 100).
export function ProgressRing({ progress, color, strokeWidth = 8 }: ProgressRingProps) {
  const viewSize = 100;
  const radius = (viewSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <svg
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      className="absolute inset-0 -rotate-90"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        cx={viewSize / 2}
        cy={viewSize / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <circle
        cx={viewSize / 2}
        cy={viewSize / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s ease' }}
      />
    </svg>
  );
}
