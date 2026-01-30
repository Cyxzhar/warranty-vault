import { Shield, Lock, Zap, UserX } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function LandingFooter({ onOpenApp }) {
  const handleLinkClick = (e, href) => {
    if (!href) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 backdrop-blur-xl pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 mb-12 border-b border-[var(--border-subtle)] pb-12">
            {/* Brand */}
            <div className="sm:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                 <Shield className="w-6 h-6 text-[var(--accent-primary)]" />
                 <span className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-lg">Warranty Vault</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                The dead-simple warranty tracker. Stop losing money on expired warranties.
                Your data stays on your device.
              </p>
              {onOpenApp && (
                <button
                  onClick={onOpenApp}
                  className="px-6 py-2.5 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-[var(--bg-primary)] font-semibold text-sm rounded-[var(--radius-md)] shadow-lg shadow-[var(--accent-primary)]/20 hover:shadow-[var(--accent-primary)]/40 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Start Tracking
                </button>
              )}
            </div>

            {/* Product */}
            <div className="sm:col-span-2 sm:col-start-7 space-y-4">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)]">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" onClick={(e) => handleLinkClick(e, '#features')} className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Features</a></li>
                <li><a href="#how-it-works" onClick={(e) => handleLinkClick(e, '#how-it-works')} className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">How It Works</a></li>
                <li><a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Pricing</a></li>
              </ul>
            </div>

             {/* Privacy */}
            <div className="sm:col-span-4 space-y-4">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)]">Privacy First</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Shield className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <span>Your data stays on your device</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Lock className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <span>Zero tracking or analytics</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <UserX className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <span>No account required</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>
              &copy; {new Date().getFullYear()} Warranty Vault. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--status-active)]" />
                 <span>100% Free</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--status-active)]" />
                 <span>Open Source</span>
               </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
