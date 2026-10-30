import { motion } from 'framer-motion';
import type { Platform } from '../types/game';

interface PlatformSelectorProps {
  selected: Platform | 'All';
  onSelect: (platform: Platform | 'All') => void;
  counts: Record<string, number>;
}

const platforms: Array<{ id: Platform | 'All'; label: string; icon: string }> = [
  { id: 'All', label: 'All Games', icon: '🎮' },
  { id: 'PS5', label: 'PlayStation 5', icon: '🔵' },
  { id: 'PS4', label: 'PlayStation 4', icon: '🟣' },
  { id: 'PC', label: 'PC', icon: '💻' },
];

export function PlatformSelector({ selected, onSelect, counts }: PlatformSelectorProps) {
  return (
    <div id="platforms" className="w-full">
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {platforms.map((platform) => {
          const isActive = selected === platform.id;
          return (
            <motion.button
              key={platform.id}
              id={`platform-btn-${platform.id}`}
              onClick={() => onSelect(platform.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white border-amber-400/60 shadow-lg shadow-red-600/35'
                  : 'bg-[#111218] text-gray-300 border-white/10 hover:border-amber-400/30 hover:bg-[#181922]'
              }`}
            >
              <span className="text-base">{platform.icon}</span>
              <span>{platform.label}</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  isActive
                    ? 'bg-black/40 text-amber-300 border border-amber-400/30'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {counts[platform.id] ?? 0}
              </span>
              {isActive && (
                <motion.div
                  layoutId="platform-indicator"
                  className="absolute inset-0 rounded-xl ring-2 ring-amber-400/50 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
