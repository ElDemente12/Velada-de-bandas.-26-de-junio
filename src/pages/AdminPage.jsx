import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trophy, Zap, AlertTriangle, Lock, ShieldCheck, Play, Square, RefreshCw, Trash2, LogOut } from 'lucide-react';
import {
  getBands,
  getSettings,
  adminGetResults,
  adminToggleVoting,
  adminSimulateVotes,
  adminResetVotes,
  adminForceSeed
} from '../services/api';

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen relative flex flex-col immersive-border bg-gris-mas-oscuro text-crema font-mono overflow-y-auto">
      <div className="scanline fixed inset-0 z-50 pointer-events-none opacity-20" />
      <div className="fixed inset-0 ring-glow z-0 pointer-events-none" />
      {children}
    </div>
  );
}

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const adminUser = import.meta.env.VITE_ADMIN_USER || 'ElDemente12';
  const adminPass = import.meta.env.VITE_ADMIN_PASS || 'VeladaDelaTortillaDePatadasñ1';

  useEffect(() => {
    if (sessionStorage.getItem('admin_logged') === 'true') {
      navigate('/administrador');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(null);

    if (username === adminUser && password === adminPass) {
      sessionStorage.setItem('admin_logged', 'true');
      sessionStorage.setItem('VITE_ADMIN_USER', username);
      sessionStorage.setItem('VITE_ADMIN_PASS', password);
      navigate('/administrador');
    } else {
      setLoginError('ACCESO DENEGADO: Credenciales incorrectas');
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 flex items-center justify-center p-6 min-h-screen z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-gris-oscuro border-2 border-verde/50 p-6 md:p-8 rounded-sm shadow-[0_0_30px_rgba(230,100,156,0.15)] arcade-double-outline-rosa/10"
        >
          <div className="flex flex-col items-center gap-3 mb-6 text-center">
            <Lock className="w-8 h-8 text-rosa" />
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] italic text-crema">
              ACCESO ADMIN
            </h2>
            <div className="h-1 w-16 bg-rosa" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-black mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gris-mas-oscuro border-2 border-gris-oscuro text-crema font-bold px-4 py-3 text-sm focus:border-rosa outline-none transition-colors"
                placeholder="Nombre de usuario"
              />
            </div>

            <div>
              <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-black mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gris-mas-oscuro border-2 border-gris-oscuro text-crema font-bold px-4 py-3 text-sm focus:border-rosa outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <div className="bg-rosa/10 border border-rosa/30 p-3 text-center">
                <p className="text-[10px] text-rosa font-black uppercase tracking-wider">
                  {loginError}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-rosa text-crema font-black uppercase tracking-widest italic text-sm hover:scale-102 active:scale-98 transition-all shadow-[0_0_20px_rgba(230,100,156,0.2)] cursor-pointer"
            >
              ACCEDER AL CONTROL
            </button>
          </form>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [bands, setBands] = useState([]);
  const [isVotingOpen, setIsVotingOpen] = useState(true);
  const [results, setResults] = useState({});
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState(null);

  // Authenticate session on load
  useEffect(() => {
    if (sessionStorage.getItem('admin_logged') !== 'true') {
      navigate('/administrador/login');
    }
  }, [navigate]);

  // Load bands, settings, results and start polling
  useEffect(() => {
    if (sessionStorage.getItem('admin_logged') !== 'true') return;

    const init = async () => {
      try {
        const bandsData = await getBands();
        setBands(bandsData);

        const settingsData = await getSettings();
        setIsVotingOpen(settingsData.isVotingOpen);

        const resultsData = await adminGetResults();
        setResults(resultsData.results);
      } catch (err) {
        console.error('Error on init:', err);
        showNotification('Error al conectar con el ring de votaciones.', true);
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
      if (e.key === 'app_votes' || e.key === 'app_bands') {
        adminGetResults().then(r => setResults(r.results)).catch(() => {});
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged');
    sessionStorage.removeItem('VITE_ADMIN_USER');
    sessionStorage.removeItem('VITE_ADMIN_PASS');
    navigate('/administrador/login');
  };

  const toggleVoting = async () => {
    setIsActionLoading(true);
    try {
      const updated = await adminToggleVoting(!isVotingOpen);
      setIsVotingOpen(updated.settings.isVotingOpen);
      showNotification(`Votaciones ${!isVotingOpen ? 'ABIERTAS' : 'CERRADAS'} con éxito.`);
    } catch (err) {
      showNotification('Error al cambiar el estado del ring.', true);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handlePurgeVotes = async () => {
    const confirmPurge = window.confirm('⚠️ ATENCIÓN: ¿Seguro que deseas REINICIAR TODAS las votaciones a 0? Esta acción borrará de forma permanente todos los votos registrados.');
    if (!confirmPurge) return;

    setIsActionLoading(true);
    try {
      await adminResetVotes();
      // Instantly clear local counters
      const freshResults = {};
      bands.forEach(b => {
        freshResults[b.id] = 0;
      });
      setResults(freshResults);
      showNotification('Votaciones vaciadas a 0 correctamente.');
    } catch (err) {
      console.error(err);
      showNotification('Error al vaciar los votos.', true);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReSeed = async () => {
    setIsActionLoading(true);
    try {
      const res = await adminForceSeed();
      setBands(res.bands);
      showNotification('Base de datos y configuración re-sembradas.');
    } catch (err) {
      showNotification('Error al forzar re-semilla.', true);
    } finally {
      setIsActionLoading(false);
    }
  };

  const simulateVoting = async () => {
    setIsActionLoading(true);
    try {
      await adminSimulateVotes();
      // Instantly refresh counts
      const resultsData = await adminGetResults();
      setResults(resultsData.results);
      showNotification('Simulación completada: 10 votos añadidos.');
    } catch (err) {
      console.error(err);
      showNotification('Error al simular votos.', true);
    } finally {
      setIsActionLoading(false);
    }
  };

  const showNotification = (msg, isErr = false) => {
    setAdminMessage({ text: msg, error: isErr });
    setTimeout(() => setAdminMessage(null), 3000);
  };

  const totalVotesCount = Object.values(results).reduce((a, b) => a + b, 0);

  return (
    <AdminLayout>
      <main className="flex-1 max-w-md mx-auto px-4 pt-8 pb-20 w-full z-10 relative">
        {/* Mobile-first Header */}
        <div className="flex items-center justify-between border-b-2 border-gris-oscuro pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rosa" />
            <span className="font-black text-xs uppercase tracking-widest text-crema">
              PANEL ADMIN
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-700 hover:border-rosa text-zinc-500 hover:text-rosa text-[9px] uppercase font-black tracking-widest transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            SALIR
          </button>
        </div>

        {/* Ring Controls Card */}
        <div className="bg-gris-oscuro border-2 border-verde/50 p-5 rounded-sm mb-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-verde text-crema text-[7px] font-black px-2 py-0.5 uppercase tracking-[0.2em]">
            CONTROL DE RING
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider text-zinc-400">
                Estado de Votaciones
              </span>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${isVotingOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rosa'}`} />
                <span className={`font-black text-[10px] uppercase tracking-wider ${isVotingOpen ? 'text-emerald-500' : 'text-rosa'}`}>
                  {isVotingOpen ? 'Abiertas' : 'Cerradas'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleVoting}
              disabled={isActionLoading}
              className={`w-full py-3.5 flex items-center justify-center gap-2 font-black uppercase tracking-wider text-xs italic transition-all active:scale-95 disabled:opacity-50 cursor-pointer ${
                isVotingOpen
                  ? 'bg-gris-mas-oscuro border-2 border-rosa text-rosa hover:bg-rosa hover:text-crema'
                  : 'bg-rosa text-crema shadow-[0_0_20px_rgba(230,100,156,0.3)]'
              }`}
            >
              {isVotingOpen ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  PAUSAR / CERRAR RING
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  ABRIR / ACTIVAR RING
                </>
              )}
            </button>
          </div>
        </div>

        {/* Statistics / Global Count Card */}
        <div className="bg-gris-oscuro border-2 border-gris-oscuro p-5 rounded-sm mb-5 shadow-lg relative">
          <div className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-4">
            RECUENTO EN TIEMPO REAL
          </div>

          <div className="flex items-center justify-between border-b border-gris-oscuro pb-3 mb-4">
            <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider">
              Total Votos Emitidos
            </span>
            <span className="font-mono text-xl font-bold text-rosa italic">
              {totalVotesCount}
            </span>
          </div>

          <div className="space-y-4">
            {bands
              .sort((a, b) => (results[b.id] || 0) - (results[a.id] || 0))
              .map((band, idx) => {
                const percentage = totalVotesCount > 0 ? ((results[band.id] || 0) / totalVotesCount) * 100 : 0;
                return (
                  <div key={band.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                      <div className="flex items-center gap-2">
                        <span className={`italic ${idx === 0 ? 'text-rosa' : 'text-zinc-600'}`}>0{idx + 1}</span>
                        <span className="text-crema">{band.name}</span>
                      </div>
                      <span className="text-rosa">
                        {results[band.id] || 0} <span className="text-zinc-500 font-mono text-[9px]">({Math.round(percentage)}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-gris-mas-oscuro h-2 border border-gris-oscuro relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full ${idx === 0 ? 'bg-rosa shadow-[0_0_10px_rgba(230,100,156,0.5)]' : 'bg-zinc-700'}`}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Database Maintenance Card */}
        <div className="bg-gris-oscuro border-2 border-gris-oscuro p-5 rounded-sm shadow-lg relative">
          <div className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-4">
            HERRAMIENTAS DE MANTENIMIENTO
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={simulateVoting}
              disabled={isActionLoading}
              className="w-full py-3 bg-gris-mas-oscuro border border-zinc-700 hover:border-rosa text-zinc-400 hover:text-rosa font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isActionLoading ? 'animate-spin' : ''}`} />
              SIMULAR 10 VOTOS AL AZAR
            </button>

            <button
              onClick={handleReSeed}
              disabled={isActionLoading}
              className="w-full py-3 bg-gris-mas-oscuro border border-zinc-700 hover:border-rosa text-zinc-400 hover:text-rosa font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              FORZAR RE-SEMILLA DE RING
            </button>

            <button
              onClick={handlePurgeVotes}
              disabled={isActionLoading}
              className="w-full py-3.5 bg-rose-950/20 border border-rosa/50 hover:bg-rosa/15 text-rosa font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(230,100,156,0.05)]"
            >
              <Trash2 className="w-4 h-4 text-rosa" />
              REINICIAR VOTACIONES A 0
            </button>
          </div>
        </div>

        {/* Toast Notifications */}
        {adminMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`fixed bottom-6 left-4 right-4 p-4 border-2 flex items-center gap-3 z-[100] shadow-2xl ${
              adminMessage.error
                ? 'bg-rose-950/90 border-rosa text-rosa'
                : 'bg-verde/90 border-emerald-500 text-crema'
            }`}
          >
            {adminMessage.error ? (
              <AlertTriangle className="w-5 h-5 shrink-0 text-rosa" />
            ) : (
              <Trophy className="w-5 h-5 shrink-0 text-emerald-500" />
            )}
            <span className="font-black uppercase text-[10px] tracking-wider leading-none">
              {adminMessage.text}
            </span>
          </motion.div>
        )}
      </main>
    </AdminLayout>
  );
}
