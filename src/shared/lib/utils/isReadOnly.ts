import { parsePathParams } from '@/shared/lib/utils/pathMethods';

export function isFieldReadonly(pathname: string): boolean {
  const { method } = parsePathParams(pathname);
  const readOnlyArray = ['GET', 'DELETE', 'HEAD', 'OPTIONS'];

  return readOnlyArray.includes(method.toUpperCase());
}
