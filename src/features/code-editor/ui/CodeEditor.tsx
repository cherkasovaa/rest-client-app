import { Editor } from '@monaco-editor/react';
import { useRef } from 'react';
import type * as monaco from 'monaco-editor';

export const CodeEditor = ({
  language,
  onUnfocus,
  readOnly,
}: {
  language: string;
  onUnfocus: (data: string) => void;
  readOnly: boolean;
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    editor.onDidBlurEditorText(() => {
      const currentValue = editor.getValue();
      let value = currentValue;
      if (language === 'json') {
        try {
          value = JSON.stringify(JSON.parse(currentValue), null, 2);
        } catch {
          value = currentValue;
        }
      }
      onUnfocus(value);
    });
  };

  return (
    <Editor
      onMount={onMount}
      height="200px"
      theme="light"
      language={language}
      loading={<div>...Loading</div>}
      options={{ readOnly, fontSize: 17 }}
    />
  );
};
