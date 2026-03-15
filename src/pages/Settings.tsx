import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User, 
  Globe, 
  Database, 
  Save,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';

export default function Settings() {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <div className={`font-['Public_Sans',sans-serif] flex h-screen w-full overflow-hidden ${isGodMode ? 'bg-dark-grey text-white' : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className={`h-16 border-b backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 ${isGodMode ? 'bg-dark-grey border-white/5' : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80'}`}>
          <div className="flex items-center gap-2">
            <SettingsIcon className="text-primary size-5" />
            <h2 className="text-lg font-bold tracking-tight">{t('admin.sidebar.menu.settings')}</h2>
          </div>
          <div className="flex items-center gap-4">
            {saved && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-green-600 text-sm font-medium"
              >
                <CheckCircle2 className="size-4" />
                {t('common.saved_successfully')}
              </motion.div>
            )}
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Save className="size-4" />
              {t('common.save_changes')}
            </button>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
          {/* General Settings */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Globe className="size-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">{t('settings.general.title')}</h3>
            </div>
            <div className={`rounded-xl p-6 border space-y-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">{t('settings.general.organization_name')}</label>
                  <input className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" defaultValue="Somiti Management System" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">{t('settings.general.contact_email')}</label>
                  <input className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" defaultValue="info@somiti.com" type="email" />
                </div>
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Shield className="size-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">{t('settings.security.title')}</h3>
            </div>
            <div className={`rounded-xl p-6 border space-y-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t('settings.security.two_factor')}</p>
                  <p className={`text-xs ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('settings.security.two_factor_desc')}</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t('settings.security.session_timeout')}</p>
                  <p className="text-xs text-slate-500">{t('settings.security.session_timeout_desc')}</p>
                </div>
                <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-sm outline-none">
                  <option>30 Minutes</option>
                  <option>1 Hour</option>
                  <option>4 Hours</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Bell className="size-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">{t('settings.notifications.title')}</h3>
            </div>
            <div className={`rounded-xl p-6 border space-y-4 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
              {['email', 'sms', 'push'].map((type) => (
                <div key={type} className="flex items-center justify-between">
                  <p className="font-semibold capitalize">{t(`settings.notifications.${type}`)}</p>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* System Settings */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Lock className="size-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Change Password</h3>
            </div>
            <div className={`rounded-xl p-6 border space-y-4 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">New Password</label>
                  <input 
                    id="admin-new-password"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="Enter new password"
                    type="password" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Confirm Password</label>
                  <input 
                    id="admin-confirm-password"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="Confirm new password"
                    type="password" 
                  />
                </div>
              </div>
              <button 
                onClick={() => {
                  const newPass = (document.getElementById('admin-new-password') as HTMLInputElement).value;
                  const confirmPass = (document.getElementById('admin-confirm-password') as HTMLInputElement).value;
                  if (newPass && newPass === confirmPass) {
                    localStorage.setItem('adminPassword', newPass);
                    setSaved(true);
                    setTimeout(() => setSaved(false), 3000);
                  } else {
                    alert("Passwords do not match!");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all"
              >
                Update Password
              </button>
            </div>
          </section>

          {/* System Settings */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Database className="size-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">{t('settings.system.title')}</h3>
            </div>
            <div className={`rounded-xl p-6 border ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
              <button 
                onClick={() => {
                  const godMode = localStorage.getItem('godMode');
                  localStorage.clear();
                  if (godMode) localStorage.setItem('godMode', godMode);
                  window.location.reload();
                }}
                className="text-red-600 text-sm font-bold hover:underline flex items-center gap-2 cursor-pointer"
              >
                <Database className="size-4" />
                {t('settings.system.clear_cache')}
              </button>
            </div>
          </section>
        </div>

        <footer className="mt-auto p-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 text-xs">© 2024 Somiti Management System. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
