import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
];

export default function LandingNav({ onOpenApp }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-[var(--border-subtle)] shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onOpenApp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <Shield className="w-8 h-8 md:w-9 md:h-9 text-[var(--accent-primary)] transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-full bg-[var(--accent-primary)]/20 animate-ping opacity-75" />
            </div>
            <span className="font-[var(--font-display)] font-bold text-lg md:text-xl tracking-tight text-[var(--text-primary)]">
              Warranty Vault
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 group"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onOpenApp}
              className="hidden md:inline-flex px-6 py-2.5 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-[var(--bg-primary)] font-semibold text-sm rounded-[var(--radius-md)] shadow-lg shadow-[var(--accent-primary)]/20 relative overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="relative z-10">Open App</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Hamburger */}
            <motion.button
              className="md:hidden p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-elevated)] transition-colors"
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-5 h-5 text-[var(--text-secondary)]" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
                <span className="font-bold text-lg text-[var(--text-primary)]">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-xl transition-colors text-base font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      setTimeout(() => {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="p-5 mt-auto border-t border-[var(--border-subtle)]">
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenApp();
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full py-3 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-[var(--bg-primary)] font-bold rounded-[var(--radius-md)] text-base shadow-lg shadow-[var(--accent-primary)]/20"
                >
                  Open App
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
