import {
  CODE_LANGUAGES,
  type CodeLanguage,
} from '@/shared/model/types/code-languages';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import { useCallback } from 'react';

export const CodeLanguageSelector = ({
  value,
  onChange,
}: {
  value: CodeLanguage;
  onChange: (language: CodeLanguage) => void;
}) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedTarget = event.target.value;
      const language = CODE_LANGUAGES.find(
        (lang) => lang.target === selectedTarget
      );

      if (language) {
        onChange(language);
      }
    },
    [onChange]
  );

  const renderLanguageItem = useCallback((lang: CodeLanguage) => {
    return (
      <MenuItem key={`${lang.language}-${lang.variant}`} value={lang.target}>
        {lang.language} (<span style={{ color: 'grey' }}>{lang.variant}</span>)
      </MenuItem>
    );
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="code-language">Language</InputLabel>
      <Select
        value={value.target}
        id="code-language"
        label="Language"
        onChange={handleChange}
      >
        {CODE_LANGUAGES.map(renderLanguageItem)}
      </Select>
    </FormControl>
  );
};
