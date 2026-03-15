import React, { useState, useRef } from 'react';
import { useGodMode } from '../context/GodModeContext';
import { Edit3, Check, X, Maximize2 } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { motion, AnimatePresence } from 'motion/react';

interface EditableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  as?: any;
  multiline?: boolean;
}

export const Editable: React.FC<EditableProps> = ({ id, children, className = '', as: Component = 'span', multiline = false }) => {
  const { isVisualEditMode, uiOverrides, updateOverride, activeEditor } = useGodMode();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const containerRef = useRef<HTMLSpanElement>(null);

  const currentValue = uiOverrides[id] || (typeof children === 'string' ? children : '');

  const handleSave = () => {
    updateOverride(id, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const startEditing = () => {
    setTempValue(currentValue);
    setIsEditing(true);
  };

  if (!isVisualEditMode || activeEditor !== 'text') {
    return (
      <Component 
        className={className} 
        dangerouslySetInnerHTML={{ __html: currentValue || children }} 
      />
    );
  }

  return (
    <span className={`relative group inline-block ${className}`} ref={containerRef}>
      <Component 
        className="cursor-pointer hover:outline hover:outline-2 hover:outline-hot-pink/50 hover:outline-dashed transition-all p-1 rounded"
        dangerouslySetInnerHTML={{ __html: currentValue || children }}
        onClick={startEditing}
      />
      
      <button
        onClick={startEditing}
        className="absolute -top-3 -right-3 bg-hot-pink text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg hover:scale-110"
        title="Edit Text"
      >
        <Edit3 size={12} />
      </button>

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-hot-pink p-6 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
                  <Edit3 size={18} className="text-hot-pink" />
                  Rich Text Editor
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-bright-green text-black px-4 py-2 rounded-lg font-black uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                  >
                    <Check size={14} /> Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition-colors"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>

              <RichTextEditor 
                content={tempValue} 
                onChange={setTempValue} 
              />
              
              <div className="text-[10px] text-zinc-500 font-mono">
                ID: {id}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </span>
  );
};
