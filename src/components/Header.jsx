import { useState, useEffect } from 'react';
import { getSettings } from '../services/api';

export default function Header() {
  const [isVotingOpen, setIsVotingOpen] = useState(true);

  useEffect(() => {
    getSettings().then(s => setIsVotingOpen(s.isVotingOpen));

    const handleStorage = (e) => {
      if (e.key === 'app_settings' && e.newValue) {
        try {
          setIsVotingOpen(JSON.parse(e.newValue).isVotingOpen);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <header className="relative h-28 md:h-32 flex items-center justify-between px-6 md:px-12 bg-gradient-to-b from-verde/40 to-transparent border-b border-verde/20 z-10">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase leading-none text-crema title-glow -ml-0.5">
          tortilla de patadas
        </h1>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-rosa font-black mt-1">
          LA GRAN VELADA DE BANDAS
        </span>
      </div>

      <div className="hidden sm:flex flex-col items-end">
        <div className={`px-4 py-1 font-black text-xs skew-x-[-12deg] transition-all ${
          isVotingOpen
            ? 'bg-emerald-600 text-crema shadow-[0_0_15px_rgba(5,167,70,0.3)]'
            : 'bg-rosa text-crema shadow-[0_0_15px_rgba(230,100,156,0.3)]'
        }`}>
          {isVotingOpen ? 'VOTACIÓN ABIERTA' : 'VOTACIÓN CERRADA'}
        </div>
        <p className="text-[9px] text-zinc-500 mt-2 font-mono uppercase tracking-widest">
          SALA SPECTRUM • RING PRINCIPAL
        </p>
      </div>
    </header>
  );
}
