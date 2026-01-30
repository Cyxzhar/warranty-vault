import { motion } from 'framer-motion';
import { Camera, Calendar, Bell } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const steps = [
  {
    icon: Camera,
    title: "Snap & Save",
    desc: "Take a photo of your receipt. We'll store it securely on your device.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    delay: 0
  },
  {
    icon: Calendar,
    title: "Set Expiry",
    desc: "Enter the purchase date and warranty period. We calculate the rest.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    delay: 0.2
  },
  {
    icon: Bell,
    title: "Get Reminded",
    desc: "Receive timely notifications before your warranty expires.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    delay: 0.4
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden bg-[#0f1419]">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Three simple steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">peace of mind</span>
            </h2>
            <p className="text-slate-400 text-xl">
              No complex setup. No bank connections. Just simple protection.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Animated Path (Desktop) */}
          <div className="hidden lg:block absolute top-[100px] left-0 w-full h-24 -z-10 opacity-30 pointer-events-none">
             <svg className="w-full h-full overflow-visible">
               <path
                 d="M 200 50 C 400 50 400 50 700 50 C 1000 50 1000 50 1200 50"
                 stroke="url(#gradient-path)"
                 strokeWidth="3"
                 fill="none"
                 strokeDasharray="12 12"
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center p-8 rounded-[2rem] glass-card hover:-translate-y-2 transition-all duration-500 h-full">
                {/* Number Badge */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border ${step.border} flex items-center justify-center text-2xl font-bold ${step.color} mb-8 shadow-xl relative z-10`}>
                  {i + 1}
                </div>

                {/* Large Icon Illustration */}
                <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className={`absolute inset-0 ${step.bg} blur-2xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity`} />
                  <div className={`w-24 h-24 rounded-3xl ${step.bg} border ${step.border} flex items-center justify-center relative bg-slate-900/50 backdrop-blur-sm shadow-2xl`}>
                    <step.icon className={`w-10 h-10 ${step.color}`} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
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
