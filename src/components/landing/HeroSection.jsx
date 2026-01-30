import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import AnimatedCounter from '../animations/AnimatedCounter';

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroSection({ onOpenApp }) {
  return (
    <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 text-center overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 relative">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/[0.07] rounded-full blur-[120px] pointer-events-none" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full text-sm text-amber-400 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          Free &middot; No account required &middot; Works offline
        </motion.div>

        {/* Headline - word by word */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-tight leading-[1.08] mb-7">
          {['Never', 'lose', 'money', 'on'].map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
          >
            expired warranties
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="inline-block"
          >
            again
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-lg sm:text-xl text-slate-400 max-w-[540px] mx-auto mb-10 leading-relaxed"
        >
          The dead-simple warranty tracker. Snap a photo of your receipt, set the date,
          get reminded before it expires.{' '}
          <span className="text-slate-300 font-medium">That's it.</span>
        </motion.p>

        {/* Pain stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          className="inline-flex items-center gap-5 px-7 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-10 hover:bg-red-500/[0.14] transition-colors"
        >
          <AnimatedCounter
            target={400}
            prefix="$"
            suffix="+"
            className="text-4xl font-bold text-red-400"
          />
          <span className="text-left text-[15px] text-slate-300 max-w-[200px]">
            Average amount households lose yearly on expired warranties
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={onOpenApp}
            className="relative px-9 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg rounded-xl overflow-hidden group"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="relative z-10">Start Tracking — It's Free</span>
          </motion.button>
          <p className="text-sm text-slate-500">No signup. Your data stays on your device.</p>
        </motion.div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 max-w-[380px] mx-auto"
        >
          <motion.div
            className="p-[3px] bg-gradient-to-br from-amber-400 to-orange-500 rounded-[20px] shadow-2xl shadow-black/50 relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-[24px] blur-xl opacity-50" />

            <div className="bg-slate-900 rounded-[17px] overflow-hidden relative">
              {/* Preview header */}
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Shield className="w-[18px] h-[18px] text-slate-900" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-[15px]">My Warranties</span>
              </div>
              {/* Preview cards */}
              <div className="p-4 space-y-3">
                {[
                  { name: 'LG Refrigerator', status: 'expiring', label: 'Expires in 23 days', Icon: Clock, delay: 1.7 },
                  { name: 'Samsung TV 55"', status: 'active', label: '287 days remaining', Icon: CheckCircle, delay: 1.85 },
                  { name: 'Dyson Vacuum', status: 'expired', label: 'Expired 14 days ago', Icon: AlertTriangle, delay: 2.0 },
                ].map((card) => (
                  <motion.div
                    key={card.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: card.delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <PreviewCard {...card} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const statusColors = {
  active: { border: 'border-l-emerald-500', badge: 'bg-emerald-500/15 text-emerald-400' },
  expiring: { border: 'border-l-amber-400', badge: 'bg-amber-400/15 text-amber-400' },
  expired: { border: 'border-l-red-500', badge: 'bg-red-500/15 text-red-400' },
};

function PreviewCard({ name, status, label, Icon }) {
  const colors = statusColors[status];
  return (
    <div className={`px-4 py-3.5 bg-slate-800 rounded-xl border-l-4 ${colors.border} hover:bg-slate-750 transition-colors`}>
      <h4 className="font-semibold text-[15px] mb-2">{name}</h4>
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    </div>
  );
}
