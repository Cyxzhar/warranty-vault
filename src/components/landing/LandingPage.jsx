import ScrollProgress from '../animations/ScrollProgress';
import LandingNav from './LandingNav';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import LandingFooter from './LandingFooter';

export default function LandingPage({ onOpenApp }) {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <LandingNav onOpenApp={onOpenApp} />
      <HeroSection onOpenApp={onOpenApp} />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection onOpenApp={onOpenApp} />
      <LandingFooter onOpenApp={onOpenApp} />
    </div>
  );
}
