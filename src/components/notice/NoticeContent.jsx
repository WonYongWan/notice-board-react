import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const NoticeContent = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: true,
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default NoticeContent;
