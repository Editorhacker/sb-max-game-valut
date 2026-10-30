import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { allGenres } from '../data/games';
import type { FilterState, SortOption } from '../types/game';

interface GameFiltersProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
  resultCount: number;
}

const playerModes = [
  'Single-player',
  'Local multiplayer',
  'Local co-op',
  'Online multiplayer',
  'Online co-op',
];

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'alpha-asc', label: 'A → Z' },
  { value: 'alpha-desc', label: 'Z → A' },
  { value: 'year-desc', label: 'Newest First' },
  { value: 'year-asc', label: 'Oldest First' },
];

function SelectField({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-[#111218] border border-white/10 hover:border-amber-400/40 focus:border-amber-400 text-white rounded-xl py-2.5 pl-4 pr-10 text-sm outline-none transition-colors cursor-pointer"
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

export function GameFilters({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
  resultCount,
}: GameFiltersProps) {
  return (
    <div id="filters" className="w-full">
      {/* Search */}
      <div className="relative mb-4 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
        <input
          id="game-search"
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Search by title, genre, developer, tags…"
          className="w-full bg-[#111218] border border-white/10 hover:border-amber-400/35 focus:border-red-500/70 text-white placeholder-gray-500 rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-all shadow-inner shadow-black/40"
        />
        {filters.search && (
          <button
            onClick={() => onFilterChange('search', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {/* Genre */}
        <SelectField
          id="genre-filter"
          label="Genre"
          value={filters.genre}
          onChange={(v) => onFilterChange('genre', v)}
        >
          <option value="">All Genres</option>
          {allGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </SelectField>

        {/* Player Mode */}
        <SelectField
          id="player-mode-filter"
          label="Player Mode"
          value={filters.playerMode}
          onChange={(v) => onFilterChange('playerMode', v)}
        >
          <option value="">All Modes</option>
          {playerModes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </SelectField>

        {/* Sort */}
        <SelectField
          id="sort-filter"
          label="Sort By"
          value={filters.sort}
          onChange={(v) => onFilterChange('sort', v as SortOption)}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span>
            <span className="text-amber-300 font-bold">{resultCount}</span>{' '}
            {resultCount === 1 ? 'game' : 'games'} found
          </span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/15 text-amber-300 text-xs font-semibold border border-amber-400/35">
              {activeFilterCount} active
            </span>
          )}
        </div>

        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={onClearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-semibold transition-colors border border-red-500/30 shadow-sm shadow-red-500/20"
            >
              <X className="w-3 h-3" />
              Clear filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
