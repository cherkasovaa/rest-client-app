import { parsePathParams } from '@/shared/lib/utils/pathMethods';

export function isFieldReadonly(pathname: string): boolean {
  const { method } = parsePathParams(pathname);
  return method.toUpperCase() === 'GET';
}
