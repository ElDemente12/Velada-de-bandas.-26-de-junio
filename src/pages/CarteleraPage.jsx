import * as React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, TicketCheck } from 'lucide-react';
import cartel from '../images/CartelFest.jpeg';

export default function CarteleraPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 pt-16 pb-24 z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-crema mb-6 title-glow">
          ¿LISTO PARA EL<br />PRIMER ASALTO?
        </h2>
        <div className="h-1 w-24 bg-rosa mx-auto mb-8" />
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Tres bandas entran al ring. Solo una sale con el crowd.
          <br />
          <span className="text-zinc-500 italic">
            Murcia nunca había visto una velada con tanto riff y tan poca paz.
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-lg mx-auto mb-16"
      >
        <div className="border-2 border-verde/50 p-2 bg-gris-oscuro">
          <img
            src={cartel}
            alt="Cartel de la Velada"
            className="w-full h-auto"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-xl mx-auto mb-16"
      >
        <div className="bg-gris-oscuro border-2 border-verde/50 p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-rosa fill-current" />
            <span className="text-rosa font-black text-xs tracking-[0.3em] uppercase">INFORMACIÓN DEL EVENTO</span>
          </div>
          <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-crema mb-4">
            SALA SPECTRUM · MURCIA
          </p>
          <p className="text-xl md:text-2xl font-black italic text-rosa mb-6">
            26 JUN · 21:00H · 10€
          </p>
          <div className="h-1 w-16 bg-verde mx-auto mb-6" />
          <p className="text-base md:text-lg font-black uppercase tracking-wider text-crema/80 italic">
            LA VELADA QUE MURCIA NO MERECE PERO NECESITA
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-8"
      >
        <motion.a
          href="https://entradium.com/events/tortilla-de-patadas"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-rosa text-crema font-black uppercase tracking-tighter italic text-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.6 }}
          />
          <motion.span
            className="absolute inset-0 border-2 border-crema/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <TicketCheck className="w-6 h-6" />
          COMPRAR ENTRADAS
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <Link
          to="/votaciones"
          className="inline-block px-10 py-5 bg-gris-mas-oscuro border-2 border-rosa/50 text-rosa font-black uppercase tracking-tighter italic text-lg hover:bg-rosa hover:text-crema hover:shadow-[0_0_30px_rgba(230,100,156,0.3)] active:scale-95 transition-all"
        >
          IR A VOTACIONES
        </Link>
      </motion.div>
    </main>
  );
}
