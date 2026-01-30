import { useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before the modal opened
    previousFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Focus the dialog after animation starts
    const timer = setTimeout(() => {
      const firstFocusable = dialogRef.current?.querySelector(FOCUSABLE);
      firstFocusable?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: Tab cycles within the modal
      if (e.key === 'Tab') {
        const focusableEls = dialogRef.current?.querySelectorAll(FOCUSABLE);
        if (!focusableEls || focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
      // Restore focus when modal closes
      previousFocus.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`bg-[var(--bg-secondary)] w-full ${maxWidth} sm:rounded-[var(--radius-xl)] rounded-t-[var(--radius-xl)] border border-[var(--border-subtle)] shadow-2xl max-h-[90vh] flex flex-col`}
          >
            {title && (
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)] shrink-0">
                <h2 id={titleId} className="text-lg font-bold text-[var(--text-primary)]">{title}</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--bg-elevated)] rounded-[var(--radius-md)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]" />
                </motion.button>
              </div>
            )}
            <div className="overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
