import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { sfx } from '../lib/sound';

interface StationProps {
  onSelectStation: (stationName: string) => void;
}

const STATIONS = [
  {
    id: 'pc-titan',
    title: 'TITAN BATTLE RIG',
    badge: '12 STATIONS',
    status: '3 OPEN NOW',
    statusColor: 'text-emerald-400',
    image: '/cafe-arena.jpg',
    tagline: 'Esports Tournament Standard • 360Hz OLED',
    price: '$6',
    unit: 'per hour',
    specs: [
      { label: 'GPU', value: 'NVIDIA RTX 4090 24GB' },
      { label: 'CPU', value: 'Intel Core i9-14900KS' },
      { label: 'Display', value: 'Alienware 27" 360Hz QD-OLED' },
      { label: 'Gear', value: 'Wooting 60HE + G Pro Superlight' },
      { label: 'Audio', value: 'Beyerdynamic DT 990 Pro + Shure MV7' },
      { label: 'Chair', value: 'Secretlab Titan Evo 2024' },
    ],
    accent: '#e8192c',
  },
  {
    id: 'ps5-vip',
    title: 'VIP PS5 PRO SUITE',
    badge: '8 PRIVATE PODS',
    status: '2 OPEN NOW',
    statusColor: 'text-cyan-400',
    image: '/vip-pod.jpg',
    tagline: '65" Sony BRAVIA OLED • Private Soundproof Pod',
    price: '$8',
    unit: 'per hour',
    specs: [
      { label: 'Console', value: 'PlayStation 5 Pro 2TB SSD' },
      { label: 'Screen', value: 'Sony 65" 4K BRAVIA XR OLED 120Hz' },
      { label: 'Controller', value: 'DualSense Edge + 2x Wireless' },
      { label: 'Audio', value: 'Dolby Atmos 7.1 Acoustic Suite' },
      { label: 'Seating', value: 'Power-Reclining Leather Capsule' },
      { label: 'Amenities', value: 'Drink Chiller + Fast Wireless Charger' },
    ],
    accent: '#00d4ff',
  },
  {
    id: 'sim-racing',
    title: 'HYDRAULIC SIM RACING',
    badge: '4 MOTION COCKPITS',
    status: '1 OPEN NOW',
    statusColor: 'text-amber-400',
    image: '/cafe-arena.jpg',
    tagline: 'Fanatec Direct Drive • Triple Panoramic Curved',
    price: '$10',
    unit: 'per hour',
    specs: [
      { label: 'Wheel Base', value: 'Fanatec DD Pro 20Nm Force' },
      { label: 'Pedals', value: 'Heusinkveld Sprint Load Cell' },
      { label: 'Panels', value: 'Triple 32" Curved 240Hz Displays' },
      { label: 'Platform', value: 'D-BOX 4-Actuator Motion System' },
      { label: 'Shifter', value: 'Sequential & H-Pattern Gearbox' },
      { label: 'VR Headset', value: 'Meta Quest 3 / PS VR2 (Optional)' },
    ],
    accent: '#ffd700',
  },
];

export function BattleStations({ onSelectStation }: StationProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="stations" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="w-8 h-0.5 bg-red-600 shadow-[0_0_8px_#e8192c]" />
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-red-500 uppercase">
            CAFE HARDWARE ARSENAL
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black italic uppercase text-white tracking-tight leading-none mb-2 sm:mb-3">
              CHOOSE YOUR <span className="text-red-500">BATTLE RIG</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Every station is engineered for zero-compromise performance. Book by the hour or grab an all-night pass with complimentary energy drinks.
            </p>
          </div>

          {/* Quick tab switcher - Mobile friendly flex wrap / scroll */}
          <div className="flex items-center gap-1.5 bg-[#0d0f1a] p-1.5 border border-white/10 overflow-x-auto max-w-full">
            {STATIONS.map((station, idx) => (
              <button
                key={station.id}
                onClick={() => {
                  sfx.playTab();
                  setActiveTab(idx);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 font-display text-xs sm:text-sm font-black italic uppercase whitespace-nowrap transition-all ${
                  activeTab === idx
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(232,25,44,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {station.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {STATIONS.map((station, index) => {
          const isSelected = activeTab === index;
          return (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              onClick={() => {
                sfx.playClick();
                setActiveTab(index);
              }}
              onMouseEnter={() => sfx.playHover()}
              className={`relative bg-[#0d0f1a] border transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-red-500 shadow-[0_0_35px_rgba(232,25,44,0.3)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
              }}
            >
              {/* Top Banner Image with Overlay */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={station.image}
                  alt={station.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/40 to-transparent" />

                {/* Badge top left */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md text-white border border-white/20">
                    {station.badge}
                  </span>
                  <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md border border-white/20 ${station.statusColor} flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    {station.status}
                  </span>
                </div>

                {/* Price tag top right */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-right bg-black/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 border border-white/20">
                  <div className="font-display text-xl sm:text-2xl font-black italic text-amber-400 leading-none">
                    {station.price}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 block">{station.unit}</span>
                </div>
              </div>

              {/* Station Body */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h3 className="font-display text-2xl sm:text-3xl font-black italic uppercase text-white tracking-wide mb-1 group-hover:text-red-400 transition-colors">
                  {station.title}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mb-5 sm:mb-6">
                  {station.tagline}
                </p>

                {/* Hardware Specs list */}
                <div className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8 flex-1">
                  {station.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-white/5"
                    >
                      <span className="font-mono text-zinc-500 uppercase">{spec.label}</span>
                      <span className="font-mono text-zinc-200 font-semibold text-right pl-2">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Book this Station Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playLockSuccess();
                    onSelectStation(station.title);
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full py-3 sm:py-3.5 bg-red-600 hover:bg-red-500 text-white font-display text-xs sm:text-sm font-black italic uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(232,25,44,0.4)] active:scale-98"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>RESERVE THIS STATION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
