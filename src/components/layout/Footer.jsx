import { motion } from 'framer-motion';
import { Shield, Bell } from 'lucide-react';

export default function Footer({ onRequestNotifications, notificationStatus }) {
  return (
    <motion.footer
      className="max-w-3xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        {notificationStatus === 'default' && onRequestNotifications && (
          <button
            onClick={onRequestNotifications}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium transition-colors border border-slate-700 hover:border-amber-500/50"
          >
            <Bell className="w-3.5 h-3.5" />
            Enable expiry reminders
          </button>
        )}
        
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Shield className="w-3.5 h-3.5" />
          <p>Data stored locally on your device &middot; No account required &middot; Free forever</p>
        </div>
      </div>
    </motion.footer>
  );
}
