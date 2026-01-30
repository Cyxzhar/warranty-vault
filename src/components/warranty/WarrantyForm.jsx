import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import { WARRANTY_PERIODS } from '../../constants/warrantyPeriods';
import { readFileAsDataURL, compressImage } from '../../utils/imageUtils';
import { useToastContext } from '../../context/ToastContext';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];

const emptyForm = {
  productName: '',
  purchaseDate: '',
  warrantyMonths: 12,
  category: 'electronics',
  receiptImage: null,
  notes: '',
};

export default function WarrantyForm({ initialData, onSubmit, onCancel }) {
  const { addToast } = useToastContext();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() =>
    initialData
      ? {
          productName: initialData.productName,
          purchaseDate: initialData.purchaseDate,
          warrantyMonths: initialData.warrantyMonths,
          category: initialData.category || 'other',
          receiptImage: initialData.receiptImage || null,
          notes: initialData.notes || '',
        }
      : { ...emptyForm }
  );

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEdit = !!initialData;

  // Validation
  const errors = {};
  if (!form.productName.trim()) errors.productName = 'Product name is required';
  if (!form.purchaseDate) errors.purchaseDate = 'Purchase date is required';
  const isValid = Object.keys(errors).length === 0;

  const showError = (field) => (submitted || touched[field]) && errors[field];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Image processing
  const processImageFile = useCallback(
    async (file) => {
      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        addToast('Please upload an image file (JPEG, PNG, WebP, or GIF)', 'error');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        addToast('Image must be under 10MB', 'error');
        return;
      }

      setUploading(true);
      try {
        const raw = await readFileAsDataURL(file);
        const compressed = await compressImage(raw);
        handleChange('receiptImage', compressed);
        addToast('Receipt uploaded', 'success');
      } catch {
        addToast('Failed to process image. Please try again.', 'error');
      }
      setUploading(false);
    },
    [addToast]
  );

  const handleImageUpload = (e) => {
    processImageFile(e.target.files?.[0]);
  };

  const handleRemoveImage = () => {
    handleChange('receiptImage', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Drag-and-drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items?.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      processImageFile(file);
    },
    [processImageFile]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid || uploading) return;
    onSubmit(form);
  };

  const inputBase =
    'w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:ring-1 outline-none transition-all text-sm';
  const inputNormal = `${inputBase} border-slate-600 focus:border-amber-400 focus:ring-amber-400`;
  const inputError = `${inputBase} border-red-500 focus:border-red-400 focus:ring-red-400`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="p-5 space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Product Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.productName}
            onChange={(e) => handleChange('productName', e.target.value)}
            onBlur={() => handleBlur('productName')}
            placeholder="e.g., Samsung TV 55 inch"
            className={showError('productName') ? inputError : inputNormal}
            autoFocus
          />
          <AnimatePresence>
            {showError('productName') && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 mt-1.5 text-xs text-red-400"
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.productName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Purchase Date + Warranty Period */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Purchase Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={form.purchaseDate}
              onChange={(e) => handleChange('purchaseDate', e.target.value)}
              onBlur={() => handleBlur('purchaseDate')}
              className={showError('purchaseDate') ? inputError : inputNormal}
            />
            <AnimatePresence>
              {showError('purchaseDate') && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 mt-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {errors.purchaseDate}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Warranty Period
            </label>
            <select
              value={form.warrantyMonths}
              onChange={(e) => handleChange('warrantyMonths', e.target.value)}
              className={inputNormal}
            >
              {WARRANTY_PERIODS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={inputNormal}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Receipt Upload with Drag-and-Drop */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Receipt Photo
          </label>
          <AnimatePresence mode="wait">
            {form.receiptImage ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <img
                  src={form.receiptImage}
                  alt="Receipt"
                  className="w-full h-40 object-cover rounded-xl border border-slate-600"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-white/70" />
                </div>
                <motion.button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.label
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  dragActive
                    ? 'border-amber-400 bg-amber-400/10 scale-[1.02]'
                    : uploading
                    ? 'border-amber-400/50 bg-amber-400/5'
                    : 'border-slate-600 hover:border-amber-400 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex flex-col items-center justify-center py-3">
                  {uploading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full mb-1.5"
                    />
                  ) : (
                    <motion.div
                      animate={dragActive ? { scale: 1.2, y: -4 } : { scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Upload className={`w-7 h-7 mb-1.5 ${dragActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    </motion.div>
                  )}
                  <p className="text-xs text-slate-400">
                    {uploading
                      ? 'Compressing image...'
                      : dragActive
                      ? 'Drop image here'
                      : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    JPEG, PNG, WebP or GIF — max 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </motion.label>
            )}
          </AnimatePresence>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Notes
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Serial number, store name, etc."
            rows={2}
            className={`${inputNormal} resize-none`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-slate-700 flex gap-3">
        <motion.button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={uploading}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:from-amber-300 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          whileHover={!uploading ? { scale: 1.02 } : {}}
          whileTap={!uploading ? { scale: 0.98 } : {}}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">
            {uploading ? 'Processing...' : isEdit ? 'Save Changes' : 'Add Warranty'}
          </span>
        </motion.button>
      </div>
    </form>
  );
}
