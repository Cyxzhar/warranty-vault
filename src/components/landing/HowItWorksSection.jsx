import { motion } from 'framer-motion';
import { Camera, Calendar, Bell } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import howItWorksImg from '../../assets/how_it_works.png';

const steps = [
  {
    icon: Camera,
    title: "Snap & Save",
    desc: "Take a photo of your receipt. We'll store it securely on your device.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    badgeBg: "from-orange-500/20 to-orange-600/10",
    delay: 0
  },
  {
    icon: Calendar,
    title: "Set Expiry",
    desc: "Enter the purchase date and warranty period. We calculate the rest.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badgeBg: "from-amber-500/20 to-amber-600/10",
    delay: 0.2
  },
  {
    icon: Bell,
    title: "Get Reminded",
    desc: "Receive timely notifications before your warranty expires.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badgeBg: "from-emerald-500/20 to-emerald-600/10",
    delay: 0.4
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Three simple steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">peace of mind</span>
            </h2>
            <p className="text-slate-400 text-xl">
              No complex setup. No bank connections. Just simple protection.
            </p>
          </div>
        </FadeIn>

        {/* 3D Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={howItWorksImg}
              alt="Snap receipts, set expiry dates, get reminded"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {/* Edge blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-[#0a0e1a]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/40 via-transparent to-[#0a0e1a]/40 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(10,14,26,0.5)] pointer-events-none" />
          </div>
          {/* Glow behind */}
          <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 blur-[60px] -z-10 rounded-full opacity-60" />
        </motion.div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 relative">
          {/* Connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-px -z-10 opacity-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500" style={{ maskImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, black 6px, black 12px)' }} />
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
              <div className="flex flex-col items-center text-center p-8 sm:p-10 rounded-[2rem] glass-card border border-slate-700/30 hover:-translate-y-2 transition-all duration-500 h-full">
                {/* Number Badge */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.badgeBg} border ${step.border} flex items-center justify-center text-xl font-bold ${step.color} mb-6 shadow-xl relative z-10`}>
                  {i + 1}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base">
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
