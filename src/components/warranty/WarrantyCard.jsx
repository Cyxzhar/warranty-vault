import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Trash2, Edit3, Image, Calendar, Clock, Eye } from 'lucide-react';
import Badge from '../common/Badge';
import { getDaysUntilExpiry, getWarrantyStatus, formatDate, calculateExpiryDate } from '../../utils/dateUtils';
import { getCategoryLabel } from '../../constants/categories';

export default function WarrantyCard({ warranty, onEdit, onDelete, onViewReceipt, onViewDetails, viewMode = 'list' }) {
  const status = getWarrantyStatus(warranty.purchaseDate, warranty.warrantyMonths);
  const daysLeft = getDaysUntilExpiry(warranty.purchaseDate, warranty.warrantyMonths);
  const expiryDate = calculateExpiryDate(warranty.purchaseDate, warranty.warrantyMonths);
  
  // Calculate progress percentage
  const totalDays = warranty.warrantyMonths * 30; // approx
  const elapsedDays = totalDays - daysLeft;
  const progressPercent = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);

  const statusColorVar = 
    status === 'expired' ? 'status-expired' :
    status === 'expiring' ? 'status-expiring' :
    'status-active';

  const dragX = useMotionValue(0);
  const deleteRevealOpacity = useTransform(dragX, [-120, -60, 0], [1, 0.6, 0]);
  const deleteIconScale = useTransform(dragX, [-120, -60, 0], [1.2, 0.8, 0.5]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      onDelete(warranty);
    }
  };

  if (viewMode === 'grid') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] hover:border-[var(--accent-primary)]/50 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        onClick={() => onViewDetails && onViewDetails(warranty)}
      >
        {/* Receipt Image Header */}
        <div className="relative h-48 bg-[var(--bg-elevated)] overflow-hidden">
          {warranty.receiptImage ? (
            <img 
              src={warranty.receiptImage} 
              alt={warranty.productName} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--bg-elevated)]">
               <Image className="w-12 h-12 text-[var(--text-tertiary)] opacity-50" />
            </div>
          )}
          
          {/* Gradient overlay - Stronger gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/40 to-transparent" />
          
          {/* Status badge (top-right) - Ensure contrast */}
          <div className="absolute top-4 right-4 z-10 shadow-sm">
            <Badge status={status} days={daysLeft} />
          </div>
          
          {/* Category badge (bottom-left) */}
          <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-[var(--bg-primary)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5 shadow-sm z-10">
            {getCategoryLabel(warranty.category)}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
              {warranty.productName}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
              <span>{formatDate(warranty.purchaseDate)} → {expiryDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
              <span>{Math.round(100 - progressPercent)}% remaining</span>
            </div>
            <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
              <div 
                className={`h-full bg-[var(--${statusColorVar})] rounded-full transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => onViewDetails && onViewDetails(warranty)}
              className="flex-1 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={() => onEdit(warranty)}
              className="p-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-[var(--radius-sm)] transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(warranty)}
              className="p-1.5 text-[var(--text-tertiary)] hover:text-[var(--status-expired)] hover:bg-[var(--status-expired)]/10 rounded-[var(--radius-sm)] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // LIST VIEW (Default)
  return (
    <div className="relative">
      {/* Delete reveal behind card (mobile only) */}
      <motion.div
        style={{ opacity: deleteRevealOpacity }}
        className="absolute inset-0 rounded-[var(--radius-lg)] bg-[var(--status-expired)] flex items-center justify-end pr-8 sm:hidden"
      >
        <motion.div style={{ scale: deleteIconScale }} className="flex flex-col items-center gap-1 text-white">
          <Trash2 className="w-6 h-6" />
          <span className="text-xs font-bold">Delete</span>
        </motion.div>
      </motion.div>

      <motion.div
        layout
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.5, right: 0.05 }}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ scale: 1.01 }}
        className="group relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] hover:border-[var(--accent-primary)]/50 hover:shadow-xl transition-shadow duration-300 cursor-pointer touch-pan-y"
        onClick={() => onViewDetails && onViewDetails(warranty)}
      >
      {/* Status accent bar (left edge) */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[var(--${statusColorVar})]`} />
      
      <div className="p-4 sm:p-5 pl-5 sm:pl-6">
        <div className="flex gap-4">
          {/* Receipt Thumbnail */}
          <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)] group-hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewReceipt(warranty)}
            >
              {warranty.receiptImage ? (
                <img 
                  src={warranty.receiptImage} 
                  alt={warranty.productName} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                 <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-[var(--text-tertiary)] opacity-50" />
                 </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-medium">
                  {getCategoryLabel(warranty.category)}
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate pr-2">
                  {warranty.productName}
                </h3>
              </div>
              
              <div className="shrink-0">
                <Badge status={status} days={daysLeft} />
              </div>
            </div>
            
            {/* Dates Row (Desktop) / Progress (Mobile) */}
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span>Purchased {formatDate(warranty.purchaseDate)}</span>
              </div>
              <div className="w-px h-4 bg-[var(--border-subtle)]" />
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span>Expires {expiryDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Mobile Progress/Date Compact */}
             <div className="sm:hidden flex items-center justify-between text-xs text-[var(--text-tertiary)] mt-1">
                <span>Expires: {expiryDate.toLocaleDateString()}</span>
             </div>
            
            {/* Progress Bar (Desktop mostly) */}
            <div className="space-y-1 hidden sm:block">
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                <span>Warranty period</span>
                <span>{daysLeft > 0 ? daysLeft : 0} days left</span>
              </div>
              <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-[var(--${statusColorVar})] rounded-full transition-all duration-500`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Actions (Desktop Slide-in) */}
          <div className="hidden sm:flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
             <button 
              onClick={() => onViewDetails && onViewDetails(warranty)}
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 rounded-[var(--radius-md)] transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onEdit(warranty)}
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-[var(--radius-md)] transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(warranty)}
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--status-expired)] hover:bg-[var(--status-expired)]/10 rounded-[var(--radius-md)] transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      </motion.div>
    </div>
  );
}
