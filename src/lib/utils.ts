import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Game } from '../types/game';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Curated high-res artwork posters for games that don't have Steam library posters or for fallbacks
const CUSTOM_COVERS: Record<string, string> = {
  'ps5-astro-bot': 'https://image.api.playstation.com/vulcan/ap/rnd/202405/2814/232a514d2a1c43d3b769ea87cbe85b469490df111dfdb4f3.png',
  'ps5-spider-man-2': 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155247e21850c7d075d01ebf0f3f5dbf19ccd2a1.jpg',
  'ps5-demons-souls': 'https://image.api.playstation.com/vulcan/img/rnd/202011/1717/GemRaOvdKzLp4rXj1uB0T6xQ.png',
  'ps5-gran-turismo-7': 'https://image.api.playstation.com/vulcan/ap/rnd/202109/1321/yZ2Jy8T5K12G3T6M8s9f7D0v.png',
  'ps4-bloodborne': 'https://image.api.playstation.com/vulcan/img/rnd/202010/2614/NVNmNmE9wB3i5u0N4c6Z5G4T.png',
  'ps4-the-last-of-us-part-ii': 'https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/04e9efda07e661bebe17bcab89ec329e71ecb15f0ebfc64e.png',
};

// Horizontal banner artwork (wide)
export function getGameHeaderUrl(game: Game): string {
  if (game.steamAppId) {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${game.steamAppId}/header.jpg`;
  }
  return CUSTOM_COVERS[game.id] || getSteamImageUrl(1091500);
}

// Vertical poster artwork (2:3 or 3:4)
export function getGameCoverUrl(game: Game): string {
  if (CUSTOM_COVERS[game.id]) {
    return CUSTOM_COVERS[game.id];
  }
  if (game.steamAppId) {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${game.steamAppId}/library_600x900.jpg`;
  }
  return 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_600x900.jpg'; // Cyberpunk backup
}

export function getSteamImageUrl(steamAppId: number): string {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/library_600x900.jpg`;
}

export function getPlatformBadgeClass(platform: string): string {
  switch (platform) {
    case 'PS5':
      return 'bg-blue-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]';
    case 'PS4':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]';
    case 'PC':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
    default:
      return 'bg-red-500/20 text-red-300 border-red-500/40';
  }
}

// Gaming Cafe Hardware Rig assignment
export function getCafeRigInfo(game: Game): { rigName: string; specs: string; fps: string; status: 'Available' | 'In Session' } {
  if (game.platform === 'PC') {
    return {
      rigName: 'Titan Rig Alpha',
      specs: 'RTX 4090 • i9-14900K • 360Hz OLED',
      fps: '240+ FPS Ultra',
      status: 'Available',
    };
  }
  if (game.platform === 'PS5') {
    return {
      rigName: 'PS5 Pro Pod 04',
      specs: '65" Sony BRAVIA OLED • DualSense Edge',
      fps: '120 FPS 4K HDR',
      status: 'Available',
    };
  }
  return {
    rigName: 'Squad Couch Lounge',
    specs: '4-Player Co-op • 4K HDR • Wireless Audio',
    fps: '60 FPS Smooth',
    status: 'Available',
  };
}

export function getGenreGradient(primaryGenre: string): string {
  const gradients: Record<string, string> = {
    'Platformer': 'from-amber-600 via-orange-600 to-rose-700',
    'Action-adventure': 'from-red-700 via-rose-700 to-orange-700',
    'Action RPG': 'from-violet-700 via-purple-800 to-indigo-950',
    'JRPG': 'from-pink-600 via-fuchsia-700 to-purple-900',
    'Survival horror': 'from-gray-900 via-red-950 to-black',
    'Racing': 'from-sky-600 via-cyan-700 to-blue-900',
    'Sports': 'from-green-600 via-emerald-700 to-teal-900',
    'Fighting': 'from-red-600 via-orange-700 to-amber-800',
    'Shooter': 'from-zinc-700 via-slate-800 to-zinc-950',
    'MOBA': 'from-teal-600 via-cyan-700 to-blue-900',
    'Strategy': 'from-amber-600 via-yellow-700 to-amber-950',
    'Roguelike': 'from-indigo-700 via-purple-900 to-slate-950',
    'Simulation': 'from-sky-700 via-blue-800 to-indigo-950',
    'Sandbox': 'from-lime-600 via-green-700 to-emerald-900',
    'Puzzle': 'from-cyan-600 via-teal-700 to-blue-950',
    'Role-playing': 'from-purple-600 via-violet-800 to-indigo-950',
    'Co-op adventure': 'from-fuchsia-600 via-rose-700 to-red-950',
    'Open-world action-adventure': 'from-orange-700 via-red-800 to-stone-950',
  };
  return gradients[primaryGenre] ?? 'from-slate-800 via-zinc-900 to-black';
}
