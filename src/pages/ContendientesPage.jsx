import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';
import { bands, statLabels } from '../data/contendientes';

export default function ContendientesPage() {
  const [currentBandIndex, setCurrentBandIndex] = useState(0);
  const [prevBandIndex, setPrevBandIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const currentBand = bands[currentBandIndex];
  const direction = currentBandIndex >= prevBandIndex ? 1 : -1;
  const slideDistance = Math.abs(currentBandIndex - prevBandIndex) * 400 || 400;

  const handleBandChange = (index) => {
    if (index === currentBandIndex) return;
    setPrevBandIndex(currentBandIndex);
    setCurrentBandIndex(index);
    setSelectedMember(null);
  };

  const slideVariants = {
    enter: (d) => ({ x: d * slideDistance, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d * -slideDistance, opacity: 0 }),
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 pt-12 pb-24 z-10 w-full">
      {/* Sub-navbar */}
      <div className="flex flex-wrap justify-center gap-3">
        {bands.map((band, i) => (
          <button
            key={band.id}
            onClick={() => handleBandChange(i)}
            className={`px-6 py-3 font-black text-xs uppercase tracking-[0.3em] border transition-all ${
              i === currentBandIndex
                ? 'bg-rosa text-crema border-rosa shadow-[0_0_15px_rgba(230,100,156,0.3)]'
                : 'bg-verde/30 text-crema/60 border-verde/40 hover:bg-verde/50 hover:text-crema'
            }`}
          >
            {band.name}
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mt-4 mb-12">
        PULSA EN TU FAVORITO PARA SABER MÁS
      </p>

      {/* Carrusel */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative bg-gris-oscuro border-2 border-verde/50 overflow-hidden">
          <div className="relative min-h-[300px] md:min-h-[400px]">
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentBand.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative"
              >
                {imgErrors[currentBand.id] ? (
                  <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-gris-oscuro to-verde/20">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-crema/40">
                        {currentBand.name}
                      </p>
                      <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-3">
                        IMAGEN PRÓXIMAMENTE
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={currentBand.image}
                      alt={currentBand.name}
                      className="w-full h-auto [image-rendering:pixelated]"
                      onError={() => setImgErrors((prev) => ({ ...prev, [currentBand.id]: true }))}
                    />
                    <div className="absolute inset-0">
                      {currentBand.members.map((member) => (
                        <button
                          key={member.id}
                          className="absolute border-2 border-transparent hover:border-rosa/60 hover:bg-rosa/10 transition-all cursor-pointer"
                          style={{
                            left: `${member.coords.x}%`,
                            top: `${member.coords.y}%`,
                            width: `${member.coords.w}%`,
                            height: `${member.coords.h}%`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMember(member);
                          }}
                          title={member.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Card de integrante */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key={selectedMember.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="max-w-2xl mx-auto bg-gris-oscuro border-2 border-verde/50 p-8 relative"
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-zinc-600 hover:text-crema transition-colors font-black text-xs tracking-widest"
            >
              CERRAR [X]
            </button>

            <div className="flex items-center gap-4 mb-6">
              <Zap className="w-5 h-5 text-rosa fill-current" />
              <span className="text-rosa font-black text-xs tracking-[0.3em] uppercase">
                FICHA DEL LUCHADOR
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-crema mb-6">
              {selectedMember.name}
            </h3>

            <p className="text-zinc-400 italic border-l-4 border-verde pl-4 mb-8 text-sm leading-relaxed">
              {selectedMember.bio}
            </p>

            <div className="space-y-4">
              {['poder', 'velocidad', 'puestaEnEscena', 'resistencia', 'tecnica'].map((stat) => (
                <div key={stat} className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider min-w-[140px]">
                    {statLabels[stat]}
                  </span>
                  <div className="flex-1 h-2 bg-gris-mas-oscuro ml-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedMember.stats[stat]}%` }}
                      className="h-full bg-rosa"
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="ml-3 font-mono font-bold text-rosa text-xs min-w-[28px] text-right">
                    {selectedMember.stats[stat]}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-verde/30 my-6" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">PESAJE</p>
                <p className="font-mono font-bold text-rosa text-sm">{selectedMember.stats.pesaje}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">ALTURA</p>
                <p className="font-mono font-bold text-rosa text-sm">{selectedMember.stats.altura}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">EDAD</p>
                <p className="font-mono font-bold text-rosa text-sm">{selectedMember.stats.edad}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedMember && (
        <p className="text-center text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">
          HAZ CLICK EN UN INTEGRANTE DE LA IMAGEN PARA VER SU FICHA
        </p>
      )}
    </main>
  );
}
