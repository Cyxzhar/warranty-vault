import { motion } from 'framer-motion';
import { ArrowRight, Shield, Check, TrendingUp } from 'lucide-react';
import hero3D from '../../assets/hero-3D.png';

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

          {/* Visual (45%) */}
          <div className="flex-1 w-full relative z-10 perspective-1000">
            {/* Image Container with crop */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: -5 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 aspect-[4/5] lg:aspect-[3/4]"
            >
              <img 
                src={hero3D} 
                alt="App Interface" 
                className="absolute inset-0 w-full h-full object-cover object-top scale-105"
              />
              
              {/* Gloss Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Stat Card - Reintegrated */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-10 -left-4 lg:-left-12 bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 shadow-2xl min-w-[260px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Annual Loss</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-[800] text-white">$400</span>
                <span className="text-2xl font-bold text-red-500">+</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">Average per household</div>
              <div className="w-full h-1 bg-slate-700 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-red-500 w-[80%]" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
