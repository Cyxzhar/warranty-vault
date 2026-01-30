import { motion } from 'framer-motion';
import appMockup from '../../assets/app-mockup.png';
import FadeIn from '../animations/FadeIn';

export default function AppPreviewSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0a0e1a]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
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
          <div className="relative p-3 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-2xl">
             
             {/* Inner Mockup Window */}
             <div className="relative rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-700/30 bg-[#0f1419] aspect-[16/10] sm:aspect-[16/9] group">
                
                {/* Image Container with Blending */}
                <div className="absolute inset-0 bg-[#0f1419]">
                   <img 
                    src={appMockup} 
                    alt="App Dashboard Preview" 
                    className="w-full h-full object-cover object-top opacity-90 mix-blend-normal filter brightness-90 contrast-105" 
                    loading="lazy"
                  />
                  {/* Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-transparent to-transparent opacity-40 pointer-events-none" />
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>

          {/* Glow Behind */}
          <div className="absolute -inset-10 bg-indigo-500/10 blur-[80px] -z-10 rounded-full opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
