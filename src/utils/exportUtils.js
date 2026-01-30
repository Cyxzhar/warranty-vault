export function exportToJSON(warranties) {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    warranties,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `warranty-vault-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.warranties || !Array.isArray(data.warranties)) {
          reject(new Error('Invalid backup file format'));
          return;
        }
        const valid = [];
        const errors = [];
        data.warranties.forEach((w, i) => {
          const validation = validateWarranty(w);
          if (validation.valid) {
            valid.push(w);
          } else {
            errors.push(`Item ${i + 1}: ${validation.errors.join(', ')}`);
          }
        });
        resolve({ warranties: valid, errors });
      } catch {
        reject(new Error('Failed to parse backup file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

function validateWarranty(obj) {
  const errors = [];
  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Not an object'] };
  }
  if (!obj.productName || typeof obj.productName !== 'string') {
    errors.push('Missing product name');
  }
  if (!obj.purchaseDate || typeof obj.purchaseDate !== 'string') {
    errors.push('Missing purchase date');
  }
  if (obj.warrantyMonths == null || typeof obj.warrantyMonths !== 'number') {
    errors.push('Missing warranty period');
  }
  return { valid: errors.length === 0, errors };
}
