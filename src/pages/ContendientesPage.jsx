import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { bands, statLabels } from '../data/contendientes';
import ArcadeBorder from '../components/ArcadeBorder';

function StatBar({ label, value, color = 'rosa' }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-8bit-secondary text-[8px] text-zinc-400 uppercase tracking-wider min-w-[130px] leading-none">
        {label}
      </span>
      <div className="flex-1 relative">
        <div className="h-3 bg-black border border-zinc-700 relative overflow-hidden">
          <div
            className="h-full relative transition-all duration-700 ease-out"
            style={{ width: `${value}%` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${color === 'rosa' ? '#E6649C' : '#F2BC41'}, ${color === 'rosa' ? '#F2BC41' : '#E6649C'})`,
                boxShadow: `0 0 8px ${color === 'rosa' ? 'rgba(230,100,156,0.6)' : 'rgba(242,188,65,0.6)'}`,
              }}
            />
            {/* Segment lines overlay for SF2 health bar look */}
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 9px)`,
              }}
            />
          </div>
        </div>
      </div>
      <span className="font-8bit text-[9px] text-zinc-500 min-w-[28px] text-right">
        {value}
      </span>
    </div>
  );
}

export default function ContendientesPage() {
  const [currentBandIndex, setCurrentBandIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const [flashKey, setFlashKey] = useState(0);
  const [waveKey, setWaveKey] = useState(0);
  const [waveOrigin, setWaveOrigin] = useState({ x: 132.29, y: 132.29 });
  const [glitchHitId, setGlitchHitId] = useState(null);

  const currentBand = bands[currentBandIndex];

  const handleBandChange = (index) => {
    if (index === currentBandIndex) return;
    setCurrentBandIndex(index);
    setSelectedMember(null);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 pt-12 pb-24 z-10 w-full arcade-grid-bg">
      {/* Sub-navbar — SF2 character select tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {bands.map((band, i) => (
          <button
            key={band.id}
            onClick={() => handleBandChange(i)}
            className="relative group"
          >
            {/* Corner accents */}
            {i === currentBandIndex && (
              <>
                <div className="absolute -top-[2px] -left-[2px] w-3 h-3 z-20"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', background: '#E6649C' }} />
                <div className="absolute -top-[2px] -right-[2px] w-3 h-3 z-20"
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)', background: '#E6649C' }} />
                <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 z-20"
                  style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)', background: '#E6649C' }} />
                <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 z-20"
                  style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)', background: '#E6649C' }} />
              </>
            )}
            <div
              className={`px-6 py-3 font-8bit text-[9px] uppercase tracking-wider border-4 transition-all duration-300 ${
                i === currentBandIndex
                  ? 'text-crema'
                  : 'text-zinc-500 border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:text-zinc-300'
              }`}
              style={
                i === currentBandIndex
                  ? {
                      borderColor: '#E6649C',
                      background: 'linear-gradient(180deg, rgba(230,100,156,0.25), rgba(230,100,156,0.05))',
                      boxShadow: [
                        '0 0 0 2px #E6649C',
                        '0 0 0 4px rgba(0,0,0,0.6)',
                        '0 0 0 6px #E6649C',
                        '0 0 12px rgba(230,100,156,0.4)',
                        'inset 0 0 20px rgba(230,100,156,0.1)',
                      ].join(', '),
                    }
                  : {}
              }
            >
              {band.name}
            </div>
          </button>
        ))}
      </div>

      {/* Hint text */}
      <p className="text-center font-8bit text-[8px] text-zinc-600 uppercase tracking-wider mt-5 mb-10">
        PULSA EN TU FAVORITO PARA SABER MÁS
      </p>

      {/* Carrusel con marco SF2 Character Select */}
      <div className="w-fit max-w-4xl mx-auto mb-16">
        <ArcadeBorder color="rosa" animated={true} title={currentBand.name}>
          <div className="relative bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBand.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {imgErrors[currentBand.id] ? (
                  <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-zinc-900 to-zinc-800">
                    <div className="text-center">
                      <p className="font-8bit text-lg text-zinc-600 uppercase tracking-wider">
                        {currentBand.name}
                      </p>
                      <p className="font-8bit text-[8px] text-zinc-700 uppercase tracking-wider mt-4">
                        IMAGEN PRÓXIMAMENTE
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative mx-auto w-fit">
                    {(() => {
                      const hasActiveSvg = selectedMember?.svgPath;
                      const clipId = `clip-active-${currentBand.id}`;
                      return (
                        <>
                          {/* Base image — blurred/darkened when a member is focused */}
                          <img
                            src={currentBand.image}
                            alt={currentBand.name}
                            className="max-h-[55vh] w-auto max-w-full [image-rendering:pixelated] block"
                            style={{ filter: hasActiveSvg ? 'blur(4px) brightness(0.4)' : 'none', transition: 'filter 0.3s ease' }}
                            onError={() => setImgErrors((prev) => ({ ...prev, [currentBand.id]: true }))}
                          />

                          {/* SVG overlay — same coordinate space as the viewBox — handles both the sharp clip and the glitch borders */}
                          <svg
                            viewBox="0 0 264.58333 264.58333"
                            className="absolute inset-0 w-full h-full z-10 overflow-visible"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              {hasActiveSvg && (
                                <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                                  <path d={selectedMember.svgPath} />
                                </clipPath>
                              )}
                            </defs>

                            {/* Sharp version of the band photo, clipped to the selected member */}
                            {hasActiveSvg && (
                              <image
                                href={currentBand.image}
                                x="0" y="0"
                                width="264.58333" height="264.58333"
                                preserveAspectRatio="none"
                                clipPath={`url(#${clipId})`}
                              />
                            )}

                            {/* Glitch borders for each member */}
                            {currentBand.members.filter(m => m.svgPath).map(member => {
                              const isActive = selectedMember?.id === member.id;
                              return (
                                <g
                                  key={`svg-${member.id}`}
                                  className={`path-group ${isActive ? 'is-active' : ''} ${glitchHitId === member.id ? 'glitch-hit' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const isDeselect = selectedMember?.id === member.id;
                                    setSelectedMember(prev => prev?.id === member.id ? null : member);
                                    if (!isDeselect) {
                                      setFlashKey(prev => prev + 1);
                                      setWaveKey(prev => prev + 1);
                                      const coords = member.coords;
                                      setWaveOrigin(coords
                                        ? {
                                            x: ((coords.x + coords.w / 2) / 100) * 264.58333,
                                            y: ((coords.y + coords.h / 2) / 100) * 264.58333,
                                          }
                                        : { x: 132.29, y: 132.29 }
                                      );
                                      setGlitchHitId(member.id);
                                      setTimeout(() => setGlitchHitId(null), 400);
                                    }
                                  }}
                                >
                                  <title>{member.name}</title>
                                  <path d={member.svgPath} className="glitch-cyan" />
                                  <path d={member.svgPath} className="glitch-magenta" />
                                  <path d={member.svgPath} className="glitch-center" />
                                  {/* Fat invisible hit area */}
                                  <path d={member.svgPath} style={{ fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)', strokeWidth: 15 }} />
                                </g>
                              );
                            })}

                            {/* Rectangular overlay for members without svgPath */}
                            {currentBand.members.filter(m => !m.svgPath).map((member) => (
                              <foreignObject
                                key={member.id}
                                x={`${member.coords.x}%`}
                                y={`${member.coords.y}%`}
                                width={`${member.coords.w}%`}
                                height={`${member.coords.h}%`}
                              >
                                <div
                                  className="w-full h-full border-2 border-transparent hover:border-rosa/70 hover:bg-rosa/15 transition-all cursor-pointer"
                                  onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}
                                />
                              </foreignObject>
                            ))}

                            {/* LOCKED ON — Anillos de onda expansiva */}
                            {waveKey > 0 && selectedMember && (
                              <g key={`wave-${waveKey}`}>
                                {[0, 1, 2].map(i => (
                                  <motion.circle
                                    key={i}
                                    cx={waveOrigin.x}
                                    cy={waveOrigin.y}
                                    r={3}
                                    fill="none"
                                    stroke={i === 0 ? '#00ffff' : i === 1 ? '#ff00ff' : '#E6649C'}
                                    strokeWidth={i === 2 ? 1.5 : 2.5}
                                    initial={{ r: 3, opacity: 0.8 }}
                                    animate={{ r: 170, opacity: 0 }}
                                    transition={{
                                      duration: 0.65 - i * 0.05,
                                      ease: 'easeOut',
                                      delay: i * 0.08,
                                    }}
                                  />
                                ))}
                              </g>
                            )}

                            {/* POWER SURGE — Flash blanco al seleccionar */}
                            {flashKey > 0 && (
                              <motion.rect
                                key={flashKey}
                                x="0" y="0"
                                width="264.58333" height="264.58333"
                                fill="white"
                                initial={{ opacity: 0.85 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                style={{ pointerEvents: 'none' }}
                              />
                            )}
                          </svg>
                        </>
                      );
                    })()}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ArcadeBorder>
      </div>

      {/* Card de integrante — SF2 Fighter Bio */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key={selectedMember.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="max-w-2xl mx-auto"
          >
            <ArcadeBorder
              color="rosa"
              variant="fighter-bio"
              animated={true}
              title="FICHA DEL LUCHADOR"
            >
              <div className="p-6 md:p-8">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="float-right font-8bit text-[8px] text-zinc-600 hover:text-rosa transition-colors tracking-wider"
                >
                  CERRAR [X]
                </button>

                <h3 className="font-8bit text-lg md:text-xl text-crema mb-6 uppercase leading-relaxed arcade-text-shadow-sm">
                  {selectedMember.name}
                </h3>

                <p className="text-zinc-400 italic border-l-4 border-rosa/50 pl-4 mb-8 text-sm leading-relaxed">
                  {selectedMember.bio}
                </p>

                <div className="space-y-3">
                  {['poder', 'velocidad', 'puestaEnEscena', 'resistencia', 'tecnica'].map((stat) => (
                    <StatBar
                      key={stat}
                      label={statLabels[stat]}
                      value={selectedMember.stats[stat]}
                    />
                  ))}
                </div>

                <div className="h-px bg-rosa/20 my-6" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-8bit text-[7px] text-zinc-600 uppercase tracking-wider">PESAJE</p>
                    <p className="font-8bit text-[11px] text-rosa mt-1">{selectedMember.stats.pesaje}</p>
                  </div>
                  <div>
                    <p className="font-8bit text-[7px] text-zinc-600 uppercase tracking-wider">ALTURA</p>
                    <p className="font-8bit text-[11px] text-rosa mt-1">{selectedMember.stats.altura}</p>
                  </div>
                  <div>
                    <p className="font-8bit text-[7px] text-zinc-600 uppercase tracking-wider">EDAD</p>
                    <p className="font-8bit text-[11px] text-rosa mt-1">{selectedMember.stats.edad}</p>
                  </div>
                </div>
              </div>
            </ArcadeBorder>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedMember && (
        <p className="text-center font-8bit text-[8px] text-zinc-700 uppercase tracking-wider">
          HAZ CLICK EN UN INTEGRANTE DE LA IMAGEN PARA VER SU FICHA
        </p>
      )}
    </main>
  );
}
