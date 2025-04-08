import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  fontSize: 16,
};

interface CodeEditorProps {
  value: string;
  language: "html" | "css" | "javascript";
  onChange: (value: string) => void;
  handleOutput?: () => void;
}

export default function CodeEditor({
  value,
  language,
  onChange,
  handleOutput,
}: CodeEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
  ) => {
    editorRef.current = editor;
    // Register a command for Ctrl+S / Cmd+S
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleOutput?.();
    });
  };

  useEffect(() => {
    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  return (
    <Editor
      value={value}
      theme="vs-dark"
      options={MONACO_EDITOR_OPTIONS}
      onMount={handleEditorDidMount}
      language={language}
      onChange={(value) => {
        if (value !== undefined) onChange(value);
      }}
    />
  );
}
