import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  Wallet, 
  Globe, 
  MessageSquare,
  LogOut,
  Landmark,
  Settings,
  Menu,
  X,
  Terminal,
  Database
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Editable } from './Editable';

export default function AdminSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: t('admin.sidebar.menu.dashboard'), path: '/dashboard' },
    { icon: Users, label: t('admin.sidebar.menu.members'), path: '/admin/members' },
    { icon: Wallet, label: t('admin.sidebar.menu.savings'), path: '/admin/savings' },
    { icon: Megaphone, label: t('admin.sidebar.menu.notices'), path: '/admin/notices' },
    { icon: MessageSquare, label: t('admin.sidebar.menu.support'), path: '/admin/support' },
    { icon: Globe, label: t('admin.sidebar.menu.content'), path: '/admin/content' },
    { icon: Database, label: 'Overrides', path: '/admin/overrides' },
    { icon: Settings, label: t('admin.sidebar.menu.settings'), path: '/admin/settings' },
  ];

  const isDeveloper = localStorage.getItem('userRole') === 'developer';

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-dark-grey text-white border-r border-fuchsia/20">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-fuchsia rounded-lg p-2 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]">
            <Landmark className="size-6" />
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight tracking-tighter uppercase">{t('admin.sidebar.title')}</h1>
            <p className="text-[10px] text-fuchsia font-bold uppercase tracking-widest">{t('admin.sidebar.subtitle')}</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
          <X className="size-6" />
        </button>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={`${item.label}-${item.path}`}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-fuchsia text-white font-black shadow-[0_0_20px_rgba(217,70,239,0.3)]' 
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="size-5" />
              <span className="text-sm uppercase tracking-tight">
                <Editable id={`admin.sidebar.${item.label}`}>
                  {item.label}
                </Editable>
              </span>
            </Link>
          );
        })}
        {isDeveloper && (
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-bright-green hover:bg-bright-green/10 mt-8 border border-bright-green/20"
          >
            <Terminal className="size-5" />
            <span className="text-sm uppercase tracking-tight">Switch to Dev View</span>
          </Link>
        )}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="size-10 rounded-full bg-fuchsia/20 flex items-center justify-center overflow-hidden border border-fuchsia/30">
            <img 
              alt="Admin Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4PmwQwTObWex3WVKC118pA4id5KnYT1hnCpbcScbqz-UQm-3FnPbOLFEVZImpBSy7Qi0jo-hQd_bKH1tb_xiFl7ZtrehVdQ_IHUq8h4FcZ5NgK9eci4RQuIxVIEqh_2KNedMq9q85ruCFLN0Cvyb7pqAY219mas_ubCD8JzJRQE5E4T2abcL4sWtJBJnk_3-BHjvNr2rIxA4d2o9nYMp8bU0THty3xl7OHoA1DhrVAhWNZpn1D77vBcQdJqwOSabGZV-66DTSx6YU"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-black truncate uppercase tracking-tighter">{t('admin.sidebar.admin_name')}</p>
            <p className="text-[10px] text-zinc-500 truncate uppercase">{t('admin.sidebar.admin_role')}</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('userRole');
              localStorage.removeItem('godMode');
              navigate('/login');
            }}
            className="p-1.5 text-zinc-500 hover:text-hot-pink transition-colors cursor-pointer"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[60]">
        <button 
          onClick={() => setIsOpen(true)}
          className="size-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-r border-primary/10 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Slide-over */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[80%] max-w-sm z-[80] lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
