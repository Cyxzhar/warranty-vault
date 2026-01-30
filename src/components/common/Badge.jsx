import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDaysRemaining } from '../../utils/dateUtils';

const config = {
  active: {
    icon: CheckCircle,
    className: 'bg-emerald-500/20 text-emerald-400',
  },
  expiring: {
    icon: Clock,
    className: 'bg-amber-500/20 text-amber-400',
  },
  expired: {
    icon: AlertTriangle,
    className: 'bg-red-500/20 text-red-400',
  },
};

export default function Badge({ status, days }) {
  const { icon: Icon, className } = config[status] || config.active;
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      aria-label={`Warranty status: ${formatDaysRemaining(days)}`}
    >
      <motion.span
        animate={status === 'expiring' ? { scale: [1, 1.2, 1] } : {}}
        transition={status === 'expiring' ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        className="flex items-center"
      >
        <Icon className="w-3.5 h-3.5" />
      </motion.span>
      {formatDaysRemaining(days)}
    </motion.span>
  );
}
