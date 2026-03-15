import React, { useState, useEffect } from 'react';
import { LayoutGrid, PersonStanding, Menu, Share2, Globe, X, LogOut, LogIn, Edit3, Settings as SettingsIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { motion, AnimatePresence } from 'motion/react';
import { useGodMode } from '../context/GodModeContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isVisualEditMode, setVisualEditMode, isGodMode } = useGodMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('godMode');
    setIsMobileMenuOpen(false);
    navigate('/login');
  };
  
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.members'), path: '/members' },
    { name: t('nav.notices'), path: '/notices' },
    { name: t('nav.financials'), path: '/transparency' },
    { name: t('nav.apply'), path: '/apply' },
    { name: t('nav.support'), path: '/contact' },
  ];

  return (
    <div className={`font-display min-h-screen flex flex-col ${isGodMode ? 'bg-dark-grey text-white' : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      {/* Top Navigation Bar */}
      <header className={`flex items-center justify-between border-b px-4 md:px-20 py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-80 ${isGodMode ? 'bg-black/40 border-white/10' : 'bg-white dark:bg-slate-950 border-primary/10'}`}>
        <Link to="/" className={`flex items-center gap-3 ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
          <LayoutGrid className="size-8" />
          <h2 className={`text-lg md:text-xl font-bold leading-tight tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{t('nav.home')}</h2>
        </Link>
        <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? (isGodMode ? 'text-bright-green' : 'text-primary') 
                    : (isGodMode ? 'text-white/60 hover:text-bright-green' : 'text-slate-700 dark:text-slate-300 hover:text-primary')
                }`} 
                to={link.path}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {isAuthenticated && (userRole === 'admin' || userRole === 'developer') && (
              <button
                onClick={() => setVisualEditMode(!isVisualEditMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isVisualEditMode 
                    ? (isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white') 
                    : (isGodMode ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                }`}
              >
                <Edit3 className="size-4" />
                {isVisualEditMode ? 'Exit Editor' : 'Visual Editor'}
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard" 
                  className={`flex items-center justify-center rounded-full size-10 border transition-all ${
                    isGodMode ? 'bg-white/5 border-white/10 text-bright-green hover:bg-white/10' : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                  }`}
                >
                  <SettingsIcon className="size-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    isGodMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <LogOut className="size-4" />
                  {t('nav.logout') || 'Logout'}
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white hover:opacity-90'
                }`}
              >
                <LogIn className="size-4" />
                {t('nav.login') || 'Login'}
              </Link>
            )}
          </div>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${isGodMode ? 'text-white hover:bg-white/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            {isMobileMenuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 bottom-0 w-[80%] max-w-sm z-[70] lg:hidden shadow-2xl flex flex-col ${isGodMode ? 'bg-dark-grey' : 'bg-white dark:bg-slate-900'}`}
            >
              <div className={`p-6 border-b flex justify-between items-center ${isGodMode ? 'border-white/10' : 'border-slate-100 dark:border-slate-800'}`}>
                <div className={`flex items-center gap-3 ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
                  <LayoutGrid className="size-6" />
                  <span className={`font-bold ${isGodMode ? 'text-white' : ''}`}>{t('nav.home')}</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className={`p-2 rounded-lg ${isGodMode ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <X className="size-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-4 rounded-xl text-lg font-bold transition-all ${
                      location.pathname === link.path 
                        ? (isGodMode ? 'bg-bright-green text-black shadow-lg shadow-bright-green/20' : 'bg-primary text-white shadow-lg shadow-primary/20') 
                        : (isGodMode ? 'text-white/60 hover:bg-white/5' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800')
                    }`} 
                    to={link.path}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className={`pt-6 mt-6 border-t ${isGodMode ? 'border-white/10' : 'border-slate-100 dark:border-slate-800'}`}>
                  {isAuthenticated && (userRole === 'admin' || userRole === 'developer') && (
                    <button
                      onClick={() => {
                        setVisualEditMode(!isVisualEditMode);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-4 rounded-xl font-bold text-lg mb-2 ${
                        isVisualEditMode 
                          ? (isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white') 
                          : (isGodMode ? 'bg-white/5 text-white/60' : 'bg-slate-100 text-slate-600')
                      }`}
                    >
                      <Edit3 className="size-6" />
                      {isVisualEditMode ? 'Exit Visual Editor' : 'Visual Editor'}
                    </button>
                  )}

                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-lg mb-2 ${isGodMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        <SettingsIcon className="size-6" />
                        {t('nav.dashboard') || 'Dashboard'}
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-4 py-4 rounded-xl font-bold text-lg ${isGodMode ? 'bg-red-500/10 text-red-500' : 'bg-red-50 text-red-600'}`}
                      >
                        <LogOut className="size-6" />
                        {t('nav.logout') || 'Logout'}
                      </button>
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-lg ${isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white'}`}
                    >
                      <LogIn className="size-6" />
                      {t('nav.login') || 'Login'}
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {children}

      {/* Footer */}
      <footer className={`mt-20 border-t py-12 ${isGodMode ? 'bg-black/40 border-white/10' : 'bg-slate-50 dark:bg-slate-900/50 border-primary/10'}`}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className={`flex items-center gap-3 mb-4 ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
              <LayoutGrid className="size-8" />
              <h2 className={`text-xl font-bold ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{t('nav.home')}</h2>
            </div>
            <p className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} max-w-sm`}>
              {t('home.hero_subtitle')}
            </p>
          </div>
          <div>
            <h4 className={`font-bold mb-4 ${isGodMode ? 'text-white' : ''}`}>{t('nav.about')}</h4>
            <ul className={`space-y-2 text-sm ${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>
              <li><Link className={`hover:${isGodMode ? 'text-bright-green' : 'text-primary'}`} to="/about">{t('nav.about')}</Link></li>
              <li><Link className={`hover:${isGodMode ? 'text-bright-green' : 'text-primary'}`} to="/members">{t('nav.members')}</Link></li>
              <li><Link className={`hover:${isGodMode ? 'text-bright-green' : 'text-primary'}`} to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`font-bold mb-4 ${isGodMode ? 'text-white' : ''}`}>{t('nav.contact')}</h4>
            <div className="flex gap-4">
              <div className={`size-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isGodMode ? 'bg-white/5 text-bright-green hover:bg-bright-green hover:text-black' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                <Share2 className="size-5" />
              </div>
              <div className={`size-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isGodMode ? 'bg-white/5 text-bright-green hover:bg-bright-green hover:text-black' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                <Globe className="size-5" />
              </div>
            </div>
          </div>
        </div>
        <div className={`max-w-[1200px] mx-auto px-6 mt-12 pt-6 border-t text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4 ${isGodMode ? 'border-white/10 text-white/20' : 'border-slate-200 dark:border-slate-800 text-slate-400'}`}>
          <p>© 2024 {t('nav.home')}. All rights reserved.</p>
          <Link to="/dev-console" className={`text-[10px] opacity-20 hover:opacity-100 transition-opacity uppercase tracking-widest font-mono ${isGodMode ? 'text-white' : ''}`}>
            {t('nav.dev_console')}
          </Link>
        </div>
      </footer>
    </div>
  );
}
