import * as React from 'react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, doc, serverTimestamp, setDoc, getCountFromServer, where } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { OperationType } from '../constants';
import { seedInitialData } from '../services/seedService';
import { handleFirestoreError } from '../lib/utils';
import { FighterCard } from '../components/FighterCard';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState(null);
  const [results, setResults] = useState({});
  const [selectedBand, setSelectedBand] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await seedInitialData();
        await signInAnonymously(auth);
      } catch (err) {
        console.error('Initialization failed:', err);
        if (err.code === 'auth/admin-restricted-operation') {
          setError('ERROR: Debes activar el "Inicio de sesión anónimo" en la consola de Firebase (Authentication > Sign-in method).');
        } else {
          setError('Error al conectar con el ring: ' + (err.message || 'Error desconocido'));
        }
      }
    };
    init();

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const vRef = doc(db, 'votes', u.uid);
        onSnapshot(vRef, (snap) => {
          if (snap.exists()) {
            setUserVote(snap.data().bandId);
          }
        });
      }
    });

    const unsubBands = onSnapshot(collection(db, 'bands'), (snap) => {
      const bData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setBands(bData);
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubBands();
    };
  }, []);

  useEffect(() => {
    if (!bands.length) return;

    const updateCounts = async () => {
      const newResults = {};
      for (const band of bands) {
        const q = query(collection(db, 'votes'), where('bandId', '==', band.id));
        const countSnap = await getCountFromServer(q);
        newResults[band.id] = countSnap.data().count;
      }
      setResults(newResults);
    };

    const unsubVotes = onSnapshot(collection(db, 'votes'), () => {
      updateCounts();
    });

    return () => unsubVotes();
  }, [bands]);

  const handleVote = async (bandId) => {
    if (!user || userVote) return;

    setIsVoting(true);
    setError(null);
    try {
      const vRef = doc(db, 'votes', user.uid);
      await setDoc(vRef, {
        bandId,
        voterId: user.uid,
        timestamp: serverTimestamp()
      });
      setUserVote(bandId);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'votes');
      setError('Error al registrar el voto. ¿Se acabó la tortilla?');
    } finally {
      setIsVoting(false);
    }
  };

  const handleReSeed = async () => {
    setIsVoting(true);
    try {
      await seedInitialData();
      setError('Base de datos reiniciada con éxito.');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError('Error al reiniciar la base de datos.');
    } finally {
      setIsVoting(false);
    }
  };

  const simulateVoting = async () => {
    setIsVoting(true);
    try {
      const dummyVoters = Array.from({ length: 10 }, (_, i) => `sim_${Date.now()}_${i}`);
      const bandIds = bands.map(b => b.id);

      for (const voterId of dummyVoters) {
        const randomBandId = bandIds[Math.floor(Math.random() * bandIds.length)];
        try {
          await setDoc(doc(db, 'votes', voterId), {
            bandId: randomBandId,
            voterId: voterId,
            timestamp: serverTimestamp()
          });
        } catch (innerErr) {
          console.error(`Error adding vote for ${voterId}:`, innerErr);
        }
      }
      setError('Simulación completada: 10 votos añadidos.');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      console.error('Simulation failed:', err);
      setError('La simulación falló debido a las reglas de seguridad de Firestore.');
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
              votes={userVote ? results[band.id] : undefined}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mb-12 opacity-50 hover:opacity-100 transition-opacity">
           <div className="flex gap-4">
             <button
               onClick={simulateVoting}
               className="px-4 py-2 border border-dashed border-zinc-700 text-zinc-500 text-[10px] uppercase font-black tracking-widest hover:border-rosa hover:text-rosa"
             >
               [ SIMULAR 10 VOTOS ]
             </button>
             <button
               onClick={handleReSeed}
               className="px-4 py-2 border border-dashed border-zinc-700 text-zinc-500 text-[10px] uppercase font-black tracking-widest hover:border-rosa hover:text-rosa"
             >
               [ FORZAR RE-SEMILLA ]
             </button>
           </div>
           {bands.length === 0 && (
             <p className="text-rosa font-black text-xs animate-pulse">NO SE HAN ENCONTRADO BANDAS EN EL RING</p>
           )}
        </div>

        <AnimatePresence>
          {selectedBand && (
            <motion.section
              key={selectedBand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gris-oscuro border-2 border-verde/50 p-6 md:p-10 rounded-sm mb-16 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button
                  onClick={() => setSelectedBand(null)}
                  className="text-zinc-600 hover:text-crema transition-colors font-black text-xs tracking-widest"
                >
                  CERRAR [X]
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4 mb-3">
                    <Zap className="w-5 h-5 text-rosa fill-current" />
                    <span className="text-rosa font-black text-xs tracking-[0.3em] uppercase">PERFIL DEL LUCHADOR</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6 text-crema">
                    {selectedBand.name}
                  </h2>
                  <p className="text-lg md:text-xl text-zinc-400 leading-relaxed italic mb-10 font-light border-l-4 border-verde pl-6">
                    {selectedBand.bio}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {!userVote ? (
                      <button
                        onClick={() => handleVote(selectedBand.id)}
                        disabled={isVoting}
                        className="group relative px-10 py-5 bg-rosa text-crema font-black uppercase tracking-tighter italic text-lg shadow-[0_0_30px_rgba(230,100,156,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isVoting ? <Loader2 className="animate-spin" /> : 'LANZAR VOTO AL RING'}
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 bg-gris-mas-oscuro border border-gris-oscuro px-6 py-4">
                        <Trophy className="w-6 h-6 text-rosa" />
                        <span className="font-black uppercase tracking-widest text-xs text-zinc-400">
                          TU VOTO HA SIDO REGISTRADO
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 gap-4">
                   <div className="bg-gris-mas-oscuro p-6 border border-gris-oscuro">
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

                  <div className="bg-verde/20 p-8 border border-verde/40 flex flex-col justify-center">
                    <span className="text-[9px] text-rosa uppercase font-black tracking-[0.2em] mb-2 text-center">APOYO DEL PÚBLICO</span>
                    <div className="text-7xl font-display font-black text-crema text-center italic tracking-tighter">
                      {results[selectedBand.id] || 0}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {userVote && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t-2 border-gris-oscuro pt-16 flex flex-col items-center"
          >
            <h3 className="text-zinc-600 font-black uppercase tracking-[0.6em] text-[10px] mb-12">ESTADÍSTICAS GLOBALES DEL RING</h3>
            <div className="w-full max-w-3xl space-y-4">
              {bands
                .sort((a, b) => (results[b.id] || 0) - (results[a.id] || 0))
                .map((band, idx) => {
                  const totalVotes = bands.reduce((acc, curr) => acc + (results[curr.id] || 0), 0);
                  const percentage = totalVotes > 0 ? ((results[band.id] || 0) / totalVotes) * 100 : 0;
                  return (
                    <div key={band.id} className="flex items-center gap-6">
                       <span className={`text-xl font-black italic ${idx === 0 ? 'text-rosa' : 'text-zinc-700'}`}>0{idx + 1}</span>
                       <div className="flex-1 bg-gris-mas-oscuro h-10 border border-gris-oscuro relative overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className={`h-full ${idx === 0 ? 'bg-rosa' : 'bg-zinc-700'}`}
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-4">
                            <span className="font-black uppercase italic text-xs tracking-tighter leading-none">{band.name}</span>
                            <span className="font-mono font-bold text-xs">{Math.round(percentage)}%</span>
                          </div>
                       </div>
                    </div>
                  );
                })}
            </div>
          </motion.section>
        )}
      </main>

      <footer className="h-24 bg-gris-mas-oscuro border-t border-gris-oscuro px-6 md:px-12 flex items-center justify-between z-10 shrink-0">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-black">EVENTO</span>
            <span className="font-mono font-bold text-rosa text-sm">#tortillas_patadas</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-black">TOTAL VOTOS</span>
            <span className="font-mono font-bold text-rosa text-sm">
              {Object.values(results).reduce((a, b) => a + b, 0)}
            </span>
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
