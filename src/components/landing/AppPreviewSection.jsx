import { motion } from 'framer-motion';
import appMockup from '../../assets/app-mockup.png';
import FadeIn from '../animations/FadeIn';

export default function AppPreviewSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
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
          initial={{ opacity: 0, y: 60, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto perspective-1000"
        >
          {/* Glassmorphic Container Frame */}
          <div className="relative p-4 sm:p-8 rounded-[2rem] sm:rounded-[3rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl">
             
             {/* Inner Mockup Window */}
             <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900 group aspect-[16/10] sm:aspect-[16/9]">
                {/* Image */}
                <div className="absolute inset-0 bg-slate-950">
                   <img 
                    src={appMockup} 
                    alt="App Dashboard Preview" 
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-1000" 
                  />
                </div>
                
                {/* Overlay Gradient to fade bottom if image is too long, or add polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>

          {/* Glow Behind */}
          <div className="absolute -inset-10 bg-indigo-500/20 blur-[80px] -z-10 rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
