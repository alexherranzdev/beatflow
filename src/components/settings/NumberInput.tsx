interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function NumberInput({ label, value, onChange, min = 1, max = 20, disabled = false }: NumberInputProps) {
  function increment() {
    if (value < max) onChange(value + 1);
  }

  function decrement() {
    if (value > min) onChange(value - 1);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <button
          onClick={decrement}
          disabled={disabled || value <= min}
          className="px-4 py-3 text-xl font-bold text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <span className="flex-1 text-center font-mono font-bold text-lg text-white py-3">
          {value}
        </span>
        <button
          onClick={increment}
          disabled={disabled || value >= max}
          className="px-4 py-3 text-xl font-bold text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
