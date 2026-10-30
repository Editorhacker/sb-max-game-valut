import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSteamImageUrl(steamAppId: number): string {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/library_600x900.jpg`;
}

export function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'PS5':
      return 'from-blue-500 to-blue-700';
    case 'PS4':
      return 'from-indigo-500 to-indigo-700';
    case 'PC':
      return 'from-emerald-500 to-emerald-700';
    default:
      return 'from-gray-500 to-gray-700';
  }
}

export function getPlatformBadgeClass(platform: string): string {
  switch (platform) {
    case 'PS5':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'PS4':
      return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    case 'PC':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
}

/** Generate a CSS gradient poster for games without artwork */
export function getGenreGradient(primaryGenre: string): string {
  const gradients: Record<string, string> = {
    'Platformer': 'from-yellow-600 via-orange-600 to-pink-700',
    'Action-adventure': 'from-red-700 via-rose-700 to-orange-600',
    'Action RPG': 'from-violet-700 via-purple-800 to-indigo-900',
    'JRPG': 'from-pink-600 via-fuchsia-700 to-purple-800',
    'Survival horror': 'from-gray-900 via-red-900 to-gray-900',
    'Racing': 'from-sky-600 via-cyan-700 to-blue-800',
    'Sports': 'from-green-600 via-emerald-700 to-teal-800',
    'Fighting': 'from-red-600 via-orange-700 to-yellow-600',
    'Shooter': 'from-gray-700 via-slate-800 to-gray-900',
    'MOBA': 'from-teal-600 via-cyan-700 to-blue-800',
    'Strategy': 'from-amber-600 via-yellow-700 to-orange-700',
    'Roguelike': 'from-indigo-700 via-violet-800 to-purple-900',
    'Simulation': 'from-sky-700 via-blue-800 to-indigo-900',
    'Sandbox': 'from-lime-600 via-green-700 to-emerald-800',
    'Puzzle': 'from-cyan-600 via-teal-700 to-blue-800',
    'Role-playing': 'from-violet-600 via-purple-700 to-indigo-800',
    'Co-op adventure': 'from-fuchsia-600 via-pink-700 to-rose-800',
    'Open-world action-adventure': 'from-amber-700 via-orange-800 to-red-900',
  };
  return gradients[primaryGenre] ?? 'from-slate-700 via-gray-800 to-slate-900';
}
