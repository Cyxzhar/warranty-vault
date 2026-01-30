import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { generateId } from '../utils/idUtils';
import { getDaysUntilExpiry, getWarrantyStatus } from '../utils/dateUtils';
import { exportToJSON, importFromJSON } from '../utils/exportUtils';

function migrateOldData() {
  try {
    const oldData = localStorage.getItem('warrantyVault');
    if (oldData && !localStorage.getItem(STORAGE_KEYS.WARRANTIES)) {
      const parsed = JSON.parse(oldData);
      const migrated = parsed.map((w) => ({
        ...w,
        id: String(w.id),
        category: w.category || 'other',
        updatedAt: w.updatedAt || w.createdAt || new Date().toISOString(),
      }));
      localStorage.setItem(STORAGE_KEYS.WARRANTIES, JSON.stringify(migrated));
      localStorage.removeItem('warrantyVault');
      return migrated;
    }
  } catch {
    // migration failed, start fresh
  }
  return null;
}

function validateFormData(formData) {
  const name = formData.productName?.trim();
  if (!name) return 'Product name is required';

  if (!formData.purchaseDate) return 'Purchase date is required';

  const purchaseDate = new Date(formData.purchaseDate);
  if (isNaN(purchaseDate.getTime())) return 'Invalid purchase date';

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (purchaseDate > today) return 'Purchase date cannot be in the future';

  const months = parseInt(formData.warrantyMonths, 10);
  if (isNaN(months) || months < 1) return 'Invalid warranty period';

  return null;
}

export function useWarranties() {
  // Run migration once
  const migrated = useMemo(() => migrateOldData(), []);
  const [warranties, setWarranties] = useLocalStorage(
    STORAGE_KEYS.WARRANTIES,
    migrated || []
  );

  const addWarranty = useCallback(
    (formData) => {
      const error = validateFormData(formData);
      if (error) return { error };

      const warranty = {
        id: generateId(),
        productName: formData.productName.trim(),
        purchaseDate: formData.purchaseDate,
        warrantyMonths: parseInt(formData.warrantyMonths, 10),
        category: formData.category || 'other',
        receiptImage: formData.receiptImage || null,
        notes: formData.notes?.trim() || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setWarranties((prev) => [...prev, warranty]);
      return warranty;
    },
    [setWarranties]
  );

  const updateWarranty = useCallback(
    (id, formData) => {
      const error = validateFormData(formData);
      if (error) return { error };

      setWarranties((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                productName: formData.productName.trim(),
                purchaseDate: formData.purchaseDate,
                warrantyMonths: parseInt(formData.warrantyMonths, 10),
                category: formData.category || 'other',
                receiptImage: formData.receiptImage ?? w.receiptImage,
                notes: formData.notes?.trim() || '',
                updatedAt: new Date().toISOString(),
              }
            : w
        )
      );
    },
    [setWarranties]
  );

  const deleteWarranty = useCallback(
    (id) => {
      setWarranties((prev) => prev.filter((w) => w.id !== id));
    },
    [setWarranties]
  );

  const getFilteredWarranties = useCallback(
    ({ statusFilter = 'all', search = '', sortBy = 'expiry', sortOrder = 'asc', categoryFilter = 'all' } = {}) => {
      let result = [...warranties];

      // Category filter
      if (categoryFilter !== 'all') {
        result = result.filter((w) => w.category === categoryFilter);
      }

      // Status filter
      if (statusFilter !== 'all') {
        result = result.filter(
          (w) => getWarrantyStatus(w.purchaseDate, w.warrantyMonths) === statusFilter
        );
      }

      // Search
      if (search.trim()) {
        const term = search.toLowerCase();
        result = result.filter(
          (w) =>
            w.productName.toLowerCase().includes(term) ||
            (w.notes && w.notes.toLowerCase().includes(term))
        );
      }

      // Sort
      result.sort((a, b) => {
        let cmp = 0;
        switch (sortBy) {
          case 'expiry':
            cmp =
              getDaysUntilExpiry(a.purchaseDate, a.warrantyMonths) -
              getDaysUntilExpiry(b.purchaseDate, b.warrantyMonths);
            break;
          case 'name':
            cmp = a.productName.localeCompare(b.productName);
            break;
          case 'purchaseDate':
            cmp = new Date(a.purchaseDate) - new Date(b.purchaseDate);
            break;
          case 'dateAdded':
            cmp = new Date(a.createdAt) - new Date(b.createdAt);
            break;
          default:
            cmp = 0;
        }
        return sortOrder === 'desc' ? -cmp : cmp;
      });

      return result;
    },
    [warranties]
  );

  const getStats = useCallback(() => {
    const stats = { total: warranties.length, active: 0, expiring: 0, expired: 0 };
    warranties.forEach((w) => {
      const status = getWarrantyStatus(w.purchaseDate, w.warrantyMonths);
      stats[status]++;
    });
    return stats;
  }, [warranties]);

  const handleExport = useCallback(() => {
    exportToJSON(warranties);
  }, [warranties]);

  const handleImport = useCallback(
    async (file) => {
      const { warranties: imported, errors } = await importFromJSON(file);
      const existingIds = new Set(warranties.map((w) => w.id));
      const newItems = imported.filter((w) => !existingIds.has(w.id));
      if (newItems.length > 0) {
        setWarranties((prev) => [...prev, ...newItems]);
      }
      return { added: newItems.length, skipped: imported.length - newItems.length, errors };
    },
    [warranties, setWarranties]
  );

  return {
    warranties,
    addWarranty,
    updateWarranty,
    deleteWarranty,
    getFilteredWarranties,
    getStats,
    handleExport,
    handleImport,
  };
}
