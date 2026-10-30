import { Zap, MapPin, Clock, Wifi, MessageSquare } from 'lucide-react';
import { sfx } from '../lib/sound';

const quickLinks = [
  { label: 'Arena Home', href: '#home' },
  { label: 'Battle Rigs & Specs', href: '#stations' },
  { label: 'Must-Play Highlights', href: '#featured' },
  { label: 'Complete Game Vault', href: '#explore' },
  { label: 'Platform Filters', href: '#platforms' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 bg-[#060810] relative">
      {/* Top Laser Accent */}
      <div className="h-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-cyan-500 shadow-[0_0_12px_#e8192c]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand & Cafe Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3.5 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #e8192c 0%, #750a14 100%)',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  boxShadow: '0 0 25px rgba(232,25,44,0.4)',
                }}
              >
                <img src="/logo.png" alt="SB-MAX" className="w-7 h-7 object-cover rounded-sm" />
              </div>
              <div>
                <div className="font-display text-2xl font-black italic text-white uppercase tracking-wider leading-none">
                  SB-MAX <span className="text-red-500">GAMING CAFE</span>
                </div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase mt-0.5">
                  ESPORTS ARENA & VIP PODS
                </div>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              The premier gaming cafe and esports lounge. 24 battle stations equipped with RTX 4090s, PS5 Pros, and motion sim cockpits with ultra-fast gigabit LAN and pre-loaded games.
            </p>

            {/* Cafe perks pill */}
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Open 24/7
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" /> 1Gbps Dedicated Fiber
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Fuel Bar & Snacks
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-mono text-xs font-bold tracking-widest text-red-500 uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500" /> QUICK DIRECTORY
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => sfx.playTab()}
                    className="text-zinc-400 hover:text-white text-sm font-mono transition-colors block hover:translate-x-1 duration-200"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lounge Location & Discord */}
          <div>
            <h3 className="font-mono text-xs font-bold tracking-widest text-red-500 uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500" /> ARENA VENUE
            </h3>
            <div className="space-y-3 text-xs font-mono text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Downtown Tech Corridor, Sector 4, SB-MAX Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Discord: discord.gg/sbmax-arena</span>
              </div>
              <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-300 text-[11px] mt-4">
                💡 Walk-ins welcome anytime. Online reservations guarantee seat zero-wait lock!
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 SB-MAX Esports Gaming Cafe. All rights reserved.
          </div>
          <div className="text-zinc-400 flex items-center gap-1">
            Engineered with <Zap className="w-3 h-3 text-red-500 fill-red-500" /> for elite gamers.
          </div>
        </div>
      </div>
    </footer>
  );
}
