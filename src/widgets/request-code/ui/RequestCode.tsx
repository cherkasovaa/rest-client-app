import { CodeLanguageSelector } from '@/features/code-language-selector';
import {
  CODE_LANGUAGES,
  type CodeLanguage,
} from '@/shared/model/types/code-languages';
import { Editor } from '@monaco-editor/react';
import CodeIcon from '@mui/icons-material/Code';
import { Button, FormControl, Stack } from '@mui/material';
import { useState } from 'react';
import { generateCode } from '../model/generateCode';

export const RequestCode = () => {
  const [language, setLanguage] = useState<CodeLanguage>(CODE_LANGUAGES[0]);
  const [generatedCode, setGeneratedCode] = useState<string>(
    '// Select a way to generate code and click the button'
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleCodeGenerator = () => {
    setIsGenerating(true);

    try {
      const code = generateCode(language);

      if (code && code.trim().length > 0) {
        setGeneratedCode(code);
      } else {
        setGeneratedCode('// Not enough details to generate code');
      }
    } catch (err) {
      console.error(err);
      setGeneratedCode('// Error occurred while generating code');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Stack gap={5}>
      <FormControl
        style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}
        fullWidth
      >
        <CodeLanguageSelector value={language} onChange={setLanguage} />
        <Button
          onClick={handleCodeGenerator}
          startIcon={<CodeIcon />}
          disabled={isGenerating}
          variant="contained"
        >
          {isGenerating ? 'Generating...' : 'Generate Code'}
        </Button>
      </FormControl>

      <Editor
        value={generatedCode}
        height="200px"
        theme="vs-light"
        language={language.editorLanguage}
        loading={isGenerating && <div>Loading editor...</div>}
        options={{
          readOnly: true,
          fontSize: 17,
          minimap: { enabled: false },
          wordWrap: 'on',
        }}
      />
    </Stack>
  );
};
