import React, { useState } from 'react';
import { 
  Terminal, 
  LayoutDashboard, 
  LogOut,
  Settings,
  Menu,
  X,
  Code,
  Zap,
  Eye,
  Type,
  Globe,
  Image as ImageIcon,
  Layers,
  Box,
  RefreshCw
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useGodMode } from '../context/GodModeContext';

export default function DevSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isVisualEditMode, 
    setVisualEditMode, 
    activeEditor, 
    setActiveEditor,
    clearAllOverrides 
  } = useGodMode();
  const [isGodMode] = useState(localStorage.getItem('godMode') === 'true');

  const menuItems = [
    { icon: LayoutDashboard, label: 'System Overview', path: '/dashboard' },
    { icon: Globe, label: 'View Website', path: '/' },
    { icon: Code, label: 'Edit Website', path: '/admin/content' },
    { icon: Terminal, label: 'Dev Console', path: '/dev-console' },
    { icon: Settings, label: 'Admin Settings', path: '/admin/settings' },
  ];

  const editorModes = [
    { id: 'text', icon: Type, label: 'Text Editor' },
    { id: 'media', icon: ImageIcon, label: 'Media Editor' },
    { id: 'sections', icon: Layers, label: 'Section Editor' },
    { id: 'builder', icon: Box, label: 'Page Builder' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-black text-bright-green border-r border-bright-green/20 font-mono">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-bright-green rounded-lg p-2 text-black shadow-[0_0_15px_rgba(0,255,0,0.5)]">
            <Terminal className="size-6" />
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight tracking-tighter uppercase">ROOT_CONSOLE</h1>
            <p className="text-[10px] text-bright-green/60 font-bold uppercase tracking-widest">v2.5.0-stable</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-bright-green/10 rounded-lg">
          <X className="size-6" />
        </button>
      </div>
      
      {/* Visual Edit Mode Toggle */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setVisualEditMode(!isVisualEditMode)}
          className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
            isVisualEditMode 
              ? 'bg-hot-pink border-hot-pink text-white shadow-[0_0_20px_rgba(255,51,153,0.4)]' 
              : 'bg-black border-bright-green/20 text-bright-green/60 hover:border-bright-green/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <Eye className={`size-5 ${isVisualEditMode ? 'animate-pulse' : ''}`} />
            <span className="text-xs font-black uppercase tracking-widest">Visual Edit Mode</span>
          </div>
          <div className={`size-4 rounded-full border-2 transition-all ${
            isVisualEditMode ? 'bg-white border-white' : 'bg-transparent border-bright-green/20'
          }`} />
        </button>
      </div>

      {isVisualEditMode && (
        <div className="px-4 mb-6 space-y-2">
          <p className="text-[10px] font-black text-bright-green/40 uppercase tracking-[0.2em] px-2 mb-2">Editor Tools</p>
          <div className="grid grid-cols-2 gap-2">
            {editorModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveEditor(mode.id as any)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  activeEditor === mode.id
                    ? 'bg-bright-green border-bright-green text-black font-black'
                    : 'bg-zinc-900/50 border-white/5 text-white/40 hover:border-white/20 hover:text-white'
                }`}
              >
                <mode.icon size={18} />
                <span className="text-[8px] uppercase tracking-widest text-center leading-tight">{mode.label}</span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all website changes? This cannot be undone.')) {
                clearAllOverrides();
              }
            }}
            className="w-full mt-4 p-3 rounded-xl border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={12} /> Reset All Changes
          </button>
        </div>
      )}

      {isGodMode && !isVisualEditMode && (
        <div className="mx-4 mb-4 p-3 bg-fuchsia/10 border border-fuchsia/30 rounded-lg flex items-center gap-2 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
          <Zap className="size-4 text-fuchsia" />
          <span className="text-[10px] font-black text-fuchsia uppercase tracking-widest">God Mode Override</span>
        </div>
      )}

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-black text-bright-green/40 uppercase tracking-[0.2em] px-2 mb-2">Navigation</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={`${item.label}-${item.path}`}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-bright-green text-black font-black shadow-[0_0_20px_rgba(0,255,0,0.3)]' 
                  : 'text-bright-green/60 hover:bg-bright-green/5 hover:text-bright-green'
              }`}
            >
              <item.icon className="size-5" />
              <span className="text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-bright-green/10">
        <div className="flex items-center gap-3 p-3 bg-bright-green/5 rounded-xl border border-bright-green/10">
          <div className="size-10 rounded-full bg-bright-green/20 flex items-center justify-center overflow-hidden border border-bright-green/30">
            <Code className="size-6" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-black truncate uppercase tracking-tighter">DEV_USER_01</p>
            <p className="text-[8px] text-bright-green/40 truncate uppercase">SUPERUSER_ACCESS</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('userRole');
              localStorage.removeItem('godMode');
              navigate('/login');
            }}
            className="p-1.5 text-bright-green/40 hover:text-hot-pink transition-colors cursor-pointer"
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
          className="size-14 bg-bright-green text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-black border-r border-bright-green/20 flex-col shrink-0">
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] lg:hidden"
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
