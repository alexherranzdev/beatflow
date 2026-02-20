import { type FavoriteSession } from '../../types';
import { formatTime } from '../../utils/formatTime';

interface FavoriteItemProps {
  favorite: FavoriteSession;
  onLoad: (favorite: FavoriteSession) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export function FavoriteItem({ favorite, onLoad, onDelete, disabled = false }: FavoriteItemProps) {
  const { config } = favorite;
  const summary = `${formatTime(config.workTime)}/${formatTime(config.restTime)} · ${config.rounds}R × ${config.blocks}B`;

  return (
    <div className="flex items-center gap-3 bg-gray-900 rounded-xl px-4 py-3 border border-gray-800 hover:border-gray-700 transition-colors group">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm truncate">{favorite.name}</p>
        <p className="text-xs text-gray-500 mt-0.5 font-mono">{summary}</p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onLoad(favorite)}
          disabled={disabled}
          className="px-3 py-1.5 text-xs font-bold bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-700 hover:border-red-600"
        >
          Load
        </button>
        <button
          onClick={() => onDelete(favorite.id)}
          className="px-2 py-1.5 text-xs font-bold text-gray-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-900/20"
          aria-label="Delete favorite"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
