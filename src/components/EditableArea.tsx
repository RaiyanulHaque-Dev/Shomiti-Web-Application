import React from 'react';
import { useGodMode } from '../context/GodModeContext';
import { Plus, Trash2 } from 'lucide-react';

interface EditableAreaProps {
  id: string;
  children: (item: any, index: number) => React.ReactNode;
  defaultItems: any[];
  className?: string;
  newItemTemplate: any;
}

export const EditableArea: React.FC<EditableAreaProps> = ({ 
  id, 
  children, 
  defaultItems, 
  className = '',
  newItemTemplate
}) => {
  const { isVisualEditMode, uiOverrides, updateOverride, activeEditor } = useGodMode();

  const items = Array.isArray(uiOverrides[id]) ? uiOverrides[id] : (Array.isArray(defaultItems) ? defaultItems : []);

  const handleAdd = () => {
    const newItems = [...items, { ...newItemTemplate, id: Date.now() }];
    updateOverride(id, newItems);
  };

  const handleDelete = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    updateOverride(id, newItems);
  };

  const handleUpdateItem = (index: number, updates: any) => {
    const newItems = items.map((item: any, i: number) => i === index ? { ...item, ...updates } : item);
    updateOverride(id, newItems);
  };

  if (!isVisualEditMode || activeEditor !== 'layout') {
    return (
      <div className={className}>
        {items.map((item: any, index: number) => children(item, index))}
      </div>
    );
  }

  return (
    <div className={`relative border-2 border-dashed border-fuchsia/20 p-4 rounded-3xl ${className}`}>
      <div className="absolute -top-4 -left-4 bg-fuchsia text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10">
        Layout Editor Active
      </div>
      
      {items.map((item: any, index: number) => (
        <div key={item.id || index} className="relative group/area mb-4 last:mb-0">
          {children(item, index)}
          <div className="absolute top-2 right-2 opacity-0 group-hover/area:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={() => handleDelete(index)}
              className="bg-hot-pink text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
              title="Delete Item"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-bright-green/30 rounded-2xl text-bright-green hover:bg-bright-green/5 transition-all flex items-center justify-center gap-2 mt-4 group"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        <span className="font-black uppercase tracking-widest text-xs">Add New Element</span>
      </button>
    </div>
  );
};
