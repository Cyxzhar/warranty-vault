import { motion } from 'framer-motion';
import { Trash2, Edit3, Image, Calendar, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import { getDaysUntilExpiry, getWarrantyStatus, formatDate, calculateExpiryDate } from '../../utils/dateUtils';
import { getCategoryLabel } from '../../constants/categories';

export default function WarrantyCard({ warranty, onEdit, onDelete, onViewReceipt, onViewDetails }) {
  const status = getWarrantyStatus(warranty.purchaseDate, warranty.warrantyMonths);
  const daysLeft = getDaysUntilExpiry(warranty.purchaseDate, warranty.warrantyMonths);
  const expiryDate = calculateExpiryDate(warranty.purchaseDate, warranty.warrantyMonths);
  
  // Calculate progress percentage
  const totalDays = warranty.warrantyMonths * 30; // approx
  const elapsedDays = totalDays - daysLeft;
  const progressPercent = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);

  const containerClasses = 
    status === 'expired'
      ? 'bg-gradient-to-br from-red-950/40 to-slate-900/40 border-red-900/30'
      : status === 'expiring'
      ? 'bg-gradient-to-br from-amber-950/40 to-slate-900/40 border-amber-900/30'
      : 'bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/50';

  const progressColor = 
    status === 'expired' ? 'bg-red-500' :
    status === 'expiring' ? 'bg-amber-500' :
    'bg-emerald-500';

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      onDelete(warranty);
    }
  };

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0.5, right: 0.1 }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden group ${containerClasses} cursor-pointer select-none touch-pan-y shadow-lg`}
      onClick={() => onViewDetails && onViewDetails(warranty)}
    >
      {/* Progress Bar Background */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
        <motion.div 
          className={`h-full ${progressColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Receipt Preview (Left) */}
          <div className="shrink-0 pt-1" onClick={(e) => e.stopPropagation()}>
             {warranty.receiptImage ? (
              <motion.button
                onClick={() => onViewReceipt(warranty)}
                className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-600/50 group/img shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={warranty.receiptImage}
                  alt="Receipt"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <Image className="w-5 h-5 text-white drop-shadow-md" />
                </div>
              </motion.button>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                <Image className="w-6 h-6 text-slate-600" />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                  {getCategoryLabel(warranty.category)}
                </span>
                <h3 className="font-bold text-white text-lg leading-tight truncate pr-2">
                  {warranty.productName}
                </h3>
              </div>
              <Badge status={status} days={daysLeft} />
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
               <div className="flex items-center gap-1.5">
                 <Calendar className="w-3.5 h-3.5 text-slate-500" />
                 <span>{formatDate(warranty.purchaseDate)}</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-slate-600" />
               <div className={`flex items-center gap-1.5 ${status === 'expired' ? 'text-red-400' : 'text-slate-300'}`}>
                 <Clock className="w-3.5 h-3.5" />
                 <span className="font-medium">
                   {expiryDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                 </span>
               </div>
            </div>
          </div>

          {/* Actions (Slide in on hover or always visible on touch) */}
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
            <motion.button
              onClick={() => onEdit(warranty)}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(warranty)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Swipe hint for mobile */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-red-500/20 to-transparent opacity-0 sm:hidden" />
    </motion.div>
  );
}
