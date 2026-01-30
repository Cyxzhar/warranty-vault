import { motion } from 'framer-motion';
import Modal from '../common/Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  confirmVariant = 'danger',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="p-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
          className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4"
        >
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </motion.div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <motion.button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 font-bold rounded-xl transition-all ${
              confirmVariant === 'danger'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {confirmLabel}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
