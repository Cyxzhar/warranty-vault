import ScrollProgress from '../animations/ScrollProgress';
import LandingNav from './LandingNav';
import HeroSection from './HeroSection';
import AppPreviewSection from './AppPreviewSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import LandingFooter from './LandingFooter';
import decorativeShapes from '../../assets/decorative_3D_shapes.png';

export default function LandingPage({ onOpenApp }) {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Gradient Mesh */}
         <div className="absolute inset-0 bg-mesh opacity-60" />
         
         {/* Noise Texture */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         {/* Decorative Floating Shapes */}
         <img 
           src={decorativeShapes} 
           alt="" 
           className="absolute top-[-10%] right-[-10%] w-[80%] opacity-20 animate-float-delayed mix-blend-screen"
         />
         <img 
           src={decorativeShapes} 
           alt="" 
           className="absolute bottom-[10%] left-[-20%] w-[60%] opacity-10 animate-float mix-blend-screen rotate-180"
         />
      </div>

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