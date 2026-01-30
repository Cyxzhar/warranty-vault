import { motion } from 'framer-motion';
import { ArrowRight, Shield, Check, TrendingUp } from 'lucide-react';
import hero3D from '../../assets/hero-background.png';

export default function HeroSection({ onOpenApp }) {
  
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Content (55%) */}
          <div className="flex-1 text-center lg:text-left z-20">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-8 mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Free Forever</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>No Account</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Offline</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[5rem] font-[800] leading-[1.1] tracking-tight mb-8 text-white"
            >
              Never lose money on <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                expired warranties
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Stop letting hundreds of dollars slip away. Track your product warranties in seconds. 
              Secure, private, and always on your device.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <button 
                onClick={onOpenApp}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-lg text-white shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(249,115,22,0.6)] transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Start Tracking Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                <Shield className="w-5 h-5" />
                <span>100% Private & Secure</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (45%) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end w-full"
          >
            {/* 3D Image Container - Constrained */}
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] aspect-[4/5] mx-auto lg:mx-0">
              <motion.div
                animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm group"
              >
                {/* Image Positioning */}
                <div className="absolute inset-0"> 
                   <img 
                    src={hero3D} 
                    alt="Warranty Vault 3D Interface" 
                    className="w-full h-full object-cover object-top scale-105" 
                  />
                </div>
                
                {/* Gloss Overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none" />
              </motion.div>

              {/* Floating Stat Card - Positioned relative to container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                className="absolute -bottom-6 -left-4 sm:-left-12 bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-700/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-20 min-w-[200px] max-w-[240px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Annual Loss</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-[800] text-white">$400</span>
                  <span className="text-xl font-bold text-red-500">+</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Average per household</div>
                <div className="w-full h-1 bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-red-500 w-[80%]" />
                </div>
              </motion.div>

              {/* Glow Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-500/10 via-indigo-500/10 to-purple-500/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
