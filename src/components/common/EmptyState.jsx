import { motion } from 'framer-motion';
import { Plus, CheckCircle, Lock, Zap, ShieldCheck } from 'lucide-react';

function EmptyBoxIllustration({ className }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M40 70 L100 40 L160 70 L100 100 L40 70 Z" 
        fill="currentColor" 
        fillOpacity="0.1" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M40 70 L40 130 L100 160 L100 100" 
        fill="currentColor" 
        fillOpacity="0.05" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M160 70 L160 130 L100 160" 
        fill="currentColor" 
        fillOpacity="0.2" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 min-h-[50vh]">
      <div className="max-w-md text-center space-y-8">
        {/* Illustration */}
        <div className="relative mx-auto w-48 h-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <EmptyBoxIllustration className="w-full h-full text-[var(--text-tertiary)] opacity-60" />
          </motion.div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-4"
          >
            <div className="p-3 bg-[var(--accent-primary)]/10 rounded-full backdrop-blur-sm shadow-lg border border-[var(--accent-primary)]/20">
              <ShieldCheck className="w-6 h-6 text-[var(--accent-primary)]" />
            </div>
          </motion.div>
        </div>
        
        {/* Headline */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {message || "Your warranty vault is empty"}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
             Start tracking your warranties to never lose money on expired coverage again. 
             Add your first item in seconds—it's quick and easy.
          </p>
        </div>
        
        {/* CTA & Trust Signals */}
        <div className="space-y-6">
          {actionLabel && onAction && (
            <motion.button
              onClick={onAction}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-[var(--bg-primary)] font-bold text-base rounded-[var(--radius-md)] shadow-xl shadow-[var(--accent-primary)]/20 hover:shadow-[var(--accent-primary)]/30 flex items-center justify-center gap-3 mx-auto transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              {actionLabel}
            </motion.button>
          )}
          
          {/* Quick tips */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--status-active)]" />
              <span>Takes 30 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>100% private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Works offline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
