import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'CARTELERA' },
  { to: '/contendientes', label: 'CONTENDIENTES' },
  { to: '/votaciones', label: 'VOTACIONES' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative z-10 bg-gris-mas-oscuro border-b border-verde/20">
      {/* Hamburger button - mobile only */}
      <div className="flex items-center justify-center px-6 py-3 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-6 py-2 bg-verde/30 text-crema font-black text-xs uppercase tracking-[0.2em] border border-verde/40 hover:bg-verde/50 transition-colors"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          {isOpen ? 'CERRAR' : 'MENÚ'}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-6 pb-4 space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className={`block w-full px-6 py-3 font-black text-xs uppercase tracking-[0.2em] border transition-all ${
                      isActive
                        ? 'bg-rosa text-crema border-rosa shadow-[0_0_15px_rgba(230,100,156,0.3)]'
                        : 'bg-verde/30 text-crema/70 border-verde/40 hover:bg-verde/50 hover:text-crema'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop horizontal links */}
      <div className="hidden md:flex items-center justify-center px-6 md:px-12 py-3 gap-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-6 py-2 font-black text-[11px] uppercase tracking-[0.2em] border transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-rosa text-crema border-rosa shadow-[0_0_15px_rgba(230,100,156,0.3)]'
                  : 'bg-verde/30 text-crema/70 border-verde/40 hover:bg-verde/50 hover:text-crema'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
