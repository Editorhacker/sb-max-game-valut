import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { allGenres } from '../data/games';
import type { FilterState, SortOption } from '../types/game';
import { sfx } from '../lib/sound';

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
  id, label, value, onChange, children,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => {
            sfx.playTab();
            onChange(e.target.value);
          }}
          className="vault-input w-full appearance-none py-2.5 pl-4 pr-10 text-sm rounded-none font-mono"
          style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
      </div>
    </div>
  );
}

export function GameFilters({
  filters, onFilterChange, onClearFilters, activeFilterCount, resultCount,
}: GameFiltersProps) {
  return (
    <div id="filters" className="w-full">
      {/* Search Bar */}
      <div className="relative mb-5 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-red-500 transition-colors z-10" />
        <input
          id="game-search"
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Filter by title, genre, developer, tags…"
          className="vault-input w-full py-3.5 pl-11 pr-10 text-sm rounded-none font-mono"
          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
        />
        {filters.search && (
          <button
            onClick={() => {
              sfx.playClick();
              onFilterChange('search', '');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <SelectField id="genre-filter" label="Genre" value={filters.genre} onChange={(v) => onFilterChange('genre', v)}>
          <option value="">All Genres</option>
          {allGenres.map((g) => <option key={g} value={g}>{g}</option>)}
        </SelectField>

        <SelectField id="player-mode-filter" label="Player Mode" value={filters.playerMode} onChange={(v) => onFilterChange('playerMode', v)}>
          <option value="">All Modes</option>
          {playerModes.map((m) => <option key={m} value={m}>{m}</option>)}
        </SelectField>

        <SelectField id="sort-filter" label="Sort By" value={filters.sort} onChange={(v) => onFilterChange('sort', v as SortOption)}>
          {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </SelectField>
      </div>

      {/* Result Count + Reset */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <SlidersHorizontal className="w-4 h-4 text-red-500" />
          <span className="font-mono text-xs">
            <strong className="text-amber-400 font-display text-base italic">{resultCount}</strong>{' '}
            {resultCount === 1 ? 'game' : 'games'} matched
          </span>
          {activeFilterCount > 0 && (
            <span
              className="px-2 py-0.5 text-[10px] font-mono font-bold text-red-400 border border-red-500/30 bg-red-600/10"
            >
              {activeFilterCount} active filters
            </span>
          )}
        </div>

        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => {
                sfx.playClick();
                onClearFilters();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-red-400 border border-red-500/30 hover:bg-red-500/15 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
