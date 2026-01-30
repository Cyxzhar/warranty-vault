import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const statConfig = [
  { key: 'all', label: 'Total', colorClass: 'text-white' },
  { key: 'active', label: 'Active', colorClass: 'text-emerald-400' },
  { key: 'expiring', label: 'Expiring', colorClass: 'text-amber-400' },
  { key: 'expired', label: 'Expired', colorClass: 'text-red-400' },
];

function AnimatedNumber({ value, className }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;
    if (from === to) return;

    const duration = 400;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <span className={className}>{display}</span>;
}

export default function StatsBar({ stats, activeFilter, onFilterChange }) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
      {statConfig.map(({ key, label, colorClass }, i) => (
        <motion.button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`p-2.5 sm:p-3 rounded-xl border transition-colors ${
            activeFilter === key
              ? 'bg-slate-700/50 border-amber-400/50 shadow-lg shadow-amber-400/5'
              : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
          }`}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          // stagger
          {...{ transition: { type: 'spring', stiffness: 400, delay: i * 0.05 } }}
        >
          <AnimatedNumber
            value={key === 'all' ? stats.total : stats[key]}
            className={`text-xl sm:text-2xl font-bold block ${colorClass}`}
          />
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{label}</div>
        </motion.button>
      ))}
    </div>
  );
}
