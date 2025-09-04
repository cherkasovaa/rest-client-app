import { Editor } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import type * as monaco from 'monaco-editor';

export const CodeEditor = ({ language }: { language: string }) => {
  const [value, setValue] = useState('');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Editor
      onMount={onMount}
      height={'200px'}
      theme="light"
      language={language}
      defaultValue={'// write your body here'}
      value={value}
      onChange={(value) => setValue(value || '')}
      loading={<div>we can add out own laoding</div>}
    />
  );
};
