import React, { useState } from 'react';
import { useGodMode } from '../context/GodModeContext';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Video, X, Maximize2, Trash2, Info, Upload } from 'lucide-react';
import { MediaLibrary } from './MediaLibrary';

interface MediaEditableProps {
  id: string;
  type: 'image' | 'video';
  src?: string;
  defaultSrc?: string;
  alt?: string;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
}

export const MediaEditable: React.FC<MediaEditableProps> = ({
  id,
  type,
  src,
  defaultSrc,
  alt: defaultAlt,
  caption: defaultCaption,
  className = '',
  children
}) => {
  const { isVisualEditMode, activeEditor, uiOverrides, updateOverride } = useGodMode();
  const [isEditing, setIsEditing] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const currentSrc = uiOverrides[`${id}.src`] || src || defaultSrc;
  const currentAlt = uiOverrides[`${id}.alt`] || defaultAlt || '';
  const currentCaption = uiOverrides[`${id}.caption`] || defaultCaption || '';

  const handleUpdate = (field: string, value: string) => {
    updateOverride(`${id}.${field}`, value);
  };

  const handleSelectMedia = (url: string) => {
    handleUpdate('src', url);
    setIsLibraryOpen(false);
  };

  if (!isVisualEditMode || activeEditor !== 'media') {
    return (
      <div className={`relative group ${className}`}>
        {type === 'image' ? (
          <img src={currentSrc} alt={currentAlt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <video src={currentSrc} className="w-full h-full object-cover" controls />
        )}
        {currentCaption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
            {currentCaption}
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={`relative group border-2 border-transparent hover:border-hot-pink/50 transition-all cursor-pointer ${className}`}>
      {type === 'image' ? (
        <img src={currentSrc} alt={currentAlt} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
      ) : (
        <video src={currentSrc} className="w-full h-full object-cover opacity-80" />
      )}

      {/* Edit Overlay */}
      <div 
        onClick={() => setIsEditing(true)}
        className="absolute inset-0 bg-hot-pink/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4"
      >
        <div className="bg-hot-pink text-white p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">
          {type === 'image' ? <ImageIcon size={32} /> : <Video size={32} />}
        </div>
        <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
          <span className="text-xs font-black text-white uppercase tracking-widest">Edit Media Asset</span>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row h-full max-h-[80vh]">
                {/* Preview Area */}
                <div className="flex-1 bg-black/50 flex items-center justify-center p-8 relative">
                  {type === 'image' ? (
                    <img src={currentSrc} alt={currentAlt} className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <video src={currentSrc} className="max-w-full max-h-full rounded-2xl shadow-2xl" controls />
                  )}
                  
                  <button 
                    onClick={() => setIsLibraryOpen(true)}
                    className="absolute bottom-12 bg-hot-pink text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                  >
                    <Upload size={20} />
                    Change Media
                  </button>
                </div>

                {/* Settings Area */}
                <div className="w-full md:w-80 border-l border-white/5 p-8 flex flex-col gap-8 bg-zinc-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-hot-pink p-2 rounded-lg">
                        <Info size={16} className="text-white" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Media Settings</span>
                    </div>
                    <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Media URL</label>
                      <input
                        type="text"
                        value={currentSrc}
                        onChange={(e) => handleUpdate('src', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-hot-pink/50 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Alt Text (SEO)</label>
                      <input
                        type="text"
                        value={currentAlt}
                        onChange={(e) => handleUpdate('alt', e.target.value)}
                        placeholder="Describe this image..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-hot-pink/50 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Caption</label>
                      <textarea
                        value={currentCaption}
                        onChange={(e) => handleUpdate('caption', e.target.value)}
                        placeholder="Add a caption..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-hot-pink/50 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-bright-green transition-colors"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        handleUpdate('src', '');
                        setIsEditing(false);
                      }}
                      className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Remove Media
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MediaLibrary 
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelect={handleSelectMedia}
        allowedTypes={[type]}
      />
    </div>
  );
};
