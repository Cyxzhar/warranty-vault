import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Archive, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';

function AnimatedNumber({ value, className }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;
    if (from === to) return;

    const duration = 800; // Slower, smoother
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // cubic-bezier(0.4, 0, 0.2, 1) approx
      const eased = 1 - Math.pow(1 - progress, 4); 
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <span className={className}>{display}</span>;
}

function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  colorVar, 
  isActive, 
  onClick, 
  subtitle, 
  trend, 
  isHero = false 
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border text-left transition-all duration-300 group
        ${isActive 
          ? `bg-[var(--bg-secondary)] border-[var(--border-emphasis)] shadow-lg shadow-[var(--${colorVar})]/10` 
          : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-emphasis)] hover:shadow-xl hover:-translate-y-1'
        }
        ${isHero ? 'col-span-3 md:col-span-1' : 'col-span-1'}
      `}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient (subtle) */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[var(--${colorVar})]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className={`relative ${isHero ? 'p-6' : 'p-4 md:p-6'} space-y-4`}>
        {/* Icon Row */}
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-[var(--radius-md)] bg-[var(--${colorVar})]/10 group-hover:bg-[var(--${colorVar})]/20 transition-colors`}>
            <Icon className={`w-5 h-5 md:w-6 md:h-6 text-[var(--${colorVar})]`} />
          </div>
          {trend && (
             <span className="text-xs font-medium text-[var(--status-active)] bg-[var(--status-active)]/10 px-2 py-0.5 rounded-full">
               {trend}
             </span>
          )}
        </div>
        
        {/* Number + Label */}
        <div className="space-y-1 md:space-y-2">
          <p className="text-[var(--text-tertiary)] text-xs font-medium uppercase tracking-wider">
            {label}
          </p>
          <AnimatedNumber
            value={value}
            className={`font-[var(--font-display)] font-extrabold text-[var(--text-primary)] group-hover:text-[var(--${colorVar})] transition-colors ${isHero ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
          />
        </div>
        
        {/* Subtitle (Hero only or larger screens) */}
        {subtitle && (
          <p className="text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)] hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>
    </motion.button>
  );
}

export default function StatsBar({ stats, activeFilter, onFilterChange }) {
  // Mobile Layout: Hero (Total) on top, then 3 columns for others
  // Desktop Layout: 4 columns
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 mb-8">
      {/* Total - Hero on mobile, 1st col on desktop */}
      <StatsCard
        icon={Archive}
        label="Total"
        value={stats.total}
        colorVar="status-total"
        isActive={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
        subtitle="All items tracked"
        isHero={true}
      />

      <StatsCard
        icon={ShieldCheck}
        label="Active"
        value={stats.active}
        colorVar="status-active"
        isActive={activeFilter === 'active'}
        onClick={() => onFilterChange('active')}
        trend={stats.active > 0 ? `${Math.round((stats.active/stats.total)*100)}%` : null}
      />

      <StatsCard
        icon={Clock}
        label="Expiring"
        value={stats.expiring}
        colorVar="status-expiring"
        isActive={activeFilter === 'expiring'}
        onClick={() => onFilterChange('expiring')}
      />

      <StatsCard
        icon={AlertTriangle}
        label="Expired"
        value={stats.expired}
        colorVar="status-expired"
        isActive={activeFilter === 'expired'}
        onClick={() => onFilterChange('expired')}
      />
    </div>
  );
}
