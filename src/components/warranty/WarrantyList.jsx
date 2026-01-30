import { AnimatePresence } from 'framer-motion';
import WarrantyCard from './WarrantyCard';
import EmptyState from '../common/EmptyState';

export default function WarrantyList({
  warranties,
  filter,
  searchTerm,
  onEdit,
  onDelete,
  onViewReceipt,
  onViewDetails,
  onAdd,
  onClearFilter,
}) {
  if (warranties.length === 0) {
    if (searchTerm) {
      return (
        <EmptyState
          message={`No warranties matching "${searchTerm}"`}
          actionLabel="Clear search"
          onAction={onClearFilter}
        />
      );
    }
    if (filter !== 'all') {
      return (
        <EmptyState
          message={`No ${filter} warranties found.`}
          actionLabel="Show all"
          onAction={onClearFilter}
        />
      );
    }
    return (
      <EmptyState
        message="No warranties yet. Add your first one!"
        actionLabel="Add Warranty"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {warranties.map((warranty) => (
          <WarrantyCard
            key={warranty.id}
            warranty={warranty}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewReceipt={onViewReceipt}
            onViewDetails={onViewDetails}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
