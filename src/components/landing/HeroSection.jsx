import { motion } from 'framer-motion';
import { ArrowRight, Check, Shield, TrendingUp } from 'lucide-react';
import hero3D from '../../assets/hero-3D.png';

export default function HeroSection({ onOpenApp }) {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-mesh">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content (55%) */}
          <div className="lg:col-span-6 flex flex-col gap-10 text-center lg:text-left pt-10 lg:pt-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 text-slate-300 text-sm font-medium self-center lg:self-start hover:bg-slate-800/60 transition-colors shadow-lg shadow-black/10"
            >
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> Free Forever</span>
              <span className="w-px h-3 bg-slate-700" />
              <span className="flex items-center gap-1.5">No Account</span>
              <span className="w-px h-3 bg-slate-700" />
              <span className="flex items-center gap-1.5">Offline First</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-[5.5rem] font-[800] tracking-tight text-white leading-[1.05]"
              >
                Never lose money on <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-size-200 animate-gradient-text relative inline-block pb-2">
                  expired warranties
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Stop letting hundreds of dollars slip away. Track your product warranties in seconds. 
                Secure, private, and always on your device.
              </motion.p>
            </div>

            {/* CTA & Stats */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <motion.button
                onClick={onOpenApp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-[0_20px_50px_-12px_rgba(249,115,22,0.5)] group w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 text-sm font-medium text-slate-400 px-4 py-2 rounded-xl border border-transparent hover:border-slate-800 transition-colors"
              >
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>100% Private & Secure</span>
              </motion.div>
            </div>
          </div>

          {/* Right Visual (45%) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative perspective-1000 flex justify-center lg:justify-end"
          >
            {/* 3D Image Container - Smart Cropping */}
            <motion.div
              animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[600px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm group"
            >
              {/* Image Positioning - Crop Bottom to hide logo */}
              <div className="absolute inset-0 -bottom-[10%]"> 
                 <img 
                  src={hero3D} 
                  alt="Warranty Vault 3D Interface" 
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[2s]" 
                />
              </div>
              
              {/* Gloss Overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
            </motion.div>

            {/* Floating Stat Card - Reintegrated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="absolute bottom-[15%] -left-4 sm:left-[-20px] lg:-left-12 bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/50 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] z-20 min-w-[240px] animate-float-delayed"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Annual Loss</span>
                <div className="p-1.5 bg-red-500/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white tracking-tight">$400</span>
                <span className="text-xl font-bold text-red-400">+</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium">on expired warranties</div>
              
              {/* Progress bar visual */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}