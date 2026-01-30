import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

const sortOptions = [
  { value: 'expiry', label: 'Expiry Date' },
  { value: 'name', label: 'Name' },
  { value: 'purchaseDate', label: 'Purchase Date' },
  { value: 'dateAdded', label: 'Date Added' },
];

export default function SortControls({ sortBy, sortOrder, onSortByChange, onSortOrderToggle }) {
  return (
    <motion.div
      className="flex items-center gap-2 mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 px-2.5 py-1.5 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <motion.button
        onClick={onSortOrderToggle}
        className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors group"
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: sortOrder === 'desc' ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowUpDown className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
