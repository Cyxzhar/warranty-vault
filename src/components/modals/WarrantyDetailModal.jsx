import { motion } from 'framer-motion';
import { Calendar, Tag, Clock, FileText, Image as ImageIcon, ExternalLink, ShieldCheck, Download } from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { getWarrantyStatus, getDaysUntilExpiry, calculateExpiryDate, formatDate } from '../../utils/dateUtils';
import { getCategoryLabel } from '../../constants/categories';
import { getWarrantyPeriodLabel } from '../../constants/warrantyPeriods';

function CircularProgress({ percent, daysLeft, status }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  
  const color = 
    status === 'expired' ? 'text-red-500' :
    status === 'expiring' ? 'text-amber-500' :
    'text-emerald-500';

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="56"
          cy="56"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-800"
        />
        <circle
          cx="56"
          cy="56"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-bold ${color}`}>
          {daysLeft > 0 ? daysLeft : 0}
        </span>
        <span className="text-[10px] uppercase text-slate-500 font-medium">
          Days Left
        </span>
      </div>
    </div>
  );
}

export default function WarrantyDetailModal({ isOpen, onClose, warranty, onEdit, onViewReceipt }) {
  if (!warranty) return null;

  const status = getWarrantyStatus(warranty.purchaseDate, warranty.warrantyMonths);
  const daysLeft = getDaysUntilExpiry(warranty.purchaseDate, warranty.warrantyMonths);
  const expiryDate = calculateExpiryDate(warranty.purchaseDate, warranty.warrantyMonths);
  const categoryLabel = getCategoryLabel(warranty.category);
  const periodLabel = getWarrantyPeriodLabel(warranty.warrantyMonths);

  // Calculate percentage
  const totalDays = warranty.warrantyMonths * 30;
  const elapsedDays = totalDays - daysLeft;
  const percent = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Warranty Details">
      <div className="space-y-6">
        
        {/* Top Section: Progress & Key Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
          <CircularProgress percent={percent} daysLeft={daysLeft} status={status} />
          
          <div className="flex-1 text-center sm:text-left space-y-2 w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {warranty.productName}
            </h2>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-700/50 border border-slate-600/50 text-xs font-medium text-slate-300">
                <Tag className="w-3 h-3" />
                {categoryLabel}
              </span>
              <Badge status={status} days={daysLeft} />
            </div>

             <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
               <div className="flex items-center gap-1.5">
                 <Calendar className="w-3.5 h-3.5" />
                 <span>Purchased: <span className="text-slate-300">{formatDate(warranty.purchaseDate)}</span></span>
               </div>
               <div className="flex items-center gap-1.5">
                 <Clock className="w-3.5 h-3.5" />
                 <span>Duration: <span className="text-slate-300">{periodLabel}</span></span>
               </div>
             </div>
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="relative px-2 py-4">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 -translate-y-1/2" />
          <div className="relative flex justify-between text-xs font-medium">
             <div className="flex flex-col items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-slate-600 ring-4 ring-slate-900" />
               <span className="text-slate-500">Purchased</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className={`w-3 h-3 rounded-full ring-4 ring-slate-900 ${status === 'expired' ? 'bg-red-500' : 'bg-emerald-500'}`} />
               <span className={status === 'expired' ? 'text-red-400' : 'text-emerald-400'}>
                  {expiryDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
               </span>
             </div>
          </div>
        </div>

        {/* Notes Section */}
        {warranty.notes && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Notes
            </h3>
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {warranty.notes}
            </div>
          </div>
        )}

        {/* Receipt Section */}
        <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              Receipt
            </h3>
            {warranty.receiptImage ? (
              <div 
                className="group relative h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-700 cursor-pointer"
                onClick={() => onViewReceipt(warranty)}
              >
                <img 
                  src={warranty.receiptImage} 
                  alt="Receipt" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-6">
                   <p className="text-white font-medium flex items-center gap-2">
                     <ExternalLink className="w-4 h-4" />
                     View Full Image
                   </p>
                </div>
              </div>
            ) : (
              <div className="h-24 rounded-xl border border-dashed border-slate-700 bg-slate-800/20 flex flex-col items-center justify-center text-slate-500 gap-2">
                 <ImageIcon className="w-6 h-6 opacity-40" />
                 <span className="text-xs">No receipt image attached</span>
              </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t border-slate-800/50">
          <button
            onClick={() => {
                onClose();
                onEdit(warranty);
            }}
            className="flex-1 py-3 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all hover:shadow-lg border border-slate-700 hover:border-slate-600"
          >
            Edit Warranty
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-800/50 text-slate-400 text-sm font-medium hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
