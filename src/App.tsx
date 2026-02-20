import { useState, useCallback } from 'react';
import { type TimerConfig, DEFAULT_CONFIG } from './types';
import { useTimer } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import { useFavorites } from './hooks/useFavorites';
import { AppLayout } from './components/layout/AppLayout';
import { TimerDisplay } from './components/timer/TimerDisplay';
import { ControlBar } from './components/controls/ControlBar';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { FavoritesPanel } from './components/favorites/FavoritesPanel';

export default function App() {
  const [config, setConfig] = useState<TimerConfig>(DEFAULT_CONFIG);
  const { initAudio, handlePhaseChange, handleCountdown, cleanup } = useAudio();
  const { favorites, saveFavorite, deleteFavorite } = useFavorites();

  const { state, start, pause, resume, stop, isActive } = useTimer(config, {
    onPhaseChange: handlePhaseChange,
    onCountdown: handleCountdown,
  });

  const handleStart = useCallback(() => {
    initAudio();
    start();
  }, [initAudio, start]);

  const handleStop = useCallback(() => {
    cleanup();
    stop();
  }, [cleanup, stop]);

  const timerSection = (
    <div className="flex flex-col items-center w-full max-w-sm">
      <TimerDisplay state={state} config={config} />
      <ControlBar
        phase={state.phase}
        isPaused={state.isPaused}
        onStart={handleStart}
        onPause={pause}
        onResume={resume}
        onStop={handleStop}
      />
    </div>
  );

  const settingsSection = (
    <>
      <SettingsPanel
        config={config}
        onChange={setConfig}
        disabled={isActive}
      />
      <div className="border-t border-white/5 pt-5">
        <FavoritesPanel
          favorites={favorites}
          onSave={saveFavorite}
          onLoad={setConfig}
          onDelete={deleteFavorite}
          currentConfig={config}
          disabled={isActive}
        />
      </div>
    </>
  );

  return (
    <AppLayout
      timerSection={timerSection}
      settingsSection={settingsSection}
    />
  );
}
