import { motion } from 'framer-motion';
import { Shield, Smartphone, Zap, Lock, Bell, CloudOff } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const features = [
  {
    icon: Smartphone,
    title: "Mobile First",
    desc: "Designed for the device you always have with you. Snap receipts instantly.",
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
    delay: 0
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Get notified before your warranty expires so you never miss a claim window.",
    color: "text-amber-400",
    gradient: "from-amber-500/20 to-orange-500/20",
    delay: 0.1
  },
  {
    icon: CloudOff,
    title: "Works Offline",
    desc: "No internet? No problem. Access your data anywhere, anytime.",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/20",
    delay: 0.2
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    desc: "Your data stays on your device. We don't track you or sell your info.",
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
    delay: 0.3
  },
  {
    icon: Lock,
    title: "Secure Storage",
    desc: "Bank-grade encryption for your local data. Your receipts are safe.",
    color: "text-rose-400",
    gradient: "from-rose-500/20 to-red-500/20",
    delay: 0.4
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized for speed. Load your vault instantly without waiting.",
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-amber-500/20",
    delay: 0.5
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Why use <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Warranty Vault</span>?
            </h2>
            <p className="text-slate-400 text-lg">
              We built the tool we wanted to use. Simple, fast, and respectful of your privacy.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              className="group"
            >
              <div className="h-full glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-700`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}