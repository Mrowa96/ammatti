import { fileURLToPath } from 'url';

export function getDirname() {
  return fileURLToPath(new URL('.', import.meta.url));
}
