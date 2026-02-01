import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService({ onBack }) {
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
          <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: February 1, 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to Warranty Vault. By accessing or using our website and application, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. Use License</h2>
            <p>
              Warranty Vault is a free tool provided "as is". You may use it for personal, non-commercial purposes to track your product warranties.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>You retain all rights to the data and images you upload.</li>
              <li>Data is stored locally on your device (LocalStorage/IndexedDB).</li>
              <li>We do not have access to your personal data unless you explicitly export and share it with us for support purposes.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. Disclaimer</h2>
            <p>
              The materials on Warranty Vault are provided on an 'as is' basis. Warranty Vault makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. Limitations</h2>
            <p>
              In no event shall Warranty Vault or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Warranty Vault.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
