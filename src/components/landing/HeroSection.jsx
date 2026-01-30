import { motion } from 'framer-motion';
import { ArrowRight, Check, Shield, TrendingUp } from 'lucide-react';
import hero3D from '../../assets/hero-3D.png';

export default function HeroSection({ onOpenApp }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-mesh">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-300 text-sm font-medium self-center lg:self-start hover:border-amber-500/30 transition-colors"
            >
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Free</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No Account</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Offline</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
              >
                Never lose money on <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 relative inline-block">
                  expired warranties
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-orange-500/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </motion.svg>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)] group w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>100% Private & Secure</span>
              </motion.div>
            </div>
          </div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative perspective-1000"
          >
            {/* 3D Image */}
            <motion.div
              animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img 
                src={hero3D} 
                alt="Warranty Vault 3D Interface" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Floating Stat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 bg-slate-800/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-700 shadow-2xl animate-float-delayed z-20 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-xs font-medium text-slate-400">Avg Loss/Year</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">$400+</div>
              <div className="text-xs text-slate-500">on expired warranties</div>
            </motion.div>

            {/* Glow Behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 blur-[80px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}