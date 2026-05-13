export default function Header() {
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
        <div className="px-4 py-1 bg-rosa text-crema font-black text-xs skew-x-[-12deg] shadow-[0_0_15px_rgba(230,100,156,0.3)]">
          VOTACIÓN ABIERTA
        </div>
        <p className="text-[9px] text-zinc-500 mt-2 font-mono uppercase tracking-widest">
          SALA SPECTRA • RING PRINCIPAL
        </p>
      </div>
    </header>
  );
}
