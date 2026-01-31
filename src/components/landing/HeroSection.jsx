import { motion } from 'framer-motion';
import { ArrowRight, Shield, Check, TrendingUp } from 'lucide-react';
import hero3D from '../../assets/hero-background.png';

export default function HeroSection({ onOpenApp }) {
  
  return (
    <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Content (55%) */}
          <div className="flex-1 text-center lg:text-left z-20 lg:max-w-[55%]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-6 mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Forever</span>
              </div>
              <div className="w-px h-3.5 bg-slate-700" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>No Account</span>
              </div>
              <div className="w-px h-3.5 bg-slate-700" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Offline</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white"
            >
              Never lose money on{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                expired warranties
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Stop letting hundreds of dollars slip away. Track your product warranties in seconds.
              Secure, private, and always on your device.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onOpenApp}
                className="group relative px-7 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-base text-white shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(249,115,22,0.6)] transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Start Tracking Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                <Shield className="w-4 h-4" />
                <span>100% Private & Secure</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (45%) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end w-full lg:max-w-[45%]"
          >
            {/* Image Container - Constrained with overflow hidden */}
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px] aspect-[4/5] mx-auto lg:mx-0">
              <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50">
                {/* Image */}
                <div className="absolute inset-0">
                   <img
                    src={hero3D}
                    alt="Warranty Vault 3D Interface"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Edge blending overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/30 via-transparent to-[#0a0e1a]/30 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(10,14,26,0.6)] pointer-events-none" />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                className="absolute bottom-6 left-4 sm:left-6 bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl border border-slate-700/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] z-20"
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Annual Loss</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-white">$400</span>
                  <span className="text-lg font-bold text-red-500">+</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Average per household</div>
                <div className="w-full h-1 bg-slate-700 rounded-full mt-2.5 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[80%]" />
                </div>
              </motion.div>

              {/* Glow Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-500/8 via-indigo-500/8 to-purple-500/8 blur-[80px] -z-10 rounded-full pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
