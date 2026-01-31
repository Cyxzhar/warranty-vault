import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function PricingSection({ onOpenApp }) {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0e1a]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">pricing</span>
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl">
              Start for free. Upgrade when you need more power.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-start">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] p-8 sm:p-10 border border-slate-800 bg-slate-900/40 backdrop-blur-sm relative hover:border-slate-700 transition-colors opacity-95"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Free Forever</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight">$0</span>
              <span className="text-slate-500 font-medium">/month</span>
            </div>
            
            <p className="text-slate-400 mb-8 text-base leading-relaxed h-[48px]">Perfect for individuals just getting started with organizing their warranties.</p>
            
            <ul className="space-y-5 mb-10">
              {['10 Warranties', 'Local Storage', 'Basic Reminders', 'Works Offline'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={onOpenApp}
              className="w-full py-4 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-all hover:border-slate-600 hover:-translate-y-0.5"
            >
              Start Free
            </button>
          </motion.div>

          {/* Pro Tier (Hero) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 lg:-mt-4 lg:scale-[1.02]"
          >
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-b from-amber-500/30 to-orange-600/30 rounded-[2.1rem] blur-sm opacity-30" />
            
            <div className="relative bg-slate-900 rounded-[2rem] p-8 sm:p-10 border border-amber-500/20 shadow-2xl">
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-500/20 tracking-wide uppercase">
                  <Star className="w-3 h-3 fill-current" />
                  Coming Soon
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-orange-400">$3</span>
                <span className="text-slate-500 font-medium">/month</span>
              </div>
              
              <p className="text-slate-300 mb-8 text-base leading-relaxed h-[48px]">For power users who want total peace of mind and advanced features.</p>
              
              <ul className="space-y-5 mb-10">
                {['Unlimited Warranties', 'Cloud Backup', 'Email & SMS Alerts', 'Priority Support', 'Receipt OCR'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                      <Check className="w-4 h-4 text-slate-900 stroke-[3]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                disabled
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all opacity-90 cursor-not-allowed flex items-center justify-center gap-2"
              >
                Join Waitlist <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}