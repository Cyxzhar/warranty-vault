import ScrollProgress from '../animations/ScrollProgress';
import LandingNav from './LandingNav';
import HeroSection from './HeroSection';
import AppPreviewSection from './AppPreviewSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import LandingFooter from './LandingFooter';
export default function LandingPage({ onOpenApp }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-200 relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      <ScrollProgress />
      
      <div className="relative z-10">
        <LandingNav onOpenApp={onOpenApp} />
        
        <main>
          <HeroSection onOpenApp={onOpenApp} />
          <AppPreviewSection />
          <HowItWorksSection />
          <FeaturesSection />
          <PricingSection onOpenApp={onOpenApp} />
        </main>
        
        <LandingFooter onOpenApp={onOpenApp} />
      </div>
    </div>
  );
}