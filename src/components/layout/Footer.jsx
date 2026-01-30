import { motion } from 'framer-motion';
import { Shield, Bell, Lock, Zap, UserX, ExternalLink } from 'lucide-react';

export default function Footer({ onRequestNotifications, notificationStatus }) {
  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Section: Badges & Notification Action */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
           {/* Privacy Badges */}
           <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
              <Shield className="w-3.5 h-3.5 text-[var(--status-active)]" />
              Local storage only
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
              <Lock className="w-3.5 h-3.5 text-[var(--status-active)]" />
              No tracking
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
              <Zap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Free forever
            </div>
          </div>

          {/* Notification Button */}
          {notificationStatus === 'default' && onRequestNotifications && (
            <button
              onClick={onRequestNotifications}
              className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-secondary)] text-[var(--accent-primary)] text-xs font-medium transition-colors border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50"
            >
              <Bell className="w-3.5 h-3.5" />
              Enable expiry reminders
            </button>
          )}
        </div>

        {/* Middle Grid (Desktop) */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-10 border-b border-[var(--border-subtle)] pb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <Shield className="w-6 h-6 text-[var(--accent-primary)]" />
               <span className="font-[var(--font-display)] font-bold text-[var(--text-primary)]">Warranty Vault</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              The dead-simple warranty tracker. Never lose money on expired coverage again.
            </p>
          </div>
          
          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)]">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Features</a></li>
              <li><a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)]">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Support</a></li>
              <li><a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Privacy Guide</a></li>
              <li><a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Blog</a></li>
            </ul>
          </div>
          
          {/* Privacy */}
          <div className="space-y-4">
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
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            © {new Date().getFullYear()} Warranty Vault · Made with ❤️ for privacy
          </p>
          <div className="flex items-center gap-6">
             <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
