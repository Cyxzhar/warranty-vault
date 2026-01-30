import { motion } from 'framer-motion';
import { Check, Zap, Star } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function PricingSection({ onOpenApp }) {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">pricing</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Start for free. Upgrade when you need more power.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden"
          >
            <h3 className="text-xl font-medium text-slate-300 mb-2">Free Forever</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-slate-500">/month</span>
            </div>
            
            <p className="text-slate-400 mb-8 text-sm">Perfect for individuals just getting started.</p>
            
            <ul className="space-y-4 mb-8">
              {['10 Warranties', 'Local Storage', 'Basic Reminders', 'Works Offline'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={onOpenApp}
              className="w-full py-3 rounded-xl border border-slate-700 text-white font-medium hover:bg-slate-800 transition-colors"
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
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[34px] blur-lg opacity-40 animate-pulse-glow" />
            
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-[30px] p-8 border border-amber-500/30 shadow-2xl">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-bold shadow-lg shadow-orange-500/20">
                  <Star className="w-3 h-3 fill-current" />
                  Coming Soon
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-orange-400">$3</span>
                <span className="text-slate-500">/month</span>
              </div>
              
              <p className="text-slate-400 mb-8 text-sm">For power users who want total peace of mind.</p>
              
              <ul className="space-y-4 mb-8">
                {['Unlimited Warranties', 'Cloud Backup', 'Email & SMS Alerts', 'Priority Support', 'Receipt OCR'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Check className="w-3 h-3 text-slate-900 stroke-[3]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                disabled
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all opacity-90 cursor-not-allowed"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}