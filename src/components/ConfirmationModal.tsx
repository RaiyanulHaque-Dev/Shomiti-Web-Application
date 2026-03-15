import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}: ConfirmationModalProps) {
  const isGodMode = localStorage.getItem('godMode') === 'true';

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return isGodMode ? 'bg-hot-pink/10 text-hot-pink border-hot-pink/20' : 'bg-red-50 text-red-600 border-red-100';
      case 'warning':
        return isGodMode ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return isGodMode ? 'bg-bright-green/10 text-bright-green border-bright-green/20' : 'bg-primary/10 text-primary border-primary/10';
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return isGodMode ? 'bg-hot-pink text-white shadow-hot-pink/20' : 'bg-red-600 text-white shadow-red-600/20';
      case 'warning':
        return isGodMode ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-amber-600 text-white shadow-amber-600/20';
      default:
        return isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-primary text-white shadow-primary/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md rounded-3xl shadow-2xl z-[210] overflow-hidden border ${
              isGodMode ? 'bg-dark-grey border-white/10' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl border ${getTypeStyles()}`}>
                  <AlertTriangle className="size-6" />
                </div>
                <h3 className={`text-xl font-black uppercase tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {title}
                </h3>
              </div>

              <p className={`mb-8 font-medium leading-relaxed ${isGodMode ? 'text-white/60' : 'text-slate-600 dark:text-slate-400'}`}>
                {message}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                    isGodMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${getButtonStyles()}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
