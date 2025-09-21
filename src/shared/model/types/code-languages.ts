export interface CodeLanguage {
  language: string;
  variant: string;
  target: string;
  editorLanguage: string;
}

export const CODE_LANGUAGES: CodeLanguage[] = [
  {
    language: 'cURL',
    variant: 'cURL',
    target: 'curl',
    editorLanguage: 'shell',
  },
  {
    language: 'JavaScript',
    variant: 'Fetch',
    target: 'javascript',
    editorLanguage: 'javascript',
  },
  {
    language: 'JavaScript',
    variant: 'XHR',
    target: 'xhr',
    editorLanguage: 'javascript',
  },
  {
    language: 'Node.js',
    variant: 'Axios',
    target: 'axios',
    editorLanguage: 'javascript',
  },
  {
    language: 'Node.js',
    variant: 'Native',
    target: 'nodejs',
    editorLanguage: 'javascript',
  },
  {
    language: 'Python',
    variant: 'Requests',
    target: 'python',
    editorLanguage: 'python',
  },
  {
    language: 'Java',
    variant: 'OkHttp',
    target: 'okhttp',
    editorLanguage: 'java',
  },
  {
    language: 'C#',
    variant: 'HttpClient',
    target: 'csharp',
    editorLanguage: 'csharp',
  },
  { language: 'Go', variant: 'Native', target: 'go', editorLanguage: 'go' },
];
