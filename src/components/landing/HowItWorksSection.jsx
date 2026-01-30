import { motion } from 'framer-motion';
import { Camera, Calendar, Bell } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const steps = [
  {
    icon: Camera,
    title: "Snap & Save",
    desc: "Take a photo of your receipt. We'll store it securely on your device so you never lose proof of purchase.",
    color: "from-orange-400 to-amber-500",
    shadow: "shadow-orange-500/20",
    delay: 0
  },
  {
    icon: Calendar,
    title: "Set Expiry",
    desc: "Enter the purchase date and warranty period. We calculate the exact expiry date automatically.",
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/20",
    delay: 0.2
  },
  {
    icon: Bell,
    title: "Get Reminded",
    desc: "Receive timely notifications before your warranty expires so you can claim repairs or replacements.",
    color: "from-emerald-400 to-green-500",
    shadow: "shadow-emerald-500/20",
    delay: 0.4
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Three simple steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">peace of mind</span>
            </h2>
            <p className="text-slate-400 text-lg">
              No complex setup. No bank connections. Just a simple tool to protect your purchases.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Animated Path (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 z-0">
             <svg className="w-full h-full overflow-visible">
               <motion.path
                 d="M 100 0 L 400 0 C 600 0 600 0 800 0 L 1100 0"
                 stroke="url(#gradient-path)"
                 strokeWidth="2"
                 fill="none"
                 strokeDasharray="10 10"
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 0.3 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
               <defs>
                 <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#f59e0b" />
                   <stop offset="50%" stopColor="#6366f1" />
                   <stop offset="100%" stopColor="#10b981" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="relative z-10 group"
            >
              <div className="h-full glass-card glass-card-hover rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300">
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 shadow-xl ${step.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <step.icon className="w-8 h-8 text-white relative z-10" />
                  </div>
                </div>

                <div className="absolute top-6 right-6 text-6xl font-bold text-slate-800/50 pointer-events-none select-none">
                  0{i + 1}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}