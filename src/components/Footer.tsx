import { Globe, Share2 } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Featured', href: '#featured' },
  { label: 'Explore Games', href: '#explore' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'Genres', href: '#filters' },
];

const platforms = ['PlayStation 5', 'PlayStation 4', 'PC'];

export function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-amber-400/15 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-red-600 via-amber-400 to-red-600 shadow-lg shadow-amber-500/20">
                <img
                  src="/logo.png"
                  alt="SB-MAX Game Vault"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none">
                  SB-MAX
                </span>
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-red-500 uppercase mt-0.5">
                  GAME <span className="text-amber-400">VAULT</span>
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The premier gaming discovery &amp; session vault. Browse, search, and book 30 curated titles across
              PS5, PS4, and PC with the power of SB-MAX.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-amber-400/10 border border-white/8 hover:border-amber-400/40 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-amber-400/10 border border-white/8 hover:border-amber-400/40 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-300 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-4">Platforms</h3>
            <ul className="space-y-2.5">
              {platforms.map((p) => (
                <li key={p} className="text-gray-400 text-sm">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SB-MAX Game Vault. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Powered by SB-MAX <span className="text-amber-400 font-semibold">Vault Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
