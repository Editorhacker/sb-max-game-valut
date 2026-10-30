import { motion } from 'framer-motion';
import { Gamepad2, Monitor, Disc, Sparkles } from 'lucide-react';
import type { Platform } from '../types/game';
import { sfx } from '../lib/sound';

interface PlatformSelectorProps {
  selected: Platform | 'All';
  onSelect: (platform: Platform | 'All') => void;
  counts: Record<string, number>;
}

const platforms = [
  { id: 'All', label: 'All Library', sub: 'Complete Arsenal', icon: Sparkles, color: '#e8192c' },
  { id: 'PC', label: 'PC Battle Rigs', sub: 'RTX 4090 • 360Hz', icon: Monitor, color: '#10b981' },
  { id: 'PS5', label: 'PS5 Pro Pods', sub: '4K OLED VIP Pods', icon: Gamepad2, color: '#00d4ff' },
  { id: 'PS4', label: 'PS4 Lounge', sub: 'Couch Co-op / Retro', icon: Disc, color: '#a855f7' },
];

export function PlatformSelector({ selected, onSelect, counts }: PlatformSelectorProps) {
  return (
    <div id="platforms" className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {platforms.map((platform) => {
          const isActive = selected === platform.id;
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              id={`platform-btn-${platform.id}`}
              onClick={() => {
                sfx.playTab();
                onSelect(platform.id as Platform | 'All');
              }}
              onMouseEnter={() => sfx.playHover()}
              className={`relative flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 text-left transition-all duration-300 border ${
                isActive
                  ? 'bg-[#0d0f1a] border-red-500 shadow-[0_0_25px_rgba(232,25,44,0.3)]'
                  : 'bg-[#0d0f1a]/70 border-white/10 hover:border-white/30 hover:bg-[#0d0f1a]'
              }`}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              {/* Active top line */}
              {isActive && (
                <motion.div
                  layoutId="platform-indicator"
                  className="absolute top-0 left-0 right-0 h-1 bg-red-600 shadow-[0_0_12px_#e8192c]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}

              {/* Icon box */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 border ${
                  isActive ? 'bg-red-600/20 text-white border-red-500' : 'bg-white/5 text-zinc-400 border-white/10'
                }`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
                }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: isActive ? platform.color : undefined }} />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-display text-xs sm:text-base font-black italic uppercase text-white truncate">
                    {platform.label}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.2 rounded flex-shrink-0 ${
                      isActive ? 'bg-red-600/30 text-red-300' : 'bg-white/5 text-zinc-500'
                    }`}
                  >
                    {counts[platform.id] ?? 0}
                  </span>
                </div>
                <span className="font-mono text-[9px] sm:text-[11px] text-zinc-400 truncate">
                  {platform.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
