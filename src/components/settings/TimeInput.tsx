import { useState, useEffect, type ChangeEvent, type FocusEvent } from 'react';
import { formatTime, parseTimeInput } from '../../utils/formatTime';

interface TimeInputProps {
  label: string;
  value: number; // seconds
  onChange: (seconds: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function TimeInput({ label, value, onChange, disabled = false, min = 1, max = 3600 }: TimeInputProps) {
  const [displayValue, setDisplayValue] = useState(formatTime(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDisplayValue(formatTime(value));
    }
  }, [value, focused]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDisplayValue(e.target.value);
  }

  function handleBlur(_e: FocusEvent<HTMLInputElement>) {
    setFocused(false);
    const parsed = parseTimeInput(displayValue);
    const clamped = Math.max(min, Math.min(max, parsed));
    onChange(clamped);
    setDisplayValue(formatTime(clamped));
  }

  function handleFocus() {
    setFocused(true);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder="mm:ss"
        className={`
          bg-gray-900 border border-gray-700 rounded-xl px-4 py-3
          font-mono text-lg text-center font-bold text-white
          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors w-full
        `}
      />
    </div>
  );
}
