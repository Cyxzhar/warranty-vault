import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/ forever',
    featured: false,
    buttonLabel: 'Start Free',
    features: [
      'Track up to 10 warranties',
      'Receipt photo storage',
      'In-app expiry alerts',
      'Works offline',
    ],
  },
  {
    name: 'Pro',
    price: '$3',
    period: '/ month',
    featured: true,
    buttonLabel: 'Join Waitlist',
    features: [
      'Unlimited warranties',
      'Email reminders',
      'SMS alerts',
      'Family sharing (5 users)',
      'Cloud sync across devices',
    ],
  },
];

export default function PricingSection({ onOpenApp }) {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-slate-800">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Simple Pricing
          </h2>
          <p className="text-slate-400 text-lg">
            Free forever. Pro for power users.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[700px] mx-auto">
          {plans.map((plan, i) => (
            <FadeIn
              key={plan.name}
              delay={i * 0.15}
              direction={i === 0 ? 'right' : 'left'}
            >
              <motion.div
                className={`p-7 rounded-2xl border relative h-full ${
                  plan.featured
                    ? 'border-amber-400/60 bg-slate-800/60'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.25 },
                }}
              >
                {/* Featured glow */}
                {plan.featured && (
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl blur-sm -z-10" />
                )}

                {plan.featured && (
                  <span className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-semibold rounded-full shadow-lg shadow-amber-500/20">
                    Coming Soon
                  </span>
                )}

                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-base font-normal text-slate-400 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-[15px] text-slate-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + fi * 0.08 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={plan.featured ? undefined : onOpenApp}
                  className={`w-full py-3.5 rounded-xl font-semibold relative overflow-hidden group ${
                    plan.featured
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {plan.featured && (
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                  <span className="relative z-10">{plan.buttonLabel}</span>
                </motion.button>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
