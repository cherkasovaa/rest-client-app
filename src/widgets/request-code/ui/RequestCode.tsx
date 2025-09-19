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
import { useTranslations } from 'next-intl';

export const RequestCode = () => {
  const t = useTranslations();

  const [language, setLanguage] = useState<CodeLanguage>(CODE_LANGUAGES[0]);
  const [generatedCode, setGeneratedCode] = useState<string>(
    `// ${t('selectWayToGenerate')}`
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleCodeGenerator = () => {
    setIsGenerating(true);

    try {
      const code = generateCode(language);

      if (code && code.trim().length > 0) {
        setGeneratedCode(code);
      } else {
        setGeneratedCode(`// ${t('notEnoughDetails')}`);
      }
    } catch (err) {
      console.error(err);
      setGeneratedCode(`// ${t('ErrorOccurred')}`);
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
          sx={{
            backgroundColor: 'secondary.dark',
          }}
        >
          {isGenerating ? t('generatingCode') : t('generateCode')}
        </Button>
      </FormControl>

      <Editor
        value={generatedCode}
        height="200px"
        theme="vs-light"
        language={language.editorLanguage}
        loading={isGenerating && <div>{t('loadingEditor')}</div>}
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
