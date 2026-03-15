import React from 'react';
import { useGodMode } from '../context/GodModeContext';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { 
  Plus, Trash2, MoveVertical, Type, Image as ImageIcon, 
  Video, MousePointer2, Grid, Users, Bell, Table, Minus 
} from 'lucide-react';
import { Editable } from './Editable';
import { MediaEditable } from './MediaEditable';

export const PageBuilder: React.FC = () => {
  const { 
    isVisualEditMode, 
    activeEditor, 
    pageBlocks, 
    setPageBlocks,
    addBlock,
    removeBlock
  } = useGodMode();

  if (!isVisualEditMode || activeEditor !== 'builder') {
    return (
      <div className="space-y-12">
        {pageBlocks.map((block) => (
          <div key={block.id}>
            {block.type === 'text' && (
              <div className="prose prose-invert max-w-none mx-auto px-4 md:px-20" dangerouslySetInnerHTML={{ __html: block.content }} />
            )}
            {block.type === 'image' && (
              <div className="max-w-5xl mx-auto px-4">
                <img src={block.content || 'https://picsum.photos/seed/builder/1200/600'} className="w-full rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
              </div>
            )}
            {block.type === 'divider' && (
              <hr className="border-white/10 my-12" />
            )}
            {/* Add more renderers for other block types */}
          </div>
        ))}
      </div>
    );
  }

  const blockTypes = [
    { type: 'text', icon: Type, label: 'Text Block' },
    { type: 'image', icon: ImageIcon, label: 'Image Block' },
    { type: 'video', icon: Video, label: 'Video Block' },
    { type: 'button', icon: MousePointer2, label: 'Button Block' },
    { type: 'gallery', icon: Grid, label: 'Gallery Block' },
    { type: 'members', icon: Users, label: 'Member List' },
    { type: 'notices', icon: Bell, label: 'Notice List' },
    { type: 'table', icon: Table, label: 'Table' },
    { type: 'divider', icon: Minus, label: 'Divider' },
  ];

  return (
    <div className="min-h-[400px] bg-zinc-950/50 border-2 border-dashed border-white/5 rounded-[40px] p-8 md:p-12 relative">
      <div className="max-w-4xl mx-auto space-y-6">
        <Reorder.Group axis="y" values={pageBlocks} onReorder={setPageBlocks} className="space-y-6">
          {pageBlocks.map((block) => (
            <Reorder.Item 
              key={block.id} 
              value={block}
              className="relative group bg-zinc-900 border border-white/5 rounded-3xl p-6 hover:border-hot-pink/30 transition-colors"
            >
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="cursor-grab active:cursor-grabbing p-2 text-white/40 hover:text-white">
                  <MoveVertical size={20} />
                </div>
              </div>

              <div className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeBlock(block.id)}
                  className="bg-red-500 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                {blockTypes.find(t => t.type === block.type)?.icon && (
                  <div className="p-1 bg-white/5 rounded">
                    {React.createElement(blockTypes.find(t => t.type === block.type)!.icon, { size: 12 })}
                  </div>
                )}
                {block.type} BLOCK
              </div>

              <div className="min-h-[50px]">
                {block.type === 'text' && (
                  <Editable id={`block-${block.id}-content`} className="w-full">
                    {block.content}
                  </Editable>
                )}
                {block.type === 'image' && (
                  <MediaEditable id={`block-${block.id}-media`} type="image" src={block.content || 'https://picsum.photos/seed/builder/1200/600'} className="aspect-video rounded-2xl overflow-hidden" />
                )}
                {block.type === 'divider' && (
                  <div className="h-px bg-white/10 w-full my-4" />
                )}
                {/* Placeholder for other types */}
                {!['text', 'image', 'divider'].includes(block.type) && (
                  <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-2xl text-white/20 text-xs uppercase font-black tracking-widest">
                    {block.type} Component Placeholder
                  </div>
                )}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {pageBlocks.length === 0 && (
          <div className="py-20 text-center">
            <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
              <Grid size={40} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Empty Page Canvas</h3>
            <p className="text-zinc-500 text-sm">Start building your page by adding blocks from the menu below.</p>
          </div>
        )}

        <div className="pt-12 border-t border-white/5">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] text-center mb-8">Add New Content Block</p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {blockTypes.map((btn) => (
              <button
                key={btn.type}
                onClick={() => addBlock(btn.type as any)}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="size-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 group-hover:bg-bright-green group-hover:text-black group-hover:border-bright-green transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <btn.icon size={20} />
                </div>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
