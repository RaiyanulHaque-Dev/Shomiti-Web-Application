import React from 'react';
import { useGodMode } from '../context/GodModeContext';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Eye, EyeOff, MoveUp, MoveDown, Trash2, Copy } from 'lucide-react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
  const { 
    isVisualEditMode, 
    activeEditor, 
    sectionVisibility, 
    setSectionVisibility,
    sectionOrder,
    setSectionOrder
  } = useGodMode();

  const isVisible = sectionVisibility[id] !== false;

  if (!isVisualEditMode || activeEditor !== 'sections') {
    if (!isVisible) return null;
    return <>{children}</>;
  }

  const handleMove = (direction: 'up' | 'down') => {
    const index = sectionOrder.indexOf(id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sectionOrder.length - 1) return;

    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setSectionOrder(newOrder);
  };

  return (
    <div className={`relative group border-2 transition-all ${isVisible ? 'border-transparent hover:border-hot-pink/30' : 'border-zinc-800 opacity-40'}`}>
      {/* Section Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-zinc-900/90 backdrop-blur-md border-b border-hot-pink/20 z-[50] flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          <div className="bg-hot-pink text-white p-1.5 rounded-lg">
            <Settings size={14} />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">{title} Section</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSectionVisibility(id, !isVisible)}
            className={`p-2 rounded-lg transition-colors ${isVisible ? 'text-white hover:bg-white/10' : 'text-hot-pink bg-hot-pink/10'}`}
            title={isVisible ? 'Hide Section' : 'Show Section'}
          >
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button
            onClick={() => handleMove('up')}
            className="p-2 text-white hover:bg-white/10 rounded-lg"
            title="Move Up"
          >
            <MoveUp size={16} />
          </button>
          <button
            onClick={() => handleMove('down')}
            className="p-2 text-white hover:bg-white/10 rounded-lg"
            title="Move Down"
          >
            <MoveDown size={16} />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button
            className="p-2 text-white hover:bg-white/10 rounded-lg"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
          <button
            className="p-2 text-white hover:bg-red-500/20 hover:text-red-500 rounded-lg"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className={isVisible ? '' : 'pointer-events-none grayscale'}>
        {children}
      </div>
    </div>
  );
};
