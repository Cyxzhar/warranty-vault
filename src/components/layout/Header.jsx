import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Shield, Download, Upload, MoreVertical } from 'lucide-react';
import SearchBar from '../common/SearchBar';

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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <motion.button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 shrink-0"
            title="Back to home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Shield className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-bold text-white hidden sm:block">Warranty Vault</h1>
          </motion.button>

          {/* Search */}
          <div className="flex-1 max-w-xs ml-auto sm:ml-0">
            <SearchBar ref={searchRef} value={searchTerm} onChange={onSearchChange} onClear={onSearchClear} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Menu */}
            {warrantyCount > 0 && (
              <div ref={menuRef} className="relative">
                <motion.button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50"
                    >
                      <button
                        onClick={handleExportClick}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Export Backup
                      </button>
                      <button
                        onClick={handleImportClick}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Import Backup
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Add Button */}
            <motion.button
              onClick={onAdd}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold text-sm rounded-xl relative overflow-hidden group shadow-lg shadow-amber-500/20"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Plus className="w-4 h-4 relative z-10" strokeWidth={2.5} />
              <span className="hidden sm:inline relative z-10">Add</span>
            </motion.button>
          </div>

          {/* Hidden file input for import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
}
