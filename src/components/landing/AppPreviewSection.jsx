import { motion } from 'framer-motion';
import appMockup from '../../assets/app-mockup.png';
import FadeIn from '../animations/FadeIn';

export default function AppPreviewSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Your entire warranty vault, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                right in your pocket
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Manage everything from a single, beautiful dashboard. Track expiries, view receipts, and organize your purchases with ease.
            </p>
          </div>
        </FadeIn>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto perspective-1000"
        >
          {/* Mockup Container with Reflection */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 group">
             {/* Image */}
             <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[2/1]">
                <img 
                  src={appMockup} 
                  alt="App Dashboard Preview" 
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700" 
                />
                {/* Overlay Gradient to fade bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-20" />
             </div>
             
             {/* Reflection/Shine */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Glow Behind */}
          <div className="absolute -inset-4 bg-indigo-500/20 blur-[60px] -z-10 rounded-full opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
