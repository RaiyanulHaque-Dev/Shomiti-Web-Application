import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Upload, Folder, File, Image as ImageIcon, 
  Video, FileText, Search, Trash2, MoreVertical, 
  ChevronRight, Plus, Grid, List
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'doc';
  size: string;
  date: string;
  folder: string;
}

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  allowedTypes?: string[];
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ 
  isOpen, 
  onClose, 
  onSelect,
  allowedTypes = ['image', 'video']
}) => {
  const [currentFolder, setCurrentFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for now
  const [items, setItems] = useState<MediaItem[]>([
    { id: '1', name: 'hero-banner.jpg', url: 'https://picsum.photos/seed/hero/1200/600', type: 'image', size: '1.2 MB', date: '2024-03-10', folder: 'home' },
    { id: '2', name: 'member-1.png', url: 'https://picsum.photos/seed/m1/400/400', type: 'image', size: '450 KB', date: '2024-03-11', folder: 'members' },
    { id: '3', name: 'annual-report.pdf', url: '#', type: 'pdf', size: '2.4 MB', date: '2024-03-12', folder: 'documents' },
    { id: '4', name: 'intro-video.mp4', url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', size: '15 MB', date: '2024-03-13', folder: 'home' },
  ]);

  const folders = [
    { id: 'all', name: 'All Media', icon: Grid },
    { id: 'home', name: 'Home', icon: Folder },
    { id: 'members', name: 'Members', icon: Folder },
    { id: 'receipts', name: 'Receipts', icon: Folder },
    { id: 'notices', name: 'Notices', icon: Folder },
    { id: 'gallery', name: 'Gallery', icon: Folder },
    { id: 'documents', name: 'Documents', icon: Folder },
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real app, this would upload to a server
    const newItems = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 
            file.type === 'application/pdf' ? 'pdf' : 'doc',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      folder: currentFolder === 'all' ? 'uploads' : currentFolder
    })) as MediaItem[];
    
    setItems(prev => [...newItems, ...prev]);
  }, [currentFolder]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const filteredItems = items.filter(item => {
    const matchesFolder = currentFolder === 'all' || item.folder === currentFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl h-full max-h-[800px] bg-zinc-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="bg-hot-pink p-2 rounded-xl">
                <ImageIcon size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-widest">Media Library</h2>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Manage your website assets</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 p-6 space-y-8 overflow-y-auto hidden md:block">
              <div>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Folders</p>
                <div className="space-y-1">
                  {folders.map(folder => (
                    <button
                      key={folder.id}
                      onClick={() => setCurrentFolder(folder.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentFolder === folder.id ? 'bg-hot-pink text-white shadow-lg shadow-hot-pink/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                    >
                      <folder.icon size={18} />
                      <span className="text-xs font-bold">{folder.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/5">
                  <Plus size={16} />
                  <span className="text-xs font-bold">New Folder</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Toolbar */}
              <div className="p-4 border-b border-white/5 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="text"
                    placeholder="Search media..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:border-hot-pink/50 outline-none transition-all"
                  />
                </div>
                
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <div {...getRootProps()} className={`px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${isDragActive ? 'bg-bright-green text-black' : 'bg-hot-pink text-white hover:scale-105 shadow-lg shadow-hot-pink/20'}`}>
                  <input {...getInputProps()} />
                  <Upload size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Upload</span>
                </div>
              </div>

              {/* Items Grid/List */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {isDragActive && (
                  <div className="absolute inset-0 z-10 bg-bright-green/10 border-4 border-dashed border-bright-green m-4 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <Upload size={64} className="text-bright-green mx-auto mb-4 animate-bounce" />
                      <p className="text-2xl font-black text-bright-green uppercase tracking-widest">Drop files to upload</p>
                    </div>
                  </div>
                )}

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredItems.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative"
                      >
                        <div 
                          onClick={() => onSelect(item.url)}
                          className="aspect-square bg-zinc-800 rounded-2xl overflow-hidden border border-white/5 group-hover:border-hot-pink/50 transition-all cursor-pointer relative"
                        >
                          {item.type === 'image' ? (
                            <img src={item.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                          ) : item.type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                              <Video size={40} className="text-white/20" />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                              <FileText size={40} className="text-white/20" />
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest bg-hot-pink px-3 py-1 rounded-full">Select</span>
                          </div>
                        </div>
                        <div className="mt-2 px-1">
                          <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
                          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">{item.size} • {item.type}</p>
                        </div>
                        <button className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md text-white/40 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredItems.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => onSelect(item.url)}
                        className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 cursor-pointer transition-all group"
                      >
                        <div className="size-12 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                          {item.type === 'image' ? (
                            <img src={item.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <File size={20} className="text-white/20" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.name}</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{item.folder} • {item.date}</p>
                        </div>
                        <div className="text-right px-4 hidden sm:block">
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{item.size}</p>
                        </div>
                        <button className="p-2 text-white/20 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {filteredItems.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
                      <Search size={40} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">No Media Found</h3>
                    <p className="text-zinc-500 text-sm">Try adjusting your search or folder filter.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
