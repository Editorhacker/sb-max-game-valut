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
  'Single-player': ['single-player'],
  'Co-op': ['co-op', 'cooperative'],
  'Online multiplayer': ['online multiplayer', 'team-based', 'online pvp', 'moba'],
  'Local multiplayer': ['local multiplayer', 'local pvp', 'local co-op'],
};

export function useGameFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filteredGames = useMemo<Game[]>(() => {
    let result = [...games];

    // Platform filter
    if (filters.platform !== 'All') {
      result = result.filter((g) => g.platform === (filters.platform as Platform));
    }

    // Comprehensive Search filter (title, primaryGenre, genres, developer, publisher, platform, year, tags)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.primaryGenre.toLowerCase().includes(q) ||
          g.genres.some((genre) => genre.toLowerCase().includes(q)) ||
          g.developer.toLowerCase().includes(q) ||
          g.publisher.toLowerCase().includes(q) ||
          g.platform.toLowerCase().includes(q) ||
          g.releaseYear.toString().includes(q) ||
          g.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Flexible Genre filter (matches primary genre and genres array)
    if (filters.genre) {
      const gQuery = filters.genre.toLowerCase();
      result = result.filter((g) => {
        const matchesPrimary = g.primaryGenre.toLowerCase().includes(gQuery);
        const matchesGenres = g.genres.some((genre) => {
          const lGenre = genre.toLowerCase();
          return lGenre === gQuery || lGenre.includes(gQuery) || gQuery.includes(lGenre);
        });
        if (gQuery === 'rpg') {
          return (
            matchesPrimary ||
            matchesGenres ||
            g.primaryGenre.toLowerCase().includes('role-playing') ||
            g.genres.some((gen) => gen.toLowerCase().includes('role-playing'))
          );
        }
        return matchesPrimary || matchesGenres;
      });
    }

    // Player mode filter with broad matching
    if (filters.playerMode) {
      const modeQuery = filters.playerMode.toLowerCase();
      const matchTargets = PLAYER_MODE_GROUPS[filters.playerMode] ?? [modeQuery];
      result = result.filter((g) =>
        g.modes.some((m) =>
          matchTargets.some((target) => m.toLowerCase().includes(target))
        )
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
