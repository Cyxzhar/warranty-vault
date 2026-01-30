import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Sparkles } from 'lucide-react';

const DISMISS_KEY = 'warrantyVault_proBannerDismissed';

export default function ProBanner({ show }) {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === 'true';
    } catch {
      return false;
    }
  });

  if (!show || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // localStorage full or unavailable
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 relative"
      >
        <motion.button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-700/50 transition-colors"
          aria-label="Dismiss banner"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-3.5 h-3.5" />
        </motion.button>
        <div className="flex items-center gap-4 pr-4">
          <motion.div
            className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0"
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Bell className="w-5 h-5 text-amber-400" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm">Never forget again</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Email reminders 30 days before any warranty expires
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-400 font-medium rounded-lg text-xs whitespace-nowrap shrink-0">
            <Sparkles className="w-3 h-3" />
            Coming Soon
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
