import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Shield, Search, MoreVertical, Download, Upload } from 'lucide-react';

export default function Header({
  searchTerm,
  onSearchChange,
  onSearchClear,
  onAdd,
  onExport,
  onImport,
  warrantyCount,
  onLogoClick,
  searchRef,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [menuOpen]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
    setMenuOpen(false);
  };

  const handleExportClick = () => {
    onExport();
    setMenuOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 md:gap-8 flex-1 md:flex-none">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onLogoClick}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform duration-300">
              <Shield className="w-5 h-5 md:w-5.5 md:h-5.5 text-slate-900" strokeWidth={2.5} />
            </div>
            <span className="font-[var(--font-display)] font-bold text-lg tracking-tight hidden md:block text-[var(--text-primary)]">
              Warranty Vault
            </span>
          </motion.div>

          {/* Search Bar (Responsive) */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'flex-1 md:w-[400px]' : 'w-full max-w-[180px] md:w-[320px]'}`}>
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[var(--text-tertiary)]" />
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search..."
              className="w-full h-10 md:h-12 pl-10 md:pl-12 pr-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-md)]
                       text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]
                       focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]/20
                       transition-all duration-200 outline-none"
            />
             {/* Keyboard shortcut hint (Desktop) */}
            <kbd className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] text-[var(--text-tertiary)] border border-[var(--border-subtle)]">
              ⌘K
            </kbd>
            {searchTerm && (
              <button
                onClick={onSearchClear}
                className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--bg-elevated)] rounded-full text-[var(--text-muted)]"
              >
                <span className="sr-only">Clear</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-6 pl-2">
          {/* Quick Stats (Desktop) */}
          <div className="hidden md:flex items-center gap-6 text-sm">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--status-active)] animate-pulse" />
                <span className="text-[var(--text-secondary)]">Active</span>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
             {/* More Menu (Mobile/Desktop) */}
            <div ref={menuRef} className="relative">
                <motion.button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="p-2 md:p-2.5 hover:bg-[var(--bg-elevated)] rounded-[var(--radius-md)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
                  whileTap={{ scale: 0.95 }}
                >
                  <MoreVertical className="w-5 h-5 text-[var(--text-tertiary)]" />
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-xl py-1 z-50 overflow-hidden backdrop-blur-3xl"
                    >
                      <button
                        onClick={handleExportClick}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Export Data
                      </button>
                      <button
                        onClick={handleImportClick}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Import Data
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            {/* Add Button */}
            <motion.button
              onClick={onAdd}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-[var(--bg-primary)] font-semibold text-sm rounded-[var(--radius-md)] shadow-lg shadow-[var(--accent-primary)]/20 hover:shadow-[var(--accent-primary)]/40 transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Add Warranty
            </motion.button>
            
            {/* Mobile Add Button (Icon only) */}
            <motion.button
              onClick={onAdd}
              className="md:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-[var(--bg-primary)] rounded-[var(--radius-md)] shadow-lg shadow-[var(--accent-primary)]/20"
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
      </div>
    </header>
  );
}
