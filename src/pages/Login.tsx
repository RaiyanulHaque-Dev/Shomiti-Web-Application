import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutGrid, User, Lock, Eye, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedAdminPass = localStorage.getItem('adminPassword') || 'admin';
    const storedDevPass = localStorage.getItem('devPassword') || 'godmode';

    if (username === 'admin' && password === storedAdminPass) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.removeItem('godMode');
      navigate('/dashboard');
    } else if (username === 'developer' && password === storedDevPass) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'developer');
      localStorage.setItem('godMode', 'true');
      navigate('/dashboard');
    } else {
      alert(t('login.invalid_credentials'));
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-['Public_Sans',sans-serif] relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium group"
        >
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
          <span>{t('common.back')}</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo and Brand Section */}
        <div className="mb-10 flex flex-col items-center gap-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <LayoutGrid className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Somiti</h1>
          <span className="text-sm text-primary/80 font-medium tracking-widest uppercase">Management System</span>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px] bg-white dark:bg-slate-900 p-8 rounded-xl shadow-xl border border-primary/10 backdrop-blur-sm"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('login.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{t('login.subtitle')}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="username">
                {t('login.label_username')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <User className="size-5" />
                </div>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                  id="username" 
                  name="username" 
                  placeholder={t('login.placeholder_username')} 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">
                  {t('login.label_password')}
                </label>
                <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                  {t('login.forgot_password')}
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock className="size-5" />
                </div>
                <input 
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                  id="password" 
                  name="password" 
                  placeholder={t('login.placeholder_password')} 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                  <Eye className="size-5" />
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" id="remember" type="checkbox"/>
              <label className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer" htmlFor="remember">{t('login.remember_me')}</label>
            </div>

            {/* Login Button */}
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer" type="submit">
              <span>{t('login.login_btn')}</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('login.support_text')} <a className="text-primary font-semibold hover:underline" href="#">{t('login.contact_support')}</a>
            </p>
          </div>
        </motion.div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center gap-2 text-slate-400 dark:text-slate-500">
          <ShieldCheck className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Secure End-to-End Encryption</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-primary/5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © 2024 Somiti Management System. All Rights Reserved.
        </p>
      </footer>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-20 dark:opacity-10">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
