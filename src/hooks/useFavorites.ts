import { useState, useCallback } from 'react';
import { type FavoriteSession, type TimerConfig } from '../types';

const STORAGE_KEY = 'beatflow_favorites';

function loadFromStorage(): FavoriteSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(favorites: FavoriteSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage unavailable
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteSession[]>(loadFromStorage);

  const saveFavorite = useCallback((name: string, config: TimerConfig) => {
    const newFav: FavoriteSession = {
      id: crypto.randomUUID(),
      name,
      config,
      createdAt: Date.now(),
    };
    setFavorites(prev => {
      const updated = [newFav, ...prev];
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deleteFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  return { favorites, saveFavorite, deleteFavorite };
}
