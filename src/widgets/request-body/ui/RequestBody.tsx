import { Box, Button, FormControl, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type * as monaco from 'monaco-editor';
import { ContentTypeSelector } from '@/features/content-type-selector';
import { CONTENT_TYPES } from '@/shared/types/content-types';
import {
  parsePathParams,
  updatePathParams,
} from '@/shared/libs/utils/pathMethods';
import { Editor } from '@monaco-editor/react';
import { isFieldReadonly } from '@/shared/libs/utils/isReadOnly';
import { prettify } from '@/shared/libs/utils/prettify';

export const RequestBody = () => {
  const [language, setLanguage] = useState<string>(CONTENT_TYPES[0].language);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isReadonly, setIsReadonly] = useState<boolean>(
    isFieldReadonly(window.location.pathname)
  );

  useEffect(() => {
    const update = () =>
      setIsReadonly(isFieldReadonly(window.location.pathname));

    window.addEventListener('popstate', update);
    window.addEventListener('rest-client:paramschange', update);

    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('rest-client:paramschange', update);
    };
  }, []);

  const handleBodyData = (data: string) => {
    const { method, endpoint } = parsePathParams(window.location.pathname);
    updatePathParams({ method, endpoint, body: data });
  };

  const handleTypeChange = (language: string) => {
    setLanguage(language);
  };

  const handlePrettify = () => {
    if (!editorRef.current) return;

    const currentValue = editorRef.current.getValue();
    const formatted = prettify(currentValue, language);

    editorRef.current.setValue(formatted);

    const { method, endpoint } = parsePathParams(window.location.pathname);
    updatePathParams({ method, endpoint, body: formatted });
  };

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const { body } = parsePathParams(window.location.pathname);
    if (body) {
      editor.setValue(body);
    }

    editor.onDidBlurEditorText(() => {
      const currentValue = editor.getValue();
      handleBodyData(currentValue);
    });
  };

  return (
    <Stack gap={5}>
      <FormControl
        fullWidth
        style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}
      >
        <ContentTypeSelector onChange={handleTypeChange} />
        <Button onClick={handlePrettify} disabled={false}>
          <AutoAwesomeIcon />
          Prettify
        </Button>
      </FormControl>
      <Box
        sx={{
          minHeight: '200px',
        }}
      >
        <Editor
          onMount={onMount}
          height="200px"
          theme="light"
          language={language}
          loading={<div>...Loading</div>}
          options={{
            readOnly: isReadonly,
            fontSize: 17,
          }}
        />
      </Box>
    </Stack>
  );
};
