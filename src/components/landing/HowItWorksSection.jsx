import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { StaggerContainer, StaggerItem } from '../animations/StaggerChildren';

const steps = [
  { number: '1', title: 'Add Product', description: 'Enter the product name and purchase date' },
  { number: '2', title: 'Set Warranty', description: 'Select warranty length & upload receipt' },
  { number: '3', title: 'Get Reminded', description: "We'll alert you before it expires" },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-slate-800">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
        </FadeIn>

        <StaggerContainer className="flex flex-col sm:flex-row gap-8 justify-center items-start">
          {steps.map((step, i) => (
            <StaggerItem key={step.number} className="text-center flex-1 max-w-[280px] mx-auto sm:mx-0 relative">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-[2px]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400/40 to-orange-500/40"
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              )}

              <motion.div
                className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-amber-400 to-orange-500 inline-flex items-center justify-center text-xl font-bold text-slate-900 mb-5 shadow-lg shadow-amber-500/20 relative z-10"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {step.number}
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-[15px] text-slate-400">{step.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
