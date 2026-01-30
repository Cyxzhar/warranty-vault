import { motion } from 'framer-motion';
import { ArrowUpDown, Grid, List, ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'expiry', label: 'Expiry Date' },
  { value: 'name', label: 'Product Name' },
  { value: 'purchaseDate', label: 'Purchase Date' },
  { value: 'dateAdded', label: 'Date Added' },
];

export default function SortControls({ 
  sortBy, 
  sortOrder, 
  onSortByChange, 
  onSortOrderToggle, 
  itemCount = 0,
  viewMode = 'grid', // 'grid' | 'list'
  onViewModeChange = () => {} 
}) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-1 sm:p-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Left: Count */}
      <div className="text-sm text-[var(--text-secondary)]">
        <span className="font-semibold text-[var(--text-primary)]">{itemCount}</span> 
        {itemCount === 1 ? ' warranty' : ' warranties'}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        
        {/* Sort Group */}
        <div className="flex items-center bg-[var(--bg-secondary)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] p-1">
           <div className="relative">
             <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="appearance-none bg-transparent text-xs sm:text-sm text-[var(--text-primary)] pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer hover:text-[var(--accent-primary)] transition-colors font-medium"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[var(--bg-secondary)]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--text-tertiary)] pointer-events-none" />
           </div>

           <div className="w-px h-4 bg-[var(--border-subtle)] mx-1" />

           <motion.button
            onClick={onSortOrderToggle}
            className="p-1.5 hover:bg-[var(--bg-elevated)] rounded-[var(--radius-sm)] transition-colors group"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: sortOrder === 'desc' ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowUpDown className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]" />
            </motion.div>
          </motion.button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[var(--bg-secondary)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] p-1">
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-[var(--radius-sm)] transition-all ${viewMode === 'list' ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-[var(--radius-sm)] transition-all ${viewMode === 'grid' ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
