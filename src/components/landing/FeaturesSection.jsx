import { motion } from 'framer-motion';
import { Shield, Bell, Layers } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const features = [
  {
    icon: Layers,
    title: "Set up in 30 seconds",
    desc: "No setup needed. Just add your first warranty and you're done.",
    color: "text-orange-400",
    iconBg: "bg-orange-500/15",
    gradient: "from-orange-500/20 to-amber-500/5",
    delay: 0
  },
  {
    icon: Shield,
    title: "Your vault, your device",
    desc: "Zero tracking pixels. Your data is secure, private, and always protected.",
    badges: ["Secure Storage", "Smart Alerts"],
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    gradient: "from-emerald-500/20 to-teal-500/5",
    delay: 0.15
  },
  {
    icon: Bell,
    title: "Smart reminders",
    desc: "Get alerted 30 days before expiry. Never lose money on missed warranties.",
    color: "text-amber-400",
    iconBg: "bg-amber-500/15",
    gradient: "from-amber-500/20 to-yellow-500/5",
    delay: 0.3
  }
];

function JellyBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Orange blob — top left */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <path d="M200 50 C280 30 370 100 350 200 C330 300 270 370 180 350 C90 330 30 270 50 180 C70 90 120 70 200 50Z" fill="url(#orange-grad)" fillOpacity="0.06" />
          <defs>
            <radialGradient id="orange-grad" cx="50%" cy="50%"><stop stopColor="#f97316"/><stop offset="1" stopColor="#f59e0b" stopOpacity="0"/></radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Emerald blob — center right */}
      <motion.div
        animate={{ x: [0, -15, 10, 0], y: [0, 20, -10, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-10 -right-32"
      >
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <path d="M250 60 C350 40 460 130 440 260 C420 380 330 460 210 430 C100 400 30 310 60 200 C90 100 150 80 250 60Z" fill="url(#emerald-grad)" fillOpacity="0.05" />
          <defs>
            <radialGradient id="emerald-grad" cx="50%" cy="50%"><stop stopColor="#10b981"/><stop offset="1" stopColor="#14b8a6" stopOpacity="0"/></radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Amber blob — bottom center */}
      <motion.div
        animate={{ x: [0, 10, -20, 0], y: [0, -10, 15, 0], scale: [1, 1.03, 0.97, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-32 left-1/4"
      >
        <svg width="450" height="450" viewBox="0 0 450 450" fill="none">
          <path d="M225 55 C320 35 420 120 400 230 C380 340 300 420 195 400 C90 380 25 290 50 190 C75 100 130 75 225 55Z" fill="url(#amber-grad)" fillOpacity="0.05" />
          <defs>
            <radialGradient id="amber-grad" cx="50%" cy="50%"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#eab308" stopOpacity="0"/></radialGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      {/* Animated jelly blobs */}
      <JellyBlobs />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything you need, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">nothing you don't</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-start">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className="relative group"
            >
              <div className="h-full glass-card rounded-[2rem] p-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-white/5">
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-8 border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-8 flex-1">
                    {feature.desc}
                  </p>

                  {feature.badges && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {feature.badges.map(badge => (
                        <span key={badge} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
