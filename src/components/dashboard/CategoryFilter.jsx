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
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'electronics', label: 'Electronics', icon: Smartphone },
  { value: 'appliances', label: 'Appliances', icon: Refrigerator },
  { value: 'furniture', label: 'Furniture', icon: Armchair },
  { value: 'automotive', label: 'Automotive', icon: Car },
  { value: 'clothing', label: 'Clothing', icon: Shirt },
  { value: 'tools', label: 'Tools', icon: Wrench },
  { value: 'other', label: 'Other', icon: Package },
];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="mb-4 -mx-4 px-4 overflow-x-auto scrollbar-none">
      <div className="flex gap-2 min-w-max">
        {categories.map((cat) => {
          const isActive = active === cat.value;
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.value}
              onClick={() => onChange(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:text-slate-300 hover:border-slate-600'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
