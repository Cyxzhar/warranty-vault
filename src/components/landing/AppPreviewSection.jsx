import { motion } from 'framer-motion';
import appMockup from '../../assets/app-mockup.png';
import FadeIn from '../animations/FadeIn';

export default function AppPreviewSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-[#0a0e1a]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
              Everything in one <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                beautiful dashboard
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
              Track warranties, view receipts, and get alerts—all in one place. 
              Designed to be intuitive, fast, and delightful to use.
            </p>
          </div>
        </FadeIn>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto perspective-1000"
        >
          {/* Glassmorphic Container Frame */}
          <div className="relative p-2 sm:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-2xl">
             
             {/* Inner Mockup Window */}
             <div className="relative rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-700/30 bg-[#0f1419] aspect-[16/10] sm:aspect-[16/9] max-h-[600px] group">
                
                {/* Image Container with Blending */}
                <div className="absolute inset-0 bg-[#0f1419]">
                   <img
                    src={appMockup}
                    alt="App Dashboard Preview"
                    className="w-full h-full object-cover object-top opacity-80 brightness-75 contrast-110 saturate-[0.85]"
                    loading="lazy"
                  />
                  {/* Bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/20 to-transparent pointer-events-none" />
                  {/* Top fade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0f1419]/40 via-transparent to-transparent pointer-events-none" />
                  {/* Side fades */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f1419]/50 via-transparent to-[#0f1419]/50 pointer-events-none" />
                  {/* Heavy vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)] pointer-events-none" />
                  {/* Radial vignette from center */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15,20,25,0.6) 100%)' }} />
                </div>

                {/* Subtle shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/3 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>

          {/* Glow Behind */}
          <div className="absolute -inset-10 bg-indigo-500/10 blur-[80px] -z-10 rounded-full opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
