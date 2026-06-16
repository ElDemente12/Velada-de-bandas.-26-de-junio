import * as React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Music } from 'lucide-react';

export function FighterCard({ band, isSelected, onSelect, votes }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden border transition-all duration-300 h-[480px] md:h-[520px] shadow-2xl ${
        isSelected ? 'border-rosa bg-gris-oscuro ring-2 ring-rosa/20' : 'border-gris-oscuro bg-gris-oscuro/50'
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
        <div className="absolute top-4 left-4 bg-rosa text-crema text-[10px] font-black px-2 py-0.5 uppercase tracking-[0.2em]">
          {band.city} / ORIGIN
        </div>

        {/* Band Name Overlay */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter leading-none mb-2 text-crema">
            {band.name}
          </h3>
          <p className="text-zinc-400 text-xs italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            "{band.bio.split('.')[0]}."
          </p>
        </div>
      </div>

      {/* Stats Section / Action Button Area */}
      <div className="h-1/5 bg-gris-mas-oscuro flex flex-col items-center justify-center p-4 border-t border-verde/30">
        <div className="w-full space-y-2 mb-2 group-hover:hidden transition-all duration-300">
          <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500">
            <span>Power Level</span>
            <div className="w-32 h-1 bg-gris-oscuro rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${band.powerLevel * 10}%` }}
                className="h-full bg-rosa"
              />
            </div>
          </div>
        </div>

        <button 
          className={`w-full py-3 font-black uppercase tracking-tighter transition-all duration-300 ${
            isSelected 
              ? 'bg-rosa text-crema shadow-[0_0_20px_rgba(230,100,156,0.4)]' 
              : 'bg-crema text-black hover:bg-rosa hover:text-crema'
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
            className="w-10 h-10 rounded-full bg-rosa flex items-center justify-center font-black text-xs italic text-crema shadow-lg"
          >
            VS
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
