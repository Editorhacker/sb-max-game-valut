import { useState, useMemo } from 'react';
import { games } from '../data/games';
import type { FilterState, Game, Platform } from '../types/game';

const defaultFilters: FilterState = {
  search: '',
  platform: 'All',
  genre: '',
  playerMode: '',
  sort: 'alpha-asc',
};

const PLAYER_MODE_GROUPS: Record<string, string[]> = {
  'Single-player': ['Single-player'],
  'Local multiplayer': ['Local multiplayer', 'Local PvP'],
  'Local co-op': ['Local co-op'],
  'Online multiplayer': ['Online multiplayer', 'Team-based multiplayer', 'Online PvP'],
  'Online co-op': ['Online co-op'],
};

export function useGameFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filteredGames = useMemo<Game[]>(() => {
    let result = [...games];

    // Platform filter
    if (filters.platform !== 'All') {
      result = result.filter((g) => g.platform === (filters.platform as Platform));
    }

    // Search filter (title, genre, developer, publisher, tags)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genres.some((genre) => genre.toLowerCase().includes(q)) ||
          g.developer.toLowerCase().includes(q) ||
          g.publisher.toLowerCase().includes(q) ||
          g.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (filters.genre) {
      result = result.filter((g) =>
        g.genres.some(
          (genre) => genre.toLowerCase() === filters.genre.toLowerCase()
        )
      );
    }

    // Player mode filter
    if (filters.playerMode) {
      const matchModes = PLAYER_MODE_GROUPS[filters.playerMode] ?? [filters.playerMode];
      result = result.filter((g) =>
        g.modes.some((m) => matchModes.includes(m))
      );
    }

    // Sorting
    switch (filters.sort) {
      case 'alpha-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alpha-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'year-desc':
        result.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'year-asc':
        result.sort((a, b) => a.releaseYear - b.releaseYear);
        break;
    }

    return result;
  }, [filters]);

  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = { All: games.length };
    games.forEach((g) => {
      counts[g.platform] = (counts[g.platform] ?? 0) + 1;
    });
    return counts;
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.platform !== 'All') count++;
    if (filters.genre) count++;
    if (filters.playerMode) count++;
    return count;
  }, [filters]);

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(defaultFilters);
  }

  return {
    filters,
    filteredGames,
    platformCounts,
    activeFilterCount,
    updateFilter,
    clearFilters,
  };
}
