import { fileURLToPath } from 'url';
import path from 'path';

export function getDirname() {
  return fileURLToPath(new URL('.', import.meta.url));
}

/** @param {string} relativePath */
export function getAbsolutePath(relativePath) {
  if (typeof relativePath !== 'string' || !relativePath.length) {
    throw new Error('relativePath should be non-empty string.');
  }

  return path.resolve(getDirname(), relativePath);
}
