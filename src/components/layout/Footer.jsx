import { Shield, Lock, Zap, Bell, Mail, Github, Twitter } from 'lucide-react';

export default function Footer({ onRequestNotifications, notificationStatus }) {
  const footerLinks = [
    {
      title: 'Support',
      links: [
        { label: 'Feedback & Support', href: 'mailto:support@shelflife.app?subject=ShelfLife%20Feedback' },
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
      <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
            
            {/* Brand Column (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/15">
                  <Shield className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
                </div>
                <span className="font-[800] text-white text-xl tracking-tight">ShelfLife</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Your personal warranty vault. Secure, private, and offline-first.
              </p>

               {notificationStatus === 'default' && onRequestNotifications && (
                  <button
                    onClick={onRequestNotifications}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-lg transition-colors border border-slate-700"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    Enable Reminders
                  </button>
                )}
            </div>

            {/* Spacer */}
            <div className="hidden lg:block lg:col-span-2"></div>

            {/* Links Columns */}
            {footerLinks.map((column) => (
              <div key={column.title} className="lg:col-span-1">
                <h4 className="font-bold text-white mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                        <a 
                          href={link.href}
                          className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                        >
                          {link.label}
                        </a>
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
      </div>
    </footer>
  );
}