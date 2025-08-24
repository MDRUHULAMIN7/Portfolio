"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Editor.js must be loaded only on client
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new EditorJS({
      holder: editorRef.current,
      placeholder: "Write your project description...",
      tools: {
        header: Header,
        list: List,
      },
      onChange: async () => {
        const savedData = await editor.save();
        onChange(JSON.stringify(savedData));
      },
    });

    setEditorInstance(editor);

    return () => {
      editor.destroy();
    };
  }, [editorRef]);

  return <div ref={editorRef} className="bg-gray-800 rounded p-2 text-white min-h-[200px]" />;
};

export default RichTextEditor;
