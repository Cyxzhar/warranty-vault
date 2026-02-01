import { Shield, Lock, Zap, Bell } from 'lucide-react';

export default function Footer({ onRequestNotifications, notificationStatus }) {
  return (
    <footer className="mt-auto bg-[#0a0e1a] relative">
      <div className="max-w-[1400px] mx-auto px-6">
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

          {/* Links + notification */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <a href="mailto:support@shelflife.app?subject=ShelfLife%20Feedback" className="text-slate-400 hover:text-white transition-colors">Feedback & Support</a>
            <a href="#/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
            <a href="#/terms" className="text-slate-400 hover:text-white transition-colors">Terms</a>
            {notificationStatus === 'default' && onRequestNotifications && (
              <button
                onClick={onRequestNotifications}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                Enable Reminders
              </button>
            )}
          </div>
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
      </div>
    </footer>
  );
}
