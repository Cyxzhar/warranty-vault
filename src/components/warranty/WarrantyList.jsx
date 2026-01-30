import { AnimatePresence } from 'framer-motion';
import WarrantyCard from './WarrantyCard';
import EmptyState from '../common/EmptyState';

export default function WarrantyList({
  warranties,
  filter,
  searchTerm,
  viewMode = 'list',
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
        message="Your warranty vault is empty"
        actionLabel="Add Your First Warranty"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
      <AnimatePresence mode="popLayout">
        {warranties.map((warranty) => (
          <WarrantyCard
            key={warranty.id}
            warranty={warranty}
            viewMode={viewMode}
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
