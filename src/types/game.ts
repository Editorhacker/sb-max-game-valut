export type Platform = 'PS5' | 'PS4' | 'PC';

export type PlayerMode =
  | 'Single-player'
  | 'Local multiplayer'
  | 'Local co-op'
  | 'Local PvP'
  | 'Online multiplayer'
  | 'Online co-op'
  | 'Online PvP'
  | 'Team-based multiplayer'
  | 'Creative';

export interface Game {
  id: string;
  title: string;
  platform: Platform;
  primaryGenre: string;
  genres: string[];
  releaseYear: number;
  developer: string;
  publisher: string;
  players: string;
  modes: PlayerMode[];
  description: string;
  highlights: string[];
  tags: string[];
  steamAppId: number | null;
}

export type SortOption =
  | 'alpha-asc'
  | 'alpha-desc'
  | 'year-desc'
  | 'year-asc';

export interface FilterState {
  search: string;
  platform: Platform | 'All';
  genre: string;
  playerMode: string;
  sort: SortOption;
}
