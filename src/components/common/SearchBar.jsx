import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchBar = forwardRef(function SearchBar({ value, onChange, onClear }, ref) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search warranties..."
        className="w-full pl-10 pr-9 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
        aria-label="Search warranties"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Clear search"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <X className="w-4 h-4 text-slate-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
});

export default SearchBar;
