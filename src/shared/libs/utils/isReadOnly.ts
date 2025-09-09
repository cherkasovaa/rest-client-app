import { parsePathParams } from '@/shared/libs/utils/pathMethods';

export function isFieldReadonly(pathname: string): boolean {
  const { method } = parsePathParams(pathname);
  return method.toUpperCase() === 'GET';
}
