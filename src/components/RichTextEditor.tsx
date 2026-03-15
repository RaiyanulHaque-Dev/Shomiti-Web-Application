import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, 
  Link as LinkIcon, Type, AlignLeft, AlignCenter, AlignRight,
  Table as TableIcon, Image as ImageIcon, Smile, Code, Quote,
  Heading1, Heading2, Heading3, Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-zinc-900 sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('underline') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
      
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 1 }) ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="H1"
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="H2"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 3 }) ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="H3"
      >
        <Heading3 size={16} />
      </button>
      
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </button>
      
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      
      <button
        onClick={addLink}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('link') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Add Link"
      >
        <LinkIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('blockquote') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Blockquote"
      >
        <Quote size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('codeBlock') ? 'text-bright-green bg-white/5' : 'text-white/60'}`}
        title="Code Block"
      >
        <Code size={16} />
      </button>
      
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      
      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="p-1.5 rounded hover:bg-white/10 text-white/60"
        title="Insert Table"
      >
        <TableIcon size={16} />
      </button>
      
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded hover:bg-white/10 text-white/60 disabled:opacity-20"
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded hover:bg-white/10 text-white/60 disabled:opacity-20"
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black flex flex-col max-h-[500px]">
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto p-4 prose prose-invert max-w-none min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
