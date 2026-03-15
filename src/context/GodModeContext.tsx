import React, { createContext, useContext, useState, useEffect } from 'react';

interface PageBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'gallery' | 'members' | 'notices' | 'table' | 'divider';
  content: any;
  settings?: any;
}

interface GodModeContextType {
  isGodMode: boolean;
  isVisualEditMode: boolean;
  setVisualEditMode: (enabled: boolean) => void;
  uiOverrides: Record<string, any>;
  updateOverride: (id: string, value: any) => void;
  deleteOverride: (id: string) => void;
  clearAllOverrides: () => void;
  activeEditor: 'text' | 'media' | 'layout' | 'sections' | 'builder';
  setActiveEditor: (editor: 'text' | 'media' | 'layout' | 'sections' | 'builder') => void;
  
  // Section Management
  sectionVisibility: Record<string, boolean>;
  setSectionVisibility: (id: string, visible: boolean) => void;
  sectionOrder: string[];
  setSectionOrder: (order: string[]) => void;
  
  // Page Builder
  pageBlocks: PageBlock[];
  setPageBlocks: (blocks: PageBlock[]) => void;
  addBlock: (type: PageBlock['type']) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
}

const GodModeContext = createContext<GodModeContextType | undefined>(undefined);

export const GodModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGodMode, setIsGodMode] = useState(() => localStorage.getItem('godMode') === 'true');
  const [isVisualEditMode, setVisualEditMode] = useState(false);
  const [activeEditor, setActiveEditor] = useState<'text' | 'media' | 'layout' | 'sections' | 'builder'>('text');
  
  useEffect(() => {
    const handleStorageChange = () => {
      setIsGodMode(localStorage.getItem('godMode') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [uiOverrides, setUiOverrides] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('uiOverrides');
    return saved ? JSON.parse(saved) : {};
  });

  const [sectionVisibility, setSectionVisibilityState] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sectionVisibility');
    return saved ? JSON.parse(saved) : {};
  });

  const [sectionOrder, setSectionOrderState] = useState<string[]>(() => {
    const saved = localStorage.getItem('sectionOrder');
    return saved ? JSON.parse(saved) : [];
  });

  const [pageBlocks, setPageBlocksState] = useState<PageBlock[]>(() => {
    const saved = localStorage.getItem('pageBlocks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('uiOverrides', JSON.stringify(uiOverrides));
  }, [uiOverrides]);

  useEffect(() => {
    localStorage.setItem('sectionVisibility', JSON.stringify(sectionVisibility));
  }, [sectionVisibility]);

  useEffect(() => {
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  useEffect(() => {
    localStorage.setItem('pageBlocks', JSON.stringify(pageBlocks));
  }, [pageBlocks]);

  const updateOverride = (id: string, value: any) => {
    setUiOverrides(prev => ({ ...prev, [id]: value }));
  };

  const deleteOverride = (id: string) => {
    setUiOverrides(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearAllOverrides = () => {
    setUiOverrides({});
    setSectionVisibilityState({});
    setSectionOrderState([]);
    setPageBlocksState([]);
    localStorage.removeItem('uiOverrides');
    localStorage.removeItem('sectionVisibility');
    localStorage.removeItem('sectionOrder');
    localStorage.removeItem('pageBlocks');
  };

  const setSectionVisibility = (id: string, visible: boolean) => {
    setSectionVisibilityState(prev => ({ ...prev, [id]: visible }));
  };

  const setSectionOrder = (order: string[]) => {
    setSectionOrderState(order);
  };

  const setPageBlocks = (blocks: PageBlock[]) => {
    setPageBlocksState(blocks);
  };

  const addBlock = (type: PageBlock['type']) => {
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'text' ? '<h2>New Text Block</h2><p>Click to edit this content.</p>' : '',
      settings: {}
    };
    setPageBlocksState(prev => [...prev, newBlock]);
  };

  const removeBlock = (id: string) => {
    setPageBlocksState(prev => prev.filter(b => b.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    setPageBlocksState(prev => {
      const index = prev.findIndex(b => b.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;
      
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  return (
    <GodModeContext.Provider value={{ 
      isGodMode,
      isVisualEditMode, 
      setVisualEditMode, 
      uiOverrides, 
      updateOverride,
      deleteOverride,
      clearAllOverrides,
      activeEditor,
      setActiveEditor,
      sectionVisibility,
      setSectionVisibility,
      sectionOrder,
      setSectionOrder,
      pageBlocks,
      setPageBlocks,
      addBlock,
      removeBlock,
      moveBlock
    }}>
      {children}
    </GodModeContext.Provider>
  );
};

export const useGodMode = () => {
  const context = useContext(GodModeContext);
  if (!context) {
    throw new Error('useGodMode must be used within a GodModeProvider');
  }
  return context;
};
