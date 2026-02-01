import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-300 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-amber max-w-none"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: February 1, 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Your Data Stays With You</h2>
            <p>
              Warranty Vault is designed with a "Local First" architecture. This means:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Your warranty data and receipt images are stored <strong>only on your device</strong> (in your browser's LocalStorage and IndexedDB).</li>
              <li>We do not have a backend server that stores your personal information.</li>
              <li>We do not sell, trade, or otherwise transfer your data to outside parties.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. Analytics</h2>
            <p>
              We may use privacy-preserving analytics (like Plausible or Simple Analytics) to count page views and understand how the app is used. These services do not track you across the web and do not store personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. Images</h2>
            <p>
              Images you upload are compressed and stored locally on your device. They are never uploaded to our servers because we don't have any servers for user data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@warrantyvault.app" className="text-amber-400 hover:underline">support@warrantyvault.app</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
