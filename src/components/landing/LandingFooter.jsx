import { Shield, Lock, Zap, ArrowRight, Twitter, Github } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function LandingFooter({ onOpenApp }) {
  const handleLinkClick = (e, href) => {
    if (!href) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features', onClick: handleLinkClick },
        { label: 'How It Works', href: '#how-it-works', onClick: handleLinkClick },
        { label: 'Pricing', href: '#pricing', onClick: handleLinkClick },
        { label: 'Try it now', action: onOpenApp },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: 'mailto:support@shelflife.app?subject=ShelfLife%20Inquiry' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#/privacy' },
        { label: 'Terms of Service', href: '#/terms' },
      ]
    }
  ];

  return (
    <footer className="mt-auto bg-[#0a0e1a] border-t border-slate-800/60 relative">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
            
            {/* Brand Column (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/15">
                  <Shield className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
                </div>
                <span className="font-[800] text-white text-xl tracking-tight">ShelfLife</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The simple, offline-first warranty manager. Stop letting your money expire and keep track of your purchases securely.
              </p>
              
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                   <Twitter className="w-4 h-4" />
                 </div>
                 <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                   <Github className="w-4 h-4" />
                 </div>
              </div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((column) => (
              <div key={column.title} className="lg:col-span-1">
                <h4 className="font-bold text-white mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.action ? (
                        <button 
                          onClick={link.action}
                          className="text-slate-400 hover:text-amber-400 transition-colors text-sm font-medium flex items-center gap-1 group"
                        >
                          {link.label}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <a 
                          href={link.href}
                          onClick={(e) => link.onClick ? link.onClick(e, link.href) : null}
                          className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} ShelfLife. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Systems Operational</span>
               </div>
               <div className="flex items-center gap-4">
                 <span className="flex items-center gap-1.5">
                   <Shield className="w-3.5 h-3.5 text-emerald-500/80" />
                   Secure
                 </span>
                 <span className="flex items-center gap-1.5">
                   <Lock className="w-3.5 h-3.5 text-emerald-500/80" />
                   Private
                 </span>
                 <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-500/80" />
                    Free
                 </span>
               </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}