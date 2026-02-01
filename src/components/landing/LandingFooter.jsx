import { Shield, Lock, Zap } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function LandingFooter({ onOpenApp }) {
  const handleLinkClick = (e, href) => {
    if (!href) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto bg-[#0a0e1a] relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn>
          {/* Main row */}
          <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/15">
                <Shield className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
              </div>
              <span className="font-[800] text-white text-lg tracking-tight">ShelfLife</span>
            </div>
            <p className="hidden md:block text-xs text-slate-500 mt-1 ml-12">The simple, offline-first warranty manager.</p>

            {/* Links */}
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <a href="#features" onClick={(e) => handleLinkClick(e, '#features')} className="text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" onClick={(e) => handleLinkClick(e, '#how-it-works')} className="text-slate-400 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#/terms" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="mailto:support@shelflife.app?subject=ShelfLife%20Inquiry" className="text-slate-400 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          {/* Separator */}
          <div className="h-px bg-slate-800/60" />

          {/* Bottom bar */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} ShelfLife
            </p>
            <div className="flex items-center gap-5 text-slate-500 text-xs">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500/70" />
                Secure
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500/70" />
                Private
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500/70" />
                Free
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
