export interface ContentType {
  value: string;
  language: string;
}

export const CONTENT_TYPES: ContentType[] = [
  { value: 'application/json', language: 'json' },
  { value: 'application/xml', language: 'xml' },
  { value: 'text/plain', language: 'plaintext' },
];
