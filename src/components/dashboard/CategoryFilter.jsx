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

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="relative mb-6 group">
      {/* Scroll Fade Indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none hidden sm:block" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none hidden sm:block" />

      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
        <div className="flex gap-2.5 min-w-max pb-2">
          {categories.map((cat) => {
            const isActive = active === cat.value;
            const Icon = cat.icon;
            
            return (
              <motion.button
                key={cat.value}
                onClick={() => onChange(cat.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-amber-400 text-slate-900 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-slate-800 text-slate-400 border-slate-700/50 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-750'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
