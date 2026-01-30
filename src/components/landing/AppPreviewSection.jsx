import { motion } from 'framer-motion';
import appMockup from '../../assets/app-mockup.png';
import FadeIn from '../animations/FadeIn';

export default function AppPreviewSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0a0e1a]">
      {/* Spotlight Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything in one <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                beautiful dashboard
              </span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Track warranties, view receipts, and get alerts—all in one place. 
              Designed to be intuitive, fast, and delightful to use.
            </p>
          </div>
        </FadeIn>

        {/* Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glassmorphic Frame */}
          <div className="relative p-4 sm:p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl">
             
             {/* Phone/Screen Bezel Area */}
             <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-950 aspect-[16/10] group">
                
                {/* Image - contained and positioned */}
                <div className="absolute inset-0 overflow-hidden">
                   <img 
                    src={appMockup} 
                    alt="App Dashboard Preview" 
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-[1.5s]" 
                  />
                </div>
                
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
             </div>
          </div>

          {/* Glow Behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-500/20 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}