import * as React from 'react';
import { motion } from 'motion/react';
import { Band } from '../types';
import { Shield, Zap, Music } from 'lucide-react';

interface FighterCardProps {
  band: Band;
  isSelected?: boolean;
  onSelect?: (band: Band) => void;
  votes?: number;
}

export function FighterCard({ band, isSelected, onSelect, votes }: FighterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden border transition-all duration-300 h-[480px] md:h-[520px] shadow-2xl ${
        isSelected ? 'border-red-600 bg-zinc-900 ring-2 ring-red-600/20' : 'border-zinc-800 bg-zinc-900/50'
      } cursor-pointer group`}
      onClick={() => onSelect?.(band)}
      id={`fighter-${band.id}`}
    >
      <div className="h-4/5 relative overflow-hidden">
        <img
          src={band.imageUrl}
          alt={band.name}
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        
        {/* City Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-[0.2em]">
          {band.city} / ORIGIN
        </div>

        {/* Band Name Overlay */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter leading-none mb-2 text-white">
            {band.name}
          </h3>
          <p className="text-zinc-400 text-xs italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            "{band.bio.split('.')[0]}."
          </p>
        </div>
      </div>

      {/* Stats Section / Action Button Area */}
      <div className="h-1/5 bg-zinc-950 flex flex-col items-center justify-center p-4 border-t border-red-900/30">
        <div className="w-full space-y-2 mb-2 group-hover:hidden transition-all duration-300">
          <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500">
            <span>Power Level</span>
            <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${band.stats.power * 10}%` }}
                className="h-full bg-red-600"
              />
            </div>
          </div>
        </div>

        <button 
          className={`w-full py-3 font-black uppercase tracking-tighter transition-all duration-300 ${
            isSelected 
              ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
              : 'bg-white text-black hover:bg-red-600 hover:text-white'
          }`}
        >
          {isSelected ? 'EL CAMPEÓN' : 'VER ASALTO'}
        </button>
      </div>

      {/* VS Badge for certain layouts */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-xs italic text-white shadow-lg"
          >
            VS
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
