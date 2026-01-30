import { Shield } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const linkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'No Account Needed', href: null },
      { label: '100% Free Forever', href: null },
      { label: 'Open Source', href: null },
    ],
  },
];

export default function LandingFooter({ onOpenApp }) {
  const handleLinkClick = (e, href) => {
    if (!href) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold">Warranty Vault</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-5">
                The dead-simple warranty tracker. Stop losing money on expired warranties.
                Your data stays on your device.
              </p>
              {onOpenApp && (
                <button
                  onClick={onOpenApp}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold text-sm rounded-xl hover:from-amber-300 hover:to-orange-400 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Start Tracking
                </button>
              )}
            </div>

            {/* Links */}
            {linkGroups.map((group) => (
              <div key={group.title} className="sm:col-span-3">
                <h4 className="text-sm font-semibold text-white mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span className="text-sm text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} Warranty Vault. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Data stays on your device
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                No tracking
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Free forever
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
