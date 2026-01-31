import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Shield, Search, MoreVertical, Download, Upload, X, ChevronLeft } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-2xl transition-all duration-300">

      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center gap-4">

        {/* Logo + Back */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          onClick={onLogoClick}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform duration-300">
              <Shield className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
            </div>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-bold text-base tracking-tight text-white leading-tight">
              Warranty Vault
            </span>
            {warrantyCount > 0 && (
              <span className="text-[11px] text-slate-500 leading-tight">
                {warrantyCount} {warrantyCount === 1 ? 'warranty' : 'warranties'}
              </span>
            )}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-slate-800 shrink-0" />

        {/* Search Bar — fills all available space */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            ref={searchRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search warranties..."
            className="w-full h-10 pl-10 pr-10 bg-slate-800/50 border border-slate-700/40 rounded-xl
                       text-white text-sm placeholder:text-slate-500
                       focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/10 focus:bg-slate-800/80
                       transition-all duration-200 outline-none"
          />
          {!searchTerm && (
            <kbd className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 bg-slate-700/40 rounded text-[10px] text-slate-500 border border-slate-600/30 font-mono">
              ⌘K
            </kbd>
          )}
          {searchTerm && (
            <button
              onClick={onSearchClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* More Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#111827] border border-slate-700/50 rounded-xl shadow-2xl shadow-black/40 py-1.5 z-50 overflow-hidden"
                >
                  <button
                    onClick={handleExportClick}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    Export Data
                  </button>
                  <button
                    onClick={handleImportClick}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Upload className="w-4 h-4 text-slate-500" />
                    Import Data
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Back to Landing */}
          <button
            onClick={onLogoClick}
            className="hidden md:flex items-center gap-1.5 px-4 h-10 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium rounded-xl border border-slate-700/40 hover:border-slate-600 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Home
          </button>

          {/* Add Button (Desktop) */}
          <motion.button
            onClick={onAdd}
            className="hidden md:flex items-center gap-2 px-5 h-10 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="w-4.5 h-4.5" strokeWidth={2.5} />
            Add Warranty
          </motion.button>

          {/* Mobile Add Button */}
          <motion.button
            onClick={onAdd}
            className="md:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-xl shadow-lg shadow-orange-500/20"
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
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
