import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LandingPage from './components/landing/LandingPage';
import AppContent from './AppContent';
import TermsOfService from './components/pages/TermsOfService';
import PrivacyPolicy from './components/pages/PrivacyPolicy';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function Router() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#/app') return 'app';
    if (hash === '#/terms') return 'terms';
    if (hash === '#/privacy') return 'privacy';
    return 'landing';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/app') setPage('app');
      else if (hash === '#/terms') setPage('terms');
      else if (hash === '#/privacy') setPage('privacy');
      else setPage('landing');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToApp = () => {
    window.location.hash = '#/app';
  };

  const navigateToLanding = () => {
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence mode="wait">
      {page === 'app' ? (
        <motion.div
          key="app"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen"
        >
          <AppContent onBackToLanding={navigateToLanding} />
        </motion.div>
      ) : page === 'terms' ? (
        <motion.div
          key="terms"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <TermsOfService onBack={navigateToLanding} />
        </motion.div>
      ) : page === 'privacy' ? (
        <motion.div
          key="privacy"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <PrivacyPolicy onBack={navigateToLanding} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <LandingPage onOpenApp={navigateToApp} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </ErrorBoundary>
  );
}
