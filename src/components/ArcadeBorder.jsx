import { motion } from 'motion/react';

const COLORS = {
  rosa: { hex: '#E6649C', r: 230, g: 100, b: 156 },
  amarillo: { hex: '#F2BC41', r: 242, g: 188, b: 65 },
  verde: { hex: '#0D4D33', r: 13, g: 77, b: 51 },
};

export default function ArcadeBorder({
  color = 'rosa',
  variant = 'default',
  animated = false,
  title,
  className = '',
  children,
}) {
  const c = COLORS[color] || COLORS.rosa;

  return (
    <div className={`relative ${className}`}>
      {/* Corner triangle accents (extend slightly outward) */}
      <div
        className="absolute -top-[2px] -left-[2px] w-6 h-6 z-20"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', background: c.hex }}
      />
      <div
        className="absolute -top-[2px] -right-[2px] w-6 h-6 z-20"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)', background: c.hex }}
      />
      <div
        className="absolute -bottom-[2px] -left-[2px] w-6 h-6 z-20"
        style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)', background: c.hex }}
      />
      <div
        className="absolute -bottom-[2px] -right-[2px] w-6 h-6 z-20"
        style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)', background: c.hex }}
      />

      {/* Main bordered container */}
      <div
        style={{
          border: '6px solid',
          borderColor: c.hex,
          outline: `3px solid ${c.hex}`,
          outlineOffset: '5px',
          boxShadow: [
            `0 0 15px rgba(${c.r},${c.g},${c.b},0.5)`,
            `0 0 30px rgba(${c.r},${c.g},${c.b},0.25)`,
            `inset 0 0 20px rgba(${c.r},${c.g},${c.b},0.08)`,
          ].join(', '),
        }}
      >
        {/* Inner content area */}
        <div className="bg-gris-mas-oscuro/95">
          {children}
        </div>

        {/* Optional title bar at bottom */}
        {title && (
          <div
            className="px-4 py-2.5 text-center"
            style={{
              background: `linear-gradient(180deg, ${c.hex}ee, ${c.hex}99)`,
              boxShadow: `inset 0 4px 8px rgba(0,0,0,0.3), 0 -2px 4px rgba(0,0,0,0.2)`,
            }}
          >
            <span className="font-8bit text-[9px] text-crema arcade-text-shadow-sm uppercase tracking-widest">
              {title}
            </span>
          </div>
        )}
      </div>

      {/* Animated glow pulse */}
      {animated && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow: `0 0 30px rgba(${c.r},${c.g},${c.b},0.6), 0 0 60px rgba(${c.r},${c.g},${c.b},0.3)`,
          }}
        />
      )}
    </div>
  );
}
