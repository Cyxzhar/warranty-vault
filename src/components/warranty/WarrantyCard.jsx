import { motion } from 'framer-motion';
import { Trash2, Edit3, Image } from 'lucide-react';
import Badge from '../common/Badge';
import { getDaysUntilExpiry, getWarrantyStatus, formatDate, calculateExpiryDate } from '../../utils/dateUtils';
import { getCategoryLabel } from '../../constants/categories';

export default function WarrantyCard({ warranty, onEdit, onDelete, onViewReceipt, onViewDetails }) {
  const status = getWarrantyStatus(warranty.purchaseDate, warranty.warrantyMonths);
  const daysLeft = getDaysUntilExpiry(warranty.purchaseDate, warranty.warrantyMonths);
  const expiryDate = calculateExpiryDate(warranty.purchaseDate, warranty.warrantyMonths);

  const borderColor =
    status === 'expired'
      ? 'border-red-900/50 bg-red-950/20'
      : status === 'expiring'
      ? 'border-amber-900/50 bg-amber-950/20'
      : 'border-slate-700/50 bg-slate-800/50';

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
      whileHover={{
        y: -3,
        borderColor: 'rgba(100, 116, 139, 0.5)',
        transition: { duration: 0.2 },
      }}
      className={`relative p-4 rounded-xl border transition-shadow ${borderColor} cursor-pointer select-none touch-pan-y`}
      onClick={() => onViewDetails && onViewDetails(warranty)}
    >
      <div className="flex items-start gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white text-base truncate">
              {warranty.productName}
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 shrink-0">
              {getCategoryLabel(warranty.category)}
            </span>
          </div>

          <div className="mt-2">
            <Badge status={status} days={daysLeft} />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-slate-400">
            <span>Purchased: {formatDate(warranty.purchaseDate)}</span>
            <span>Expires: {expiryDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>

          {warranty.notes && (
            <p className="mt-2 text-xs text-slate-500 italic line-clamp-2">
              {warranty.notes}
            </p>
          )}
        </div>

        {/* Right side: receipt + actions */}
        <div className="flex flex-col items-end gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          {warranty.receiptImage ? (
            <motion.button
              onClick={() => onViewReceipt(warranty)}
              className="relative group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={warranty.receiptImage}
                alt="Receipt"
                className="w-14 h-14 object-cover rounded-lg border border-slate-600 group-hover:border-amber-400 transition-colors"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Image className="w-4 h-4 text-white" />
              </div>
            </motion.button>
          ) : null}
          <div className="flex items-center gap-1">
            <motion.button
              onClick={() => onEdit(warranty)}
              className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
              title="Edit"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(warranty)}
              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
