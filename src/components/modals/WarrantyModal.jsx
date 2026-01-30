import Modal from '../common/Modal';
import WarrantyForm from '../warranty/WarrantyForm';

export default function WarrantyModal({ isOpen, onClose, initialData, onSubmit }) {
  const title = initialData ? 'Edit Warranty' : 'Add Warranty';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <WarrantyForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
