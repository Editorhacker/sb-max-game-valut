import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  User,
  Users,
  Gamepad2,
  Tv,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';
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

const POPULAR_GENRES = [
  'Action',
  'RPG',
  'Shooter',
  'Adventure',
  'Racing',
  'Fighting',
  'Platformer',
  'Strategy',
  'Horror',
  'Sports',
];

const PLAYER_MODES = [
  { id: '', label: 'All Modes', icon: null },
  { id: 'Single-player', label: 'Single-Player', icon: User },
  { id: 'Co-op', label: 'Co-Op', icon: Users },
  { id: 'Online multiplayer', label: 'Online PvP / Squad', icon: Gamepad2 },
  { id: 'Local multiplayer', label: 'Local Couch Play', icon: Tv },
];

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'alpha-asc', label: 'A → Z (Alphabetical)' },
  { value: 'alpha-desc', label: 'Z → A (Alphabetical)' },
  { value: 'year-desc', label: 'Newest First (Release)' },
  { value: 'year-asc', label: 'Oldest First (Release)' },
];

export function GameFilters({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
  resultCount,
}: GameFiltersProps) {
  const [moreGenresOpen, setMoreGenresOpen] = useState(false);
  const moreGenresRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreGenresRef.current && !moreGenresRef.current.contains(event.target as Node)) {
        setMoreGenresOpen(false);
      }
    }
    if (moreGenresOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreGenresOpen]);

  // Remaining genres not in the popular list
  const otherGenres = useMemo(() => {
    return allGenres.filter(
      (g) => !POPULAR_GENRES.some((p) => p.toLowerCase() === g.toLowerCase())
    );
  }, []);

  const isPopularSelected = POPULAR_GENRES.some(
    (p) => p.toLowerCase() === filters.genre.toLowerCase()
  );
  const isOtherSelected = Boolean(filters.genre && !isPopularSelected);

  // Check which specific filters are active
  const hasSearch = Boolean(filters.search.trim());
  const hasGenre = Boolean(filters.genre);
  const hasMode = Boolean(filters.playerMode);
  const hasAnyFilter = hasSearch || hasGenre || hasMode || activeFilterCount > 0;

  return (
    <div id="filters" className="w-full flex flex-col gap-4 sm:gap-5">
      {/* ── Top Row: High-Tech Search Bar & Sort Dropdown ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-8 relative group">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-red-500 transition-colors pointer-events-none" />
          <input
            id="game-search"
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search 30+ games by title, genre, studio, tag..."
            className="w-full py-2.5 sm:py-3 pl-10 sm:pl-11 pr-10 text-xs sm:text-sm bg-black/60 border border-white/10 group-focus-within:border-red-500/80 group-focus-within:shadow-[0_0_20px_rgba(232,25,44,0.25)] text-white placeholder-zinc-500 outline-none transition-all font-mono"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          />
          {filters.search && (
            <button
              onClick={() => {
                sfx.playClick();
                onFilterChange('search', '');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="md:col-span-4 relative group">
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 group-focus-within:text-amber-400 pointer-events-none" />
            <select
              id="sort-filter"
              value={filters.sort}
              onChange={(e) => {
                sfx.playTab();
                onFilterChange('sort', e.target.value as SortOption);
              }}
              className="w-full appearance-none py-2.5 sm:py-3 pl-9 pr-9 text-xs sm:text-sm bg-black/60 border border-white/10 group-focus-within:border-amber-400/80 text-zinc-200 outline-none transition-all font-mono cursor-pointer"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0d0f1a] text-white">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Middle Row: Quick Genre Filter Chips ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            <Tag className="w-3 h-3 text-red-500" />
            <span>Popular Genres</span>
          </span>
        </div>

        {/* Scrollable / Wrap Genre Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* 'All' Chip */}
          <button
            onClick={() => {
              sfx.playTab();
              onFilterChange('genre', '');
            }}
            onMouseEnter={() => sfx.playHover()}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer border ${
              !filters.genre
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(232,25,44,0.45)]'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          >
            All Genres
          </button>

          {/* Popular Genre Buttons */}
          {POPULAR_GENRES.map((genre) => {
            const isSelected = filters.genre.toLowerCase() === genre.toLowerCase();
            return (
              <button
                key={genre}
                onClick={() => {
                  sfx.playTab();
                  onFilterChange('genre', isSelected ? '' : genre);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-[0_0_15px_rgba(232,25,44,0.5)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                {genre}
              </button>
            );
          })}

          {/* More Genres Custom Dropdown - Opens strictly below */}
          <div className="relative" ref={moreGenresRef}>
            <button
              type="button"
              onClick={() => {
                sfx.playClick();
                setMoreGenresOpen((prev) => !prev);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all border cursor-pointer ${
                isOtherSelected || moreGenresOpen
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(232,25,44,0.45)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              <span>{isOtherSelected ? `Genre: ${filters.genre}` : '+ More Genres...'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreGenresOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu - Positioned strictly below */}
            <AnimatePresence>
              {moreGenresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1 left-0 sm:left-auto sm:right-0 w-60 max-h-30 overflow-y-auto bg-[#090b14] border border-red-500/50 shadow-[0_12px_35px_rgba(0,0,0,0.9)] z-50 p-1.5 flex flex-col gap-0.5"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-zinc-400 tracking-wider border-b border-white/10 flex items-center justify-between">
                    <span>Additional Genres</span>
                    <span className="text-zinc-500">{otherGenres.length}</span>
                  </div>

                  <div className="flex flex-col gap-0.5 py-1">
                    {otherGenres.map((g) => {
                      const isSelected = filters.genre.toLowerCase() === g.toLowerCase();
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            sfx.playTab();
                            onFilterChange('genre', isSelected ? '' : g);
                            setMoreGenresOpen(false);
                          }}
                          className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-mono text-left transition-colors cursor-pointer rounded-sm ${
                            isSelected
                              ? 'bg-red-600/30 text-red-300 font-bold border-l-2 border-red-500'
                              : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span>{g}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#e8192c]" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Player Mode Filter Chips ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            <Users className="w-3 h-3 text-cyan-400" />
            <span>Player Mode</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {PLAYER_MODES.map((mode) => {
            const isSelected = filters.playerMode === mode.id;
            const Icon = mode.icon;
            return (
              <button
                key={mode.label}
                onClick={() => {
                  sfx.playTab();
                  onFilterChange('playerMode', isSelected && mode.id ? '' : mode.id);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Summary Row: Live Match Count + Single Clear Filter Button ── */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
            <span>
              MATCHING: <strong className="text-amber-400 font-display text-base italic">{resultCount}</strong> TITLES
            </span>
          </div>

          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-red-400 border border-red-500/30 bg-red-600/10">
              {activeFilterCount} Active
            </span>
          )}
        </div>

        {/* Single Clear Filter Button */}
        <AnimatePresence>
          {hasAnyFilter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => {
                sfx.playClick();
                onClearFilters();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold text-red-400 border border-red-500/40 bg-red-600/10 hover:bg-red-600/20 hover:border-red-500/70 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(232,25,44,0.2)]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
