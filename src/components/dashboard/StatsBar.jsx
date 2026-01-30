import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Archive, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';

const statConfig = [
  { key: 'all', label: 'Total', colorClass: 'text-white', icon: Archive, bgClass: 'bg-slate-700/30' },
  { key: 'active', label: 'Active', colorClass: 'text-emerald-400', icon: ShieldCheck, bgClass: 'bg-emerald-500/10' },
  { key: 'expiring', label: 'Expiring', colorClass: 'text-amber-400', icon: Clock, bgClass: 'bg-amber-500/10' },
  { key: 'expired', label: 'Expired', colorClass: 'text-red-400', icon: AlertTriangle, bgClass: 'bg-red-500/10' },
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {statConfig.map(({ key, label, colorClass, icon: Icon, bgClass }, i) => (
        <motion.button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`relative p-4 rounded-2xl border text-left transition-all ${
            activeFilter === key
              ? 'bg-slate-800 border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/20'
              : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${bgClass}`}>
              <Icon className={`w-5 h-5 ${colorClass}`} />
            </div>
            {activeFilter === key && (
              <motion.div
                layoutId="active-indicator"
                className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
              />
            )}
          </div>
          
          <div className="space-y-0.5">
            <AnimatedNumber
              value={key === 'all' ? stats.total : stats[key]}
              className="text-2xl font-bold text-white tracking-tight"
            />
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
