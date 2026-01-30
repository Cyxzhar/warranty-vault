import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
  error: 'bg-red-500/20 border-red-500/30 text-red-300',
  info: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
};

export default function Toast({ toast, onRemove }) {
  const Icon = icons[toast.type] || Info;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg ${styles[toast.type] || styles.info}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <motion.button
        onClick={() => onRemove(toast.id)}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss notification"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
