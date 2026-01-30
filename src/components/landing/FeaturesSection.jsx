import { motion } from 'framer-motion';
import { Camera, Bell, Lock } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import { StaggerContainer, StaggerItem } from '../animations/StaggerChildren';

const features = [
  {
    icon: Camera,
    title: 'Snap & Forget',
    description:
      'Take a photo of your receipt. We store it safely. Find it instantly when you need to make a claim.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description:
      'Get notified 30 days before any warranty expires. Never miss free repairs or replacements again.',
  },
  {
    icon: Lock,
    title: '100% Private',
    description:
      "No account needed. Your data stays on your device. We don't connect to your bank or email.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why Warranty Vault?
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="p-7 bg-slate-800/50 border border-slate-700/80 rounded-2xl group cursor-default h-full"
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(100, 116, 139, 0.6)',
                  transition: { duration: 0.25 },
                }}
              >
                <motion.div
                  className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-amber-400/15 to-orange-500/15 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon className="w-7 h-7 text-amber-400" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[15px] text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
