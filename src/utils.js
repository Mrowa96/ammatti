import { fileURLToPath } from 'url';
import path from 'path';

export function getDirname(relativePath) {
  const dirPath = fileURLToPath(new URL('.', import.meta.url));

  if (!path) {
    return dirPath;
  }

  return path.resolve(dirPath, relativePath);
}
