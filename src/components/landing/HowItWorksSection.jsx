import { motion } from 'framer-motion';
import { Camera, Calendar, Bell } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const steps = [
  {
    icon: Camera,
    title: "Snap & Save",
    desc: "Take a photo of your receipt. We'll store it securely on your device so you never lose proof of purchase.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    delay: 0
  },
  {
    icon: Calendar,
    title: "Set Expiry",
    desc: "Enter the purchase date and warranty period. We calculate the exact expiry date automatically.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    delay: 0.2
  },
  {
    icon: Bell,
    title: "Get Reminded",
    desc: "Receive timely notifications before your warranty expires so you can claim repairs or replacements.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    delay: 0.4
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden bg-slate-900/20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Three simple steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">peace of mind</span>
            </h2>
            <p className="text-slate-400 text-xl">
              No complex setup. No bank connections. Just simple protection.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Animated Path (Desktop) */}
          <div className="hidden md:block absolute top-[100px] left-0 w-full h-24 -z-10 opacity-30">
             <svg className="w-full h-full overflow-visible">
               <path
                 d="M 150 50 C 350 50 350 50 600 50 C 850 50 850 50 1050 50"
                 stroke="url(#gradient-path)"
                 strokeWidth="3"
                 fill="none"
                 strokeDasharray="12 12"
                 className="animate-dash"
               />
               <defs>
                 <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#f97316" />
                   <stop offset="50%" stopColor="#3b82f6" />
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
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className={`w-12 h-12 rounded-full ${step.bg} border ${step.border} flex items-center justify-center text-xl font-bold ${step.color} mb-8 shadow-lg z-10`}>
                  {i + 1}
                </div>

                {/* Large Icon Illustration */}
                <div className="relative mb-10 group-hover:scale-110 transition-transform duration-500">
                  <div className={`absolute inset-0 ${step.bg} blur-2xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity`} />
                  <div className={`w-32 h-32 rounded-[2rem] ${step.bg} border ${step.border} flex items-center justify-center relative bg-slate-900/50 backdrop-blur-sm shadow-2xl`}>
                    <step.icon className={`w-14 h-14 ${step.color}`} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg max-w-xs">
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