import { Calendar, Tag, Clock, FileText, Image as ImageIcon, ExternalLink, ShieldCheck } from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { getWarrantyStatus, getDaysUntilExpiry, calculateExpiryDate, formatDate } from '../../utils/dateUtils';
import { getCategoryLabel } from '../../constants/categories';
import { getWarrantyPeriodLabel } from '../../constants/warrantyPeriods';

export default function WarrantyDetailModal({ isOpen, onClose, warranty, onEdit, onViewReceipt }) {
  if (!warranty) return null;

  const status = getWarrantyStatus(warranty.purchaseDate, warranty.warrantyMonths);
  const daysLeft = getDaysUntilExpiry(warranty.purchaseDate, warranty.warrantyMonths);
  const expiryDate = calculateExpiryDate(warranty.purchaseDate, warranty.warrantyMonths);
  const categoryLabel = getCategoryLabel(warranty.category);
  const periodLabel = getWarrantyPeriodLabel(warranty.warrantyMonths);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Warranty Details">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {warranty.productName}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
              <Tag className="w-3.5 h-3.5" />
              {categoryLabel}
            </span>
            <Badge status={status} days={daysLeft} />
          </div>
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Purchase Date
            </span>
            <span className="text-sm font-medium text-white">
              {formatDate(warranty.purchaseDate)}
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Expiry Date
            </span>
            <span className={`text-sm font-medium ${
              status === 'expired' ? 'text-red-400' : 'text-white'
            }`}>
              {expiryDate.toLocaleDateString(undefined, { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Duration
            </span>
            <span className="text-sm font-medium text-white">
              {periodLabel}
            </span>
          </div>
        </div>

        {/* Notes */}
        {warranty.notes && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Notes
            </h3>
            <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {warranty.notes}
            </div>
          </div>
        )}

        {/* Receipt Action */}
        {warranty.receiptImage ? (
          <button
            onClick={() => onViewReceipt(warranty)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-600 group-hover:border-amber-500/50 transition-colors">
                <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                  View Receipt
                </p>
                <p className="text-xs text-slate-500">
                  Click to expand image
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </button>
        ) : (
           <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-800/20 text-slate-500">
              <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center border border-slate-700">
                <ImageIcon className="w-5 h-5 opacity-50" />
              </div>
              <span className="text-sm">No receipt image attached</span>
           </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-3 pt-4 mt-2 border-t border-slate-800">
          <button
            onClick={() => {
                onClose();
                onEdit(warranty);
            }}
            className="flex-1 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
