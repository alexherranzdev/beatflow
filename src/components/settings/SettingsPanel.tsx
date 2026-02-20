import { type TimerConfig } from '../../types';
import { TimeInput } from './TimeInput';
import { NumberInput } from './NumberInput';

interface SettingsPanelProps {
  config: TimerConfig;
  onChange: (config: TimerConfig) => void;
  disabled?: boolean;
}

export function SettingsPanel({ config, onChange, disabled = false }: SettingsPanelProps) {
  function update<K extends keyof TimerConfig>(key: K, value: TimerConfig[K]) {
    onChange({ ...config, [key]: value });
  }

  return (
    <section>
      <h2
        className="uppercase tracking-widest text-gray-500 mb-3"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em' }}
      >
        Timer Settings
      </h2>

      {disabled && (
        <p className="text-xs text-yellow-500/80 bg-yellow-900/20 border border-yellow-900/40 rounded-lg px-3 py-2 mb-3">
          Settings locked during active session
        </p>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        <TimeInput
          label="Work Time"
          value={config.workTime}
          onChange={v => update('workTime', v)}
          disabled={disabled}
          min={5}
          max={3600}
        />
        <TimeInput
          label="Rest Time"
          value={config.restTime}
          onChange={v => update('restTime', v)}
          disabled={disabled}
          min={5}
          max={3600}
        />
        <NumberInput
          label="Rounds"
          value={config.rounds}
          onChange={v => update('rounds', v)}
          disabled={disabled}
          min={1}
          max={20}
        />
        <NumberInput
          label="Blocks"
          value={config.blocks}
          onChange={v => update('blocks', v)}
          disabled={disabled}
          min={1}
          max={10}
        />
        <TimeInput
          label="Block Rest"
          value={config.blockRestTime}
          onChange={v => update('blockRestTime', v)}
          disabled={disabled}
          min={5}
          max={3600}
        />
        <TimeInput
          label="Prep Time"
          value={config.prepTime}
          onChange={v => update('prepTime', v)}
          disabled={disabled}
          min={3}
          max={60}
        />
      </div>

      {/* Quick presets */}
      {!disabled && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>Presets</p>
          <div className="flex gap-2 flex-wrap">
            <PresetButton
              label="Tabata"
              onClick={() => onChange({ workTime: 20, restTime: 10, rounds: 8, blocks: 1, blockRestTime: 60, prepTime: 10 })}
            />
            <PresetButton
              label="Boxing 3R"
              onClick={() => onChange({ workTime: 180, restTime: 60, rounds: 3, blocks: 3, blockRestTime: 120, prepTime: 10 })}
            />
            <PresetButton
              label="HIIT 30/30"
              onClick={() => onChange({ workTime: 30, restTime: 30, rounds: 10, blocks: 1, blockRestTime: 60, prepTime: 10 })}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs font-bold bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-700"
    >
      {label}
    </button>
  );
}
