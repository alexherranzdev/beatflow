import { useState } from 'react';
import { type FavoriteSession, type TimerConfig } from '../../types';
import { FavoriteItem } from './FavoriteItem';

interface FavoritesPanelProps {
  favorites: FavoriteSession[];
  onSave: (name: string, config: TimerConfig) => void;
  onLoad: (config: TimerConfig) => void;
  onDelete: (id: string) => void;
  currentConfig: TimerConfig;
  disabled?: boolean;
}

export function FavoritesPanel({
  favorites,
  onSave,
  onLoad,
  onDelete,
  currentConfig,
  disabled = false,
}: FavoritesPanelProps) {
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  function handleSave() {
    const name = newName.trim() || `Session ${new Date().toLocaleDateString()}`;
    onSave(name, currentConfig);
    setNewName('');
    setSaving(false);
  }

  return (
    <section>
      <h2
        className="uppercase tracking-widest text-gray-500 mb-3"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em' }}
      >
        Favorites
      </h2>

      {/* Save current config */}
      {!disabled && (
        <div className="mb-3">
          {!saving ? (
            <button
              onClick={() => setSaving(true)}
              className="w-full py-2.5 rounded-xl text-sm font-bold border border-dashed border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors"
            >
              + Save current settings
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setSaving(false); }}
                placeholder="Session name…"
                autoFocus
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 placeholder-gray-600"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setSaving(false)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* List */}
      {favorites.length === 0 ? (
        <p className="text-sm text-gray-600 text-center py-6">
          No saved sessions yet
        </p>
      ) : (
        <div className="space-y-2">
          {favorites.map(fav => (
            <FavoriteItem
              key={fav.id}
              favorite={fav}
              onLoad={f => onLoad(f.config)}
              onDelete={onDelete}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </section>
  );
}
