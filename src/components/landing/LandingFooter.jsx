import { Shield, Lock, Zap, UserX, Check } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function LandingFooter({ onOpenApp }) {
  const handleLinkClick = (e, href) => {
    if (!href) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#0a0e1a] pt-24 pb-12 relative overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-20">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
                 </div>
                 <span className="font-[800] text-white text-xl tracking-tight">Warranty Vault</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-base">
                The privacy-first warranty tracker that helps you save money and stay organized. 
                Zero cloud dependencies.
              </p>
              {onOpenApp && (
                <button
                  onClick={onOpenApp}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm rounded-xl border border-slate-700 transition-all hover:border-slate-600"
                >
                  Start Tracking Now
                </button>
              )}
            </div>

            {/* Column 2: Product */}
            <div className="space-y-6">
              <h4 className="font-bold text-white text-base">Product</h4>
              <ul className="space-y-4">
                <li><a href="#features" onClick={(e) => handleLinkClick(e, '#features')} className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">Features</a></li>
                <li><a href="#how-it-works" onClick={(e) => handleLinkClick(e, '#how-it-works')} className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">How It Works</a></li>
                <li><a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">Changelog</a></li>
              </ul>
            </div>

             {/* Column 3: Resources */}
             <div className="space-y-6">
              <h4 className="font-bold text-white text-base">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">Support Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">Privacy Guide</a></li>
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors hover:underline underline-offset-4">Terms of Service</a></li>
              </ul>
            </div>

             {/* Column 4: Privacy Trust */}
            <div className="space-y-6">
              <h4 className="font-bold text-white text-base">Privacy First</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300 text-sm font-medium">Data Stays Local</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300 text-sm font-medium">Zero Tracking</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <UserX className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300 text-sm font-medium">No Account Required</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 text-[15px]">
              &copy; {new Date().getFullYear()} Warranty Vault. Made with ❤️ for privacy.
            </p>
            <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                 <Check className="w-3 h-3" strokeWidth={3} />
                 <span>100% FREE</span>
               </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}