import { useState, useCallback, useEffect, useRef } from 'react';
import { useWarranties } from './hooks/useWarranties';
import { useSearch } from './hooks/useSearch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { useToastContext } from './context/ToastContext';
import { STORAGE_KEYS } from './constants/storageKeys';

import ToastContainer from './components/common/ToastContainer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StatsBar from './components/dashboard/StatsBar';
import SortControls from './components/dashboard/SortControls';
import CategoryFilter from './components/dashboard/CategoryFilter';
import WarrantyList from './components/warranty/WarrantyList';
import WarrantyModal from './components/modals/WarrantyModal';
import WarrantyDetailModal from './components/modals/WarrantyDetailModal';
import ConfirmDialog from './components/modals/ConfirmDialog';
import ImageViewer from './components/modals/ImageViewer';
import OnboardingScreen from './components/onboarding/OnboardingScreen';
import ProBanner from './components/ProBanner';

export default function AppContent({ onBackToLanding }) {
  const {
    warranties,
    addWarranty,
    updateWarranty,
    deleteWarranty,
    getFilteredWarranties,
    getStats,
    handleExport,
    handleImport,
  } = useWarranties();

  const { permission, requestPermission } = useNotifications(warranties);

  const { searchTerm, debouncedTerm, setSearchTerm, clearSearch } = useSearch();
  const { addToast } = useToastContext();
  const searchRef = useRef(null);
  const [onboardingComplete, setOnboardingComplete] = useLocalStorage(
    STORAGE_KEYS.ONBOARDING_COMPLETE,
    false
  );

  // Persisted UI state
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useLocalStorage(STORAGE_KEYS.CATEGORY_FILTER, 'all');
  const [sortBy, setSortBy] = useLocalStorage(STORAGE_KEYS.SORT_BY, 'expiry');
  const [sortOrder, setSortOrder] = useLocalStorage(STORAGE_KEYS.SORT_ORDER, 'asc');
  const [viewMode, setViewMode] = useLocalStorage('warrantyVault_viewMode', 'grid');

  // Modal state
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState(null);
  const [viewingDetail, setViewingDetail] = useState(null);
  const [deletingWarranty, setDeletingWarranty] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      const tag = document.activeElement?.tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      // Cmd/Ctrl+K: focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }

      // Cmd/Ctrl+N: open add warranty modal (only when not in an input)
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        if (!isInput) {
          e.preventDefault();
          setEditingWarranty(null);
          setShowWarrantyModal(true);
        }
        return;
      }

      // Escape clears search when focused in search
      if (e.key === 'Escape' && isInput && searchRef.current === document.activeElement) {
        searchRef.current?.blur();
        clearSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [clearSearch]);

  // Computed
  const stats = getStats();
  const filteredWarranties = getFilteredWarranties({
    statusFilter,
    categoryFilter,
    search: debouncedTerm,
    sortBy,
    sortOrder,
  });

  // Calculate category counts
  const categoryCounts = warranties.reduce((acc, curr) => {
    acc['all'] = (acc['all'] || 0) + 1;
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  // Handlers
  const handleOpenAdd = useCallback(() => {
    setEditingWarranty(null);
    setShowWarrantyModal(true);
  }, []);

  const handleOpenEdit = useCallback((warranty) => {
    setEditingWarranty(warranty);
    setShowWarrantyModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowWarrantyModal(false);
    setEditingWarranty(null);
  }, []);

  const handleSubmitWarranty = useCallback(
    (formData) => {
      if (editingWarranty) {
        const result = updateWarranty(editingWarranty.id, formData);
        if (result?.error) {
          addToast({ type: 'error', message: result.error });
          return;
        }
        addToast({ type: 'success', message: 'Warranty updated successfully' });
      } else {
        const result = addWarranty(formData);
        if (result?.error) {
          addToast({ type: 'error', message: result.error });
          return;
        }
        addToast({ type: 'success', message: 'Warranty added successfully' });
        if (!onboardingComplete) {
          setOnboardingComplete(true);
        }
      }
      handleCloseModal();
    },
    [editingWarranty, updateWarranty, addWarranty, addToast, onboardingComplete, setOnboardingComplete, handleCloseModal]
  );

  const handleOpenDelete = useCallback((warranty) => {
    setDeletingWarranty(warranty);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deletingWarranty) {
      deleteWarranty(deletingWarranty.id);
      addToast({ type: 'success', message: `"${deletingWarranty.productName}" deleted` });
      setDeletingWarranty(null);
    }
  }, [deletingWarranty, deleteWarranty, addToast]);

  const handleViewReceipt = useCallback((warranty) => {
    setViewingImage(warranty);
  }, []);

  const handleViewDetails = useCallback((warranty) => {
    setViewingDetail(warranty);
  }, []);

  const handleExportData = useCallback(() => {
    handleExport();
    addToast({ type: 'success', message: `Exported ${warranties.length} warranties` });
  }, [handleExport, warranties.length, addToast]);

  const handleImportData = useCallback(
    async (file) => {
      try {
        const result = await handleImport(file);
        if (result.added > 0) {
          addToast({
            type: 'success',
            message: `Imported ${result.added} warranties${result.skipped > 0 ? ` (${result.skipped} duplicates skipped)` : ''}`,
          });
        } else {
          addToast({ type: 'info', message: 'No new warranties to import' });
        }
        if (result.errors.length > 0) {
          addToast({ type: 'error', message: `${result.errors.length} items had errors` });
        }
      } catch (err) {
        addToast({ type: 'error', message: err.message || 'Import failed' });
      }
    },
    [handleImport, addToast]
  );

  const handleClearFilters = useCallback(() => {
    setStatusFilter('all');
    setCategoryFilter('all');
    clearSearch();
  }, [clearSearch, setCategoryFilter]);

  // Show onboarding if no warranties and onboarding not completed
  const showOnboarding = warranties.length === 0 && !onboardingComplete;

  if (showOnboarding) {
    return (
      <>
        <ToastContainer />
        <OnboardingScreen onStart={handleOpenAdd} />
        <WarrantyModal
          isOpen={showWarrantyModal}
          onClose={handleCloseModal}
          initialData={null}
          onSubmit={handleSubmitWarranty}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a] text-[var(--text-primary)] transition-colors duration-300 relative">
      <ToastContainer />

      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchClear={clearSearch}
        onAdd={handleOpenAdd}
        onExport={handleExportData}
        onImport={handleImportData}
        warrantyCount={warranties.length}
        onLogoClick={onBackToLanding}
        searchRef={searchRef}
      />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8">
        <StatsBar
          stats={stats}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        <CategoryFilter 
          active={categoryFilter} 
          onChange={setCategoryFilter} 
          counts={categoryCounts}
        />

        <SortControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={setSortBy}
          onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
          itemCount={filteredWarranties.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <WarrantyList
          warranties={filteredWarranties}
          filter={statusFilter}
          searchTerm={debouncedTerm}
          viewMode={viewMode}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onViewReceipt={handleViewReceipt}
          onViewDetails={handleViewDetails}
          onAdd={handleOpenAdd}
          onClearFilter={handleClearFilters}
        />

        <ProBanner show={warranties.length >= 3} />
      </main>

      <Footer 
        onRequestNotifications={requestPermission}
        notificationStatus={permission}
      />

      {/* Modals */}
      <WarrantyModal
        isOpen={showWarrantyModal}
        onClose={handleCloseModal}
        initialData={editingWarranty}
        onSubmit={handleSubmitWarranty}
      />

      <WarrantyDetailModal
        isOpen={!!viewingDetail}
        onClose={() => setViewingDetail(null)}
        warranty={viewingDetail}
        onEdit={(w) => {
            setViewingDetail(null);
            handleOpenEdit(w);
        }}
        onViewReceipt={handleViewReceipt}
      />

      <ConfirmDialog
        isOpen={!!deletingWarranty}
        onClose={() => setDeletingWarranty(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Warranty?"
        message={`"${deletingWarranty?.productName}" will be permanently removed.`}
        confirmLabel="Delete"
      />

      <ImageViewer
        isOpen={!!viewingImage}
        onClose={() => setViewingImage(null)}
        imageUrl={viewingImage?.receiptImage}
        productName={viewingImage?.productName}
      />
    </div>
  );
}
