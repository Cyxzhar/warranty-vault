import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function PricingSection({ onOpenApp }) {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-[#0a0e1a]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">pricing</span>
            </h2>
            <p className="text-slate-400 text-xl">
              Start for free. Upgrade when you need more power.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] p-10 border border-slate-800 bg-slate-900/50 backdrop-blur-sm relative"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Free Forever</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-white">$0</span>
              <span className="text-slate-500 font-medium">/month</span>
            </div>
            
            <p className="text-slate-400 mb-8 text-base leading-relaxed">Perfect for individuals just getting started with organizing their warranties.</p>
            
            <ul className="space-y-5 mb-10">
              {['10 Warranties', 'Local Storage', 'Basic Reminders', 'Works Offline'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={onOpenApp}
              className="w-full py-4 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors"
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
            className="relative transform md:scale-105 z-10"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[2.1rem] blur opacity-30 animate-pulse-glow" />
            
            <div className="relative bg-slate-900 rounded-[2rem] p-10 border border-amber-500/30 shadow-2xl">
              <div className="absolute top-0 right-0 p-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-500/20 tracking-wide uppercase">
                  <Star className="w-3 h-3 fill-current" />
                  Coming Soon
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-orange-400">$3</span>
                <span className="text-slate-500 font-medium">/month</span>
              </div>
              
              <p className="text-slate-300 mb-8 text-base leading-relaxed">For power users who want total peace of mind and advanced features.</p>
              
              <ul className="space-y-5 mb-10">
                {['Unlimited Warranties', 'Cloud Backup', 'Email & SMS Alerts', 'Priority Support', 'Receipt OCR'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                      <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />
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