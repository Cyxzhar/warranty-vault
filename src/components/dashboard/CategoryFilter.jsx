import { motion } from 'framer-motion';
import {
  Smartphone,
  Refrigerator,
  Armchair,
  Car,
  Shirt,
  Wrench,
  Package,
  LayoutGrid,
} from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Items', icon: LayoutGrid },
  { value: 'electronics', label: 'Electronics', icon: Smartphone },
  { value: 'appliances', label: 'Appliances', icon: Refrigerator },
  { value: 'furniture', label: 'Furniture', icon: Armchair },
  { value: 'automotive', label: 'Auto', icon: Car },
  { value: 'clothing', label: 'Apparel', icon: Shirt },
  { value: 'tools', label: 'Tools', icon: Wrench },
  { value: 'other', label: 'Others', icon: Package },
];

export default function CategoryFilter({ active, onChange, counts = {} }) {
  return (
    <div className="relative mb-8 group -mx-4 px-4 sm:mx-0 sm:px-0">
      {/* Scroll Fade Indicators */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

      <div className="overflow-x-auto scrollbar-hide py-2 snap-x snap-mandatory">
        <div className="flex gap-3 min-w-max px-1">
          {categories.map((cat) => {
            const isActive = active === cat.value;
            const Icon = cat.icon;
            const count = counts[cat.value] || 0;
            
            return (
              <motion.button
                key={cat.value}
                onClick={() => onChange(cat.value)}
                className={`relative group/btn flex items-center gap-2.5 px-5 py-2.5 rounded-[var(--radius-full)] text-sm font-medium transition-all duration-300 border snap-start
                  ${isActive
                    ? 'bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] border-transparent text-[var(--bg-primary)] shadow-lg shadow-[var(--accent-primary)]/30'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--bg-elevated)]'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                <span className="whitespace-nowrap">{cat.label}</span>
                
                {/* Count Badge (if count > 0) */}
                {count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive 
                      ? 'bg-[var(--bg-primary)]/20 text-[var(--bg-primary)]' 
                      : 'bg-[var(--bg-elevated)] text-[var(--text-tertiary)]'
                  }`}>
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
