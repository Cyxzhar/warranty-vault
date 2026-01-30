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
  
  const colorClass = 
    status === 'expired' ? 'text-[var(--status-expired)]' :
    status === 'expiring' ? 'text-[var(--status-expiring)]' :
    'text-[var(--status-active)]';

  return (
    <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="56"
          cy="56"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-[var(--bg-elevated)]"
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
          className={colorClass}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-bold ${colorClass}`}>
          {daysLeft > 0 ? daysLeft : 0}
        </span>
        <span className="text-[10px] uppercase text-[var(--text-tertiary)] font-medium">
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
      <div className="space-y-8">
        
        {/* Top Section: Progress & Key Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[var(--radius-xl)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          <CircularProgress percent={percent} daysLeft={daysLeft} status={status} />
          
          <div className="flex-1 text-center sm:text-left space-y-3 w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
              {warranty.productName}
            </h2>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)]">
                <Tag className="w-3 h-3" />
                {categoryLabel}
              </span>
              <Badge status={status} days={daysLeft} />
            </div>

             <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[var(--text-tertiary)]">
               <div className="flex items-center gap-1.5">
                 <Calendar className="w-3.5 h-3.5" />
                 <span>Purchased: <span className="text-[var(--text-secondary)] font-medium">{formatDate(warranty.purchaseDate)}</span></span>
               </div>
               <div className="flex items-center gap-1.5">
                 <Clock className="w-3.5 h-3.5" />
                 <span>Duration: <span className="text-[var(--text-secondary)] font-medium">{periodLabel}</span></span>
               </div>
             </div>
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="relative px-2 py-2">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--bg-elevated)] -translate-y-1/2" />
          <div className="relative flex justify-between text-xs font-medium">
             <div className="flex flex-col items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-[var(--text-muted)] ring-4 ring-[var(--bg-primary)]" />
               <span className="text-[var(--text-tertiary)]">Purchased</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className={`w-3 h-3 rounded-full ring-4 ring-[var(--bg-primary)] ${status === 'expired' ? 'bg-[var(--status-expired)]' : 'bg-[var(--status-active)]'}`} />
               <span className={status === 'expired' ? 'text-[var(--status-expired)]' : 'text-[var(--status-active)]'}>
                  {expiryDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
               </span>
             </div>
          </div>
        </div>

        {/* Notes Section */}
        {warranty.notes && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
              Notes
            </h3>
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
              {warranty.notes}
            </div>
          </div>
        )}

        {/* Receipt Section */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[var(--accent-primary)]" />
              Receipt
            </h3>
            {warranty.receiptImage ? (
              <div 
                className="group relative h-48 sm:h-64 rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border-subtle)] cursor-pointer bg-[var(--bg-elevated)]"
                onClick={() => onViewReceipt(warranty)}
              >
                <img 
                  src={warranty.receiptImage} 
                  alt="Receipt" 
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                   <p className="text-white font-medium flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                     <ExternalLink className="w-4 h-4" />
                     View Full Image
                   </p>
                </div>
              </div>
            ) : (
              <div className="h-24 rounded-[var(--radius-lg)] border border-dashed border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col items-center justify-center text-[var(--text-tertiary)] gap-2">
                 <ImageIcon className="w-6 h-6 opacity-40" />
                 <span className="text-xs">No receipt image attached</span>
              </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => {
                onClose();
                onEdit(warranty);
            }}
            className="flex-1 py-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm font-semibold hover:bg-[var(--bg-secondary)] transition-all border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30"
          >
            Edit Warranty
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-[var(--radius-md)] text-[var(--text-tertiary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
