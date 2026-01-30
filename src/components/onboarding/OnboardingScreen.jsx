import { motion } from 'framer-motion';
import { Shield, Camera, Calendar, Bell } from 'lucide-react';

const steps = [
  { icon: Camera, text: 'Snap a photo of your receipt' },
  { icon: Calendar, text: 'Set the warranty period' },
  { icon: Bell, text: 'Get reminded before it expires' },
];

export default function OnboardingScreen({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Logo */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-amber-500/30 mb-6"
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <Shield className="w-10 h-10 text-slate-900" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Warranty Vault
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Never lose money on expired warranties again
          </p>
        </motion.div>

        {/* Value props */}
        <div className="space-y-3 mb-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-white text-lg">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Pain stat */}
        <motion.div
          className="flex items-center justify-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="text-3xl font-bold text-red-400">$400+</span>
          <span className="text-sm text-slate-300 max-w-[200px]">
            Average amount households lose yearly on expired warranties
          </span>
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={onStart}
          className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg rounded-xl relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <span className="relative z-10">Add Your First Warranty</span>
        </motion.button>

        <motion.p
          className="text-center text-slate-500 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          Free forever &middot; No account required &middot; Data stays on your device
        </motion.p>
      </div>
    </div>
  );
}
