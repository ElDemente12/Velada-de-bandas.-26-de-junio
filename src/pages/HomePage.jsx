import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { getBands, getSettings, getUserVote, submitVote } from '../services/api';
import { FighterCard } from '../components/FighterCard';

export default function HomePage() {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState(null);
  const [selectedBand, setSelectedBand] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  const [isVotingOpen, setIsVotingOpen] = useState(true);

  // Initialize and start polling
  useEffect(() => {
    const init = async () => {
      try {
        const bandsData = await getBands();
        setBands(bandsData);

        const voteData = await getUserVote();
        if (voteData) {
          setUserVote(voteData.bandId);
        }

        const settingsData = await getSettings();
        setIsVotingOpen(settingsData.isVotingOpen);
      } catch (err) {
        console.error('Initialization failed:', err);
        setError('Error al conectar con el ring de votación.');
      } finally {
        setLoading(false);
      }
    };

    init();

    const handleStorageChange = (e) => {
      if (e.key === 'app_settings' && e.newValue) {
        try {
          const settings = JSON.parse(e.newValue);
          setIsVotingOpen(settings.isVotingOpen);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (selectedBand) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBand]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedBand(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleVote = async (bandId) => {
    if (userVote) return;

    setIsVoting(true);
    setError(null);
    try {
      await submitVote(bandId);
      setUserVote(bandId);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al registrar el voto. ¿Se acabó la tortilla?');
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-rosa animate-spin" />
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-12 pb-24 z-10 w-full">
        {!isVotingOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rosa/15 border-2 border-rosa p-6 text-center mb-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 bg-rosa text-crema text-[8px] font-black px-2 py-0.5 uppercase tracking-[0.2em]">
              SISTEMA
            </div>
            <p className="text-rosa font-black text-xs md:text-sm tracking-widest uppercase italic animate-pulse">
              ⚠️ EL RING ESTÁ CERRADO · LAS VOTACIONES SE ENCUENTRAN TEMPORALMENTE PAUSADAS ⚠️
            </p>
          </motion.div>
        )}

        {!selectedBand && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-zinc-500 font-black uppercase tracking-[0.5em] text-xs mb-4">SELECCIONA TU CONTENDIENTE</h2>
            <div className="h-1 w-24 bg-rosa mx-auto" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative">
          {bands.map((band) => (
            <FighterCard
              key={band.id}
              band={band}
              isSelected={selectedBand?.id === band.id}
              onSelect={setSelectedBand}
              votes={undefined}
            />
          ))}
        </div>

        {bands.length === 0 && (
          <div className="flex flex-col items-center gap-4 mb-12 opacity-50">
            <p className="text-rosa font-black text-xs animate-pulse">NO SE HAN ENCONTRADO BANDAS EN EL RING</p>
          </div>
        )}

        <AnimatePresence>
          {selectedBand && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBand(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-sm z-40"
              />

              {/* Modal Box */}
              <motion.section
                key={selectedBand.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-gris-oscuro border-2 border-verde/50 p-6 md:p-10 rounded-sm relative overflow-y-auto max-h-[85vh] w-full max-w-4xl z-50 shadow-[0_0_50px_rgba(230,100,156,0.25)] arcade-double-outline-rosa/20"
              >
                <div className="absolute top-0 right-0 p-4 z-55">
                  <button
                    onClick={() => setSelectedBand(null)}
                    className="text-zinc-500 hover:text-rosa transition-colors font-black text-xs tracking-widest cursor-pointer"
                  >
                    CERRAR [X]
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 pt-4 lg:pt-0">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-4 mb-3">
                      <Zap className="w-5 h-5 text-rosa fill-current" />
                      <span className="text-rosa font-black text-xs tracking-[0.3em] uppercase">PERFIL DEL LUCHADOR</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-6 text-crema">
                      {selectedBand.name}
                    </h2>
                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed italic mb-8 font-light border-l-4 border-verde pl-6">
                      {selectedBand.bio}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {!userVote ? (
                        <button
                          onClick={() => handleVote(selectedBand.id)}
                          disabled={isVoting || !isVotingOpen}
                          className="group relative px-10 py-5 bg-rosa text-crema font-black uppercase tracking-tighter italic text-lg shadow-[0_0_30px_rgba(230,100,156,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isVoting ? (
                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                          ) : !isVotingOpen ? (
                            'VOTACIONES CERRADAS'
                          ) : (
                            'LANZAR VOTO AL RING'
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center gap-4 bg-gris-mas-oscuro border border-gris-oscuro px-6 py-4 w-full sm:w-auto">
                          <Trophy className="w-6 h-6 text-rosa" />
                          <span className="font-black uppercase tracking-widest text-xs text-zinc-400">
                            TU VOTO HA SIDO REGISTRADO
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="bg-gris-mas-oscuro p-6 border border-gris-oscuro h-full flex flex-col justify-center">
                      <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-4">Métricas de Combate</div>
                      <div className="space-y-4">
                        {['power', 'attitude', 'sound'].map((stat) => (
                          <div key={stat} className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-400 uppercase font-bold">{stat}</span>
                            <div className="w-full max-w-[140px] h-1 bg-gris-oscuro ml-4 overflow-hidden">
                              <div className="h-full bg-rosa" style={{ width: `${selectedBand.stats[stat] * 10}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="h-24 bg-gris-mas-oscuro border-t border-gris-oscuro px-6 md:px-12 flex items-center justify-between z-10 shrink-0">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-black">EVENTO</span>
            <span className="font-mono font-bold text-rosa text-sm">#tortillas_patadas</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="hidden md:block text-[9px] text-zinc-500 italic uppercase tracking-wider max-w-[240px] text-right">
            SISTEMA DE VOTACIÓN EN TIEMPO REAL. UN SOLO DISPOSITIVO, UN SOLO VOTO.
          </p>
          <div className="h-12 w-1.5 bg-rosa shadow-[0_0_15px_rgba(230,100,156,0.5)]" />
        </div>
      </footer>

      {error && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-rosa p-4 border-2 border-crema flex items-center gap-3 shadow-[0_0_50px_rgba(230,100,156,0.5)] z-[100]"
        >
          <AlertTriangle className="w-6 h-6 text-crema" />
          <span className="font-black uppercase text-xs tracking-widest text-crema">{error}</span>
          <button onClick={() => setError(null)} className="ml-4 font-mono text-[10px] bg-black/20 px-2 py-0.5">X</button>
        </motion.div>
      )}
    </>
  );
}
